import { Selection } from 'd3-selection';
import { ScaleOrdinal, ScaleBand, ScaleLinear } from 'd3-scale';
import { LengendDataType, LegendPresentTypeEnum } from '../../types';
export declare class Legend {
    svgDomRef: HTMLOrSVGElement;
    svgWidth: number;
    svgHeight: number;
    d3ishSVG: Selection<SVGGElement, any, HTMLElement, any>;
    colorScale: ScaleOrdinal<number, string>;
    presentType: LegendPresentTypeEnum;
    legendScale: ScaleBand<string> | ScaleLinear<number, number>;
    rectInLegendWidth: number;
    rectInLegendHeight: number;
    rectAndTextBetween: number;
    gLeftPadding: number;
    constructor(svgDom: HTMLOrSVGElement);
    setColorRange(colorArr: string[]): void;
    initD3ishSVG(): void;
    portraitOrLandscape(): void;
    prepareScale(data: LengendDataType[]): void;
    draw(data: LengendDataType[]): void;
}
