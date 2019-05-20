import { select as D3Select, Selection, schemeCategory10 } from 'd3'
import { PieChartDataType } from '../../types'
import { getClientRectWidthAndHeight } from '../utils'

export class PieChart {

  svgDom: HTMLOrSVGElement
  d3ishSVG: Selection<SVGGElement, any, HTMLElement, any>
  data: PieChartDataType[]
  svgWidth: number
  svgHeight: number

  constructor(svgDom: HTMLOrSVGElement, data: PieChartDataType[]){
    this.svgDom = svgDom
    this.data = data
    
    const box = getClientRectWidthAndHeight(svgDom)
    this.svgWidth = box.width
    this.svgHeight = box.height

  }

}
