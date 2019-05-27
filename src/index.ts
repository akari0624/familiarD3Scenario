import { BarCharts } from './parts/barcharts'
import { LineCharts } from './parts/linecharts'
import { PieCharts } from './parts/piecharts'
import { BarChartDataType } from './types'

export default function familiarD3Scenario() {
  return {
    BarChart: BarCharts,
    LineChart: LineCharts,
    PieChart: PieCharts
  }
}
