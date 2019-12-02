import * as wjcChart from 'wijmo/wijmo.chart';
import * as wjcCore from 'wijmo/wijmo';
export declare class TrendLineBase extends wjcChart.SeriesBase {
    private _sampleCount;
    private _bind;
    private _bindX;
    _xValues: any[];
    _yValues: any[];
    _originXValues: any[];
    _originYValues: any[];
    constructor(options?: any);
    sampleCount: number;
    approximate(x: number): number;
    getValues(dim: number): number[];
    _calculateValues(): void;
    _invalidate(): void;
    _clearValues(): void;
    _clearCalculatedValues(): void;
}
export declare enum TrendLineFitType {
    Linear = 0,
    Exponential = 1,
    Logarithmic = 2,
    Power = 3,
    Fourier = 4,
    Polynomial = 5,
    MinX = 6,
    MinY = 7,
    MaxX = 8,
    MaxY = 9,
    AverageX = 10,
    AverageY = 11,
}
export declare class TrendLine extends TrendLineBase {
    private _fitType;
    private _order;
    private _helper;
    constructor(options?: any);
    fitType: TrendLineFitType;
    order: number;
    readonly coefficients: number[];
    approximate(x: number): number;
    getEquation(fmt?: Function): string;
    _calculateValues(): void;
}
export declare class FunctionSeries extends TrendLineBase {
    private _min;
    private _max;
    constructor(options?: any);
    min: number;
    max: number;
    getValues(dim: number): number[];
    _calculateValues(): void;
    _validateValue(value: number): number;
    _calculateValue(func: Function, parameter: number): number;
    _calculateX(value: number): number;
    _calculateY(value: number): number;
}
export declare class YFunctionSeries extends FunctionSeries {
    private _func;
    constructor(options?: any);
    func: Function;
    _calculateX(value: number): number;
    _calculateY(value: number): number;
    approximate(x: number): number;
}
export declare class ParametricFunctionSeries extends FunctionSeries {
    private _xFunc;
    private _yFunc;
    constructor(options?: any);
    xFunc: Function;
    yFunc: Function;
    _calculateX(value: number): number;
    _calculateY(value: number): number;
    approximate(value: number): any;
}
export declare enum MovingAverageType {
    Simple = 0,
    Weighted = 1,
    Exponential = 2,
    Triangular = 3,
}
export declare class MovingAverage extends TrendLineBase {
    private _period;
    private _type;
    constructor(options?: any);
    type: MovingAverageType;
    period: number;
    _checkPeriod(): void;
    _calculateValues(): void;
    private _calculateSimple(x, y, forTMA?);
    private _calculateWeighted(x, y);
    private _calculateExponential(x, y);
    private _calculateTriangular(x, y);
}
export declare class Waterfall extends wjcChart.SeriesBase {
    static CSS_CONNECTOR_LINE_GROUP: string;
    static CSS_CONNECTOR_LINE: string;
    static CSS_ENDLABEL: string;
    _barPlotter: wjcChart._BarPlotter;
    private _start;
    private _startLabel;
    private _relativeData;
    private _connectorLines;
    private _showTotal;
    private _totalLabel;
    private _styles;
    private _wfstyle;
    private _xValues;
    private _getXValues;
    private _yValues;
    private _showIntermediateTotal;
    private _intermediateTotalPositions;
    private _intermediateTotalLabels;
    private _intermediateTotalPos;
    constructor(options?: any);
    relativeData: boolean;
    start: number;
    startLabel: string;
    showTotal: boolean;
    totalLabel: string;
    showIntermediateTotal: boolean;
    intermediateTotalPositions: number[];
    intermediateTotalLabels: any;
    connectorLines: boolean;
    styles: any;
    getValues(dim: number): number[];
    legendItemLength(): number;
    measureLegendItem(engine: wjcChart.IRenderEngine, index: number): wjcCore.Size;
    drawLegendItem(engine: wjcChart.IRenderEngine, rect: wjcCore.Rect, index: number): void;
    _clearValues(): void;
    _invalidate(): void;
    private _rendering(sender, args);
    private _getStyles();
    private _getStyleByKey(styles, key, fill, stroke);
    private _drawConnectorLine(engine, rotated, prevArea, currArea, falling);
    private _getLegendStyles(index);
    private _getName(index);
}
export declare enum QuartileCalculation {
    InclusiveMedian = 0,
    ExclusiveMedian = 1,
}
export declare class BoxWhisker extends wjcChart.SeriesBase {
    private _groupWidth;
    private _gapWidth;
    private _showMeanLine;
    private _meanLineStyle;
    private _showMeanMarker;
    private _meanMarkerStyle;
    private _showInnerPoints;
    private _showOutliers;
    private _quartileCalculation;
    hitTester: wjcChart._HitTester;
    constructor(options?: any);
    private _initProperties(options);
    _clearValues(): void;
    quartileCalculation: QuartileCalculation;
    groupWidth: number;
    gapWidth: number;
    showMeanLine: boolean;
    meanLineStyle: any;
    showMeanMarker: boolean;
    meanMarkerStyle: any;
    showInnerPoints: boolean;
    showOutliers: boolean;
    private _rendering(sender, args);
    _convertPoints(points: number[], axis: wjcChart._IAxis): number[];
    _drawBoxWhisker(engine: wjcChart.IRenderEngine, xs: any, ys: any, prevXS: any, prevYS: any, series: wjcChart._ISeries): void;
    _renderLabels(engine: wjcChart.IRenderEngine, smap: wjcChart._IHitArea[], chart: wjcChart.FlexChartCore, lblAreas: wjcChart._RectArea[]): void;
}
export declare class _BoxPlot {
    private _data;
    private _min;
    private _max;
    private _mean;
    private _firstQuartile;
    private _thirdQuartile;
    private _median;
    private _quartileCalculation;
    private _iqr;
    private _outlierPoints;
    private _innerPoints;
    private _showOutliers;
    constructor(data: number[], quartileCalculation: QuartileCalculation, showOutliers: boolean);
    readonly showOutliers: boolean;
    readonly min: number;
    readonly max: number;
    readonly mean: number;
    readonly firstQuartile: number;
    readonly thirdQuartile: number;
    readonly median: number;
    readonly outlierPoints: number[];
    readonly innerPoints: number[];
    _parse(): void;
    _quartileInc(data: number[], percent: number): any;
    _quartileExc(data: number[], percent: number): any;
}
export declare enum ErrorAmount {
    FixedValue = 0,
    Percentage = 1,
    StandardDeviation = 2,
    StandardError = 3,
    Custom = 4,
}
export declare enum ErrorBarEndStyle {
    Cap = 0,
    NoCap = 1,
}
export declare enum ErrorBarDirection {
    Both = 0,
    Minus = 1,
    Plus = 2,
}
export declare class ErrorBar extends wjcChart.Series {
    private __errorValue;
    private _mean;
    private _errorAmount;
    private _endStyle;
    private _direction;
    private _value;
    private _errorBarStyle;
    private _paddings;
    private _plusBindingValues;
    private _minusBindingValues;
    constructor(options?: any);
    value: any;
    errorAmount: ErrorAmount;
    errorBarStyle: any;
    endStyle: ErrorBarEndStyle;
    direction: ErrorBarDirection;
    getDataRect(currentRect?: wjcCore.Rect, calculatedRect?: wjcCore.Rect): wjcCore.Rect;
    private _getCustomValue(i);
    _calculateErrorValue(): void;
    _clearValues(): void;
    getValues(dim: number): number[];
    _chart: wjcChart.FlexChartCore;
    _errorValue: number;
    readonly _showPlus: boolean;
    readonly _showMinus: boolean;
    private _rendering(sender, args);
}
