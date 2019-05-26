import { select as D3Select, Selection, schemeCategory10, scaleOrdinal, arc, Arc, DefaultArcObject, pie, Pie, BaseType, PieArcDatum, interpolate as D3Interpolate } from 'd3'
import { ArcInPieDataType } from '../../types'
import { getClientRectWidthAndHeight } from '../utils'




const threeColorForPirChart = scaleOrdinal<string>().range(['#ff7f50', '#7f55d4', '#6fbfad'])

const getArcTween = (
  arc_layout: Arc<any, PieArcDatum<number>>,
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
  arcFunc: Arc<any, PieArcDatum<number>>
  pieLayout: Pie<any, ArcInPieDataType>
  theWholeWrapperG: Selection<SVGGElement, any, HTMLElement, any>
  dataBinds: Selection<BaseType, {}, SVGGElement, any>
  newEnterGs: Selection<SVGGElement, {}, SVGGElement, any>
  arcTweenFunc: (b: any) => (t: any) => string
  isFirstBind: boolean = true

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

    this.arcFunc = arc<PieArcDatum<number>>()
    .innerRadius(this.pieInnerRadius)
    .outerRadius(this.pieRadius - 40);

    this.pieLayout = pie<ArcInPieDataType>()
    .sort(null)
    .value((d: ArcInPieDataType) => {
      return d.value;
    })

    this.arcTweenFunc = getArcTween(this.arcFunc, 0)

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
        return threeColorForPirChart(`${i}`);
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
        return threeColorForPirChart(`${i}`);
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
