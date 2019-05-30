import { select as D3Select, Selection, BaseType } from 'd3-selection'
import { scaleOrdinal, ScaleOrdinal, scaleBand, ScaleBand, scaleLinear, ScaleLinear } from 'd3-scale'
import { sum, min } from 'd3-array'
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

  rectInLegendWidth = 20
  rectInLegendHeight = 18
  rectAndTextBetween = 5
  gLeftPadding = 10

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

      const {length: dLen} = data
      const {rectInLegendWidth, rectAndTextBetween, gLeftPadding, svgWidth} = this
      const toDedutct = rectInLegendWidth * dLen + rectAndTextBetween * dLen + gLeftPadding * (dLen - 1)

      const allTextLength = data.map(d => d.text.length)
      this.legendScale = scaleLinear()
      .range([0, svgWidth - toDedutct])
      .domain([0, sum(allTextLength)])
      
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
    const {rectInLegendWidth, rectInLegendHeight} = this
    const { rectAndTextBetween, gLeftPadding } = this
    enterLegendWrapperGs.each(function (d, i) {
     
      const currG = D3Select<SVGGElement, LengendDataType>(this)
      
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
        const estimatedTextWidth =  i === 0 ? 0 : (legendScaleBand as ScaleLinear<number, number>)(sum(data.slice(0, i).map(d => d.text.length)))
        
        const currRectX = (rectInLegendWidth + rectAndTextBetween +  gLeftPadding) * i + estimatedTextWidth
        const currTextX = (rectInLegendWidth + rectAndTextBetween) * (i + 1) + (gLeftPadding * i) + estimatedTextWidth
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
