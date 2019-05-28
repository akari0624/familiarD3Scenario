import { select as D3Select, Selection, BaseType } from 'd3-selection'
import {
  scaleBand,
  ScaleBand,
  scaleOrdinal,
  ScaleOrdinal,
  scaleLinear,
  ScaleLinear,
} from 'd3-scale'
import { max } from 'd3-array'

import { line, Line } from 'd3-shape'

import { axisRight, Axis } from 'd3-axis'
import { interpolateString } from 'd3-interpolate'
import {timeout} from 'd3-timer'

import { LinePointDataType, LineDataType, marginInPX } from '../../types'
import { flatMap } from '../../utils'
import { getClientRectWidthAndHeight } from '../utils'

function drawRightYAxis(instance: LineCharts): void {
  const { svgWidth, d3ishSVG, yMaxScaleLinear, isFirstDraw, margin } = instance
  if (isFirstDraw) {
    d3ishSVG
      .append('g')
      .attr('class', 'y_axis_right')
      .attr('transform', `translate(${svgWidth - margin.right},0)`)
      .call(axisRight(yMaxScaleLinear).ticks(5))
      .append('text')
      .style('fill', 'steelblue') // fill the text with the colour black
      .attr('transform', 'rotate(-90)')
      .attr('y', -10)
      .attr('dy', '.71em')
      .style('text-anchor', 'end')
      .text(`${instance.rightYAxisText}`)
  } else {
    d3ishSVG
      .select('.y_axis_right')
      .attr('transform', `translate(${svgWidth - margin.right},0)`)
      .call(axisRight(yMaxScaleLinear).ticks(5))
  }
}

const lineFunc = (instance: LineCharts) =>
  line<LinePointDataType>()
    .x((d: LinePointDataType) => {
      const x1 =
        instance.xScaleBand(d.date) +
        instance.xScaleBand.bandwidth() / 2 +
        (instance.margin.left + instance.margin.right) / 2
      //  console.log('x1', x1)
      return x1
    })
    .y((d: LinePointDataType) => {
      const y1 = instance.yMaxScaleLinear(d.value)
      //  console.log('y1', y1)
      return y1
    })

function tweenDash() {
  const l = this.getTotalLength()
  const i = interpolateString(`0, ${l}`, `${l}, ${l}`)
  return function(t: any) {
    return i(t)
  }
}

