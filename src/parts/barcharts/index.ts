import {
  select as D3Select,
  Selection,
  scaleBand,
  ScaleBand,
  scaleOrdinal,
  ScaleOrdinal,
  max,
  schemeCategory10,
  line,
  Line,
  scaleLinear,
  ScaleLinear,
  scaleTime,
  timeParse,
  timeFormat,
  axisRight,
  Axis,
  axisBottom,
  axisLeft,
  mouse,
  BaseType,
} from 'd3'
import {
  marginInPX,
  BarChartDataType,
  LinePointDataType,
} from '../../types'

function drawBottomXAxis(instance: BarCharts): void {
  const { svgHeight, d3ishSVG, xScaleBand, margin } = instance

  d3ishSVG
    .append('g')
    .attr('class', 'x_axis')
    .attr('transform', `translate(0, ${svgHeight})`)
    .call(axisBottom(xScaleBand))
}

function drawLeftYAxis(instance: BarCharts): void {
  const { yScaleLinear, d3ishSVG } = instance

  d3ishSVG
    .append('g')
    .attr('class', 'y axis')
    .call(axisLeft(yScaleLinear).ticks(5))
    .append('text')
    .style('fill', 'steelblue') // fill the text with the colour black
    .attr('transform', 'rotate(-90)')
    .attr('y', 6)
    .attr('dy', '.71em')
    .style('text-anchor', 'end')
    .text('案件數')
}

function drawRightYAxis(instance: BarCharts): void {
  const { svgWidth, d3ishSVG, yMaxScaleLinear } = instance
  d3ishSVG
    .append('g')
    .attr('class', 'y_axis')
    .attr('transform', `translate(${svgWidth},0)`)
    .call(axisRight(yMaxScaleLinear).ticks(5))
    .append('text')
    .style('fill', 'steelblue') // fill the text with the colour black
    .attr('transform', 'rotate(-90)')
    .attr('y', -10)
    .attr('dy', '.71em')
    .style('text-anchor', 'end')
    .text('均價')
}

const wrapRect_G_ClassName = '.state'
const wrapRect_G_ClassNameWithoutDot = wrapRect_G_ClassName.substring(1, wrapRect_G_ClassName.length)

export class BarCharts {
  svgDom: HTMLOrSVGElement
  d3ishSVG: Selection<SVGGElement, any, HTMLElement, any>
  data: BarChartDataType[]
  margin: marginInPX = { top: 20, right: 40, bottom: 60, left: 40 }
  svgWidth: number
  svgHeight: number

  xScaleBand: ScaleBand<string>
  xLine: ScaleBand<string>
  xScaleOrdinal: ScaleOrdinal<string, number>

  yScaleLinear: ScaleLinear<number, number>
  yMaxScaleLinear: ScaleLinear<number, number>

  tColors: ScaleOrdinal<string, string>
  yRightAxis: Axis<
    | number
    | {
        valueOf(): number
      }
  >
  barChartDataBind: Selection<BaseType, BarChartDataType, SVGGElement, any>
  theGsThatWrapTheRects: Selection<
    SVGGElement,
    BarChartDataType,
    SVGGElement,
    BarChartDataType
  >
  theBarsRects: Selection<
    SVGRectElement,
    BarChartDataType,
    SVGGElement,
    BarChartDataType
  >
  lineColors: ScaleOrdinal<string, string>

  lineFunc: Line<[LinePointDataType, LinePointDataType]>
  lineChartData: LinePointDataType[]

  constructor(svgDom: HTMLOrSVGElement, data: BarChartDataType[]) {
    this.svgDom = svgDom
    this.data = data
    const box = (svgDom as SVGElement).getBoundingClientRect()
    this.svgWidth = box.width
    this.svgHeight = box.height
    this.d3ishSVG = D3Select<SVGGElement, BarChartDataType>(this.svgDom as any)
  }
  /*
  arrangeLineChartData = (arrangeCB: (data: BarChartDataType) => LinePointDataType[]) => {
    this.lineChartData = arrangeCB(this.data)
  }
*/
  setMargins(pMargins: marginInPX) {
    this.margin = pMargins
  }

