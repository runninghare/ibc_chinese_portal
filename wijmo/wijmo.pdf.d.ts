import * as wjcCore from 'wijmo/wijmo';
import * as wjcSelf from 'wijmo/wijmo.pdf';
declare global  {
    interface Function {
        __super__: any;
        __proto__: any;
    }
}
export declare enum PdfLineCapStyle {
    Butt = 0,
    Round = 1,
    Square = 2,
}
export declare enum PdfLineJoinStyle {
    Miter = 0,
    Round = 1,
    Bevel = 2,
}
export declare enum PdfFillRule {
    NonZero = 0,
    EvenOdd = 1,
}
export declare enum PdfPageOrientation {
    Portrait = 0,
    Landscape = 1,
}
export declare enum PdfImageHorizontalAlign {
    Left = 0,
    Center = 1,
    Right = 2,
}
export declare enum PdfImageVerticalAlign {
    Top = 0,
    Center = 1,
    Bottom = 2,
}
export declare enum PdfTextHorizontalAlign {
    Left = 0,
    Center = 1,
    Right = 2,
    Justify = 3,
}
export declare enum _PdfTextBaseline {
    Top = 0,
    Alphabetic = 1,
}
export declare enum PdfPageSize {
    A0 = 0,
    A1 = 1,
    A2 = 2,
    A3 = 3,
    A4 = 4,
    A5 = 5,
    A6 = 6,
    A7 = 7,
    A8 = 8,
    A9 = 9,
    A10 = 10,
    B0 = 11,
    B1 = 12,
    B2 = 13,
    B3 = 14,
    B4 = 15,
    B5 = 16,
    B6 = 17,
    B7 = 18,
    B8 = 19,
    B9 = 20,
    B10 = 21,
    C0 = 22,
    C1 = 23,
    C2 = 24,
    C3 = 25,
    C4 = 26,
    C5 = 27,
    C6 = 28,
    C7 = 29,
    C8 = 30,
    C9 = 31,
    C10 = 32,
    RA0 = 33,
    RA1 = 34,
    RA2 = 35,
    RA3 = 36,
    RA4 = 37,
    SRA0 = 38,
    SRA1 = 39,
    SRA2 = 40,
    SRA3 = 41,
    SRA4 = 42,
    Executive = 43,
    Folio = 44,
    Legal = 45,
    Letter = 46,
    Tabloid = 47,
}
export interface _IPdfTextFlowCtxState {
    xo: number;
    yo: number;
    lineGap: number;
}
export interface IPdfTextSettings {
    align?: PdfTextHorizontalAlign;
    lineBreak?: boolean;
    width?: number;
    height?: number;
    ellipsis?: any;
    columns?: number;
    columnGap?: number;
    indent?: number;
    paragraphGap?: number;
    lineGap?: number;
    wordSpacing?: number;
    characterSpacing?: number;
    fill?: boolean;
    stroke?: boolean;
    link?: string;
    underline?: boolean;
    strike?: boolean;
    continued?: boolean;
}
export interface IPdfTextDrawSettings extends IPdfTextSettings {
    font?: PdfFont;
    pen?: any;
    brush?: any;
    _baseline?: _PdfTextBaseline;
}
export interface IPdfTextMeasurementSettings extends IPdfTextSettings {
    includeLastLineExternalLeading?: boolean;
}
export interface IPdfImageDrawSettings {
    width?: number;
    height?: number;
    stretchProportionally?: boolean;
    align?: PdfImageHorizontalAlign;
    vAlign?: PdfImageVerticalAlign;
}
export interface IPdfSvgDrawSettings extends IPdfImageDrawSettings {
    urlResolver?: Function;
}
export interface IPdfBufferedPageRange {
    start: number;
    count: number;
}
export interface IPdfFontAttributes {
    cursive?: boolean;
    fantasy?: boolean;
    monospace?: boolean;
    serif?: boolean;
    sansSerif?: boolean;
}
export interface IPdfFontFile extends IPdfFontAttributes {
    source: any;
    name: string;
    style?: string;
    weight?: string;
    family?: string;
}
export interface IPdfDocumentInfo {
    author?: string;
    creationDate?: Date;
    keywords?: string;
    modDate?: Date;
    subject?: string;
    title?: string;
}
export interface IPdfPageMargins {
    bottom: number;
    left: number;
    right: number;
    top: number;
}
export interface IPdfPageSettings {
    layout?: PdfPageOrientation;
    margins?: IPdfPageMargins;
    size?: any;
}
export interface IPdfTextMeasurementInfo {
    size: wjcCore.Size;
    charCount: number;
}
export declare var _Errors: {
    InvalidArg: (name: string) => string;
    InvalidFormat: (value: string) => string;
    ValueCannotBeEmpty: (name: string) => string;
    PathStarted: string;
    BufferPagesMustBeEnabled: string;
    AbstractMethod: string;
    FontNameMustBeSet: string;
    FontSourceMustBeStringArrayBuffer: string;
    FontSourceMustBeString: string;
    FontSourceMustBeArrayBuffer: string;
    EmptyUrl: string;
    UndefinedMimeType: string;
    InvalidImageDataUri: string;
    InvalidImageFormat: string;
};
export declare var _IE: boolean;
export declare function saveBlob(blob: Blob, fileName: string): void;
export declare function ptToPx(value: number): number;
export declare function pxToPt(value: number): number;
export declare function _asColor(colorOrString: any, clone?: boolean): wjcCore.Color;
export declare function _asPdfPen(penOrColor: any, nullOK?: boolean): PdfPen;
export declare function _asPdfBrush(brushOrColor: any, nullOK?: boolean): PdfBrush;
export declare function _asPdfFont(font: PdfFont, nullOK?: boolean): PdfFont;
export declare function _asPt(value: any, emptyOK?: boolean, emptyValue?: number): number;
export declare function _formatMacros(str: string, dict: any): string;
export declare function _compare(a: any, b: any): boolean;
export declare function _shallowCopy(src: any): any;
export declare function _toTitleCase(value: string): string;
export declare class PdfDashPattern {
    private _dash;
    private _gap;
    private _phase;
    constructor(dash?: number, gap?: number, phase?: number);
    dash: number;
    gap: number;
    phase: number;
    clone(): PdfDashPattern;
    equals(value: PdfDashPattern): boolean;
}
export declare class PdfBrush {
    clone(): PdfBrush;
    equals(value: PdfBrush): boolean;
    _getBrushObject(area: PdfPageArea): any;
}
export declare class PdfGradientStop {
    private _offset;
    private _color;
    private _opacity;
    constructor(offset?: number, color?: any, opacity?: number);
    offset: number;
    color: wjcCore.Color;
    opacity: number;
    clone(): PdfGradientStop;
    equals(value: PdfGradientStop): boolean;
}
export declare class PdfGradientBrush extends PdfBrush {
    private _opacity;
    private _stops;
    constructor(stops?: PdfGradientStop[], opacity?: number);
    opacity: number;
    stops: PdfGradientStop[];
    equals(value: PdfGradientBrush): boolean;
    private _cloneStopsArray(value);
}
export declare class PdfLinearGradientBrush extends PdfGradientBrush {
    private _x1;
    private _y1;
    private _x2;
    private _y2;
    constructor(x1: number, y1: number, x2: number, y2: number, stops: PdfGradientStop[], opacity?: number);
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    clone(): PdfLinearGradientBrush;
    equals(value: PdfLinearGradientBrush): boolean;
    _getBrushObject(area: PdfPageArea): any;
}
export declare class PdfRadialGradientBrush extends PdfGradientBrush {
    private _x1;
    private _y1;
    private _r1;
    private _x2;
    private _y2;
    private _r2;
    constructor(x1: number, y1: number, r1: number, x2: number, y2: number, r2: number, stops: PdfGradientStop[], opacity?: number);
    x1: number;
    y1: number;
    r1: number;
    x2: number;
    y2: number;
    r2: number;
    clone(): PdfRadialGradientBrush;
    equals(value: PdfRadialGradientBrush): boolean;
    _getBrushObject(area: PdfPageArea): any;
}
export declare class PdfSolidBrush extends PdfBrush {
    private _color;
    constructor(color?: any);
    color: wjcCore.Color;
    clone(): PdfSolidBrush;
    equals(value: PdfSolidBrush): boolean;
    _getBrushObject(area: PdfPageArea): wjcCore.Color;
}
export declare class PdfPen {
    private _color;
    private _brush;
    private _width;
    private _cap;
    private _join;
    private _miterLimit;
    private _dashPattern;
    constructor(colorOrBrushOrOptions?: any, width?: number, dashPattern?: PdfDashPattern, cap?: PdfLineCapStyle, join?: PdfLineJoinStyle, miterLimit?: number);
    color: wjcCore.Color;
    brush: PdfBrush;
    width: number;
    cap: PdfLineCapStyle;
    join: PdfLineJoinStyle;
    miterLimit: number;
    dashPattern: PdfDashPattern;
    clone(): PdfPen;
    equals(value: PdfPen): boolean;
}
export declare class PdfFont {
    static _DEF_NATIVE_NAME: string;
    static _DEF_FAMILY_NAME: string;
    static _KNOWN_WEIGHTS: {
        'normal': number;
        'bold': number;
        '100': number;
        '200': number;
        '300': number;
        '400': number;
        '500': number;
        '600': number;
        '700': number;
        '800': number;
        '900': number;
    };
    static _KNOWN_STYLES: {
        'normal': number;
        'italic': number;
        'oblique': number;
    };
    static _DEF_PDFKIT_FONT: wjcSelf.PdfFont;
    static _DEF_FONT: wjcSelf.PdfFont;
    private _family;
    private _size;
    private _style;
    private _weight;
    constructor(family?: string, size?: number, style?: string, weight?: string);
    family: string;
    size: number;
    style: string;
    weight: string;
    clone(): PdfFont;
    equals(value: PdfFont): boolean;
}
export declare class _PdfFontRegistrar {
    private _fonts;
    private _weightNameToNum;
    private _doc;
    private _findFontCache;
    private _internalFontNames;
    constructor(doc: any);
    registerFont(font: IPdfFontFile): string;
    findFont(name: string, style?: string, weight?: string): string;
    private _normalizeFontSelector(name, style?, weight?);
    private _findFont(name, style?, weight?);
    private _findFontWeightFallback(name, style, weight, availableWeights?);
    private _makeInternalName(ns);
}
export declare class PdfPageArea {
    _pdfdoc: PdfDocument;
    _offset: wjcCore.Point;
    private _graphics;
    private _drawingText;
    private _ctxProps;
    constructor();
    x: number;
    y: number;
    lineGap: number;
    readonly height: number;
    readonly width: number;
    readonly paths: PdfPaths;
    drawText(text: string, x?: number, y?: number, options?: IPdfTextDrawSettings): IPdfTextMeasurementInfo;
    drawImage(url: string, x?: number, y?: number, options?: IPdfImageDrawSettings): PdfPageArea;
    drawSvg(url: string, x?: number, y?: number, options?: IPdfSvgDrawSettings): PdfPageArea;
    lineHeight(font?: PdfFont): number;
    measureText(text: string, font?: PdfFont, options?: IPdfTextMeasurementSettings): IPdfTextMeasurementInfo;
    moveDown(lines?: number, font?: PdfFont): PdfPageArea;
    moveUp(lines?: number, font?: PdfFont): PdfPageArea;
    scale(xFactor: number, yFactor?: number, origin?: wjcCore.Point): PdfPageArea;
    translate(x: number, y: number): PdfPageArea;
    transform(a: number, b: number, c: number, d: number, e: number, f: number): PdfPageArea;
    rotate(angle: number, origin?: wjcCore.Point): PdfPageArea;
    _assertPathStarted(): void;
    _initialize(doc: PdfDocument, xo: number, yo: number): void;
    _isDrawingText(): boolean;
    private _switchCtx();
    private _saveCtx();
    private _textOptionsToNative(value);
}
export declare class PdfRunningTitleDeclarativeContent {
    private _font;
    private _text;
    private _brush;
    constructor(text?: string, font?: PdfFont, brushOrColor?: any);
    font: PdfFont;
    text: string;
    brush: PdfBrush;
    clone(): PdfRunningTitleDeclarativeContent;
    equals(value: PdfRunningTitleDeclarativeContent): boolean;
}
export declare class PdfRunningTitle extends PdfPageArea {
    private _height;
    private _declarative;
    _heightChanged: wjcCore.Event;
    constructor(options?: any);
    declarative: PdfRunningTitleDeclarativeContent;
    height: number;
    drawText(text: any, x?: any, y?: any, options?: IPdfTextDrawSettings): IPdfTextMeasurementInfo;
}
export declare class _PdfImageHelper {
    private static DATAURI_CACHE;
    static getDataUri(url: string): string;
    private static _toBase64(buffer);
}
export declare class PdfPaths {
    private _doc;
    private _offset;
    private _pathBuffer;
    constructor(doc: PdfDocument, offset: wjcCore.Point);
    moveTo(x: number, y: number): PdfPaths;
    lineTo(x: number, y: number): PdfPaths;
    quadraticCurveTo(cpx: number, cpy: number, x: number, y: number): PdfPaths;
    bezierCurveTo(cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number): PdfPaths;
    svgPath(path: string): PdfPaths;
    closePath(): PdfPaths;
    rect(x: number, y: number, width: number, height: number): PdfPaths;
    roundedRect(x: number, y: number, width: number, height: number, cornerRadius?: number): PdfPaths;
    ellipse(x: number, y: number, radiusX: number, radiusY?: number): PdfPaths;
    circle(x: number, y: number, radius: number): PdfPaths;
    polygon(points: number[][]): PdfPaths;
    clip(rule?: PdfFillRule): PdfPaths;
    fill(brushOrColor?: any, rule?: PdfFillRule): PdfPaths;
    fillAndStroke(brushOrColor?: any, penOrColor?: any, rule?: PdfFillRule): PdfPaths;
    stroke(penOrColor?: any): PdfPaths;
    _hasPathBuffer(): boolean;
    private _writePathBuffer();
}
export declare class _PdfSvgPathHelper {
    static offset(path: string, offset: wjcCore.Point): string;
    static scale(path: string, scale: number): string;
    private static _processPath(path, argCallback);
    private static _getTokenizer(path);
    private static _updateOffset(value, offset, cmd, cmdIdx, argIdx);
}
export declare class _XhrHelper {
    static arrayBufferAsync(url: string, success: (xhr: XMLHttpRequest, data: ArrayBuffer) => void, error?: (xhr: XMLHttpRequest) => void): void;
    static arrayBuffer(url: string, error?: (xhr: XMLHttpRequest) => void): ArrayBuffer;
    static text(url: string, error?: (xhr: XMLHttpRequest) => void): string;
    private static _getData(url, settings, success, error?);
}
export declare class PdfDocumentEndedEventArgs extends wjcCore.EventArgs {
    private _blob;
    constructor(blob: Blob);
    readonly blob: Blob;
}
export declare class PdfDocument extends PdfPageArea {
    private _doc;
    private _docInitialized;
    private _compress;
    private _bufferPages;
    private _chunks;
    private _fontReg;
    private _pageIndex;
    private _ehOnPageAdded;
    private _ehOnPageAdding;
    private _ehOnDocData;
    private _ehOnDocEnding;
    private _ehOnDocEnded;
    private _header;
    private _footer;
    private _graphicsStack;
    private _currentGS;
    private _defPen;
    private _defBrush;
    private _curFont;
    private _defFont;
    constructor(options?: any);
    readonly compress: boolean;
    readonly bufferPages: boolean;
    info: IPdfDocumentInfo;
    readonly header: PdfRunningTitle;
    readonly footer: PdfRunningTitle;
    pageIndex: number;
    pageSettings: IPdfPageSettings;
    ended: wjcCore.Event;
    pageAdded: wjcCore.Event;
    onEnded(args: PdfDocumentEndedEventArgs): void;
    onPageAdded(args: wjcCore.EventArgs): void;
    dispose(): void;
    readonly currentPageSettings: IPdfPageSettings;
    addPage(settings?: IPdfPageSettings): PdfDocument;
    bufferedPageRange(): IPdfBufferedPageRange;
    end(): void;
    setBrush(brushOrColor: any): PdfDocument;
    setPen(penOrColor: any): PdfDocument;
    setFont(font: PdfFont): PdfDocument;
    _getFont(): PdfFont;
    registerFont(font: IPdfFontFile): PdfDocument;
    registerFontAsync(font: IPdfFontFile, callback: Function): void;
    saveState(): PdfDocument;
    restoreState(): PdfDocument;
    private _runtimeProperties;
    _copy(key: string, value: any): boolean;
    readonly _document: any;
    _switchTextFlowCtx(state: _IPdfTextFlowCtxState): void;
    _getTextFlowCtxState(): _IPdfTextFlowCtxState;
    _toggleBrush(brush?: PdfBrush): void;
    _togglePen(pen?: PdfPen): void;
    _toggleFont(font?: PdfFont): void;
    private _onDocData(chunk);
    private _onDocEnding();
    private _onDocEnded();
    private _onPageAdding(doc, options);
    private _onPageAdded(doc);
    private _assertAreasPathStarted();
    private _pageSettingsToNative(pageSettings);
    private _processHeadersFooters();
    private _renderHeaderFooter(title, macros, isHeader);
    private _renderHeaderFooterPart(title, text, alignment, isHeader);
    private _setCurBrush(brush);
    private _setCurFont(font);
    private _setCurPen(pen);
    private _setNativeDocBrush(brush, strokeOrFill);
    private _resetAreasOffset(doc);
}
export declare type _TDictionary<T> = {
    [key: string]: T;
};
export declare function _compressSpaces(value: string): string;
export declare function _resolveUrlIfRelative(url: string, urlResolver: (url: string) => string): string;
export interface _ISvgCssPropertyValue {
    value: string;
    important: boolean;
}
export declare class _SvgCssRule {
    selector: string;
    declarations: _TDictionary<_ISvgCssPropertyValue>;
    constructor(selector: string, declaration: string);
    private _fillDeclarations(declaration);
}
export declare class _SvgCssHelper {
    static matchesSelector(node: Element, selector: string): boolean;
    static getSpecificity(selector: string): number;
    static getComputedStyle(node: SVGElement, registeredRules: _TDictionary<_SvgCssRule>): _TDictionary<string>;
    static registerFontFace(doc: PdfDocument, rule: _SvgCssRule, urlResolver?: (url: string) => string): void;
}
export declare enum _SvgNumConversion {
    Default = 1,
    None = 2,
    Px = 3,
}
export declare enum _SvgLengthContext {
    Width = 1,
    Height = 2,
    Other = 3,
}
export declare enum _SvgAttrType {
    Number = 1,
    String = 2,
}
export declare class _SvgAttr<T> {
    static parseValue(value: any, attrType: _SvgAttrType, viewPort: wjcCore.Size, lCtx: _SvgLengthContext, numConv: _SvgNumConversion): any;
    private _owner;
    private _value;
    private _defValue;
    private _propName;
    private _propType;
    private _searchValue;
    private _inheritable;
    private _pCtx;
    private _nc;
    constructor(owner: _SvgElementBase, propName: string, propType: _SvgAttrType, defValue?: any, nc?: wjcSelf._SvgNumConversion, lCtx?: wjcSelf._SvgLengthContext, inheritable?: boolean);
    readonly hasVal: boolean;
    val: T;
    protected readonly _val: any;
    reset(): void;
    protected _parse(value: any, nc?: _SvgNumConversion): any;
}
export declare class _SvgNumAttr extends _SvgAttr<number> {
    constructor(owner: _SvgElementBase, propName: string, defValue?: any, nc?: wjcSelf._SvgNumConversion, pCtx?: wjcSelf._SvgLengthContext, inheritable?: boolean);
}
export declare class _SvgStrAttr extends _SvgAttr<string> {
    constructor(owner: _SvgElementBase, propName: string, defValue?: any, inheritable?: boolean);
}
export declare class _SvgColorAttr extends _SvgAttr<string> {
    constructor(owner: _SvgElementBase, propName: string, defValue?: any, inheritable?: boolean);
    asHref(): string;
    protected _parse(value: any): any;
}
export declare class _SvgDashArrayAttr extends _SvgAttr<number[]> {
    constructor(owner: _SvgElementBase);
    protected _parse(value: any): number[];
}
export declare class _SvgFillRuleAttr extends _SvgAttr<PdfFillRule> {
    constructor(owner: _SvgElementBase, propName: string);
    protected _parse(value: string): PdfFillRule;
}
export declare class _SvgHRefAttr extends _SvgStrAttr {
    constructor(owner: _SvgElementBase, propName: string);
    protected _parse(value: string): string;
}
export declare class _SvgIdRefAttr extends _SvgHRefAttr {
    protected _parse(value: string): string;
}
export declare class _SvgPointsArrayAttr extends _SvgAttr<wjcCore.Point[]> {
    constructor(owner: _SvgElementBase, propName: string);
    protected _parse(value: any): wjcCore.Point[];
}
export declare class _SvgTransformAttr extends _SvgAttr<((doc: PdfPageArea) => void)[]> {
    constructor(owner: _SvgElementBase);
    apply(element: _SvgElementBase): void;
    protected _parse(value: any): ((doc: PdfPageArea) => void)[];
}
export declare class _SvgTextDecorationAttr extends _SvgAttr<string[]> {
    constructor(owner: _SvgElementBase);
    protected _parse(value: any): string[];
}
export interface _ISvgViewBoxAttr {
    minX: number;
    minY: number;
    width: number;
    height: number;
}
export declare class _SvgViewboxAttr extends _SvgAttr<_ISvgViewBoxAttr> {
    constructor(owner: _SvgElementBase);
    protected _parse(value: any): _ISvgViewBoxAttr;
}
export interface _ISvgPreserveAspectRatioAttr {
    align: string;
    meet: boolean;
}
export declare class _SvgPreserveAspectRatioAttr extends _SvgAttr<_ISvgPreserveAspectRatioAttr> {
    constructor(owner: _SvgElementBase);
    protected _parse(value: any): _ISvgPreserveAspectRatioAttr;
}
export declare class _SvgScaleAttributes {
    private _owner;
    aspect: _SvgPreserveAspectRatioAttr;
    viewBox: _SvgViewboxAttr;
    constructor(owner: _SvgElementBase);
    apply(element: _SvgElementBase): wjcCore.Size;
}
export declare class _SvgStrokeAttributes {
    private _owner;
    color: _SvgColorAttr;
    dashArray: _SvgDashArrayAttr;
    dashOffset: _SvgNumAttr;
    lineCap: _SvgStrAttr;
    lineJoin: _SvgStrAttr;
    miterLimit: _SvgNumAttr;
    opacity: _SvgNumAttr;
    width: _SvgNumAttr;
    constructor(owner: _SvgElementBase);
    toPen(element?: _SvgElementBase): PdfPen;
}
export declare class _SvgFillAttributes {
    private _owner;
    color: _SvgColorAttr;
    opacity: _SvgNumAttr;
    rule: _SvgFillRuleAttr;
    constructor(owner: _SvgElementBase);
    toBrush(element?: _SvgElementBase): PdfBrush;
}
export declare class _SvgFontAttributes {
    private _owner;
    family: _SvgStrAttr;
    size: _SvgAttr<string | number>;
    style: _SvgStrAttr;
    weight: _SvgStrAttr;
    constructor(owner: _SvgElementBase);
    toFont(): PdfFont;
}
export declare class _SvgStyleAttributes {
    private _owner;
    fill: _SvgFillAttributes;
    font: _SvgFontAttributes;
    stroke: _SvgStrokeAttributes;
    clipRule: _SvgFillRuleAttr;
    constructor(owner: _SvgElementBase);
    apply(element: _SvgElementBase, fill?: boolean, stroke?: boolean): void;
}
export declare enum _SvgRenderMode {
    Render = 0,
    Ignore = 1,
    Clip = 2,
}
export interface _ISvgElementBaseCtor {
    new (ctx: _ISvgRenderContext, node: SVGElement, defRenderMode?: _SvgRenderMode): _SvgElementBase;
}
export declare class _SvgElementBase {
    private _children;
    private _attributes;
    private _parent;
    private _style;
    private _ctx;
    private _viewport;
    private _defRenderMode;
    private _curRenderMode;
    constructor(ctx: _ISvgRenderContext, node: SVGElement, defRenderMode?: wjcSelf._SvgRenderMode);
    readonly children: _SvgElementBase[];
    readonly ctx: _ISvgRenderContext;
    parent: _SvgElementBase;
    readonly style: _SvgStyleAttributes;
    viewport: wjcCore.Size;
    attr(name: string, value?: any): any;
    appendNode(node: _SvgElementBase): void;
    copyAttributesFrom(el: _SvgElementBase, except?: string[]): void;
    clone(): _SvgElementBase;
    remove(): void;
    clearAttr(name: string): void;
    render(viewPort: wjcCore.Size, renderMode?: _SvgRenderMode): void;
    readonly renderMode: _SvgRenderMode;
    protected _render(): void;
    protected _renderContent(): void;
}
export declare class _SvgClippableElementBase extends _SvgElementBase {
    private _clipPath;
    constructor(ctx: _ISvgRenderContext, node: SVGElement, defRenderMode?: wjcSelf._SvgRenderMode);
    protected _render(): void;
}
export declare class _SvgTransformableElementBase extends _SvgClippableElementBase {
    private _transform;
    constructor(ctx: _ISvgRenderContext, node: SVGElement);
    protected _render(): void;
}
export declare class _SvgShapeElementBase extends _SvgTransformableElementBase {
    protected _fill: boolean;
    protected _stroke: boolean;
    protected _renderContent(): void;
    protected _draw(): void;
}
export declare class _SvgCircleElementImpl extends _SvgShapeElementBase {
    protected _draw(): void;
}
export declare class _SvgEllipseElementImpl extends _SvgShapeElementBase {
    protected _draw(): void;
}
export declare class _SvgLineElementImpl extends _SvgShapeElementBase {
    constructor(ctx: _ISvgRenderContext, node: SVGElement);
    protected _draw(): void;
}
export declare class _SvgPathElementImpl extends _SvgShapeElementBase {
    private _d;
    constructor(ctx: _ISvgRenderContext, node: SVGElement);
    protected _renderContent(): void;
    protected _draw(): void;
}
export declare class _SvgPolylineElementImpl extends _SvgShapeElementBase {
    protected _draw(): boolean;
}
export declare class _SvgPolygonElementImpl extends _SvgPolylineElementImpl {
    protected _draw(): boolean;
}
export declare class _SvgRectElementImpl extends _SvgShapeElementBase {
    protected _draw(): void;
}
export declare class _SvgClipPathElementImpl extends _SvgElementBase {
    constructor(ctx: _ISvgRenderContext, node: SVGElement);
}
export declare class _SvgDefsElementImpl extends _SvgClippableElementBase {
    constructor(ctx: _ISvgRenderContext, node: SVGElement);
}
export declare class _SvgGElementImpl extends _SvgTransformableElementBase {
}
export declare class _SvgLinearGradientElementImpl extends _SvgElementBase {
    private _x1;
    private _x2;
    private _y1;
    private _y2;
    private _gradientUnits;
    constructor(ctx: _ISvgRenderContext, node: SVGElement);
    toBrush(element: _SvgElementBase): PdfLinearGradientBrush;
}
export declare class _SvgStopElementImpl extends _SvgElementBase {
    color: _SvgColorAttr;
    opacity: _SvgNumAttr;
    offset: _SvgStrAttr;
    constructor(ctx: _ISvgRenderContext, node: SVGElement);
}
export declare class _SvgImageElementImpl extends _SvgTransformableElementBase {
    private _x;
    private _y;
    private _width;
    private _height;
    private _href;
    private _par;
    constructor(ctx: _ISvgRenderContext, node: SVGElement);
    protected _renderContent(): void;
    private _renderSvgImage(url);
    private _renderRasterImage(url);
}
export declare class _SvgStyleElementImpl extends _SvgElementBase {
    constructor(ctx: _ISvgRenderContext, node: SVGStyleElement);
}
export declare class _SvgSvgElementImpl extends _SvgClippableElementBase {
    private _x;
    private _y;
    private _width;
    private _height;
    private _scale;
    private _overflow;
    constructor(ctx: _ISvgRenderContext, node: SVGElement);
    readonly width: _SvgNumAttr;
    readonly height: _SvgNumAttr;
    protected _render(): void;
}
export declare class _SvgSymbolElementImpl extends _SvgClippableElementBase {
    constructor(ctx: _ISvgRenderContext, node: SVGElement);
}
export declare class _SvgUseElementImpl extends _SvgElementBase {
    private _xlink;
    constructor(ctx: _ISvgRenderContext, node: SVGElement);
    protected _render(): void;
}
export interface _TextDecorator {
    decoration: _SvgTextDecorationAttr;
    style: _SvgStyleAttributes;
}
export declare class _SvgTextElementImpl extends _SvgTransformableElementBase {
    private _x;
    private _y;
    private _dx;
    private _dy;
    private _textDecoration;
    constructor(ctx: _ISvgRenderContext, node: SVGElement);
    protected _render(): void;
    protected _renderContent(): void;
    private _prepareNodes();
}
export declare class _SvgTspanElementImpl extends _SvgClippableElementBase {
    _text: string;
    _x: _SvgNumAttr;
    _y: _SvgNumAttr;
    _dx: _SvgNumAttr;
    _dy: _SvgNumAttr;
    _textDecoration: wjcSelf._SvgTextDecorationAttr;
    _decorators: _TextDecorator[];
    _cx: number;
    _cy: number;
    constructor(ctx: _ISvgRenderContext, node: SVGElement, text?: string);
    clone(): _SvgElementBase;
    _setDecorators(value: _TextDecorator[]): void;
    protected _renderContent(): void;
    private _decorate();
}
export interface _ISvgRenderContext {
    area: PdfPageArea;
    urlResolver: (url: string) => string;
    getElement: (id: string) => _SvgElementBase;
    registerCssRule: (rule: _SvgCssRule) => void;
}
export declare class _SvgRenderer {
    private _elementsById;
    private _registeredCssRules;
    private _svg;
    private _doc;
    constructor(svgString: string, area: PdfPageArea, urlResolver?: (url: string) => string);
    readonly root: _SvgSvgElementImpl;
    render(viewPort?: wjcCore.Size): void;
    private _parse(svg);
    private _buildTree(dom, tree, handleTextNodes?);
    private _getClassName(nodeName);
    private _copyAttributes(node, element);
    private _getElementById(id);
    private _registerCssRule(rule, urlResolver?);
}
