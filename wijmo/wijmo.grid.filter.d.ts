import * as wjcGrid from 'wijmo/wijmo.grid';
import * as wjcCore from 'wijmo/wijmo';
export interface IColumnFilter {
    column: wjcGrid.Column;
    isActive: boolean;
    apply(value: any): boolean;
    clear(): void;
}
export declare class ValueFilter implements IColumnFilter {
    private _col;
    private _bnd;
    private _values;
    private _filterText;
    private _maxValues;
    private _uniqueValues;
    private _sortValues;
    private _map;
    constructor(column: wjcGrid.Column);
    showValues: any;
    filterText: string;
    maxValues: number;
    uniqueValues: any[];
    sortValues: boolean;
    dataMap: wjcGrid.DataMap;
    readonly column: wjcGrid.Column;
    readonly isActive: boolean;
    apply(value: any): boolean;
    clear(): void;
    implementsInterface(interfaceName: string): boolean;
    _getUniqueValues(col: wjcGrid.Column, filtered: boolean): any[];
}
export declare class ValueFilterEditor extends wjcCore.Control {
    private _divFilter;
    private _cmbFilter;
    private _cbSelectAll;
    private _spSelectAll;
    private _divValues;
    private _lbValues;
    private _filter;
    private _toText;
    private _filterText;
    private _view;
    static controlTemplate: string;
    constructor(element: any, filter: ValueFilter);
    readonly filter: ValueFilter;
    updateEditor(): void;
    _updateEditor(): void;
    clearEditor(): void;
    updateFilter(): void;
    private _filterTextChanged();
    private _filterValues(value);
    private _cbSelectAllClicked();
    private _updateSelectAllCheck();
}
export declare class ConditionFilter implements IColumnFilter {
    private _col;
    private _bnd;
    private _c1;
    private _c2;
    private _and;
    private _map;
    constructor(column: wjcGrid.Column);
    readonly condition1: FilterCondition;
    readonly condition2: FilterCondition;
    and: boolean;
    dataMap: wjcGrid.DataMap;
    readonly column: wjcGrid.Column;
    readonly isActive: boolean;
    apply(value: any): boolean;
    clear(): void;
    implementsInterface(interfaceName: string): boolean;
}
export declare class ConditionFilterEditor extends wjcCore.Control {
    private _filter;
    private _cmb1;
    private _val1;
    private _cmb2;
    private _val2;
    private _divHdr;
    private _divCmb1;
    private _divVal1;
    private _divCmb2;
    private _divVal2;
    private _spAnd;
    private _spOr;
    private _btnAnd;
    private _btnOr;
    static controlTemplate: string;
    constructor(element: any, filter: ConditionFilter);
    readonly filter: ConditionFilter;
    updateEditor(): void;
    clearEditor(): void;
    updateFilter(): void;
    private _createOperatorCombo(element);
    private _createValueInput(e);
    private _isTimeFormat(fmt);
    private _btnAndOrChanged(e);
}
export declare class FilterCondition {
    private _op;
    private _val;
    private _strVal;
    operator: Operator;
    value: any;
    readonly isActive: boolean;
    clear(): void;
    apply(value: any): boolean;
}
export declare enum Operator {
    EQ = 0,
    NE = 1,
    GT = 2,
    GE = 3,
    LT = 4,
    LE = 5,
    BW = 6,
    EW = 7,
    CT = 8,
    NC = 9,
}
export declare class ColumnFilter implements IColumnFilter {
    private _owner;
    private _col;
    private _valueFilter;
    private _conditionFilter;
    private _filterType;
    constructor(owner: FlexGridFilter, column: wjcGrid.Column);
    filterType: FilterType;
    dataMap: wjcGrid.DataMap;
    readonly valueFilter: ValueFilter;
    readonly conditionFilter: ConditionFilter;
    readonly column: wjcGrid.Column;
    readonly isActive: boolean;
    apply(value: any): boolean;
    clear(): void;
    implementsInterface(interfaceName: string): boolean;
}
export declare class ColumnFilterEditor extends wjcCore.Control {
    private _filter;
    private _edtVal;
    private _edtCnd;
    private _wasTouching;
    private _divSort;
    private _btnAsc;
    private _btnDsc;
    private _divType;
    private _aCnd;
    private _aVal;
    private _divEdtVal;
    private _divEdtCnd;
    private _btnApply;
    private _btnCancel;
    private _btnClear;
    static controlTemplate: string;
    '</div>': any;
    constructor(element: any, filter: ColumnFilter, sortButtons?: boolean);
    readonly filter: ColumnFilter;
    updateEditor(): void;
    updateFilter(): void;
    readonly filterChanged: wjcCore.Event;
    onFilterChanged(e?: wjcCore.EventArgs): void;
    readonly buttonClicked: wjcCore.Event;
    onButtonClicked(e?: wjcCore.EventArgs): void;
    protected _handleResize(): void;
    _showFilter(filterType: FilterType): void;
    _enableLink(a: HTMLLinkElement, enable: boolean): void;
    private _getFilterType();
    private _btnClicked(e);
}
export declare enum FilterType {
    None = 0,
    Condition = 1,
    Value = 2,
    Both = 3,
}
export declare class FlexGridFilter {
    static _WJC_FILTER: string;
    static _filterGlyph: HTMLElement;
    private _g;
    private _filters;
    private _filterColumns;
    private _divEdt;
    private _edtCol;
    private _showIcons;
    private _showSort;
    private _defFilterType;
    private _tmd;
    constructor(grid: wjcGrid.FlexGrid, options?: any);
    readonly grid: wjcGrid.FlexGrid;
    filterColumns: string[];
    showFilterIcons: boolean;
    showSortButtons: boolean;
    getColumnFilter(col: any, create?: boolean): ColumnFilter;
    defaultFilterType: FilterType;
    filterDefinition: string;
    editColumnFilter(col: any, ht?: wjcGrid.HitTestInfo): void;
    closeEditor(): void;
    apply(): void;
    clear(): void;
    readonly filterApplied: wjcCore.Event;
    onFilterApplied(e?: wjcCore.EventArgs): void;
    readonly filterChanging: wjcCore.Event;
    onFilterChanging(e: wjcGrid.CellRangeEventArgs): void;
    readonly filterChanged: wjcCore.Event;
    onFilterChanged(e: wjcGrid.CellRangeEventArgs): void;
    _asColumn(col: any): wjcGrid.Column;
    private _filter(item);
    private _formatItem(sender, e);
    _mousedown(e: MouseEvent): void;
    _click(e: MouseEvent): void;
    private _toggleEditor(e);
    _keydown(e: KeyboardEvent): void;
}
