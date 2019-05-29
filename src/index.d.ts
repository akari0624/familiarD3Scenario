import { BarCharts } from './parts/barcharts';
import { LineCharts } from './parts/linecharts';
import { PieCharts } from './parts/piecharts';
import { ToolTip } from './parts/tooltip';
export default function familiarD3Scenario(): {
    ToolTip: typeof ToolTip;
    BarChart: typeof BarCharts;
    LineChart: typeof LineCharts;
    PieChart: typeof PieCharts;
};
