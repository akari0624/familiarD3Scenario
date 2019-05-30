import { Selection } from 'd3-selection';
import { ScaleOrdinal } from 'd3-scale';
import { LengendDataType } from '../../types';
export declare class Legend {
    svgDomRef: HTMLOrSVGElement;
    svgWidth: number;
    svgHeight: number;
    d3ishSVG: Selection<SVGGElement, any, HTMLElement, any>;
    colorScale: ScaleOrdinal<number, string>;
    constructor(svgDom: HTMLOrSVGElement);
    setColorRange(colorArr: string[]): void;
    initD3ishSVG(): void;
    draw(data: LengendDataType[]): void;
}
