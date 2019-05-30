import { select as D3Select, Selection, BaseType } from 'd3-selection'
import { scaleOrdinal } from 'd3-scale'
import {arc, Arc, pie, Pie,  PieArcDatum } from 'd3-shape'
import { interpolate as D3Interpolate } from 'd3-interpolate'
import { ArcInPieDataType } from '../../types'
import { getClientRectWidthAndHeight } from '../utils'

const getArcTween = (
  arc_layout: Arc<any, PieArcDatum<ArcInPieDataType>>,
  _current: number,
) => (b: any) => {
  let i = D3Interpolate(_current, b)
  _current = i(0)
  return (t: any) => {
    return arc_layout(i(t))
  }
}

export class PieCharts {

  svgDom: HTMLOrSVGElement
  d3ishSVG: Selection<SVGGElement, any, HTMLElement, any>
  data: ArcInPieDataType[]
  svgWidth: number
  svgHeight: number
  pieRadius: number
  pieInnerRadius: number = 0
  arcFunc: Arc<BaseType, PieArcDatum<ArcInPieDataType>>
  pieLayout: Pie<any, ArcInPieDataType>
  theWholeWrapperG: Selection<BaseType, any, HTMLElement, any>
  dataBinds: Selection<BaseType, PieArcDatum<ArcInPieDataType>, BaseType, any>
  newEnterGs: Selection<BaseType, PieArcDatum<ArcInPieDataType>, BaseType, any>
  arcTweenFunc: (b: any) => (t: any) => string
  isFirstBind: boolean = true
  colorsForPirChart = scaleOrdinal<string>().range(['#ff7f50', '#7f55d4', '#6fbfad'])


  constructor(svgDom: HTMLOrSVGElement) {
    this.svgDom = svgDom
    const box = getClientRectWidthAndHeight(svgDom)
    this.svgWidth = box.width
    this.svgHeight = box.height

    this.pieRadius = Math.min(this.svgWidth, this.svgHeight) / 2;

  }

  initD3ishSVG() {
    if (!this.d3ishSVG) {
      this.d3ishSVG = D3Select<SVGGElement, ArcInPieDataType[]>(this
        .svgDom as any)
    }
  }

  setD3ishSVGFromOtherChart(
    d3ishSvgFromOtherChart: Selection<SVGGElement, any, HTMLElement, any>,
  ) {
    this.d3ishSVG = d3ishSvgFromOtherChart
  }

  initNeededFunc() {

    this.arcFunc = arc<PieArcDatum<ArcInPieDataType>>()
    .innerRadius(this.pieInnerRadius)
    .outerRadius(this.pieRadius - 40);

    this.pieLayout = pie<ArcInPieDataType>()
    .sort(null)
    .value((d: ArcInPieDataType) => {
      return d.value;
    })

    this.arcTweenFunc = getArcTween(this.arcFunc, 0)

  }

  /**
   *
   * @param {string[]} hexColorStrArr 要使用的顏色，必須是hex16進制格式 #開頭
   */
  setColorRangeArr(hexColorStrArr: string[]) {
    this.colorsForPirChart = scaleOrdinal<string>().range(hexColorStrArr)
  }


  appendOutWrapperGAndSetTheStartDrawCenter() {
    if(this.isFirstBind){
      this.theWholeWrapperG =
        this.d3ishSVG
        .append('g')
        .attr('transform', `translate(${this.svgWidth / 2}, ${this.svgHeight / 2})`);

      this.isFirstBind = false
    }
  }

  startToBindBeforeEnter() {
    this.dataBinds =
    this.theWholeWrapperG
    .selectAll('.arc')
    .data(this.pieLayout(this.data))
  }

  doEnter() {
    this.newEnterGs = this.dataBinds
      .enter()
      .append('g')
      .attr('class', 'arc')

    this.newEnterGs
      .append('path')
      .attr('d', this.arcFunc)
      .attr('fill', (d, i: number) => {
        return this.colorsForPirChart(`${i}`);
      })
      .transition()
      .duration(750)
      .attrTween('d', this.arcTweenFunc)
  }

  doUpdate() {
    this.theWholeWrapperG
    .selectAll('.arc')   // the g
    .select('path')
    .attr('d', this.arcFunc)
      .attr('fill', (d, i: number) => {
        return this.colorsForPirChart(`${i}`);
      })
      .transition()
      .duration(750)
      .attrTween('d', this.arcTweenFunc)
  }

  doExitRemove() {
    this.dataBinds.exit().remove()
  }

  draw(data: ArcInPieDataType[]) {
    this.data = data
    this.initD3ishSVG()
    this.initNeededFunc()
    this.appendOutWrapperGAndSetTheStartDrawCenter()

    this.startToBindBeforeEnter()

    this.doEnter()
    this.doExitRemove()
    this.doUpdate()
  }
}
