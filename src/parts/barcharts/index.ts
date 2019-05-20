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
  BaseType
} from 'd3'
import { marginInPX, BarChartDataType, LinePointDataType } from '../../types'
import { getClientRectWidthAndHeight } from '../utils'

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
    .attr('class', 'y_axis')
    .call(axisLeft(yScaleLinear).ticks(5))
    .append('text')
    .style('fill', 'steelblue') // fill the text with the colour black
    .attr('transform', 'rotate(-90)')
    .attr('y', 6)
    .attr('dy', '.71em')
    .style('text-anchor', 'end')
    .text('案件數')
}



const wrapRect_G_ClassName = '.state'
const wrapRect_G_ClassNameWithoutDot = wrapRect_G_ClassName.substring(
  1,
  wrapRect_G_ClassName.length
)

export class BarCharts {
  svgDom: HTMLOrSVGElement
  d3ishSVG: Selection<SVGGElement, any, HTMLElement, any>
  data: BarChartDataType[]
  margin: marginInPX = { top: 20, right: 40, bottom: 60, left: 40 }
  svgWidth: number
  svgHeight: number

  xScaleBand: ScaleBand<string>
  xScaleOrdinal: ScaleOrdinal<string, number>

  yScaleLinear: ScaleLinear<number, number>
  yMaxScaleLinear: ScaleLinear<number, number>

  tColors: ScaleOrdinal<string, string>
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


  constructor(svgDom: HTMLOrSVGElement, data: BarChartDataType[]) {
    this.svgDom = svgDom
    this.data = data
    const box = getClientRectWidthAndHeight(svgDom)
    this.svgWidth = box.width
    this.svgHeight = box.height
  }

  initD3shSVG() {
    if (!this.d3ishSVG) {
      this.d3ishSVG = D3Select<SVGGElement, BarChartDataType>(this
        .svgDom as any)
    }
  }

  getTheD3ishSVG() {
    return this.d3ishSVG
  }
  /*
  arrangeLineChartData = (arrangeCB: (data: BarChartDataType) => LinePointDataType[]) => {
    this.lineChartData = arrangeCB(this.data)
  }
*/
  setMargins(pMargins: marginInPX) {
    this.margin = pMargins
  }

  _prepareAxisAndScale = () => {
    const { svgWidth: width, svgHeight: height, data } = this

    this.xScaleBand = scaleBand()
      .range([0, width])
      .padding(0.1)
      .domain(data.map(d => d.date))

   
    this.xScaleOrdinal = scaleOrdinal<string, number>()
      .domain(data.map(d => d.date))

    this.yScaleLinear = scaleLinear()
      .range([height, 0])
      .domain([0, max(data, d => d.categories[0].value)])

  

    this.tColors = scaleOrdinal(schemeCategory10).range([
      '#FFF279',
      '#FFFF00',
      '#7b6888',
      '#6b486b',
      '#a05d56',
      '#d0743c',
      '#ff8c00'
    ])

  }

  

  bindDataToG() {
    this.barChartDataBind = this.d3ishSVG
      .selectAll(wrapRect_G_ClassName)
      .data(this.data)
  }

  drawGsThatToWrapTheRect() {
    // 包住 rect的 g
    this.theGsThatWrapTheRects = this.barChartDataBind
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

  

  draw = () => {
    const { svgWidth, svgHeight, margin, d3ishSVG } = this

    d3ishSVG
      .attr('width', svgWidth)
      .attr('height', svgHeight)
      .attr('transform', `translate(${margin.left}, ${margin.top})`)

    this._prepareAxisAndScale()


    drawBottomXAxis(this)
    drawLeftYAxis(this)

    this.bindDataToG()
    this.drawGsThatToWrapTheRect()
    this.drawRectInTheGs()
    this.setRectTransition()
  }
}
