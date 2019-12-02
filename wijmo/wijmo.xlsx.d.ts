export declare class _xlsx {
    private static _alphabet;
    private static _indexedColors;
    private static _numFmts;
    private static _tableColumnFunctions;
    private static _xmlDescription;
    private static _workbookNS;
    private static _relationshipsNS;
    private static _defaultFontName;
    private static _defaultFontSize;
    private static _macroEnabled;
    private static _sharedStrings;
    static readonly _defaultColorThemes: string[];
    private static _colorThemes;
    private static _styles;
    private static _sharedFormulas;
    private static _borders;
    private static _fonts;
    private static _fills;
    private static _contentTypes;
    private static _props;
    private static _xlRels;
    private static _worksheets;
    private static _tableStyles;
    private static _dxfs;
    private static _tables;
    static load(base64: string): any;
    static loadAsync(base64: string): _Promise;
    static save(workbook: any): any;
    static saveAsync(workbook: any, onError?: (reason?: any) => any): any;
    private static _saveWorkbookToZip(workbook, isAsync?);
    private static _getSharedString(sharedString);
    private static _getInlineString(cell);
    private static _getCoreSetting(coreSetting, result);
    private static _getWorkbook(workbook, result);
    private static _getTheme(theme);
    private static _getStyle(styleSheet);
    private static _getEdgeBorder(strBorder, edge);
    private static _getSheet(sheet, index, result);
    private static _getTable(table);
    private static _getTableColumn(column);
    private static _getSheetRelatedTable(rels, rId, tables);
    private static _getTableStyles(styleDefs, dxfs);
    private static _getTableStyleElement(dxf);
    private static _getTableStyleByName(styleName);
    private static _isBuiltInStyleName(styleName);
    private static _generateRelsDoc();
    private static _generateThemeDoc();
    private static _generateClrScheme();
    private static _generateFontScheme();
    private static _generateFmtScheme();
    private static _generateFillScheme();
    private static _generateLineStyles();
    private static _generateEffectScheme();
    private static _generateBgFillScheme();
    private static _generateCoreDoc(file);
    private static _generateSheetGlobalSetting(index, worksheet, file);
    private static _generateCell(rowIndex, colIndex, styleIndex, type, val, formula);
    private static _generateMergeSetting(merges);
    private static _generateStyleDoc();
    private static _generateBorderStyle(borders, isTable?);
    private static _generateFontStyle(fontStyle, needScheme?);
    private static _generateFillStyle(patternType, fillColor, isTableStyle?);
    private static _generateCellXfs(numFmtId, borderId, fontId, fillId, style);
    private static _generateContentTypesDoc();
    private static _generateAppDoc(file);
    private static _generateWorkbookRels();
    private static _generateWorkbook(file);
    private static _generateWorkSheet(sheetIndex, file, xlWorksheets);
    private static _generateSharedStringsDoc();
    private static _generateTable(tableIndex, table, xlTables);
    private static _generateTableFilterSetting(ref, showTotalRow, columns);
    private static _generateSheetRel(tables, tableNames);
    private static _getDxfs();
    private static _generateDxfs();
    private static _generateTableStyles();
    private static _isEmptyStyleEle(styleEle);
    private static _getTableFileName(tables, tableName);
    private static _getColor(s, isFillColor);
    private static _getThemeColor(theme, tint);
    private static _parseColor(color);
    private static _getsBaseSharedFormulas(sheet);
    private static _parseSharedFormulaInfo(cellRef, formula);
    private static _getSharedFormula(si, cellRef);
    private static _convertDate(input);
    private static _parseBorder(border, needDefaultBorder);
    private static _applyDefaultBorder(style);
    private static _resolveStyleInheritance(style);
    private static _parsePixelToCharWidth(pixels);
    private static _parseCharWidthToPixel(charWidth);
    private static _parseCharCountToCharWidth(charCnt);
    private static _numAlpha(i);
    private static _alphaNum(s);
    private static _typeOf(obj);
    private static _extend(dst, src);
    private static _isEmpty(obj);
    private static _cloneStyle(src);
    private static _cloneColumnsStyle(columns);
    private static _getSheetIndex(fileName);
    private static _checkValidMergeCell(merges, startRow, rowSpan, startCol, colSpan);
    private static _getAttr(s, attr);
    private static _getChildNodeValue(s, child);
    private static _getSheetIndexBySheetName(file, sheetName);
}
export declare class _Promise {
    private _callbacks;
    then(onFulfilled?: (value?: any) => any, onRejected?: (reason?: any) => any): _Promise;
    catch(onRejected: (reason?: any) => any): _Promise;
    resolve(value?: any): void;
    reject(reason?: any): void;
    private _onFulfilled(value);
    private _onRejected(reason);
}
export declare class _CompositedPromise extends _Promise {
    private _promises;
    constructor(promises: _Promise[]);
    _init(): void;
}
export declare class Workbook implements IWorkbook {
    application: string;
    company: string;
    creator: string;
    created: Date;
    lastModifiedBy: string;
    modified: Date;
    activeWorksheet: number;
    private _reservedContent;
    private _sheets;
    private _styles;
    private _definedNames;
    private _tables;
    private _tableStyles;
    private _colorThemes;
    private static _alphabet;
    private static _formatMap;
    constructor();
    readonly sheets: WorkSheet[];
    readonly styles: WorkbookStyle[];
    readonly definedNames: DefinedName[];
    readonly tables: WorkbookTable[];
    readonly colorThemes: string[];
    reservedContent: any;
    save(fileName?: string): string;
    saveAsync(fileName?: string, onSaved?: (base64?: string) => any, onError?: (reason?: any) => any): void;
    load(base64: string): void;
    loadAsync(base64: string, onLoaded: (workbook: Workbook) => void, onError?: (reason?: any) => any): void;
    _serialize(): IWorkbook;
    _deserialize(workbookOM: IWorkbook): void;
    _addWorkSheet(workSheet: WorkSheet, sheetIndex?: number): void;
    private _saveToFile(base64, fileName);
    private _getBase64String(base64);
    static toXlsxDateFormat(format: string): string;
    static toXlsxNumberFormat(format: string): string;
    static fromXlsxFormat(xlsxFormat: string): string[];
    static _parseCellFormat(format: string, isDate: boolean): string;
    static _parseExcelFormat(item: any): string;
    static xlsxAddress(row: number, col: number, absolute?: boolean, absoluteCol?: boolean): string;
    static tableAddress(xlsxIndex: string): ITableAddress;
    static _parseHAlignToString(hAlign: HAlign): string;
    static _parseStringToHAlign(hAlign: string): HAlign;
    static _parseVAlignToString(vAlign: VAlign): string;
    static _parseStringToVAlign(vAlign: string): VAlign;
    static _parseBorderTypeToString(type: BorderStyle): string;
    static _parseStringToBorderType(type: string): BorderStyle;
    static _escapeXML(s: any): string;
    static _unescapeXML(val: any): string;
    private static _numAlpha(i);
    private static _alphaNum(s);
    private static _b64ToUint6(nChr);
    static _base64DecToArr(sBase64: string, nBlocksSize?: number): Uint8Array;
    private static _uint6ToB64(nUint6);
    static _base64EncArr(aBytes: Uint8Array): string;
    private _serializeWorkSheets();
    private _serializeWorkbookStyles();
    private _serializeDefinedNames();
    private _serializeTables();
    private _serializeTableStyles();
    private _deserializeWorkSheets(workSheets);
    private _deserializeWorkbookStyles(workbookStyles);
    private _deserializeDefinedNames(definedNames);
    private _deserializeTables(tables);
    private _deserializeTableStyles(tableStyles);
}
export declare class WorkSheet implements IWorkSheet {
    name: string;
    frozenPane: WorkbookFrozenPane;
    summaryBelow: boolean;
    visible: boolean;
    style: WorkbookStyle;
    private _columns;
    private _rows;
    private _tableNames;
    constructor();
    readonly columns: WorkbookColumn[];
    readonly rows: WorkbookRow[];
    readonly tableNames: string[];
    _serialize(): IWorkSheet;
    _deserialize(workSheetOM: IWorkSheet): void;
    _addWorkbookColumn(column: WorkbookColumn, columnIndex?: number): void;
    _addWorkbookRow(row: WorkbookRow, rowIndex?: number): void;
    private _serializeWorkbookColumns();
    private _serializeWorkbookRows();
    private _deserializeWorkbookColumns(workbookColumns);
    private _deserializeWorkbookRows(workbookRows);
    private _checkEmptyWorkSheet();
}
export declare class WorkbookColumn implements IWorkbookColumn {
    width: any;
    visible: boolean;
    style: WorkbookStyle;
    autoWidth: boolean;
    constructor();
    _serialize(): IWorkbookColumn;
    _deserialize(workbookColumnOM: IWorkbookColumn): void;
    private _checkEmptyWorkbookColumn();
}
export declare class WorkbookRow implements IWorkbookRow {
    height: number;
    visible: boolean;
    groupLevel: number;
    style: WorkbookStyle;
    collapsed: boolean;
    private _cells;
    constructor();
    readonly cells: WorkbookCell[];
    _serialize(): IWorkbookRow;
    _deserialize(workbookRowOM: IWorkbookRow): void;
    _addWorkbookCell(cell: WorkbookCell, cellIndex?: number): void;
    private _serializeWorkbookCells();
    private _deserializeWorkbookCells(workbookCells);
    private _checkEmptyWorkbookRow();
}
export declare class WorkbookCell implements IWorkbookCell {
    value: any;
    isDate: boolean;
    formula: string;
    style: WorkbookStyle;
    colSpan: number;
    rowSpan: number;
    constructor();
    _serialize(): IWorkbookCell;
    _deserialize(workbookCellOM: IWorkbookCell): void;
    private _checkEmptyWorkbookCell();
}
export declare class WorkbookFrozenPane implements IWorkbookFrozenPane {
    rows: number;
    columns: number;
    constructor();
    _serialize(): IWorkbookFrozenPane;
    _deserialize(workbookFrozenPaneOM: IWorkbookFrozenPane): void;
}
export declare class WorkbookStyle implements IWorkbookStyle {
    format: string;
    basedOn: WorkbookStyle;
    font: WorkbookFont;
    hAlign: HAlign;
    vAlign: VAlign;
    indent: number;
    fill: WorkbookFill;
    borders: WorkbookBorder;
    wordWrap: boolean;
    constructor();
    _serialize(): IWorkbookStyle;
    _deserialize(workbookStyleOM: IWorkbookStyle): void;
    private _checkEmptyWorkbookStyle();
}
export declare class WorkbookFont implements IWorkbookFont {
    family: string;
    size: number;
    bold: boolean;
    italic: boolean;
    underline: boolean;
    color: any;
    constructor();
    _serialize(): IWorkbookFont;
    _deserialize(workbookFontOM: IWorkbookFont): void;
    private _checkEmptyWorkbookFont();
}
export declare class WorkbookFill implements IWorkbookFill {
    color: any;
    constructor();
    _serialize(): IWorkbookFill;
    _deserialize(workbookFillOM: IWorkbookFill): void;
}
export declare class WorkbookBorder implements IWorkbookBorder {
    top: WorkbookBorderSetting;
    bottom: WorkbookBorderSetting;
    left: WorkbookBorderSetting;
    right: WorkbookBorderSetting;
    diagonal: WorkbookBorderSetting;
    constructor();
    _serialize(): IWorkbookBorder;
    _deserialize(workbookBorderOM: IWorkbookBorder): void;
    private _checkEmptyWorkbookBorder();
}
export declare class WorkbookBorderSetting implements IWorkbookBorderSetting {
    color: any;
    style: BorderStyle;
    constructor();
    _serialize(): IWorkbookBorderSetting;
    _deserialize(workbookBorderSettingOM: IWorkbookBorderSetting): void;
}
export declare class DefinedName implements IDefinedName {
    name: string;
    value: any;
    sheetName: string;
    constructor();
    _serialize(): IDefinedName;
    _deserialize(definedNameOM: IDefinedName): void;
}
export declare class WorkbookTable implements IWorkbookTable {
    name: string;
    ref: string;
    showHeaderRow: boolean;
    showTotalRow: boolean;
    showBandedColumns: boolean;
    style: WorkbookTableStyle;
    showBandedRows: boolean;
    showFirstColumn: boolean;
    showLastColumn: boolean;
    private _columns;
    readonly columns: WorkbookTableColumn[];
    constructor();
    _serialize(): IWorkbookTable;
    _deserialize(workbookTableOM: IWorkbookTable): void;
    private _serializeTableColumns();
    private _deserializeTableColumns(tableColumnOMs);
}
export declare class WorkbookTableColumn implements IWorkbookTableColumn {
    name: string;
    totalRowLabel: string;
    totalRowFunction: string;
    showFilterButton: boolean;
    constructor();
    _serialize(): IWorkbookTableColumn;
    _deserialize(workbookTableColumnOM: IWorkbookTableColumn): void;
}
export declare class WorkbookTableStyle implements IWorkbookTableStyle {
    name: string;
    wholeTableStyle: WorkbookTableCommonStyle;
    firstBandedColumnStyle: WorkbookTableBandedStyle;
    secondBandedColumnStyle: WorkbookTableBandedStyle;
    firstBandedRowStyle: WorkbookTableBandedStyle;
    secondBandedRowStyle: WorkbookTableBandedStyle;
    firstColumnStyle: WorkbookTableCommonStyle;
    lastColumnStyle: WorkbookTableCommonStyle;
    headerRowStyle: WorkbookTableCommonStyle;
    totalRowStyle: WorkbookTableCommonStyle;
    firstHeaderCellStyle: WorkbookTableCommonStyle;
    lastHeaderCellStyle: WorkbookTableCommonStyle;
    firstTotalCellStyle: WorkbookTableCommonStyle;
    lastTotalCellStyle: WorkbookTableCommonStyle;
    constructor();
    _serialize(): IWorkbookTableStyle;
    _deserialize(workbookTableStyleOM: IWorkbookTableStyle): void;
    private _checkEmptyWorkbookTableStyle();
}
export declare class WorkbookTableCommonStyle extends WorkbookStyle implements IWorkbookTableCommonStyle {
    borders: WorkbookTableBorder;
    constructor();
    _deserialize(workbookTableCommonStyleOM: IWorkbookTableCommonStyle): void;
}
export declare class WorkbookTableBandedStyle extends WorkbookTableCommonStyle implements IWorkbookTableBandedStyle {
    size: number;
    constructor();
    _serialize(): IWorkbookTableBandedStyle;
    _deserialize(workbookTableBandedStyleOM: IWorkbookTableBandedStyle): void;
}
export declare class WorkbookTableBorder extends WorkbookBorder implements IWorkbookTableBorder {
    vertical: WorkbookBorderSetting;
    horizontal: WorkbookBorderSetting;
    constructor();
    _serialize(): IWorkbookTableBorder;
    _deserialize(workbookBorderOM: IWorkbookTableBorder): void;
}
export interface IXlsxFileContent {
    base64: string;
    base64Array: Uint8Array;
    href: Function;
}
export interface IWorkSheet {
    name?: string;
    columns?: IWorkbookColumn[];
    rows?: IWorkbookRow[];
    frozenPane?: IWorkbookFrozenPane;
    summaryBelow?: boolean;
    visible?: boolean;
    style?: IWorkbookStyle;
    tableNames?: string[];
}
export interface IWorkbookColumn {
    width?: any;
    visible?: boolean;
    style?: IWorkbookStyle;
    autoWidth?: boolean;
}
export interface IWorkbookRow {
    height?: number;
    visible?: boolean;
    groupLevel?: number;
    style?: IWorkbookStyle;
    collapsed?: boolean;
    cells?: IWorkbookCell[];
}
export interface IWorkbookCell {
    value?: any;
    isDate?: boolean;
    formula?: string;
    style?: IWorkbookStyle;
    colSpan?: number;
    rowSpan?: number;
}
export interface IWorkbookFrozenPane {
    rows: number;
    columns: number;
}
export interface IWorkbook {
    sheets: IWorkSheet[];
    application?: string;
    company?: string;
    creator?: string;
    created?: Date;
    lastModifiedBy?: string;
    modified?: Date;
    activeWorksheet?: number;
    styles?: IWorkbookStyle[];
    reservedContent?: any;
    definedNames?: IDefinedName[];
    tables?: IWorkbookTable[];
    colorThemes?: string[];
}
export interface IWorkbookStyle {
    format?: string;
    basedOn?: IWorkbookStyle;
    font?: IWorkbookFont;
    hAlign?: HAlign;
    vAlign?: VAlign;
    indent?: number;
    borders?: IWorkbookBorder;
    fill?: IWorkbookFill;
    wordWrap?: boolean;
}
export interface IWorkbookFont {
    family?: string;
    size?: number;
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    color?: any;
}
export interface IWorkbookBorder {
    top?: IWorkbookBorderSetting;
    bottom?: IWorkbookBorderSetting;
    left?: IWorkbookBorderSetting;
    right?: IWorkbookBorderSetting;
    diagonal?: IWorkbookBorderSetting;
}
export interface IWorkbookBorderSetting {
    color?: any;
    style?: BorderStyle;
}
export interface IWorkbookFill {
    color?: any;
}
export interface ITableIndex {
    row: number;
    col: number;
    absCol: boolean;
    absRow: boolean;
}
export interface ITableAddress {
    row: number;
    col: number;
    absCol: boolean;
    absRow: boolean;
}
export interface IDefinedName {
    name: string;
    value: any;
    sheetName?: string;
}
export interface IWorkbookTable {
    name: string;
    ref: string;
    showHeaderRow: boolean;
    showTotalRow: boolean;
    showBandedColumns: boolean;
    style: IWorkbookTableStyle;
    showBandedRows: boolean;
    showFirstColumn: boolean;
    showLastColumn: boolean;
    columns: IWorkbookTableColumn[];
}
export interface IWorkbookTableColumn {
    name: string;
    totalRowLabel?: string;
    totalRowFunction?: string;
    showFilterButton?: boolean;
}
export interface IWorkbookTableStyle {
    name: string;
    wholeTableStyle?: IWorkbookTableCommonStyle;
    firstBandedColumnStyle?: IWorkbookTableBandedStyle;
    secondBandedColumnStyle?: IWorkbookTableBandedStyle;
    firstBandedRowStyle?: IWorkbookTableBandedStyle;
    secondBandedRowStyle?: IWorkbookTableBandedStyle;
    firstColumnStyle?: IWorkbookTableCommonStyle;
    lastColumnStyle?: IWorkbookTableCommonStyle;
    headerRowStyle?: IWorkbookTableCommonStyle;
    totalRowStyle?: IWorkbookTableCommonStyle;
    firstHeaderCellStyle?: IWorkbookTableCommonStyle;
    lastHeaderCellStyle?: IWorkbookTableCommonStyle;
    firstTotalCellStyle?: IWorkbookTableCommonStyle;
    lastTotalCellStyle?: IWorkbookTableCommonStyle;
}
export interface IWorkbookTableCommonStyle extends IWorkbookStyle {
    borders?: IWorkbookTableBorder;
}
export interface IWorkbookTableBandedStyle extends IWorkbookTableCommonStyle {
    size?: number;
}
export interface IWorkbookTableBorder extends IWorkbookBorder {
    vertical?: IWorkbookBorderSetting;
    horizontal?: IWorkbookBorderSetting;
}
export declare enum HAlign {
    General = 0,
    Left = 1,
    Center = 2,
    Right = 3,
    Fill = 4,
    Justify = 5,
}
export declare enum VAlign {
    Top = 0,
    Center = 1,
    Bottom = 2,
    Justify = 3,
}
export declare enum BorderStyle {
    None = 0,
    Thin = 1,
    Medium = 2,
    Dashed = 3,
    Dotted = 4,
    Thick = 5,
    Double = 6,
    Hair = 7,
    MediumDashed = 8,
    ThinDashDotted = 9,
    MediumDashDotted = 10,
    ThinDashDotDotted = 11,
    MediumDashDotDotted = 12,
    SlantedMediumDashDotted = 13,
}
