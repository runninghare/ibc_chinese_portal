import * as wjcChart from 'wijmo/wijmo.chart';
import * as wjcCore from 'wijmo/wijmo';
export declare enum AnnotationAttachment {
    DataIndex = 0,
    DataCoordinate = 1,
    Relative = 2,
    Absolute = 3,
}
export declare enum AnnotationPosition {
    Center = 0,
    Top = 1,
    Bottom = 2,
    Left = 4,
    Right = 8,
}
export declare class AnnotationBase {
    static _DATA_KEY: string;
    static _CSS_ANNOTATION: string;
    static _CSS_ANNO_TEXT: string;
    static _CSS_ANNO_SHAPE: string;
    private _attachment;
    private _point;
    private _seriesIndex;
    private _pointIndex;
    private _position;
    private _offset;
    private _style;
    private _isVisible;
    private _tooltip;
    private _name;
    _element: SVGElement;
    _layer: AnnotationLayer;
    constructor(options?: any);
    attachment: AnnotationAttachment;
    point: wjcChart.DataPoint;
    seriesIndex: number;
    pointIndex: number;
    position: AnnotationPosition;
    offset: wjcCore.Point;
    style: any;
    isVisible: boolean;
    tooltip: string;
    name: string;
    render(engine: wjcChart.IRenderEngine): void;
    destroy(): void;
    _copy(dst: any, src: any): void;
    _processOptions(key: any, dst: any, src: any): void;
    _resetDefaultValue(): void;
    _toggleVisibility(visible: boolean): void;
    _getCSSClass(): string;
    _render(engine: wjcChart.IRenderEngine): void;
    _repaint(): void;
    _convertPoint(pt?: wjcChart.DataPoint): wjcCore.Point;
    _convertDataToLen(total: number, axis: wjcChart.Axis, val: any, converted?: boolean): number;
    _renderCenteredText(content: string, engine: wjcChart.IRenderEngine, point: wjcCore.Point, className?: string, angle?: number, style?: any): void;
    _adjustOffset(pt: wjcCore.Point, offset: wjcCore.Point): void;
    _getOffset(engine?: wjcChart.IRenderEngine): wjcCore.Point;
    _getPositionOffset(engine?: wjcChart.IRenderEngine): wjcCore.Point;
    _getSize(engine?: wjcChart.IRenderEngine): wjcCore.Size;
    _isValidPoint(pt: wjcCore.Point): boolean;
    _measureString(engine: wjcChart.IRenderEngine, text: string, className: string): wjcCore.Size;
}
export declare class Text extends AnnotationBase {
    static _CSS_TEXT: string;
    private _text;
    constructor(options?: any);
    _resetDefaultValue(): void;
    _getCSSClass(): string;
    text: string;
    _render(engine: wjcChart.IRenderEngine): void;
    _getSize(engine?: wjcChart.IRenderEngine): wjcCore.Size;
}
export declare class Shape extends AnnotationBase {
    static _CSS_SHAPE: string;
    private _content;
    _shapeContainer: SVGGElement;
    constructor(options?: any);
    _resetDefaultValue(): void;
    _getCSSClass(): string;
    content: string;
    _render(engine: wjcChart.IRenderEngine): void;
    _getContentCenter(): wjcChart.DataPoint;
    _renderShape(engine: wjcChart.IRenderEngine): void;
    _renderText(engine: wjcChart.IRenderEngine): void;
}
export declare class Ellipse extends Shape {
    static _CSS_ELLIPSE: string;
    private _width;
    private _height;
    constructor(options?: any);
    width: number;
    height: number;
    _resetDefaultValue(): void;
    _getCSSClass(): string;
    _renderShape(engine: wjcChart.IRenderEngine): void;
    _getSize(): wjcCore.Size;
}
export declare class Rectangle extends Shape {
    static _CSS_RECTANGLE: string;
    private _width;
    private _height;
    constructor(options?: any);
    width: number;
    height: number;
    _resetDefaultValue(): void;
    _getCSSClass(): string;
    _renderShape(engine: wjcChart.IRenderEngine): void;
    _getSize(): wjcCore.Size;
}
export declare class Line extends Shape {
    static _CSS_LINE: string;
    private _start;
    private _end;
    private _cS;
    private _cE;
    constructor(options?: any);
    start: wjcChart.DataPoint;
    end: wjcChart.DataPoint;
    _resetDefaultValue(): void;
    _getCSSClass(): string;
    _getContentCenter(): wjcChart.DataPoint;
    _renderShape(engine: wjcChart.IRenderEngine): void;
    _getSize(): wjcCore.Size;
    _renderText(engine: wjcChart.IRenderEngine): void;
    _renderCenteredText(content: string, engine: wjcChart.IRenderEngine, point: wjcCore.Point, className?: string, angle?: number, style?: any): void;
}
export declare class Polygon extends Shape {
    static _CSS_POLYGON: string;
    private _points;
    constructor(options?: any);
    _processOptions(key: any, dst: any, src: any): void;
    readonly points: wjcCore.ObservableArray;
    _resetDefaultValue(): void;
    _getCSSClass(): string;
    _getContentCenter(): wjcChart.DataPoint;
    _renderShape(engine: wjcChart.IRenderEngine): void;
    _getSize(): wjcCore.Size;
}
export declare class Circle extends Shape {
    static _CSS_CIRCLE: string;
    private _radius;
    constructor(options?: any);
    radius: number;
    _resetDefaultValue(): void;
    _getCSSClass(): string;
    _renderShape(engine: wjcChart.IRenderEngine): void;
    _getSize(): wjcCore.Size;
}
export declare class Square extends Shape {
    static _CSS_SQUARE: string;
    private _length;
    constructor(options?: any);
    length: number;
    _resetDefaultValue(): void;
    _getCSSClass(): string;
    _renderShape(engine: wjcChart.IRenderEngine): void;
    _getSize(): wjcCore.Size;
}
export declare class Image extends Shape {
    static _CSS_IMAGE: string;
    private _width;
    private _height;
    private _href;
    constructor(options?: any);
    width: number;
    height: number;
    href: string;
    _resetDefaultValue(): void;
    _getCSSClass(): string;
    _renderShape(engine: wjcChart.IRenderEngine): void;
    _getSize(): wjcCore.Size;
    private _applyStyle(el, style);
    private _deCase(s);
}
export declare class AnnotationLayer {
    static _CSS_Layer: string;
    private _items;
    private _engine;
    _layerEle: SVGGElement;
    private _plotrectId;
    private _tooltip;
    private _forceTTShowing;
    private _annoTTShowing;
    _chart: wjcChart.FlexChartCore;
    constructor(chart: wjcChart.FlexChartCore, options?: any);
    _init(chart: wjcChart.FlexChartCore): void;
    private _lostFocus(evt);
    readonly items: wjcCore.ObservableArray;
    getItem(name: string): AnnotationBase;
    getItems(name: string): Array<AnnotationBase>;
    private _bindTooltip();
    _showTooltip(): boolean;
    private _toggleTooltip(tooltip, evt, parentNode);
    _getAnnotation(ele: any, parentNode: any): AnnotationBase;
    private _getAnnotationElement(ele, pNode);
    private _itemsChanged(items, e);
    private _renderAnnotations();
    _renderGroup(): void;
    _renderAnnotation(item: AnnotationBase): void;
    private _destroyAnnotations();
    private _destroyAnnotation(item);
}
