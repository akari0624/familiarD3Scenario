import { select as D3Select, Selection, schemeCategory10, scaleOrdinal, arc, Arc, DefaultArcObject, pie, Pie, BaseType, PieArcDatum } from 'd3'
import { ArcInPieDataType } from '../../types'
import { getClientRectWidthAndHeight } from '../utils'




const threeColorForPirChart = scaleOrdinal<string>().range(['#ff7f50', '#7f55d4', '#6fbfad'])

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

  constructor(svgDom: HTMLOrSVGElement, data: ArcInPieDataType[]) {
    this.svgDom = svgDom
    this.data = data

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

  }


  appendOutWrapperGAndSetTheStartDrawCenter() {
    this.theWholeWrapperG =
      this.d3ishSVG
      .append('g')
      .attr('transform', `translate(${this.svgWidth / 2}, ${this.svgHeight / 2})`);
  }

  startToBindBeforeFirstEnter() {
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
  }

  draw() {
    this.initD3ishSVG()
    this.initNeededFunc()
    this.appendOutWrapperGAndSetTheStartDrawCenter()
    this.startToBindBeforeFirstEnter()
    this.doEnter()
  
  }
}
