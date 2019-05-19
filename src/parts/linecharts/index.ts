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
  axisRight,
  Axis,
  axisBottom,
  axisLeft,
  mouse,
  BaseType
} from 'd3'
import { LinePointDataType } from '../../types'

function drawRightYAxis(instance: LineCharts): void {
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

export class LineCharts {
  svgDom: HTMLOrSVGElement
  d3ishSVG: Selection<SVGGElement, any, HTMLElement, any>
  svgWidth: number
  svgHeight: number
  // 一條折線會是一個  LinePointDataType[], 一個 LinePointDataType是一個點， 一組折線會被一個g包起來
  data: [LinePointDataType[]]
  xScaleBand: ScaleBand<string>
  xLine: ScaleBand<string>
  yMaxScaleLinear: ScaleLinear<number, number>
  yRightAxis: Axis<
    | number
    | {
        valueOf(): number
      }
  >

  lineFunc: Line<[LinePointDataType, LinePointDataType]>
  lineColors: ScaleOrdinal<string, string>

  constructor(svgDom: HTMLOrSVGElement, data: [LinePointDataType[]]) {
    this.svgDom = svgDom
    this.data = data
    const box = (svgDom as SVGElement).getBoundingClientRect()
    this.svgWidth = box.width
    this.svgHeight = box.height
  }

  initD3shSVG() {
    if (!this.d3ishSVG) {
      this.d3ishSVG = D3Select<SVGGElement, [LinePointDataType[]]>(this
        .svgDom as any)
    }
  }

  setD2ishSVGFromOtherChart(
    d3ishSvgFromOtherChart: Selection<SVGGElement, any, HTMLElement, any>
  ) {
    this.d3ishSVG = d3ishSvgFromOtherChart
  }

  prepareLineralAndAxis() {
    const { svgHeight: height, svgWidth: width, data } = this

    this.xScaleBand = scaleBand()
      .range([0, width])
      .padding(0.1)
      .domain(data.map(d => d.date))

    this.yMaxScaleLinear = scaleLinear()
      .range([height, 0])
      .domain([0, max(data.map(d => d.categories), d => d[0].value)])

    this.yRightAxis = axisRight(this.yMaxScaleLinear)

    this.xLine = scaleBand()
      .rangeRound([0, width])
      .padding(0.1)
      .domain(data.map(d => d.date))
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

  drawTheLine = (lineColors: ScaleOrdinal<string, string>) => {
    const { d3ishSVG, data } = this

    d3ishSVG
      .selectAll('.lines')
      .data(data)
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
}
