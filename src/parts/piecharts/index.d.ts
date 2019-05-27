import { Selection, BaseType } from 'd3-selection';
import { Arc, Pie, PieArcDatum } from 'd3-shape';
import { ArcInPieDataType } from '../../types';
export declare class PieCharts {
    svgDom: HTMLOrSVGElement;
    d3ishSVG: Selection<SVGGElement, any, HTMLElement, any>;
    data: ArcInPieDataType[];
    svgWidth: number;
    svgHeight: number;
    pieRadius: number;
    pieInnerRadius: number;
    arcFunc: Arc<BaseType, PieArcDatum<ArcInPieDataType>>;
    pieLayout: Pie<any, ArcInPieDataType>;
    theWholeWrapperG: Selection<BaseType, any, HTMLElement, any>;
    dataBinds: Selection<BaseType, PieArcDatum<ArcInPieDataType>, BaseType, any>;
    newEnterGs: Selection<BaseType, PieArcDatum<ArcInPieDataType>, BaseType, any>;
    arcTweenFunc: (b: any) => (t: any) => string;
    isFirstBind: boolean;
    constructor(svgDom: HTMLOrSVGElement);
    initD3ishSVG(): void;
    setD3ishSVGFromOtherChart(d3ishSvgFromOtherChart: Selection<SVGGElement, any, HTMLElement, any>): void;
    initNeededFunc(): void;
    appendOutWrapperGAndSetTheStartDrawCenter(): void;
    startToBindBeforeEnter(): void;
    doEnter(): void;
    doUpdate(): void;
    doExitRemove(): void;
    draw(data: ArcInPieDataType[]): void;
}