function transition(path: Selection<SVGPathElement, any, any, any>) {
  path
    .transition()
    .duration(2000)
    .attrTween('stroke-dasharray', tweenDash)
}

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
  margin: marginInPX = { top: 20, right: 40, bottom: 40, left: 40 }
  lineFunc: Line<[LinePointDataType, LinePointDataType]>
  lineColors: ScaleOrdinal<string, string>
  dataBinds: Selection<BaseType, LineDataType, SVGGElement, LinePointDataType[]>
  isFirstDraw = true
  rightYAxisText: string = ''
  colorRangeArr: string[] = ['#FF33CC', '#0070C0', '#00B050', '#671919', '#0b172b']
  isDrawPoint: boolean = false
  pointRadius: number = 5

  constructor(svgDom: HTMLOrSVGElement) {
    this.svgDom = svgDom
    const box = getClientRectWidthAndHeight(svgDom)
    this.svgWidth = box.width
    this.svgHeight = box.height
  }

  initD3ishSVG() {
    if (!this.d3ishSVG) {
      this.d3ishSVG = D3Select<SVGGElement, [LinePointDataType[]]>(this
        .svgDom as any)

      this.d3ishSVG
        .attr('width', this.svgWidth)
        .attr('height', this.svgHeight)
        .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`)
    }
  }

  setD3ishSVGFromOtherChart(
    d3ishSvgFromOtherChart: Selection<SVGGElement, any, HTMLElement, any>
  ) {
    this.d3ishSVG = d3ishSvgFromOtherChart
  }

   /**
   *
   * @param {string} t - 要顯示在右YAxis上的字
   */
  setRightYAxisText(t: string) {
    this.rightYAxisText = t
  }

  /**
   *
   * @param {string[]} hexColorStrArr 要使用的顏色，必須是hex16進制格式 #開頭
   */
  setColorRangeArr(hexColorStrArr: string[]) {
    this.colorRangeArr = hexColorStrArr
  }

  setIsDrawPoint(isDP: boolean, pointRadius: number = 5) {
    this.isDrawPoint = isDP
    this.pointRadius = pointRadius
  }

  prepareLineralAndAxis() {
    const { svgHeight: height, svgWidth: width, data, margin } = this
    this.xScaleBand = scaleBand()
      .range([0, width - margin.left - margin.right])
      .padding(0.1)
      .domain(flatMap(data, (d: LineDataType) => d.datas.map(dd => dd.date)))

    this.yMaxScaleLinear = scaleLinear()
      .range([height - margin.bottom, margin.top])
      .domain([0, max(flatMap(data, d => d.datas.map(dd => dd.value)), d => d)])

    this.yRightAxis = axisRight(this.yMaxScaleLinear)
  }

  prepareLineColors = () => {
    this.lineColors = scaleOrdinal<string>()
      //     .domain(
      //       __Categories.filter(function(d) {
      //         return d.Type == 'line';
      //     }).map(function(d) {
      //         return d.Name;
      //     })
      //  )
      .range(this.colorRangeArr)
  }

  doDataBind = () => {
    const { d3ishSVG, data } = this
    this.dataBinds = d3ishSVG.selectAll('.pathWrapperG').data(data)
  }

  drawTheLine = (lineColors: ScaleOrdinal<string, string>) => {
    const tLineFunc = lineFunc(this)

    this.dataBinds
      .enter()
      .append('g')
      .attr('class', 'pathWrapperG')
      .each(function(d) {
        D3Select(this) // 這個this就是 各個包裹著各條line的g
          .append('path')
          .attr('d', (b: LinePointDataType[]) => tLineFunc(d.datas))
          .attr('stroke', lineColors(d.name))
          .style('fill', 'none')
          .call(transition)
      })
  }

  update_line = (lineColors: ScaleOrdinal<string, string>) => {
    const tLineFunc = lineFunc(this)
    this.dataBinds
      .select('path')
      .attr('d', (b: LineDataType) => tLineFunc(b.datas))
      .attr('stroke', d => lineColors(d.name))
      .style('fill', 'none')
      .call(transition)
  }

  remove_line = () => {
    this.dataBinds.exit().remove()
  }

  removeAllPoint() {
    if (!this.isDrawPoint) {
      return
    }

    this.d3ishSVG.selectAll('.pCircle').remove()
  }

  drawPoint() {
    if (!this.isDrawPoint) {
      return
    }

    const tD3ishSVG = this.d3ishSVG
    const xScaleBand = this.xScaleBand
    const yMaxScaleLinear = this.yMaxScaleLinear
    const lineColors = this.lineColors
    const _margin = this.margin
    const _pointRadius = this.pointRadius
    tD3ishSVG
      .selectAll('.pathWrapperG')
      .each(function (da: LineDataType, ind: number) {
        D3Select(this)
        .selectAll('circle')
        .data(da.datas)
        .enter()
        .append('circle')
        .attr('class', 'pCircle')
        .attr('r', _pointRadius)
        .attr('cx', (d: LinePointDataType) => xScaleBand(d.date)+ xScaleBand.bandwidth() / 2 +(_margin.left + _margin.right) / 2)
        .attr('cy', (d: LinePointDataType) => yMaxScaleLinear(d.value))
        .attr('fill', (d:LinePointDataType) => lineColors(da.name))
      })
      
  }

  draw(data: LineDataType[]) {
    this.data = data
    this.initD3ishSVG()

    this.removeAllPoint()

    this.prepareLineralAndAxis()
    drawRightYAxis(this)
    if (this.isFirstDraw) {
      this.isFirstDraw = false
    }
    this.prepareLineColors()

    this.doDataBind()
    this.drawTheLine(this.lineColors)

    this.update_line(this.lineColors)
    this.remove_line()

    timeout(() => {

      this.drawPoint()
    }, 2100)
  
  }
}
