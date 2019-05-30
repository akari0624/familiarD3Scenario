import { select as D3Select, Selection, BaseType } from 'd3-selection'
import { scaleOrdinal, ScaleOrdinal, scaleBand, ScaleBand, scaleLinear, ScaleLinear } from 'd3-scale'
import { max } from 'd3-array'
import { getClientRectWidthAndHeight } from '../utils'
import { LengendDataType, LengendIconEnum, LegendPresentTypeEnum } from '../../types'


export class Legend {

  svgDomRef: HTMLOrSVGElement
  svgWidth: number
  svgHeight: number
  d3ishSVG: Selection<SVGGElement, any, HTMLElement, any>
  colorScale: ScaleOrdinal<number, string>
  presentType: LegendPresentTypeEnum
  legendScale: ScaleBand<string> | ScaleLinear<number, number>

  constructor(svgDom: HTMLOrSVGElement) {
    this.svgDomRef = svgDom

    const box = getClientRectWidthAndHeight(svgDom)
    this.svgWidth = box.width
    this.svgHeight = box.height
    this.initD3ishSVG()

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

      this.portraitOrLandscape()
  }

  portraitOrLandscape() {

    if (this.svgWidth <= this.svgHeight) {
      this.presentType = LegendPresentTypeEnum.portrait
    }else {
      this.presentType = LegendPresentTypeEnum.landscape
    }
  }

  prepareScale(data: LengendDataType[]) {

    if (this.presentType === LegendPresentTypeEnum.portrait) {
      this.legendScale = scaleBand()
        .range([0, this.svgHeight])
        .domain(data.map(d => d.text))
    }else if(this.presentType === LegendPresentTypeEnum.landscape){
      this.legendScale = scaleLinear()
      .range([0, this.svgWidth])
      .domain([0, max(data.map(d => d.text.length * 12))])  // 12 is font size
    }
  }

  draw(data: LengendDataType[]) {

    // legend區 做update, exit動畫的機率不高，真的資料有變動的話，乾脆清掉重畫最快
    this.d3ishSVG.select<SVGGElement>('.legendWrapper').selectAll('g').remove()

    const dataBinds: Selection<BaseType, LengendDataType, SVGGElement, any>
     = this.d3ishSVG.select<SVGGElement>('.legendWrapper').selectAll('g').data(data)

    this.prepareScale(data)
   const enterLegendWrapperGs = dataBinds.enter().append<SVGGElement>('g').attr('class', 'legendWrapper')
    const colorFunc = this.colorScale
    const legendPresentType = this.presentType
    const legendScaleBand = this.legendScale
    enterLegendWrapperGs.each(function (d, i) {
     
      const currG = D3Select<SVGGElement, LengendDataType>(this)
      const rectInLegendWidth = 20
      const rectInLegendHeight = 18
if(legendPresentType === LegendPresentTypeEnum.portrait) {
      const currYPortraitMode = 30 * i
      currG.append('rect')
        .attr('width', rectInLegendWidth)
        .attr('height', rectInLegendHeight)
        .attr('x', 0)
        .attr('y', (legendScaleBand as ScaleBand<string>)(d.text))
        .style('fill', () => {
          return colorFunc(i);
        })

      currG.append('text')
        .attr('x', 25)
        .attr('y', (legendScaleBand as ScaleBand<string>)(d.text) + rectInLegendHeight - 4)
        .text(d => d.text)
        .style('text-anchor', 'start')
      }else if (legendPresentType === LegendPresentTypeEnum.landscape) {
        const estimatedTextWidth =  10 * d.text.length
        const rectAndTextBetween = 5
        const gLeftPadding = 5
        const currRectX = (rectInLegendWidth + rectAndTextBetween + estimatedTextWidth + gLeftPadding) * i
        const currTextX = (rectInLegendWidth + rectAndTextBetween) * (i + 1) + (estimatedTextWidth ) * i
        currG.append('rect')
          .attr('width', rectInLegendWidth)
          .attr('height', rectInLegendHeight)
          .attr('x', currRectX)
          .attr('y', 3)
          .style('fill', () => {
            return colorFunc(i);
          })
  
        currG.append('text')
          .attr('x', currTextX)
          .attr('y',  rectInLegendHeight)
          .text(d => d.text)
          .style('text-anchor', 'start')

      }

    })
  

  }

}
