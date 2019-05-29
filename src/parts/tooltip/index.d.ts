import { Selection, BaseType } from 'd3-selection';
export declare class ToolTip {
    toolTipDivRef: Selection<BaseType, {}, HTMLElement, any>;
    lastX: number;
    lastY: number;
    constructor();
    show(contentToShow: string, newX: number, newY: number): void;
    hide(): void;
}
