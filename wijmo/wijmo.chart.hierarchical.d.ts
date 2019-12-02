import * as wjcChart from 'wijmo/wijmo.chart';
import * as wjcCore from 'wijmo/wijmo';
export declare class Sunburst extends wjcChart.FlexPie {
    private _bindName;
    private _processedData;
    private _legendLabels;
    private _level;
    private _sliceIndex;
    private _childItemsPath;
    private _processedItem;
    constructor(element: any, options?: any);
    bindingName: any;
    childItemsPath: any;
    _initData(): void;
    _performBind(): void;
    private _calculateValueAndLevel(arr, level);
    _renderPie(engine: any, radius: any, innerRadius: any, startAngle: any, offset: any): void;
    _renderHierarchicalSlices(engine: any, cx: any, cy: any, values: any, sum: any, radius: any, innerRadius: any, startAngle: any, totalSweep: any, offset: any, level: any): void;
    _getLabelsForLegend(): string[];
    _highlightCurrent(): void;
    hitTest(pt: any, y?: number): wjcChart.HitTestInfo;
}
export declare enum TreeMapType {
    Squarified = 0,
    Horizontal = 1,
    Vertical = 2,
}
export declare class TreeMap extends wjcChart.FlexChartBase {
    static _CSS_ITEMDEPTH: string;
    private static _MARGIN;
    private _binding;
    private _bindingName;
    _values: number[];
    _labels: string[];
    _areas: any[];
    private _sum;
    private _keywords;
    private _processedData;
    private _depth;
    private _itemIndex;
    private _childItemsPath;
    private _processedItem;
    private _lbl;
    private _tmGroup;
    private _type;
    private _maxDepth;
    private _plotRect;
    private _tmItems;
    private _colRowLens;
    _currentItem: any;
    _defPalette: any;
    constructor(element: any, options?: any);
    _rollUp(): void;
    private _toogleTooltip(evt);
    readonly tooltip: wjcChart.ChartTooltip;
    binding: string;
    type: TreeMapType;
    bindingName: any;
    dataLabel: wjcChart.DataLabel;
    childItemsPath: any;
    maxDepth: number;
    palette: string[];
    _initData(): void;
    _performBind(): void;
    private _sortData(data);
    private _getTMItemsAndLabelsAndValues(data, treemapItems, depth, parentItem, color?);
    private _calculateColorForItems(items, color?, colorConverter?);
    private _getBindData(item, values, binding);
    private _calculateValueAndDepth(arr, depth);
    _prepareRender(): void;
    _renderChart(engine: wjcChart.IRenderEngine, rect: wjcCore.Rect, applyElement: boolean): void;
    private _renderTreeMap(engine, rect, container, items, sum, maxDepth);
    private _resetItemRects(items);
    private _calculateItemRects(rect, items, sum, depth, maxDepth);
    private _renderHierarchicalTreeMapItems(engine, container, rect, items, sum, depth, maxDepth);
    _renderLabels(engine: wjcChart.IRenderEngine): void;
    private _renderLabelAndBorder(engine, area, rect, s, pos, offset, pt, line, marg, border);
    private _renderText(engine, area, rect, s, pt, halign, valign, className);
    private _cutText(s, actualWidth, maxWidth);
    private _measureLegendItem(engine, text);
    _getDesiredLegendSize(engine: wjcChart.IRenderEngine, isVertical: boolean, width: number, height: number): wjcCore.Size;
    _renderLegend(engine: wjcChart.IRenderEngine, pos: wjcCore.Point, areas: any[], isVertical: boolean, width: number, height: number): void;
    _drawLegendItem(engine: wjcChart.IRenderEngine, rect: wjcCore.Rect, i: number, name: string): void;
    private _getLabelContent(ht, content);
    hitTest(pt: any, y?: number): wjcChart.HitTestInfo;
    _getHitTestItem(index: number): any;
    _getHitTestValue(index: number): number;
    _getHitTestLabel(index: number): string;
}
export declare class HierarchicalUtil {
    static parseDataToHierarchical(data: any, binding: any, bindingName: any, childItemsPath: any): any[];
    private static parseGroupCV(cv, binding);
    private static parseGroups(group, binding);
    private static parseItems(items, binding, bindingName, childItemsPath);
    private static isFlatItem(item, binding);
    private static convertFlatData(items, binding, bindingName);
    private static convertFlatToHierarchical(arr, data);
    private static convertFlatItem(data, item, binding, bindingName);
    private static parseItem(item, binding, bindingName, childItemsPath);
    static parseFlatItem(data: any, item: any, binding: any, bindingName: any): void;
}
