import * as wjcGrid from 'wijmo/wijmo.grid';
import * as wjcCore from 'wijmo/wijmo';
export declare class _MultiRow extends wjcGrid.Row {
    _idxData: number;
    _idxRecord: number;
    constructor(dataItem: any, dataIndex: number, recordIndex: number);
    readonly recordIndex: number;
    readonly dataIndex: number;
}
export declare class _Cell extends wjcGrid.Column {
    _row: number;
    _col: number;
    _colspan: number;
    _rowspan: number;
    constructor(options?: any);
    colspan: number;
}
export declare class _CellGroup extends _Cell {
    _g: MultiRow;
    _colstart: number;
    _cells: _Cell[];
    _rng: wjcGrid.CellRange[];
    _cols: wjcGrid.ColumnCollection;
    constructor(grid: MultiRow, options?: any);
    _copy(key: string, value: any): boolean;
    readonly cells: _Cell[];
    closeGroup(rowsPerItem: number): void;
    getColumnWidth(c: number): any;
    getMergedRange(p: wjcGrid.GridPanel, r: number, c: number): wjcGrid.CellRange;
    getBindingColumn(p: wjcGrid.GridPanel, r: number, c: number): wjcGrid.Column;
    getColumn(name: string): wjcGrid.Column;
}
export declare class _MergeManager extends wjcGrid.MergeManager {
    getMergedRange(p: wjcGrid.GridPanel, r: number, c: number, clip?: boolean): wjcGrid.CellRange;
}
export declare class _AddNewHandler extends wjcGrid._AddNewHandler {
    constructor(grid: wjcGrid.FlexGrid);
    updateNewRowTemplate(): void;
}
export declare class MultiRow extends wjcGrid.FlexGrid {
    _rowsPerItem: number;
    _layoutDef: any[];
    _cellBindingGroups: _CellGroup[];
    _cellGroupsByColumn: any;
    _centerVert: boolean;
    _collapsedHeaders: boolean;
    _btnCollapse: HTMLElement;
    constructor(element: any, options?: any);
    layoutDefinition: any[];
    readonly rowsPerItem: number;
    getBindingColumn(p: wjcGrid.GridPanel, r: number, c: number): wjcGrid.Column;
    getColumn(name: string): wjcGrid.Column;
    centerHeadersVertically: boolean;
    collapsedHeaders: boolean;
    showHeaderCollapseButton: boolean;
    _addBoundRow(items: any[], index: number): void;
    _addNode(items: any[], index: number, level: number): void;
    _bindColumns(): void;
    _updateCollapsedHeaders(): void;
    _updateColumnTypes(): void;
    _getBindingColumn(p: wjcGrid.GridPanel, r: number, c: wjcGrid.Column): wjcGrid.Column;
    _cvCollectionChanged(sender: any, e: wjcCore.NotifyCollectionChangedEventArgs): void;
    _parseCellGroups(groups: any[]): _CellGroup[];
    _formatItem(s: MultiRow, e: wjcGrid.FormatItemEventArgs): void;
    _updateButtonGlyph(): void;
}
