import * as wjcCore from 'wijmo/wijmo';
import * as wjcChart from 'wijmo/wijmo.chart';
export declare class Fibonacci extends wjcChart.SeriesBase {
    private _high;
    private _low;
    private _minX;
    private _maxX;
    private _actualHigh;
    private _actualLow;
    private _levels;
    private _uptrend;
    private _labelPosition;
    constructor(options?: any);
    low: number;
    high: number;
    labelPosition: wjcChart.LabelPosition;
    uptrend: boolean;
    levels: number[];
    minX: any;
    maxX: any;
    private _getMinX();
    private _getMaxX();
    private _updateLevels();
    private _render(sender, args);
    _getChartType(): wjcChart.ChartType;
}
export declare class FibonacciArcs extends wjcChart.SeriesBase {
    private _start;
    private _end;
    private _levels;
    private _labelPosition;
    constructor(options?: any);
    start: wjcChart.DataPoint;
    end: wjcChart.DataPoint;
    levels: number[];
    labelPosition: wjcChart.LabelPosition;
    _render(sender: wjcChart.SeriesBase, args: wjcChart.RenderEventArgs): void;
    private _getX(dim);
    private _getY(dim);
    _getChartType(): wjcChart.ChartType;
}
export declare class FibonacciFans extends wjcChart.SeriesBase {
    private _start;
    private _end;
    private _levels;
    private _labelPosition;
    constructor(options?: any);
    start: wjcChart.DataPoint;
    end: wjcChart.DataPoint;
    levels: number[];
    labelPosition: wjcChart.LabelPosition;
    _updateLevels(): void;
    _render(sender: wjcChart.SeriesBase, args: wjcChart.RenderEventArgs): void;
    private _getX(dim);
    private _getY(dim);
    _getChartType(): wjcChart.ChartType;
}
export declare class FibonacciTimeZones extends wjcChart.SeriesBase {
    private _startX;
    private _endX;
    private _levels;
    private _labelPosition;
    constructor(options?: any);
    startX: any;
    endX: any;
    levels: number[];
    labelPosition: wjcChart.LabelPosition;
    _render(sender: wjcChart.SeriesBase, args: wjcChart.RenderEventArgs): void;
    _updateLevels(): void;
    private _getX(dim);
    _getChartType(): wjcChart.ChartType;
}
export declare class OverlayIndicatorBase extends wjcChart.SeriesBase {
    private __hitTester;
    _styles: any;
    _seriesCount: number;
    constructor(options?: any);
    readonly _hitTester: wjcChart._HitTester;
    _getChartType(): wjcChart.ChartType;
    _getXValues(): number[];
    _getDataPoint(dataX: number, dataY: number, seriesIndex: number, pointIndex: number, ax: wjcChart.Axis, ay: wjcChart.Axis): wjcChart._DataPoint;
    _shouldCalculate(): boolean;
    _init(): void;
    _calculate(): void;
    _clearValues(): void;
    _getName(dim: number): string;
    _getStyles(dim: number): any;
    legendItemLength(): number;
    measureLegendItem(engine: wjcChart.IRenderEngine, index: number): wjcCore.Size;
    drawLegendItem(engine: wjcChart.IRenderEngine, rect: wjcCore.Rect, index: number): void;
}
export declare class SingleOverlayIndicatorBase extends OverlayIndicatorBase {
    private _period;
    _xvals: number[];
    _yvals: number[];
    constructor(options?: any);
    period: any;
    getValues(dim: number): number[];
    getDataRect(currentRect?: wjcCore.Rect, calculatedRect?: wjcCore.Rect): wjcCore.Rect;
    _clearValues(): void;
    _shouldCalculate(): boolean;
    _init(): void;
    _getItem(pointIndex: number): any;
}
export declare class ATR extends SingleOverlayIndicatorBase {
    constructor(options?: any);
    _calculate(): void;
}
export declare class CCI extends SingleOverlayIndicatorBase {
    private _constant;
    constructor(options?: any);
    constant: number;
    _calculate(): void;
}
export declare function _cci(highs: number[], lows: number[], closes: number[], period: number, constant: number): number[];
export declare class WilliamsR extends SingleOverlayIndicatorBase {
    constructor(options?: any);
    _calculate(): void;
}
export declare function _williamsR(highs: number[], lows: number[], closes: number[], period: number): number[];
export declare enum MovingAverageType {
    Simple = 0,
    Exponential = 1,
}
export declare class Envelopes extends OverlayIndicatorBase {
    private _upperYVals;
    private _lowerYVals;
    private _xVals;
    private _period;
    private _type;
    private _size;
    constructor(options?: any);
    period: any;
    type: MovingAverageType;
    size: number;
    getDataRect(currentRect?: wjcCore.Rect, calculatedRect?: wjcCore.Rect): wjcCore.Rect;
    _clearValues(): void;
    _init(): void;
    _shouldCalculate(): boolean;
    _calculate(): void;
    private _rendering(sender, args);
    getCalculatedValues(key: string): any[];
}
export declare class BollingerBands extends OverlayIndicatorBase {
    private _upperYVals;
    private _middleYVals;
    private _lowerYVals;
    private _xVals;
    private _period;
    private _multiplier;
    constructor(options?: any);
    period: any;
    multiplier: number;
    getDataRect(currentRect?: wjcCore.Rect, calculatedRect?: wjcCore.Rect): wjcCore.Rect;
    _clearValues(): void;
    _shouldCalculate(): boolean;
    _init(): void;
    _calculate(): void;
    private _rendering(sender, args);
    getCalculatedValues(key: string): any[];
}
export declare function _bollingerBands(ys: number[], period: number, multiplier: number): any;
export declare class RSI extends SingleOverlayIndicatorBase {
    constructor(options?: any);
    _calculate(): void;
}
export declare function _rsi(ys: number[], period: number): number[];
export declare class MacdBase extends OverlayIndicatorBase {
    _macdXVals: number[];
    _macdVals: number[];
    _signalXVals: number[];
    _signalVals: number[];
    _histogramXVals: number[];
    _histogramVals: number[];
    private _fastPeriod;
    private _slowPeriod;
    private _smoothingPeriod;
    constructor(options?: any);
    fastPeriod: number;
    slowPeriod: number;
    smoothingPeriod: number;
    _clearValues(): void;
    _shouldCalculate(): boolean;
    _init(): void;
    _calculate(): void;
}
export declare class Macd extends MacdBase {
    constructor(options?: any);
    styles: any;
    getDataRect(currentRect?: wjcCore.Rect, calculatedRect?: wjcCore.Rect): wjcCore.Rect;
    private _rendering(sender, args);
    getCalculatedValues(key: string): any[];
}
export declare class MacdHistogram extends MacdBase {
    constructor(options?: any);
    getValues(dim: number): number[];
    getDataRect(currentRect?: wjcCore.Rect, calculatedRect?: wjcCore.Rect): wjcCore.Rect;
    _getChartType(): wjcChart.ChartType;
    _getItem(pointIndex: number): any;
}
export declare function _macd(ys: number[], fastPeriod: number, slowPeriod: number, smoothingPeriod: number): any;
export declare class Stochastic extends OverlayIndicatorBase {
    private _kVals;
    private _kXVals;
    private _dVals;
    private _dXVals;
    private _kPeriod;
    private _dPeriod;
    private _smoothingPeriod;
    constructor(options?: any);
    kPeriod: number;
    dPeriod: number;
    smoothingPeriod: number;
    styles: any;
    getDataRect(currentRect?: wjcCore.Rect, calculatedRect?: wjcCore.Rect): wjcCore.Rect;
    _clearValues(): void;
    _shouldCalculate(): boolean;
    _init(): void;
    _calculate(): void;
    private _rendering(sender, args);
    getCalculatedValues(key: string): any[];
}
export declare function _stochastic(highs: number[], lows: number[], closes: number[], kPeriod: number, dPeriod: number, smoothingPeriod: number): any;