  _prepareAxis = () => {
    const { svgWidth: width, svgHeight: height, data } = this

    this.xScaleBand = scaleBand()
      .range([0, width])
      .padding(0.1)
      .domain(data.map(d => d.date))

    this.xLine = scaleBand()
      .rangeRound([0, width])
      .padding(0.1)
      .domain(data.map(d => d.date))

    this.xScaleOrdinal = scaleOrdinal<string, number>()
  //    .range([0, width])
      .domain(data.map(d => d.date))

    this.yScaleLinear = scaleLinear().range([height, 0]).domain([0, max(data, d => d.categories[0].value)])

    this.yMaxScaleLinear = scaleLinear()
      .range([height, 0])
      .domain([0, max(data.map(d => d.categories), d => d[0].value)])

    this.tColors = scaleOrdinal(schemeCategory10).range([
      '#FFF279',
      '#FFFF00',
      '#7b6888',
      '#6b486b',
      '#a05d56',
      '#d0743c',
      '#ff8c00'
    ])

    this.yRightAxis = axisRight(this.yMaxScaleLinear)
  }

  prepareLineFunc = () => {
    this.lineFunc = line<[LinePointDataType, LinePointDataType]>()
      .x((d: [LinePointDataType, LinePointDataType], i1: number) => {
        return this.xScaleBand(d[i1].date) + this.xScaleBand.bandwidth() / 2
      })
      .y((d: [LinePointDataType, LinePointDataType], i2: number) => {
        return this.yMaxScaleLinear(d[i2].value)
      })
  }

  prepareLineColors = () => {
    this.lineColors = scaleOrdinal(schemeCategory10)
      //     .domain(
      //       __Categories.filter(function(d) {
      //         return d.Type == 'line';
      //     }).map(function(d) {
      //         return d.Name;
      //     })
      //  )
      .range(['#FF33CC', '#0070C0', '#00B050', '#671919', '#0b172b'])
  }

  bindDataToG() {

    this.barChartDataBind = this.d3ishSVG
    .selectAll(wrapRect_G_ClassName)
    .data(this.data)
  }

  drawGsThatToWrapTheRect() {
    // 包住 rect的 g
    this.theGsThatWrapTheRects =
    this.barChartDataBind
      .enter()
      .append('g')
      .attr('class', wrapRect_G_ClassNameWithoutDot)
      .attr('transform', d => {
        const result = this.xScaleBand(d.date)
        return `translate( ${result}, 0)`
      })
  }

  drawRectInTheGs = () => {
    this.theBarsRects = this.theGsThatWrapTheRects
      .append('rect')
      .attr('width', this.xScaleBand.bandwidth())
      .attr('x', d => this.xScaleOrdinal(d.date))
      .attr('y', this.svgHeight)
      .style('fill', (d: BarChartDataType) =>
        this.tColors(d.categories[0].name)
      )
  }

  setRectTransition = () => {
    this.theBarsRects
      .transition()
      .duration(1000)
      //由下往上長
      .attr('y', d => this.yScaleLinear(d.categories[0].value))
      .attr(
        'height',
        d => this.svgHeight - this.yScaleLinear(d.categories[0].value)
      )
  }

  drawTheLine = (lineColors: ScaleOrdinal<string, string>) => {
    const { d3ishSVG, lineChartData } = this

    d3ishSVG
      .selectAll('.lines')
      .data(lineChartData)
      .enter()
      .append('g')
      .attr('class', 'axis line')
      .each(d => {
        d3ishSVG
          .append('path')
          .attr('d', b => this.lineFunc([[lineChartData[0], lineChartData[1]]]))
          .attr('stroke', lineColors(d.name))
          .transition()
          .duration(1500)
      })
  }

  draw = () => {
    const { svgWidth, svgHeight, margin, d3ishSVG } = this

    d3ishSVG
      .attr('width', svgWidth)
      .attr('height', svgHeight)
      .attr('transform', `translate(${margin.left}, ${margin.top})`)

    this._prepareAxis()
    // this.prepareLineColors()
    // this.prepareLineFunc()

    drawBottomXAxis(this)
    drawLeftYAxis(this)
    // drawRightYAxis(this)

    this.bindDataToG()
    this.drawGsThatToWrapTheRect()
    this.drawRectInTheGs()
    this.setRectTransition()

    //  this.drawTheLine(this.lineColors)
  }
}
