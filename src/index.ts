import { BarCharts } from './parts/barcharts'
import { LineCharts } from './parts/linecharts'
import { PieCharts } from './parts/piecharts'
import { ToolTip } from './parts/tooltip'

export default function familiarD3Scenario() {
  return {
    ToolTip,
    BarChart: BarCharts,
    LineChart: LineCharts,
    PieChart: PieCharts,
  }
}
