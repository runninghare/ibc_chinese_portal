import * as wjcCore from 'wijmo/wijmo';
import * as wjcSelf from 'wijmo/wijmo.chart';
export declare class DataPoint {
    x: any;
    y: any;
    constructor(x?: any, y?: any);
}
export declare class RenderEventArgs extends wjcCore.CancelEventArgs {
    _engine: IRenderEngine;
    constructor(engine: IRenderEngine);
    readonly engine: IRenderEngine;
}
export declare class SeriesRenderingEventArgs extends RenderEventArgs {
    _index: number;
    _count: number;
    constructor(engine: IRenderEngine, index: number, count: number);
    readonly index: number;
    readonly count: number;
}
export declare enum ImageFormat {
    Png = 0,
    Jpeg = 1,
    Svg = 2,
}
export declare class FlexChartBase extends wjcCore.Control implements _IPalette {
    static _WIDTH: number;
    static _HEIGHT: number;
    static _SELECTION_THRESHOLD: number;
    _items: any;
    _cv: wjcCore.ICollectionView;
    protected _palette: string[];
    private _selectionMode;
    private _itemFormatter;
    _selectionIndex: number;
    _options: any;
    private _plotMargin;
    _header: string;
    _headerStyle: any;
    _footer: string;
    _footerStyle: any;
    _legend: Legend;
    _defPalette: string[];
    _notifyCurrentChanged: boolean;
    _rectFooter: wjcCore.Rect;
    _rectHeader: wjcCore.Rect;
    _rectChart: wjcCore.Rect;
    _rectLegend: wjcCore.Rect;
    _currentRenderEngine: IRenderEngine;
    _legendHost: SVGGElement;
    private _needBind;
    private _toShow;
    private _toHide;
    _tooltip: ChartTooltip;
    _chartRectId: string;
    itemsSource: any;
    readonly collectionView: wjcCore.ICollectionView;
    palette: string[];
    plotMargin: any;
    legend: Legend;
    header: string;
    footer: string;
    headerStyle: any;
    footerStyle: any;
    selectionMode: SelectionMode;
    itemFormatter: Function;
    rendering: wjcCore.Event;
    rendered: wjcCore.Event;
    onRendered(e: RenderEventArgs): void;
    onRendering(e: RenderEventArgs): void;
    saveImageToFile(filename: string): void;
    saveImageToDataUrl(format: ImageFormat, done: Function): void;
    _exportToImage(extension: any, processDataURI: any): void;
    refresh(fullUpdate?: boolean): void;
    selectionChanged: wjcCore.Event;
    onSelectionChanged(e?: wjcCore.EventArgs): void;
    onLostFocus(e?: wjcCore.EventArgs): void;
    private _cvCollectionChanged(sender, e);
    private _cvCurrentChanged(sender, e);
    _getColor(index: number): string;
    _getColorLight(index: number): string;
    _getLightColor(color: string): string;
    _bindChart(): void;
    _clearCachedValues(): void;
    _render(engine: IRenderEngine, applyElement?: boolean): void;
    _renderHeader(engine: IRenderEngine, rect: wjcCore.Rect): void;
    _renderFooter(engine: IRenderEngine, rect: wjcCore.Rect): void;
    _renderLegends(engine: IRenderEngine, rect: wjcCore.Rect): void;
    _prepareRender(): void;
    _renderChart(engine: IRenderEngine, rect: wjcCore.Rect, applyElement: boolean): void;
    _performBind(): void;
    _getDesiredLegendSize(engine: IRenderEngine, isVertical: boolean, width: number, height: number): wjcCore.Size;
    _renderLegend(engine: IRenderEngine, pt: wjcCore.Point, areas: any[], isVertical: boolean, width: number, height: number): void;
    _getHitTestItem(index: number): any;
    _getHitTestValue(index: number): any;
    _getHitTestLabel(index: number): any;
    _refreshChart(): void;
    _drawTitle(engine: IRenderEngine, rect: wjcCore.Rect, title: string, style: any, isFooter: boolean): wjcCore.Rect;
    pageToControl(pt: any, y?: number): wjcCore.Point;
    _toControl(pt: any, y?: number): wjcCore.Point;
    _highlightItems(items: any, cls: any, selected: boolean): void;
    _parseMargin(value: any): any;
    _showToolTip(content: any, rect: any): void;
    _hideToolTip(): void;
    private _clearTimeouts();
    _getHostOffset(): wjcCore.Point;
    _getHostSize(): wjcCore.Size;
    _getHostComputedStyle(): CSSStyleDeclaration;
    _find(elem: SVGElement, names: string[]): any[];
}
export interface _IHitArea {
    contains(pt: wjcCore.Point): boolean;
    distance(pt: wjcCore.Point): number;
    tag: any;
}
export declare class _KeyWords {
    private _keys;
    constructor();
    replace(s: string, ht: HitTestInfo): string;
    getValue(key: string, ht: HitTestInfo, fmt?: string): string;
}
export declare class FlexPie extends FlexChartBase {
    private static _MARGIN;
    private _binding;
    private _bindingName;
    _areas: any[];
    private _keywords;
    private _startAngle;
    private _innerRadius;
    private _offset;
    private _reversed;
    private _isAnimated;
    private _selectedItemPosition;
    private _selectedItemOffset;
    private _pieGroup;
    private _rotationAngle;
    private _center;
    private _radius;
    private _selectedOffset;
    private _selectedIndex;
    private _angles;
    private _selectionAnimationID;
    private _colRowLens;
    private _lbl;
    _values: number[];
    _labels: string[];
    _pels: any[];
    _sum: number;
    constructor(element: any, options?: any);
    binding: string;
    bindingName: string;
    startAngle: number;
    offset: number;
    innerRadius: number;
    reversed: boolean;
    selectedItemPosition: Position;
    selectedItemOffset: number;
    isAnimated: boolean;
    readonly tooltip: ChartTooltip;
    dataLabel: PieDataLabel;
    selectedIndex: number;
    _getLabelsForLegend(): string[];
    hitTest(pt: any, y?: number): HitTestInfo;
    _performBind(): void;
    _initData(): void;
    _getBindData(item: any, values: any, labels: any, binding: any, bindingName: any): number;
    _render(engine: IRenderEngine, applyElement?: boolean): void;
    _prepareRender(): void;
    _renderChart(engine: IRenderEngine, rect: wjcCore.Rect, applyElement: boolean): void;
    _getDesiredLegendSize(engine: IRenderEngine, isVertical: boolean, width: number, height: number): wjcCore.Size;
    _renderLegend(engine: IRenderEngine, pos: wjcCore.Point, areas: any[], isVertical: boolean, width: number, height: number): void;
    _renderData(engine: IRenderEngine, rect: wjcCore.Rect, g: any): void;
    _renderPie(engine: any, radius: any, innerRadius: any, startAngle: any, offset: any): void;
    _getCenter(): wjcCore.Point;
    _renderSlices(engine: any, values: any, sum: any, radius: any, innerRadius: any, startAngle: any, totalSweep: any, offset: any): void;
    _renderSlice(engine: any, cx: any, cy: any, currentAngle: any, idx: any, radius: any, innerRadius: any, startAngle: any, sweep: any, totalSweep: any): void;
    _renderLabels(engine: IRenderEngine): void;
    _drawSlice(engine: IRenderEngine, i: number, reversed: boolean, cx: number, cy: number, r: number, irad: number, angle: number, sweep: number): void;
    _measureLegendItem(engine: IRenderEngine, name: string): wjcCore.Size;
    _drawLegendItem(engine: IRenderEngine, rect: wjcCore.Rect, i: number, name: string): void;
    private _getLabelContent(ht, content);
    private _select(pointIndex, animate?);
    _highlightCurrent(): void;
    _highlight(selected: boolean, pointIndex: number, animate?: boolean): void;
    _animateSelectionAngle(target: number, duration: number): void;
    _getHitTestItem(index: number): any;
    _getHitTestValue(index: number): number;
    _getHitTestLabel(index: number): string;
}
export interface _ISegment {
    center: wjcCore.Point;
    radius: number;
    langle: number;
    angle: number;
    sweep: number;
}
export declare class _PieSegment implements _IHitArea, _ISegment {
    private _center;
    private _angle;
    private _sweep;
    private _radius;
    private _radius2;
    private _isFull;
    private _originAngle;
    private _originSweep;
    private _startAngle;
    constructor(center: wjcCore.Point, radius: number, angle: number, sweep: number, startAngle?: number);
    contains(pt: wjcCore.Point): boolean;
    distance(pt: wjcCore.Point): number;
    readonly center: wjcCore.Point;
    readonly radius: number;
    readonly langle: number;
    readonly angle: number;
    readonly sweep: number;
    tag: any;
}
export declare class _DonutSegment implements _IHitArea, _ISegment {
    private _center;
    private _angle;
    private _sweep;
    private _originAngle;
    private _originSweep;
    private _radius;
    private _radius2;
    private _iradius;
    private _iradius2;
    private _isFull;
    private _startAngle;
    constructor(center: wjcCore.Point, radius: number, innerRadius: number, angle: number, sweep: number, startAngle?: number);
    contains(pt: wjcCore.Point): boolean;
    distance(pt: wjcCore.Point): number;
    readonly center: wjcCore.Point;
    readonly radius: number;
    readonly langle: number;
    readonly angle: number;
    readonly sweep: number;
    readonly innerRadius: number;
    tag: any;
}
export declare enum Stacking {
    None = 0,
    Stacked = 1,
    Stacked100pc = 2,
}
export declare enum SelectionMode {
    None = 0,
    Series = 1,
    Point = 2,
}
export declare class FlexChartCore extends FlexChartBase {
    static _CSS_AXIS_X: string;
    static _CSS_AXIS_Y: string;
    static _CSS_LINE: string;
    static _CSS_GRIDLINE: string;
    static _CSS_TICK: string;
    static _CSS_GRIDLINE_MINOR: string;
    static _CSS_TICK_MINOR: string;
    static _CSS_LABEL: string;
    static _CSS_LEGEND: string;
    static _CSS_HEADER: string;
    static _CSS_FOOTER: string;
    static _CSS_TITLE: string;
    static _CSS_SELECTION: string;
    static _CSS_PLOT_AREA: string;
    static _FG: string;
    private _series;
    private _axes;
    private _pareas;
    private _axisX;
    private _axisY;
    private _selection;
    private _interpolateNulls;
    private _legendToggle;
    private _symbolSize;
    private _dataInfo;
    _plotRect: wjcCore.Rect;
    private __barPlotter;
    private __linePlotter;
    private __areaPlotter;
    private __bubblePlotter;
    private __financePlotter;
    private __funnelPlotter;
    private _plotters;
    private _binding;
    private _bindingX;
    _rotated: boolean;
    _stacking: wjcSelf.Stacking;
    private _lbl;
    _xlabels: string[];
    _xvals: number[];
    _xDataType: wjcCore.DataType;
    private _hitTester;
    private _lblAreas;
    private _keywords;
    private _curPlotter;
    private _colRowLens;
    _bindingSeparator: string;
    constructor(element: any, options?: any);
    _initAxes(): void;
    readonly series: wjcCore.ObservableArray;
    readonly axes: wjcCore.ObservableArray;
    axisX: Axis;
    axisY: Axis;
    readonly plotAreas: PlotAreaCollection;
    binding: string;
    bindingX: string;
    symbolSize: number;
    interpolateNulls: boolean;
    legendToggle: boolean;
    readonly tooltip: ChartTooltip;
    dataLabel: DataLabel;
    selection: SeriesBase;
    seriesVisibilityChanged: wjcCore.Event;
    onSeriesVisibilityChanged(e: SeriesEventArgs): void;
    hitTest(pt: any, y?: number): HitTestInfo;
    pointToData(pt: any, y?: number): wjcCore.Point;
    dataToPoint(pt: any, y?: number): wjcCore.Point;
    _copy(key: string, value: any): boolean;
    _createSeries(): SeriesBase;
    _clearCachedValues(): void;
    _performBind(): void;
    _hitTestSeries(pt: wjcCore.Point, seriesIndex: number): HitTestInfo;
    _hitTestData(pt: any): HitTestInfo;
    _hitTestLabels(pt: wjcCore.Point): _IHitArea;
    private static _dist2(p1, p2);
    static _dist(p0: wjcCore.Point, p1: wjcCore.Point, p2: wjcCore.Point): number;
    static _distToSegmentSquared(p: wjcCore.Point, v: wjcCore.Point, w: wjcCore.Point): number;
    _isRotated(): boolean;
    _plotrectId: string;
    _getChartType(): ChartType;
    _prepareRender(): void;
    _renderChart(engine: IRenderEngine, rect: wjcCore.Rect, applyElement: boolean): void;
    _getDesiredLegendSize(engine: IRenderEngine, isVertical: boolean, width: number, height: number): wjcCore.Size;
    _renderLegend(engine: IRenderEngine, pos: wjcCore.Point, areas: any[], isVertical: boolean, width: number, height: number): void;
    private _renderLegendElements(engine, series, pos, p, areas, isVertical, width, height, colRowLen);
    private _renderLabels(engine);
    private _getAxes();
    private _clearPlotters();
    _initPlotter(plotter: _IPlotter): void;
    private readonly _barPlotter;
    private readonly _linePlotter;
    private readonly _areaPlotter;
    private readonly _bubblePlotter;
    private readonly _financePlotter;
    private readonly _funnelPlotter;
    _getPlotter(series: SeriesBase): _IPlotter;
    _layout(rect: wjcCore.Rect, size: wjcCore.Size, engine: IRenderEngine): void;
    private _layoutSingle(rect, size, engine);
    private _layoutMultiple(rect, size, engine);
    private _convertX(x, left, right);
    private _convertY(y, top, bottom);
    _getLabelContent(ht: HitTestInfo, content: any): string;
    private _select(newSelection, pointIndex);
    private _highlightCurrent();
    private _highlight(series, selected, pointIndex);
    _updateAuxAxes(axes: Axis[], isRotated: boolean): void;
    static _contains(rect: wjcCore.Rect, pt: wjcCore.Point): boolean;
    static _intersects(rect1: wjcCore.Rect, rect2: wjcCore.Rect): boolean;
    static _epoch: number;
    static _msPerDay: number;
    static _toOADate(date: Date): number;
    static _fromOADate(val: number): Date;
    static _renderText(engine: IRenderEngine, text: string, pos: wjcCore.Point, halign: any, valign: any, className?: string, groupName?: string, style?: any, test?: any): wjcCore.Rect;
    static _renderRotatedText(engine: IRenderEngine, text: string, pos: wjcCore.Point, halign: any, valign: any, center: wjcCore.Point, angle: number, className: string, groupClassName?: string, style?: any): void;
}
export declare class _DataInfo {
    private minY;
    private maxY;
    private minX;
    private maxX;
    private minXp;
    private minYp;
    private dataTypeX;
    private dataTypeY;
    private stackAbs;
    private _xvals;
    private dx;
    constructor();
    analyse(seriesList: any, isRotated: boolean, stacking: Stacking, xvals: Array<number>, logx: boolean, logy: boolean): void;
    _parseYVal(val: any, xval: any, custom: any, stackAbs: any, stackPos: any, stackNeg: any): void;
    getMinY(): number;
    getMaxY(): number;
    getMinX(): number;
    getMaxX(): number;
    getMinXp(): number;
    getMinYp(): number;
    getDeltaX(): number;
    getDataTypeX(): wjcCore.DataType;
    getDataTypeY(): wjcCore.DataType;
    getStackedAbsSum(key: number): number;
    getXVals(): Array<number>;
    static isValid(value: number): boolean;
}
export interface _IPalette {
    _getColor(i: number): string;
    _getColorLight(i: number): string;
}
export declare class ChartTooltip extends wjcCore.Tooltip {
    private _content;
    private _threshold;
    constructor();
    content: any;
    threshold: number;
}
export declare enum ChartType {
    Column = 0,
    Bar = 1,
    Scatter = 2,
    Line = 3,
    LineSymbols = 4,
    Area = 5,
    Bubble = 6,
    Candlestick = 7,
    HighLowOpenClose = 8,
    Spline = 9,
    SplineSymbols = 10,
    SplineArea = 11,
    Funnel = 12,
}
export declare class FlexChart extends FlexChartCore {
    private _chartType;
    constructor(element: any, options?: any);
    _getChartType(): ChartType;
    chartType: ChartType;
    rotated: boolean;
    stacking: Stacking;
    options: any;
}
export declare enum Position {
    None = 0,
    Left = 1,
    Top = 2,
    Right = 3,
    Bottom = 4,
    Auto = 5,
}
export declare enum AxisType {
    X = 0,
    Y = 1,
}
export declare enum OverlappingLabels {
    Auto = 0,
    Show = 1,
}
export interface _IAxis {
    actualMin: number;
    actualMax: number;
    convert(val: number): number;
}
export declare enum TickMark {
    None = 0,
    Outside = 1,
    Inside = 2,
    Cross = 3,
}
export declare class Axis implements _IAxis {
    _GRIDLINE_WIDTH: number;
    _LINE_WIDTH: number;
    _TICK_WIDTH: number;
    _TICK_HEIGHT: number;
    _TICK_OVERLAP: number;
    _TICK_LABEL_DISTANCE: number;
    private static MAX_MAJOR;
    private static MAX_MINOR;
    _chart: FlexChartCore;
    private _type;
    private _min;
    private _max;
    private _position;
    private _majorUnit;
    private _minorUnit;
    private _majorGrid;
    private _minorGrid;
    private _title;
    private _labelStyle;
    private _reversed;
    private _format;
    private _actualMin;
    private _actualMax;
    _axisType: AxisType;
    private _majorTickMarks;
    private _minorTickMarks;
    private _logBase;
    private _labels;
    private _labelAngle;
    private _labelAlign;
    private _axisLine;
    _plotrect: wjcCore.Rect;
    private _szTitle;
    _isTimeAxis: boolean;
    _lbls: string[];
    _values: number[];
    private _rects;
    private _name;
    private _origin;
    private _overlap;
    private _items;
    private _cv;
    private _binding;
    private _ifmt;
    private _tfmt;
    private static _id;
    private __uniqueId;
    private _parea;
    private _labelPadding;
    _axrect: wjcCore.Rect;
    _desiredSize: wjcCore.Size;
    _annoSize: wjcCore.Size;
    _hasOrigin: boolean;
    _hostElement: SVGGElement;
    _vals: any;
    constructor(position?: Position);
    readonly hostElement: SVGGElement;
    readonly actualMin: any;
    readonly actualMax: any;
    min: any;
    max: any;
    reversed: boolean;
    position: Position;
    majorUnit: number;
    minorUnit: number;
    name: string;
    title: string;
    format: string;
    majorGrid: boolean;
    majorTickMarks: TickMark;
    minorGrid: boolean;
    minorTickMarks: TickMark;
    axisLine: boolean;
    labels: boolean;
    labelAlign: string;
    labelAngle: number;
    origin: number;
    overlappingLabels: OverlappingLabels;
    itemsSource: any;
    binding: string;
    itemFormatter: Function;
    logBase: number;
    plotArea: PlotArea;
    labelPadding: number;
    readonly _groupClass: string;
    rangeChanged: wjcCore.Event;
    onRangeChanged(e?: wjcCore.EventArgs): void;
    _getPosition(): Position;
    _isOverlapped(engine: IRenderEngine, w: number, lblClass: string, axisType: AxisType): boolean;
    _actualAngle: number;
    _getHeight(engine: IRenderEngine, maxw: number): number;
    _updateAutoFormat(delta: number): number;
    _updateActualLimitsByChartType(labels: any, min: any, max: any): {
        min: any;
        max: any;
    };
    _updateActualLimits(dataType: wjcCore.DataType, dataMin: number, dataMax: number, labels?: string[], values?: number[]): void;
    _layout(axisRect: wjcCore.Rect, plotRect: wjcCore.Rect): void;
    _hasVisibileSeries(): boolean;
    _render(engine: IRenderEngine): void;
    _renderLineAndTitle(engine: any): void;
    _renderMinor(engine: any, vals: any, isCategory: any): void;
    _renderRotatedText(engine: IRenderEngine, val: any, text: string, pos: wjcCore.Point, halign: any, valign: any, center: wjcCore.Point, angle: number, className: string, groupClassName?: string, style?: any): void;
    _getFormattedItem(engine: IRenderEngine, val: any, text: string, pos: wjcCore.Point, className: string): {
        val: any;
        text: string;
        pos: wjcCore.Point;
        cls: string;
    };
    _renderLabelsAndTicks(engine: any, index: any, val: any, sval: any, labelAngle: any, tickMarks: any, showLabel: any, t1: any, t2: any): boolean;
    _xCross(x: number): boolean;
    _createMinors(engine: IRenderEngine, vals: number[], isVert: boolean, isNear: boolean, isCategory: boolean): void;
    _renderMinors(engine: IRenderEngine, ticks: number[], isVert: boolean, isNear: boolean): void;
    _renderLabel(engine: IRenderEngine, val: number, text: string, pos: wjcCore.Point, ha: any, va: any, className?: string): boolean;
    private _renderRotatedLabel(engine, val, sval, lpt, ha, labelAngle, lblClass, isNear);
    private _getLabelAlign(isVert);
    _customConvert: Function;
    _customConvertBack: Function;
    convert(val: number, maxValue?: number, minValue?: number): number;
    convertBack(val: number): number;
    readonly axisType: AxisType;
    _getMinNum(): number;
    _getMaxNum(): number;
    private _invalidate();
    private _cvCollectionChanged(sender, e);
    private _createLabels(start, len, delta, vals, lbls);
    private _createLogarithmicLabels(min, max, unit, vals, lbls, isLabels);
    _createTimeLabels(start: number, len: number, vals: number[], lbls: string[]): void;
    _formatValue(val: number): string;
    private _calcMajorUnit();
    private _getAnnoNumber(isVert);
    private _nicePrecision(range);
    private _niceTickNumber(x);
    private _niceNumber(x, exp, round);
    readonly _uniqueId: number;
}
export declare class AxisCollection extends wjcCore.ObservableArray {
    getAxis(name: string): Axis;
    indexOf(name: string): number;
}
export declare class PlotArea {
    private _row;
    private _col;
    private _width;
    private _height;
    private _name;
    private _style;
    private _rect;
    _chart: FlexChartCore;
    constructor(options?: any);
    row: number;
    column: number;
    name: string;
    width: any;
    height: any;
    style: any;
    private _invalidate();
    _render(engine: IRenderEngine): void;
    _setPlotX(x: number, w: number): void;
    _setPlotY(y: number, h: number): void;
}
export declare class PlotAreaCollection extends wjcCore.ObservableArray {
    getPlotArea(name: string): PlotArea;
    indexOf(name: string): number;
    _getWidth(column: number): any;
    _getHeight(row: number): any;
    _calculateWidths(width: number, ncols: number): number[];
    _calculateHeights(height: number, nrows: number): number[];
    private _calculateLengths(width, ncols, glens);
}
export declare enum SeriesVisibility {
    Visible = 0,
    Plot = 1,
    Legend = 2,
    Hidden = 3,
}
export declare enum Marker {
    Dot = 0,
    Box = 1,
}
export interface _ISeries {
    style: any;
    symbolStyle: any;
    getValues: (dim: number) => number[];
    getDataType: (dim: number) => wjcCore.DataType;
    drawLegendItem(engine: IRenderEngine, rect: wjcCore.Rect, index: number): any;
    measureLegendItem(engine: IRenderEngine, index: number): wjcCore.Size;
    _setPointIndex(pointIndex: number, elementIndex: number): any;
}
export declare class DataArray {
    dataType: wjcCore.DataType;
    values: Array<number>;
}
export declare class SeriesEventArgs extends wjcCore.EventArgs {
    _series: Series;
    constructor(series: SeriesBase);
    readonly series: SeriesBase;
}
export declare class SeriesBase implements _ISeries {
    static _LEGEND_ITEM_WIDTH: number;
    static _LEGEND_ITEM_HEIGHT: number;
    static _LEGEND_ITEM_MARGIN: number;
    private static _DEFAULT_SYM_SIZE;
    __chart: FlexChartCore;
    private _name;
    private _binding;
    private _showValues;
    private _symbolStyle;
    private _symbolSize;
    private _style;
    private _altStyle;
    _cv: wjcCore.ICollectionView;
    private _itemsSource;
    private _values;
    private _valueDataType;
    _chartType: ChartType;
    private _symbolMarker;
    private _bindingX;
    private _xvalues;
    private _xvalueDataType;
    private _cssClass;
    private _visibility;
    private _axisX;
    private _axisY;
    private __plotter;
    _legendElement: SVGAElement;
    _hostElement: SVGGElement;
    _pointIndexes: number[];
    constructor(options?: any);
    style: any;
    altStyle: any;
    symbolStyle: any;
    symbolSize: number;
    symbolMarker: Marker;
    binding: string;
    bindingX: string;
    name: string;
    itemsSource: any;
    readonly collectionView: wjcCore.ICollectionView;
    readonly chart: FlexChartCore;
    readonly hostElement: SVGGElement;
    readonly legendElement: SVGGElement;
    cssClass: string;
    visibility: SeriesVisibility;
    hitTest(pt: any, y?: number): HitTestInfo;
    getPlotElement(pointIndex: number): any;
    axisX: Axis;
    axisY: Axis;
    initialize(options: any): void;
    pointToData(pt: wjcCore.Point): wjcCore.Point;
    dataToPoint(pt: wjcCore.Point): wjcCore.Point;
    rendering: wjcCore.Event;
    onRendering(engine: IRenderEngine, index: number, count: number): boolean;
    rendered: wjcCore.Event;
    onRendered(engine: IRenderEngine): void;
    _chart: FlexChartCore;
    _getSymbolSize(): number;
    _plotter: _IPlotter;
    getDataType(dim: number): wjcCore.DataType;
    getValues(dim: number): number[];
    drawLegendItem(engine: IRenderEngine, rect: wjcCore.Rect, index: number): void;
    measureLegendItem(engine: IRenderEngine, index: number): wjcCore.Size;
    legendItemLength(): number;
    getDataRect(currentRect?: wjcCore.Rect, calculatedRect?: wjcCore.Rect): wjcCore.Rect;
    _getChartType(): ChartType;
    _clearValues(): void;
    _getBinding(index: number): string;
    _getBindingValues(index: number): number[];
    _getItem(pointIndex: number): any;
    _getLength(): number;
    _setPointIndex(pointIndex: number, elementIndex: number): void;
    private _getDataRect();
    _isCustomAxisX(): boolean;
    _isCustomAxisY(): boolean;
    _getAxisX(): Axis;
    _getAxisY(): Axis;
    _measureLegendItem(engine: IRenderEngine, text: string): wjcCore.Size;
    _drawFunnelLegendItem(engine: IRenderEngine, rect: wjcCore.Rect, index: number, style: any, symbolStyle: any): void;
    private _getFunnelLegendName(index);
    _drawLegendItem(engine: IRenderEngine, rect: wjcCore.Rect, chartType: ChartType, text: string, style: any, symbolStyle: any): void;
    private _cvCollectionChanged(sender, e);
    private _cvCurrentChanged(sender, e);
    _bindValues(items: Array<any>, binding: string, isX?: boolean): DataArray;
    _invalidate(): void;
    _indexToPoint(pointIndex: number): wjcCore.Point;
    _getSymbolFill(seriesIndex?: number): string;
    _getSymbolStroke(seriesIndex?: number): string;
    _getAltSymbolStroke(seriesIndex?: number): string;
    _getAltSymbolFill(seriesIndex?: number): string;
    _renderLabels(engine: IRenderEngine, smap: _IHitArea[], chart: FlexChartCore, lblAreas: _RectArea[]): void;
}
export declare class Series extends SeriesBase {
    chartType: ChartType;
}
export interface IRenderEngine {
    beginRender(): any;
    endRender(): any;
    setViewportSize(w: number, h: number): any;
    element: Element;
    fill: string;
    stroke: string;
    strokeWidth: number;
    textFill: string;
    fontSize: string;
    fontFamily: string;
    drawEllipse(cx: number, cy: number, rx: number, ry: number, className?: string, style?: any): any;
    drawRect(x: number, y: number, w: number, h: number, className?: string, style?: any, clipPath?: string): any;
    drawLine(x1: number, y1: number, x2: number, y2: number, className?: string, style?: any): any;
    drawLines(xs: number[], ys: number[], className?: string, style?: any, clipPath?: string): any;
    drawSplines(xs: number[], ys: number[], className?: string, style?: any, clipPath?: string): any;
    drawPolygon(xs: number[], ys: number[], className?: string, style?: any, clipPath?: string): any;
    drawPieSegment(cx: number, cy: number, radius: number, startAngle: number, sweepAngle: number, className?: string, style?: any, clipPath?: string): any;
    drawDonutSegment(cx: number, cy: number, radius: number, innerRadius: number, startAngle: number, sweepAngle: number, className?: string, style?: any, clipPath?: string): any;
    drawString(s: string, pt: wjcCore.Point, className?: string, style?: any): any;
    drawStringRotated(s: string, pt: wjcCore.Point, center: wjcCore.Point, angle: number, className?: string, style?: any): any;
    drawImage(href: string, x: number, y: number, w: number, h: number): any;
    measureString(s: string, className?: string, groupName?: string, style?: any): wjcCore.Size;
    startGroup(className?: string, clipPath?: string, createTransform?: boolean): any;
    endGroup(): any;
    addClipRect(clipRect: wjcCore.Rect, id: string): any;
}
export declare class _SvgRenderEngine implements IRenderEngine {
    private static svgNS;
    private static xlinkNS;
    private _element;
    private _svg;
    private _text;
    private _textGroup;
    private _defs;
    private _fill;
    private _stroke;
    private _textFill;
    private _strokeWidth;
    private _fontSize;
    private _fontFamily;
    private _group;
    private _clipRect;
    private static _isff;
    private _savedGradient;
    constructor(element: HTMLElement);
    beginRender(): void;
    endRender(): void;
    setViewportSize(w: number, h: number): void;
    readonly element: Element;
    fill: string;
    fontSize: string;
    fontFamily: string;
    stroke: string;
    strokeWidth: number;
    textFill: string;
    addClipRect(clipRect: wjcCore.Rect, id: string): void;
    drawEllipse(cx: number, cy: number, rx: number, ry: number, className?: string, style?: any): SVGElement;
    drawRect(x: number, y: number, w: number, h: number, className?: string, style?: any, clipPath?: string): SVGElement;
    drawLine(x1: number, y1: number, x2: number, y2: number, className?: string, style?: any): SVGElement;
    drawLines(xs: number[], ys: number[], className?: string, style?: any, clipPath?: string): SVGElement;
    drawSplines(xs: number[], ys: number[], className?: string, style?: any, clipPath?: string): SVGElement;
    drawPolygon(xs: number[], ys: number[], className?: string, style?: any, clipPath?: string): SVGElement;
    drawPieSegment(cx: number, cy: number, r: number, startAngle: number, sweepAngle: number, className?: string, style?: any, clipPath?: string): SVGElement;
    drawDonutSegment(cx: number, cy: number, radius: number, innerRadius: number, startAngle: number, sweepAngle: number, className?: string, style?: any, clipPath?: string): SVGElement;
    drawString(s: string, pt: wjcCore.Point, className?: string, style?: any): SVGElement;
    drawStringRotated(s: string, pt: wjcCore.Point, center: wjcCore.Point, angle: number, className?: string, style?: any): SVGElement;
    measureString(s: string, className?: string, groupName?: string, style?: any): wjcCore.Size;
    startGroup(className?: string, clipPath?: string, createTransform?: boolean): SVGElement;
    endGroup(): void;
    drawImage(imageHref: string, x: number, y: number, w: number, h: number): SVGElement;
    private _appendChild(element);
    private _create();
    private _setText(element, s);
    private _createText(pos, text);
    private _applyStyle(el, style);
    private _deCase(s);
    private _getBBox(text);
    private _applyColor(el, key, val);
}
export declare class Legend {
    _chart: FlexChartBase;
    _position: Position;
    private _areas;
    private _sz;
    private _colRowLens;
    constructor(chart: FlexChartBase);
    position: Position;
    _getDesiredSize(engine: IRenderEngine, pos: Position, w: number, h: number): wjcCore.Size;
    _getPosition(w: number, h: number): Position;
    _render(engine: IRenderEngine, pt: wjcCore.Point, pos: Position, w: number, h: number): void;
    _hitTest(pt: wjcCore.Point): number;
}
export declare enum ChartElement {
    PlotArea = 0,
    AxisX = 1,
    AxisY = 2,
    ChartArea = 3,
    Legend = 4,
    Header = 5,
    Footer = 6,
    Series = 7,
    SeriesSymbol = 8,
    DataLabel = 9,
    None = 10,
}
export declare class HitTestInfo {
    private _chart;
    private _pt;
    private _series;
    private _pointIndex;
    _chartElement: ChartElement;
    _dist: number;
    private _item;
    private _x;
    private __xfmt;
    private _y;
    private __yfmt;
    private _name;
    constructor(chart: FlexChartBase, point: wjcCore.Point, element?: ChartElement);
    readonly point: wjcCore.Point;
    readonly series: SeriesBase;
    readonly pointIndex: number;
    readonly chartElement: ChartElement;
    readonly distance: number;
    readonly item: any;
    readonly x: any;
    readonly y: any;
    readonly value: any;
    readonly name: any;
    readonly _xfmt: any;
    readonly _yfmt: any;
    _setData(series: SeriesBase, pi?: number): void;
    _setDataPoint(dataPoint: _DataPoint): void;
    private _getValue(index, formatted);
}
export declare class Palettes {
    static standard: string[];
    static cocoa: string[];
    static coral: string[];
    static dark: string[];
    static highcontrast: string[];
    static light: string[];
    static midnight: string[];
    static modern: string[];
    static organic: string[];
    static slate: string[];
    static zen: string[];
    static cyborg: string[];
    static superhero: string[];
    static flatly: string[];
    static darkly: string[];
    static cerulan: string[];
}
export declare class _Spline {
    private k;
    private _x;
    private _y;
    private _a;
    private _b;
    private _c;
    private _d;
    private _len;
    private m;
    constructor(x: number[], y: number[]);
    private calculatePoint(val);
    calculate(): {
        xs: any;
        ys: any;
    };
}
export declare enum LabelPosition {
    None = 0,
    Left = 1,
    Top = 2,
    Right = 3,
    Bottom = 4,
    Center = 5,
}
export declare enum PieLabelPosition {
    None = 0,
    Inside = 1,
    Center = 2,
    Outside = 3,
}
export declare class DataLabelRenderEventArgs extends RenderEventArgs {
    private _ht;
    private _pt;
    private _text;
    constructor(engine: IRenderEngine, ht: HitTestInfo, pt: wjcCore.Point, text: string);
    cancel: boolean;
    readonly point: wjcCore.Point;
    text: string;
    readonly hitTestInfo: HitTestInfo;
}
export declare class DataLabelBase {
    private _content;
    _chart: FlexChartBase;
    private _bdr;
    private _line;
    private _off;
    content: any;
    border: boolean;
    offset: number;
    connectingLine: boolean;
    rendering: wjcCore.Event;
    onRendering(e: DataLabelRenderEventArgs): boolean;
    _invalidate(): void;
}
export declare class DataLabel extends DataLabelBase {
    private _pos;
    position: LabelPosition;
}
export declare class PieDataLabel extends DataLabelBase {
    private _pos;
    position: PieLabelPosition;
}
export declare enum LineMarkerLines {
    None = 0,
    Vertical = 1,
    Horizontal = 2,
    Both = 3,
}
export declare enum LineMarkerInteraction {
    None = 0,
    Move = 1,
    Drag = 2,
}
export declare enum LineMarkerAlignment {
    Auto = 2,
    Right = 0,
    Left = 1,
    Bottom = 4,
    Top = 6,
}
export declare class LineMarker {
    static _CSS_MARKER: string;
    static _CSS_MARKER_HLINE: string;
    static _CSS_MARKER_VLINE: string;
    static _CSS_MARKER_CONTENT: string;
    static _CSS_MARKER_CONTAINER: string;
    static _CSS_LINE_DRAGGABLE: string;
    static _CSS_TOUCH_DISABLED: string;
    private _chart;
    private _plot;
    private _marker;
    private _markerContainer;
    private _markerContent;
    private _dragEle;
    private _hLine;
    private _vLine;
    private _plotRect;
    private _targetPoint;
    private _wrapperMoveMarker;
    private _capturedEle;
    private _wrapperMousedown;
    private _wrapperMouseup;
    private _contentDragStartPoint;
    private _mouseDownCrossPoint;
    private _isVisible;
    private _horizontalPosition;
    private _verticalPosition;
    private _alignment;
    private _content;
    private _seriesIndex;
    private _lines;
    private _interaction;
    private _dragThreshold;
    private _dragContent;
    private _dragLines;
    constructor(chart: FlexChartCore, options?: any);
    readonly chart: FlexChartCore;
    isVisible: boolean;
    seriesIndex: number;
    horizontalPosition: number;
    readonly x: number;
    readonly y: number;
    content: Function;
    verticalPosition: number;
    alignment: LineMarkerAlignment;
    lines: LineMarkerLines;
    interaction: LineMarkerInteraction;
    dragThreshold: number;
    dragContent: boolean;
    dragLines: boolean;
    positionChanged: wjcCore.Event;
    onPositionChanged(point: wjcCore.Point): void;
    remove(): void;
    private _attach();
    private _attachDrag();
    private _detach();
    private _detachDrag();
    private _toggleDragEventAttach(isAttach);
    private _onMousedown(e);
    private _onMouseup(e);
    _moveMarker(e: any): void;
    private _show(ele?);
    private _hide(ele?);
    private _toggleVisibility();
    private _resetDefaultValue();
    private _initialize();
    private _createMarker();
    private _removeMarker();
    private _getContainer();
    private _createContainer();
    private _createChildren();
    private _toggleElesDraggableClass(draggable);
    private _updateMarkerSize();
    private _updateLinesSize();
    private _resetLinesVisibility();
    private _updateMarkerPosition(point?);
    private _updateContent();
    private _raisePositionChanged(x, y);
    private _updatePositionByAlignment(isMarkerMoved?);
    private _getEventPoint(e);
    private _pointInRect(pt, rect);
}
export declare class _DataPoint {
    private _seriesIndex;
    private _pointIndex;
    private _dataX;
    private _dataY;
    constructor(seriesIndex: number, pointIndex: number, dataX: number, dataY: number);
    readonly seriesIndex: number;
    readonly pointIndex: number;
    dataX: number;
    dataY: number;
}
export declare enum _MeasureOption {
    X = 0,
    Y = 1,
    XY = 2,
}
export declare class _RectArea implements _IHitArea {
    private _rect;
    constructor(rect: wjcCore.Rect);
    readonly rect: wjcCore.Rect;
    tag: any;
    contains(pt: wjcCore.Point): boolean;
    pointDistance(pt1: wjcCore.Point, pt2: wjcCore.Point, option: _MeasureOption): number;
    distance(pt: wjcCore.Point): number;
}
export declare class _CircleArea implements _IHitArea {
    private _center;
    private _rad;
    private _rad2;
    tag: any;
    constructor(center: wjcCore.Point, radius: number);
    setRadius(radius: number): void;
    readonly center: wjcCore.Point;
    contains(pt: wjcCore.Point): boolean;
    distance(pt: wjcCore.Point): number;
}
export declare class _LinesArea implements _IHitArea {
    private _x;
    private _y;
    tag: any;
    constructor(x: any, y: any);
    contains(pt: wjcCore.Point): boolean;
    distance(pt: wjcCore.Point): number;
}
export declare class _HitResult {
    area: _IHitArea;
    distance: number;
}
export declare class _HitTester {
    _chart: FlexChartCore;
    _map: {
        [key: number]: Array<_IHitArea>;
    };
    constructor(chart: FlexChartCore);
    add(area: _IHitArea, seriesIndex: number): void;
    clear(): void;
    hitTest(pt: wjcCore.Point, testLines?: boolean): _HitResult;
    hitTestSeries(pt: wjcCore.Point, seriesIndex: any): _HitResult;
}
export interface _IPlotter {
    chart: FlexChartCore;
    dataInfo: _DataInfo;
    hitTester: _HitTester;
    seriesIndex: number;
    seriesCount: number;
    clipping: boolean;
    stacking: Stacking;
    rotated: boolean;
    adjustLimits(dataInfo: _DataInfo, plotRect: wjcCore.Rect): wjcCore.Rect;
    plotSeries(engine: IRenderEngine, ax: _IAxis, ay: _IAxis, series: _ISeries, palette: _IPalette, iser: number, nser: number, customRender?: Function): any;
    _renderLabels(engine: IRenderEngine, series: SeriesBase, smap: _IHitArea[], chart: FlexChartCore, lblAreas: _RectArea[]): any;
    _renderLabel(engine: IRenderEngine, map: _IHitArea, dp: _DataPoint, chart: FlexChartCore, lbl: DataLabel, series: SeriesBase, offset: number, lblAreas: _RectArea[]): any;
    load(): any;
    unload(): any;
}
export declare class _BasePlotter {
    _DEFAULT_WIDTH: number;
    _DEFAULT_SYM_SIZE: number;
    clipping: boolean;
    chart: FlexChart;
    hitTester: _HitTester;
    dataInfo: _DataInfo;
    seriesIndex: number;
    seriesCount: number;
    clear(): void;
    _renderLabels(engine: IRenderEngine, series: SeriesBase, smap: _IHitArea[], chart: FlexChartCore, lblAreas: _RectArea[]): void;
    _renderLabel(engine: IRenderEngine, map: _IHitArea, dp: _DataPoint, chart: FlexChartCore, lbl: DataLabel, series: SeriesBase, offset: number, lblAreas: _RectArea[]): void;
    _getPointAndPosition(pt: wjcCore.Point, pos: LabelPosition, map: _IHitArea, chart: FlexChartCore): void;
    _getLabelPoint(series: SeriesBase, dataPoint: _DataPoint): wjcCore.Point;
    _renderLabelAndBorder(engine: IRenderEngine, s: string, pos: LabelPosition, offset: number, pt: wjcCore.Point, line: boolean, marg: any, border: boolean): wjcCore.Rect;
    getOption(name: string, parent?: string): any;
    getNumOption(name: string, parent?: string): number;
    static cloneStyle(style: any, ignore: string[]): any;
    isValid(datax: number, datay: number, ax: _IAxis, ay: _IAxis): boolean;
    load(): void;
    unload(): void;
}
export declare class _BarPlotter extends _BasePlotter implements _IPlotter {
    origin: number;
    width: number;
    isVolume: boolean;
    private _volHelper;
    private _itemsSource;
    stackPosMap: {};
    stackNegMap: {};
    stacking: wjcSelf.Stacking;
    rotated: boolean;
    _getSymbolOrigin: Function;
    _getSymbolStyles: Function;
    clear(): void;
    load(): void;
    unload(): void;
    adjustLimits(dataInfo: _DataInfo, plotRect: wjcCore.Rect): wjcCore.Rect;
    plotSeries(engine: IRenderEngine, ax: _IAxis, ay: _IAxis, series: _ISeries, palette: _IPalette, iser: number, nser: number, customRender?: Function): void;
    private drawSymbol(engine, rect, series, pointIndex, point);
    private drawDefaultSymbol(engine, rect, series);
}
export declare class _LinePlotter extends _BasePlotter implements _IPlotter {
    hasSymbols: boolean;
    hasLines: boolean;
    isSpline: boolean;
    rotated: boolean;
    stacking: wjcSelf.Stacking;
    stackPos: {
        [key: number]: number;
    };
    stackNeg: {
        [key: number]: number;
    };
    constructor();
    clear(): void;
    adjustLimits(dataInfo: _DataInfo, plotRect: wjcCore.Rect): wjcCore.Rect;
    plotSeries(engine: IRenderEngine, ax: _IAxis, ay: _IAxis, series: _ISeries, palette: _IPalette, iser: number, nser: number, customRender?: Function): void;
    _drawLines(engine: IRenderEngine, xs: number[], ys: number[], className?: string, style?: any, clipPath?: string): void;
    _drawSymbol(engine: IRenderEngine, x: number, y: number, sz: number, series: SeriesBase, pointIndex: number): void;
    _drawDefaultSymbol(engine: IRenderEngine, x: number, y: number, sz: number, marker: Marker, style?: any): void;
}
export declare class _AreaPlotter extends _BasePlotter implements _IPlotter {
    stacking: wjcSelf.Stacking;
    isSpline: boolean;
    rotated: boolean;
    private stackPos;
    private stackNeg;
    constructor();
    adjustLimits(dataInfo: _DataInfo, plotRect: wjcCore.Rect): wjcCore.Rect;
    clear(): void;
    plotSeries(engine: IRenderEngine, ax: _IAxis, ay: _IAxis, series: _ISeries, palette: _IPalette, iser: number, nser: number, customRender?: Function): void;
    _convertToSpline(x: number[], y: number[]): {
        xs: any;
        ys: any;
    };
    _drawSymbols(engine: IRenderEngine, series: _ISeries, seriesIndex: number): void;
}
export declare class _BubblePlotter extends _LinePlotter {
    private _MIN_SIZE;
    private _MAX_SIZE;
    private _minSize;
    private _maxSize;
    private _minValue;
    private _maxValue;
    constructor();
    adjustLimits(dataInfo: _DataInfo, plotRect: wjcCore.Rect): wjcCore.Rect;
    _drawSymbol(engine: IRenderEngine, x: number, y: number, sz: number, series: Series, pointIndex: number): void;
}
export declare class _FinancePlotter extends _BasePlotter {
    isCandle: boolean;
    isArms: boolean;
    isEqui: boolean;
    isVolume: boolean;
    symbolWidth: any;
    private _volHelper;
    private _itemsSource;
    private _symWidth;
    private _isPixel;
    clear(): void;
    load(): void;
    unload(): void;
    parseSymbolWidth(val: any): void;
    adjustLimits(dataInfo: _DataInfo, plotRect: wjcCore.Rect): wjcCore.Rect;
    plotSeries(engine: IRenderEngine, ax: _IAxis, ay: _IAxis, series: _ISeries, palette: _IPalette, iser: number, nser: number, customRender?: Function): void;
    _drawSymbol(engine: IRenderEngine, ax: _IAxis, ay: _IAxis, si: number, pi: number, fill: any, w: number, x: number, hi: number, lo: number, open: number, close: number): void;
}
export declare class _FunnelPlotter extends _BasePlotter implements _IPlotter {
    _getSymbolOrigin: Function;
    _getSymbolStyles: Function;
    stacking: wjcSelf.Stacking;
    rotated: boolean;
    adjustLimits(dataInfo: _DataInfo, plotRect: wjcCore.Rect): wjcCore.Rect;
    plotSeries(engine: IRenderEngine, ax: _IAxis, ay: _IAxis, series: _ISeries, palette: _IPalette, iser: number, nser: number, customRender?: Function): void;
    private _getTrapezoidArea(width, angle, height);
    private _getTrapezoidOffsetY(width, area, angle);
    private drawSymbol(engine, rect, series, pointIndex, point);
    private drawDefaultSymbol(engine, rect, series);
    _getPointAndPosition(pt: wjcCore.Point, pos: LabelPosition, map: _IHitArea, chart: FlexChartCore): void;
}
export declare class _FunnelSegment implements _IHitArea {
    private _center;
    private _startPoint;
    private _width;
    private _height;
    private _neckWidth;
    private _neckHeight;
    private _offsetX;
    private _offsetY;
    constructor(startPoint: wjcCore.Point, width: number, height: number, neckWidth: number, neckHeight: number);
    contains(pt: wjcCore.Point): boolean;
    distance(pt: wjcCore.Point): number;
    readonly center: wjcCore.Point;
    tag: any;
}
export declare class _VolumeHelper {
    private _volumes;
    private _xVals;
    private _xDataMin;
    private _xDataMax;
    private _xDataType;
    private _hasXs;
    private _calcData;
    constructor(volumes: number[], xVals: number[], xDataMin: number, xDataMax: number, xDataType?: wjcCore.DataType);
    convert(x: number, min: number, max: number): number;
    convertBack(x: number, min: number, max: number): number;
    private _init();
    private _getXVolume(x);
    static convertToRange(value: number, newMin: number, newMax: number, oldMin: number, oldMax: number): number;
    private _fillGaps();
}
