import { marginInPX } from '../../types'

export class BarCharts<T>{

   svgDom: HTMLOrSVGElement 
   data: T
   margin: marginInPX = { top: 20, right: 40, bottom: 60, left: 40 }
 
   constructor(svgDom: HTMLOrSVGElement, data: T){
     this.svgDom = svgDom
     this.data = data
   }

   setMargins(pMargins: marginInPX){
     this.margin = pMargins
   }

   draw(){

   }

}