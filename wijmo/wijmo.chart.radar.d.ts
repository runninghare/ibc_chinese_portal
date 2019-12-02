import * as wjcChart from 'wijmo/wijmo.chart';
import * as wjcCore from 'wijmo/wijmo';
export declare enum RadarChartType {
    Column = 0,
    Scatter = 1,
    Line = 2,
    LineSymbols = 3,
    Area = 4,
}
export declare class FlexRadar extends wjcChart.FlexChartCore {
    private _chartType;
    private _startAngle;
    private _totalAngle;
    private _reversed;
    _center: wjcCore.Point;
    _radius: number;
    _angles: number[];
    _isPolar: boolean;
    _areas: any[];
    private __radarLinePlotter;
    private __radarColumnPlotter;
    constructor(element: any, options?: any);
    private readonly _radarLinePlotter;
    private readonly _radarColumnPlotter;
    _initAxes(): void;
    _layout(rect: wjcCore.Rect, size: wjcCore.Size, engine: wjcChart.IRenderEngine): void;
    chartType: RadarChartType;
    startAngle: number;
    totalAngle: number;
    reversed: boolean;
    stacking: wjcChart.Stacking;
    _getChartType(): wjcChart.ChartType;
    _getPlotter(series: FlexRadarSeries): wjcChart._IPlotter;
    _convertPoint(radius: any, angle: any): wjcCore.Point;
    _createSeries(): wjcChart.SeriesBase;
    _clearCachedValues(): void;
    _performBind(): void;
    _prepareRender(): void;
}
export declare class FlexRadarSeries extends wjcChart.SeriesBase {
    private _finChartType;
    chartType: RadarChartType;
    _getChartType(): wjcChart.ChartType;
}
export declare class FlexRadarAxis extends wjcChart.Axis {
    private _points;
    private _axisLabels;
    _height: number;
    _render(engine: wjcChart.IRenderEngine): void;
    _getHeight(engine: wjcChart.IRenderEngine, maxw: number): number;
    _updateActualLimits(dataType: wjcCore.DataType, dataMin: number, dataMax: number, labels?: string[], values?: number[]): void;
    _updateActualLimitsByChartType(labels: any, min: any, max: any): {
        min: any;
        max: any;
    };
    convert(val: number, maxValue?: number, minValue?: number): number;
    _renderLineAndTitle(engine: any): void;
    _renderPolygon(engine: any, r: any, cls: any): void;
    _renderMinors(engine: wjcChart.IRenderEngine, ticks: number[], isVert: boolean, isNear: boolean): void;
    private _drawMinorTickLength(engine, tover, angle, pt);
    _renderLabelsAndTicks(engine: any, index: any, val: any, sval: any, labelAngle: any, tickMarks: any, showLabel: any, t1: any, t2: any): boolean;
    private _renderXGridLine(engine, chart, x, cls);
    private _renderYGridLine(engine, chart, y, cls);
    private _getXLabelVAlign(angle);
    private _getXLabelAlign(angle);
    _createTimeLabels(start: number, len: number, vals: number[], lbls: string[]): void;
}
export declare class _RadarLinePlotter extends wjcChart._LinePlotter {
    isArea: boolean;
    _getLabelPoint(series: any, dataPoint: wjcChart._DataPoint): wjcCore.Point;
    plotSeries(engine: wjcChart.IRenderEngine, ax: wjcChart._IAxis, ay: wjcChart._IAxis, series: wjcChart._ISeries, palette: wjcChart._IPalette, iser: number, nser: number): void;
}
export declare class _RadarBarPlotter extends wjcChart._BarPlotter {
    adjustLimits(dataInfo: wjcChart._DataInfo, plotRect: wjcCore.Rect): wjcCore.Rect;
    _getLabelPoint(series: any, dataPoint: wjcChart._DataPoint): wjcCore.Point;
    plotSeries(engine: wjcChart.IRenderEngine, ax: wjcChart._IAxis, ay: wjcChart._IAxis, series: wjcChart._ISeries, palette: wjcChart._IPalette, iser: number, nser: number): void;
}
