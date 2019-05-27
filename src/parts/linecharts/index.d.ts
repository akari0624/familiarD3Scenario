import { Selection, BaseType } from 'd3-selection';
import { ScaleBand, ScaleOrdinal, ScaleLinear } from 'd3-scale';
import { Line } from 'd3-shape';
import { Axis } from 'd3-axis';
import { LinePointDataType, LineDataType, marginInPX } from '../../types';
export declare class LineCharts {
    svgDom: HTMLOrSVGElement;
    d3ishSVG: Selection<SVGGElement, any, HTMLElement, any>;
    svgWidth: number;
    svgHeight: number;
    data: LineDataType[];
    xScaleBand: ScaleBand<string>;
    yMaxScaleLinear: ScaleLinear<number, number>;
    yRightAxis: Axis<number | {
        valueOf(): number;
    }>;
    margin: marginInPX;
    lineFunc: Line<[LinePointDataType, LinePointDataType]>;
    lineColors: ScaleOrdinal<string, string>;
    dataBinds: Selection<BaseType, LineDataType, SVGGElement, LinePointDataType[]>;
    isFirstDraw: boolean;
    constructor(svgDom: HTMLOrSVGElement);
    initD3ishSVG(): void;
    setD3ishSVGFromOtherChart(d3ishSvgFromOtherChart: Selection<SVGGElement, any, HTMLElement, any>): void;
    prepareLineralAndAxis(): void;
    prepareLineColors: () => void;
    doDataBind: () => void;
    drawTheLine: (lineColors: ScaleOrdinal<string, string>) => void;
    update_line: (lineColors: ScaleOrdinal<string, string>) => void;
    remove_line: () => void;
    draw(data: LineDataType[]): void;
}
