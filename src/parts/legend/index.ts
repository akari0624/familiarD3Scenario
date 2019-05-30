import { select as D3Select, Selection, BaseType } from 'd3-selection'
import { scaleOrdinal, ScaleOrdinal } from 'd3-scale'
import { getClientRectWidthAndHeight } from '../utils'
import { LengendDataType, LengendIconEnum } from '../../types'

export class Legend {

  svgDomRef: HTMLOrSVGElement
  svgWidth: number
  svgHeight: number
  d3ishSVG: Selection<SVGGElement, any, HTMLElement, any>
  colorScale: ScaleOrdinal<number, string>

  constructor(svgDom: HTMLOrSVGElement) {
    this.svgDomRef = svgDom

    const box = getClientRectWidthAndHeight(svgDom)
    this.svgWidth = box.width
    this.svgHeight = box.height
    this.d3ishSVG = D3Select(svgDom as any)

    this.d3ishSVG.append('g').attr('class', 'legendWrapper')
  }

  setColorRange(colorArr: string[]){
    this.colorScale = scaleOrdinal<number, string>().range(colorArr)
  }

  initD3ishSVG() {
    if (!this.d3ishSVG) {
      this.d3ishSVG = D3Select<SVGSVGElement, LengendDataType[]>(this
        .svgDomRef as any)
    }

    this.d3ishSVG
      .attr('width', this.svgWidth)
      .attr('height', this.svgHeight)
      .attr('transform', `translate(0, 0)`)
  }

  draw(data: LengendDataType[]) {
    const dataBinds: Selection<BaseType, LengendDataType, SVGGElement, any>
     = this.d3ishSVG.select<SVGGElement>('.legendWrapper').selectAll('g').data(data)

   const enterLegendWrapperGs = dataBinds.enter().append<SVGGElement>('g')
    const colorFunc = this.colorScale
    enterLegendWrapperGs.each(function (d, i) {
     
      const currG = D3Select<SVGGElement, LengendDataType>(this)
      const currY = 30 * i
      currG.append('rect')
        .attr('width', 20)
        .attr('height', 18)
        .attr('x', 0)
        .attr('y', currY)
        .style('fill', () => {
          return colorFunc(i);
        })

      currG.append('text')
        .attr('x', 25)
        .attr('y', currY + 15)
        .text(d => d.text)
        .style('text-anchor', 'start')
    })

  }

}
