export interface marginInPX {
  top: number,
  bottom: number,
  left: number,
  right: number,
}

export interface LinePointDataType {
  date: string,
  value: number,
}

export interface LineDataType {
  name: string
  datas: LinePointDataType[]
}

export interface BarCategoryDataType {
  date: string,
  name: string,
  value: number,
}

export interface BarChartDataType {
  
  date: string,
  categories: BarCategoryDataType[],
}

export interface ArcInPieDataType {
  name: string,
  value: number,
}

export enum LengendIconEnum {
  bar = 'bar',
  line = 'line',
}

export enum LegendPresentTypeEnum {
  portrait = 'portrait',
  landscape = 'landscape',
}

export interface LengendDataType {
  text: string
  hexColorStr: string
  iconType: LengendIconEnum
}