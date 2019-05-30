import { BarCharts } from './parts/barcharts';
import { LineCharts } from './parts/linecharts';
import { PieCharts } from './parts/piecharts';
import { ToolTip } from './parts/tooltip';
import { Legend } from './parts/legend';
export default function familiarD3Scenario(): {
    ToolTip: typeof ToolTip;
    Legend: typeof Legend;
    BarChart: typeof BarCharts;
    LineChart: typeof LineCharts;
    PieChart: typeof PieCharts;
};
