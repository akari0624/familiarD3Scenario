import { BarCharts } from './parts/barcharts';
import { LineCharts } from './parts/linecharts';
import { PieCharts } from './parts/piecharts';
export default function familiarD3Scenario(): {
    BarChart: typeof BarCharts;
    LineChart: typeof LineCharts;
    PieChart: typeof PieCharts;
};
