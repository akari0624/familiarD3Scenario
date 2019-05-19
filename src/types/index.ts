export interface marginInPX {
  top: number,
  bottom: number,
  left: number,
  right: number,
}

export interface LinePointDataType {
  date: string,
  name: string,
  value: number,
}

export interface BarCategoryDataType {
  name: string,
  value: number,
}

export interface BarChartDataType {
  
  date: string,
  categories: BarCategoryDataType[],
}