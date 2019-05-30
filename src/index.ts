import { BarCharts } from './parts/barcharts'
import { LineCharts } from './parts/linecharts'
import { PieCharts } from './parts/piecharts'
import { ToolTip } from './parts/tooltip'
import { Legend } from './parts/legend'

export default function familiarD3Scenario() {
  return {
    ToolTip,
    Legend,
    BarChart: BarCharts,
    LineChart: LineCharts,
    PieChart: PieCharts,
  }
}
