import * as wjcPdf from 'wijmo/wijmo.pdf';
import * as wjcGrid from 'wijmo/wijmo.grid';
import * as wjcCore from 'wijmo/wijmo';
export declare enum ScaleMode {
    ActualSize = 0,
    PageWidth = 1,
    SinglePage = 2,
}
export declare enum ExportMode {
    All = 0,
    Selection = 1,
}
export interface ICellStyle {
    backgroundColor?: string;
    borderColor?: string;
    color?: string;
    font?: any;
}
export interface IFlexGridStyle {
    cellStyle?: ICellStyle;
    altCellStyle?: ICellStyle;
    groupCellStyle?: ICellStyle;
    headerCellStyle?: ICellStyle;
    footerCellStyle?: ICellStyle;
    errorCellStyle?: ICellStyle;
}
export interface IFlexGridDrawSettings {
    customCellContent?: boolean;
    embeddedFonts?: wjcPdf.IPdfFontFile[];
    exportMode?: ExportMode;
    formatItem?: Function;
    maxPages?: number;
    repeatMergedValuesAcrossPages?: boolean;
    recalculateStarWidths?: boolean;
    styles?: IFlexGridStyle;
}
export interface IFlexGridExportSettings extends IFlexGridDrawSettings {
    scaleMode?: ScaleMode;
    documentOptions?: any;
}
export declare class PdfFormatItemEventArgs extends wjcGrid.CellRangeEventArgs {
    private _canvas;
    private _cell;
    private _clientRect;
    private _contentRect;
    private _textTop;
    private _style;
    private _getFormattedCell;
    constructor(p: wjcGrid.GridPanel, rng: wjcGrid.CellRange, cell: HTMLElement, canvas: wjcPdf.PdfPageArea, clientRect: wjcCore.Rect, contentRect: wjcCore.Rect, textTop: number, style: ICellStyle, getFormattedCell?: Function);
    cancelBorders: boolean;
    readonly canvas: wjcPdf.PdfPageArea;
    readonly cell: HTMLElement;
    readonly clientRect: wjcCore.Rect;
    readonly contentRect: wjcCore.Rect;
    getFormattedCell(): HTMLElement;
    readonly style: ICellStyle;
    readonly textTop: number;
}
export declare class FlexGridPdfConverter {
    private static BorderWidth;
    private static DefaultDrawSettings;
    private static DefaultExportSettings;
    static draw(flex: wjcGrid.FlexGrid, doc: wjcPdf.PdfDocument, width?: number, height?: number, settings?: IFlexGridDrawSettings): void;
    static drawToPosition(flex: wjcGrid.FlexGrid, doc: wjcPdf.PdfDocument, point: wjcCore.Point, width?: number, height?: number, settings?: IFlexGridDrawSettings): void;
    static export(flex: wjcGrid.FlexGrid, fileName: string, settings?: IFlexGridExportSettings): void;
    private static _draw(flex, doc, point, width, height, settings);
    private static _getScaleFactor(gr, scaleMode, rect);
    private static _getPages(gr, ranges, rect, settings, isPositionedMode, scaleFactor);
    private static _getGridRenderer(flex, settings, range, borderWidth, lastPage);
}
