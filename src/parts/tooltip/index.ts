import {select as D3Select, Selection, BaseType } from 'd3-selection'



export class ToolTip {

  toolTipDivRef: Selection<BaseType, {}, HTMLElement, any>

  constructor() {
    this.toolTipDivRef =
      D3Select('body')
        .append('div')
        .lower()
        .attr('class', 'bubbleToolTip')
        .style('opacity', 0)
        .style('transform', `translate3d(0px, 0px, 0px)`)
        .style('z-index', 2000000)
  }

  show(contentToShow: string, x: number, y: number) {
    console.log(x, y)
    this.toolTipDivRef
      .style('transform', `translate3d(${x}px, ${y}px, 0px)`)
      .html(contentToShow)
     

    this.toolTipDivRef
      .transition()
      .duration(200)
      .style('opacity', 0.9)
  }


  hide(){
    this.toolTipDivRef
      .transition()
      .duration(200)
      .style('opacity', 0)
  }
}