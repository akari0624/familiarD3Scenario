import {select as D3Select, Selection, BaseType } from 'd3-selection'
import { interpolateString } from 'd3-interpolate'

const getStyleTween = (lastX: number, lastY: number, newX: number, newY: number) => () => {
  const startingTranslateState = `translate3d(${lastX}px, ${lastY}px, 100px)`
  const endTranslateState = `translate3d(${newX}px, ${newY}px, 100px)`
//  console.log(lastX, lastY, newX, newY)
  const i = interpolateString(endTranslateState, startingTranslateState)
  return (t: any) => {
    const r = i(t)
    return r
  }
}

export class ToolTip {

  private toolTipDivRef: Selection<BaseType, {}, HTMLElement, any>
  private lastX: number
  private lastY: number

  constructor() {
    this.toolTipDivRef =
      D3Select('body')
        .append('div')
        .lower()
        .attr('class', 'bubbleToolTip')
        .style('width', '50px')
        .style('height', '70px')
        .style('background-color', '#f2e029')
        .style('color', '#022a61')
        .style('font', '12px sans-serif')
        .style('border-radius', '8px')
        .style('text-align', 'center')
        .style('position', 'absolute')
        .style('padding', '2px')
        .style('opacity', 0)
        .style('transform', `translate3d(0px, 0px, 100px)`)
        .style('z-index', 2000000)
        .style('transition-duration', '.5s')  //不是svg圖形的話 transition duration 就從css處理，不要用d3函式處理

    this.lastX = 0
    this.lastY = 0
  }

  show(contentToShow: string, newX: number, newY: number) {

    this.toolTipDivRef
      .html(contentToShow)
      .style('transform', `translate3d(${newX}px, ${newY}px, 100px)`)

    this.toolTipDivRef
      .style('opacity', 0.9)

    this.lastX = newX
    this.lastY = newY
  }


  hide(){
    this.toolTipDivRef
      .style('opacity', 0)
  }
}