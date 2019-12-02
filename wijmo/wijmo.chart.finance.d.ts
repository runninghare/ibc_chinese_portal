import * as wjcCore from 'wijmo/wijmo';
import * as wjcChart from 'wijmo/wijmo.chart';
export declare function _trunc(value: number): number;
export declare function _sum(...values: number[]): number;
export declare function _sum(values: number[]): number;
export declare function _average(...values: number[]): number;
export declare function _average(values: number[]): number;
export declare function _minimum(...values: number[]): number;
export declare function _minimum(values: number[]): number;
export declare function _maximum(...values: number[]): number;
export declare function _maximum(values: number[]): number;
export declare function _variance(...values: number[]): number;
export declare function _variance(values: number[]): number;
export declare function _stdDeviation(...values: number[]): number;
export declare function _stdDeviation(values: number[]): number;
export declare function _avgTrueRng(highs: number[], lows: number[], closes: number[], period?: number): number[];
export declare function _trueRng(highs: number[], lows: number[], closes: number[], period?: number): number[];
export declare function _sma(values: number[], period: number): number[];
export declare function _ema(values: number[], period: number): number[];
export declare function _range(begin: number, end: number, step?: number): number[];
export declare enum FinancialChartType {
    Column = 0,
    Scatter = 1,
    Line = 2,
    LineSymbols = 3,
    Area = 4,
    Candlestick = 5,
    HighLowOpenClose = 6,
    HeikinAshi = 7,
    LineBreak = 8,
    Renko = 9,
    Kagi = 10,
    ColumnVolume = 11,
    EquiVolume = 12,
    CandleVolume = 13,
    ArmsCandleVolume = 14,
    PointAndFigure = 15,
}
export declare class FinancialChart extends wjcChart.FlexChartCore {
    private _chartType;
    private __heikinAshiPlotter;
    private __lineBreakPlotter;
    private __renkoPlotter;
    private __kagiPlotter;
    private __pfPlotter;
    constructor(element: any, options?: any);
    chartType: FinancialChartType;
    options: any;
    private readonly _heikinAshiPlotter;
    private readonly _lineBreakPlotter;
    private readonly _renkoPlotter;
    private readonly _kagiPlotter;
    private readonly _pfPlotter;
    _getChartType(): wjcChart.ChartType;
    _getPlotter(series: FinancialSeries): wjcChart._IPlotter;
    _createSeries(): wjcChart.SeriesBase;
}
export declare class FinancialSeries extends wjcChart.SeriesBase {
    private _finChartType;
    chartType: FinancialChartType;
    _getChartType(): wjcChart.ChartType;
}
export interface _IFinanceItem {
    high: number;
    low: number;
    open: number;
    close: number;
    x: number;
    pointIndex: number;
}
export interface _IFinancialCalculator {
    highs: number[];
    lows: number[];
    opens: number[];
    closes: number[];
    xs?: number[];
    size?: number;
    unit?: RangeMode;
    fields?: DataFields;
    calculate(): any;
}
export declare class _BaseCalculator implements _IFinancialCalculator {
    highs: number[];
    lows: number[];
    opens: number[];
    closes: number[];
    constructor(highs: number[], lows: number[], opens: number[], closes: number[]);
    calculate(): any;
}
export declare class _HeikinAshiCalculator extends _BaseCalculator {
    constructor(highs: number[], lows: number[], opens: number[], closes: number[]);
    calculate(): _IFinanceItem[];
}
export declare class _BaseRangeCalculator extends _BaseCalculator {
    xs: number[];
    size: number;
    unit: RangeMode;
    fields: DataFields;
    constructor(highs: number[], lows: number[], opens: number[], closes: number[], xs: number[], size: number, unit?: RangeMode, fields?: DataFields);
    _getValues(): number[];
    _getSize(): number;
}
export declare class _LineBreakCalculator extends _BaseRangeCalculator {
    constructor(highs: number[], lows: number[], opens: number[], closes: number[], xs: number[], size: number);
    calculate(): _IFinanceItem[];
    private _trendExists(vals);
}
export declare class _KagiCalculator extends _BaseRangeCalculator {
    constructor(highs: number[], lows: number[], opens: number[], closes: number[], xs: number[], size: number, unit: RangeMode, field: DataFields);
    calculate(): _IFinanceItem[];
}
export declare class _RenkoCalculator extends _BaseRangeCalculator {
    rounding: boolean;
    constructor(highs: number[], lows: number[], opens: number[], closes: number[], xs: number[], size: number, unit: RangeMode, field: DataFields, rounding?: boolean);
    calculate(): _IFinanceItem[];
    _round(value: number, size: number): number;
}
export declare class _HeikinAshiPlotter extends wjcChart._FinancePlotter {
    private _haValues;
    private _calculator;
    private _symFactor;
    constructor();
    clear(): void;
    plotSeries(engine: wjcChart.IRenderEngine, ax: wjcChart._IAxis, ay: wjcChart._IAxis, series: FinancialSeries, palette: wjcChart._IPalette, iser: number, nser: number): void;
    _drawSymbol(engine: wjcChart.IRenderEngine, ax: wjcChart._IAxis, ay: wjcChart._IAxis, si: number, pi: number, fill: any, w: number, x: number, hi: number, lo: number, open: number, close: number, dpt?: wjcChart._DataPoint, dt?: wjcCore.DataType): void;
    _getDataPoint(seriesIndex: number, pointIndex: number, x: any, series: wjcChart.SeriesBase): wjcChart._DataPoint;
    private _calculate(series);
    private _init();
}
export declare class _BaseRangePlotter extends wjcChart._BasePlotter {
    private _symFactor;
    _calculator: _BaseRangeCalculator;
    _rangeValues: _IFinanceItem[];
    _rangeXLabels: any[];
    constructor();
    clear(): void;
    unload(): void;
    adjustLimits(dataInfo: wjcChart._DataInfo, plotRect: wjcCore.Rect): wjcCore.Rect;
    plotSeries(engine: wjcChart.IRenderEngine, ax: wjcChart._IAxis, ay: wjcChart._IAxis, series: FinancialSeries, palette: wjcChart._IPalette, iser: number, nser: number): void;
    _drawSymbol(engine: wjcChart.IRenderEngine, ax: wjcChart._IAxis, ay: wjcChart._IAxis, si: number, pi: number, w: number, x: number, start: number, end: number, dpt: wjcChart._DataPoint): void;
    _getDataPoint(seriesIndex: number, pointIndex: number, series: wjcChart.SeriesBase, dataY: number): wjcChart._DataPoint;
    _init(): void;
    _calculate(series: FinancialSeries): void;
    _generateXLabels(series: FinancialSeries): void;
}
export declare enum DataFields {
    Close = 0,
    High = 1,
    Low = 2,
    Open = 3,
    HighLow = 4,
    HL2 = 5,
    HLC3 = 6,
    HLOC4 = 7,
}
export declare enum RangeMode {
    Fixed = 0,
    ATR = 1,
    Percentage = 2,
}
export declare class _LineBreakPlotter extends _BaseRangePlotter {
    private _newLineBreaks;
    constructor();
    clear(): void;
    _calculate(series: FinancialSeries): void;
    _init(): void;
}
export declare class _RenkoPlotter extends _BaseRangePlotter {
    private _boxSize;
    private _rangeMode;
    private _fields;
    private _rounding;
    constructor();
    clear(): void;
    _calculate(series: FinancialSeries): void;
    _init(): void;
    _generateXLabels(series: FinancialSeries): void;
}
export declare class _KagiPlotter extends _BaseRangePlotter {
    private _reversalAmount;
    private _rangeMode;
    private _fields;
    constructor();
    _calculate(series: FinancialSeries): void;
    plotSeries(engine: wjcChart.IRenderEngine, ax: wjcChart._IAxis, ay: wjcChart._IAxis, series: FinancialSeries, palette: wjcChart._IPalette, iser: number, nser: number): void;
    _init(): void;
    clear(): void;
}
export declare enum PointAndFigureScaling {
    Traditional = 0,
    Fixed = 1,
    Dynamic = 2,
}
export declare class _PointAndFigurePlotter extends wjcChart._BasePlotter {
    private _boxSize;
    private _reversal;
    private _period;
    private _fields;
    private _scaling;
    private _actualBoxSize;
    private _pfdata;
    private _xlbls;
    constructor();
    clear(): void;
    unload(): void;
    _init(): void;
    adjustLimits(dataInfo: wjcChart._DataInfo, plotRect: wjcCore.Rect): wjcCore.Rect;
    plotSeries(engine: wjcChart.IRenderEngine, ax: wjcChart._IAxis, ay: wjcChart._IAxis, series: FinancialSeries, palette: wjcChart._IPalette, iser: number, nser: number): void;
    private calcBoxSize(data, fieldHi, fieldLo);
    private calcPFHiLo2(data, fieldHi, fieldLo, xbnd, boxSize, reversal);
    private roundUp(val, boxSize);
    private roundDown(val, boxSize);
    private renderGrid(engine, data, boxSize);
    private renderData(chart, engine, data, boxSize);
}
