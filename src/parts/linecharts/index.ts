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
import { LinePointDataType, LineDataType } from '../../types'
import {flatMap} from '../../utils'

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


const lineFunc = (instance: LineCharts) => (line<LinePointDataType>()
      .x((d: LinePointDataType) => {
        const x1 = instance.xScaleBand(d.date) + instance.xScaleBand.bandwidth() / 2
        console.log('x1', x1)
        return x1
      })
      .y((d: LinePointDataType) => {
        const y1 = instance.yMaxScaleLinear(d.value)
        console.log('y1', y1)
        return y1
      })
)


export class LineCharts {
  svgDom: HTMLOrSVGElement
  d3ishSVG: Selection<SVGGElement, any, HTMLElement, any>
  svgWidth: number
  svgHeight: number
  // 一條折線會是一個  LinePointDataType[], 一個 LinePointDataType是一個點， 一組折線會被一個g包起來
  data: LineDataType[]
  
  xScaleBand: ScaleBand<string>
  yMaxScaleLinear: ScaleLinear<number, number>

  yRightAxis: Axis<
    | number
    | {
        valueOf(): number
      }
  >

  lineFunc: Line<[LinePointDataType, LinePointDataType]>
  lineColors: ScaleOrdinal<string, string>

  constructor(svgDom: HTMLOrSVGElement, data: LineDataType[]) {
    this.svgDom = svgDom
    this.data = data
    const box = (svgDom as SVGElement).getBoundingClientRect()
    this.svgWidth = box.width
    this.svgHeight = box.height
  }

  initD3ishSVG() {
    if (!this.d3ishSVG) {
      this.d3ishSVG = D3Select<SVGGElement, [LinePointDataType[]]>(this
        .svgDom as any)
    }
  }

  setD3ishSVGFromOtherChart(
    d3ishSvgFromOtherChart: Selection<SVGGElement, any, HTMLElement, any>,
  ) {
    this.d3ishSVG = d3ishSvgFromOtherChart
  }

  prepareLineralAndAxis() {
    const { svgHeight: height, svgWidth: width, data } = this
    this.xScaleBand = scaleBand()
      .range([0, width])
      .padding(0.1)
      .domain(flatMap(data, (d: LineDataType) => d.datas.map(dd => dd.date)))

    this.yMaxScaleLinear = scaleLinear()
      .range([height, 0])
      .domain([0, max(flatMap(data, d => d.datas.map(dd => dd.value)), d => d)])

    this.yRightAxis = axisRight(this.yMaxScaleLinear)

  }

  // prepareLineFunc = () => {
  //   this.lineFunc = line<[LinePointDataType, LinePointDataType]>()
  //     .x((d: [LinePointDataType, LinePointDataType], i1: number) => {
  //       return this.xScaleBand(d[i1].date) + this.xScaleBand.bandwidth()
  //     })
  //     .y((d: [LinePointDataType, LinePointDataType], i2: number) => {
  //       return this.yMaxScaleLinear(d[i2].value)
  //     })
  // }

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

    const tLineFunc = lineFunc(this)

    d3ishSVG
      .selectAll('.lines')
      .data(data)
      .enter()
      .append('g')
      .attr('class', 'axis_line')
      .each(function(d){
         D3Select(this)  // 這個this就是 各個包裹著各條line的g
          .append('path')
          .transition()
          .duration(1500)
          .attr('d', (b: LinePointDataType[])  => tLineFunc(d.datas))
          .attr('stroke', lineColors(d.name))
          .style('fill', 'none')
          
      })
  }

  draw () {
    this.initD3ishSVG()
    this.prepareLineralAndAxis()
    drawRightYAxis(this)
    this.prepareLineColors()
    this.drawTheLine(this.lineColors)
  }
}
