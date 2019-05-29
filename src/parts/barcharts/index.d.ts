import { Selection, BaseType } from 'd3-selection';
import { ScaleBand, ScaleOrdinal, ScaleLinear } from 'd3-scale';
import { marginInPX, BarChartDataType, BarCategoryDataType } from '../../types';
/**
 * BarChart 柱狀圖的class
 */
export declare class BarCharts {
    svgDom: HTMLOrSVGElement;
    d3ishSVG: Selection<SVGGElement, any, HTMLElement, any>;
    data: BarChartDataType[];
    margin: marginInPX;
    svgWidth: number;
    svgHeight: number;
    xScaleBandG: ScaleBand<string>;
    xScaleBandRect: ScaleBand<string>;
    yScaleLinear: ScaleLinear<number, number>;
    yMaxScaleLinear: ScaleLinear<number, number>;
    tColors: ScaleOrdinal<string, string>;
    dataBinds: Selection<BaseType, BarChartDataType, SVGGElement, any>;
    newEnterGsThatWrapTheRects: Selection<BaseType, BarChartDataType, SVGGElement, any>;
    theNewEnterBarsRects: Selection<BaseType, BarCategoryDataType, BaseType, BarChartDataType>;
    isFirstDraw: boolean;
    onRectClick: (data: BarCategoryDataType) => void;
    categoryLength: number;
    leftYAxisText: string;
    colorRangeArr: string[];
    onRectMouseOver: (data: BarCategoryDataType, pageX: number, pageY: number) => void;
    onRectMouseOut: () => void;
    /**
     *
     * @param {HTMLOrSVGElement} svgDom svg的dom
     */
    constructor(svgDom: HTMLOrSVGElement);
    initD3ishSVG(): void;
    getTheD3ishSVG(): Selection<SVGGElement, any, HTMLElement, any>;
    setMargins(pMargins: marginInPX): void;
    /**
     *
     * @param {string} t - 要顯示在左XAxis上的字
     */
    setLeftYAxisText(t: string): void;
    /**
     *
     * @param {string[]} hexColorStrArr 要使用的顏色，必須是hex16進制格式 #開頭
     */
    setColorRangeArr(hexColorStrArr: string[]): void;
    _prepareAxisAndScale: () => void;
    bindDataToG(): void;
    enter_drawNewGsThatToWrapTheRect(): void;
    setOnRectClick(onClickFromUser: (data: BarCategoryDataType) => void): void;
    setOnRectMouseOver(onMouseOverFromUser: (data: BarCategoryDataType, mouseX: number, mouseY: number) => void): void;
    setOnRectMouseOut(onMouseOutFromUser: () => void): void;
    drawNewEnterRectInTheGs: () => void;
    setRectTransition: () => void;
    update_updateExistedBar: () => void;
    exit_removeNoDataCorrespondedBar: () => void;
    draw: (data: BarChartDataType[]) => void;
    onSVGDestroy: () => void;
}
