import * as wjcCore from 'wijmo/wijmo';
import * as wjcInput from 'wijmo/wijmo.input';
import * as wjcSelf from 'wijmo/wijmo.viewer';
export declare var icons: {
    paginated: string;
    print: string;
    exports: string;
    portrait: string;
    landscape: string;
    pageSetup: string;
    previousPage: string;
    nextPage: string;
    firstPage: string;
    lastPage: string;
    backwardHistory: string;
    forwardHistory: string;
    selectTool: string;
    moveTool: string;
    continuousView: string;
    singleView: string;
    fitWholePage: string;
    fitPageWidth: string;
    zoomOut: string;
    zoomIn: string;
    fullScreen: string;
    exitFullScreen: string;
    thumbnails: string;
    outlines: string;
    search: string;
    searchNext: string;
    searchPrevious: string;
    hamburgerMenu: string;
    viewMenu: string;
    searchOptions: string;
    searchLeft: string;
    searchRight: string;
    showZoomBar: string;
    rubberbandTool: string;
    magnifierTool: string;
    rotateDocument: string;
    rotatePage: string;
}, _hiddenCss: string, _commandTagAttr: string;
export declare function _pointMove(positive: boolean, pos: wjcCore.Point, detalPosOrX: wjcCore.Point | number, y?: number): wjcCore.Point;
export declare class _ActionQueue {
    private _actions;
    private _isStarted;
    private _any();
    queue(action: Function): void;
    _continue(): void;
    start(): void;
    readonly isStarted: boolean;
}
export declare function _createSvgBtn(svgContent: string): HTMLElement;
export declare function _setLandscape(pageSettings: _IPageSettings, landscape: boolean): void;
export declare function _clonePageSettings(src: _IPageSettings): _IPageSettings;
export declare function _enumToArray(enumType: any): _IEnumItem[];
export declare function _removeChildren(node: HTMLElement, condition?: (ele: Element) => boolean): void;
export declare function _toDOMs(html: string): DocumentFragment;
export declare function _toDOM(html: string): HTMLElement;
export declare function _addEvent(elm: any, evType: string, fn: Function, useCapture?: boolean): void;
export declare function _removeEvent(elm: any, evType: string, fn: Function): void;
export declare function _checkImageButton(button: HTMLElement, checked: boolean): void;
export declare function _disableImageButton(button: HTMLElement, disabled: boolean): void;
export declare function _showImageButton(button: HTMLElement, visible: boolean): void;
export declare function _isDisabledImageButton(button: HTMLElement): boolean;
export declare function _isCheckedImageButton(button: HTMLElement): boolean;
export declare function _addWjHandler(key: string, event: wjcCore.Event, func: wjcCore.IEventHandler, self?: any): void;
export declare function _removeAllWjHandlers(key: string, event: wjcCore.Event): void;
export declare function _getErrorMessage(reason: any): string;
export declare function _checkSeparatorShown(container: HTMLElement): void;
export declare function _twipToPixel(value: number): number;
export declare function _pixelToTwip(value: number): number;
export declare function _hasScrollbar(element: Element, isHorizontal?: boolean): boolean;
export declare function _transformSvg(svg: SVGElement, width: number, height: number, zoomFactor?: number, rotateAngle?: _RotateAngle): SVGElement;
export declare function _getTransformedPosition(bound: _IRect, size: _ISize, rotateAngle: _RotateAngle, zoomFactor: number): wjcCore.Point;
export declare function _getRotatedSize(size: _ISize, rotateAngle: _RotateAngle): _ISize;
export declare function _getPositionByHitTestInfo(hitTestInfo: _IHitTestInfo): _IDocumentPosition;
export declare class _DocumentSource {
    static _abstractMethodException: string;
    private _features;
    private _paginated;
    private _hasOutlines;
    private _pageCount;
    private _service;
    private _supportedExportDescriptions;
    private _pageSettings;
    private _isLoadCompleted;
    private _isDisposed;
    private _errors;
    private _expiredDateTime;
    private _executionDateTime;
    private _initialPosition;
    private static _isMobileEnvironment;
    private static _isIOSEnvironment;
    pageCountChanged: wjcCore.Event;
    disposed: wjcCore.Event;
    pageSettingsChanged: wjcCore.Event;
    loading: wjcCore.Event;
    loadCompleted: wjcCore.Event;
    queryLoadingData: wjcCore.Event;
    onQueryLoadingData(e: QueryLoadingDataEventArgs): void;
    constructor(options: _IDocumentOptions);
    _updateIsLoadCompleted(value: boolean): void;
    _updateIsDisposed(value: boolean): void;
    _getIsDisposed(): boolean;
    _checkHasOutlines(data: _IDocumentStatus): boolean;
    _checkIsLoadCompleted(data: _IDocumentStatus): boolean;
    static _isMobile(): boolean;
    static _isIOS(): boolean;
    readonly executionDateTime: Date;
    readonly expiredDateTime: Date;
    readonly errors: string[];
    readonly isLoadCompleted: boolean;
    readonly isDisposed: boolean;
    readonly features: _IDocumentFeatures;
    readonly pageSettings: _IPageSettings;
    onPageSettingsChanged(e?: wjcCore.EventArgs): void;
    onLoadCompleted(e?: wjcCore.EventArgs): void;
    onLoading(e?: wjcCore.EventArgs): void;
    onDisposed(e?: wjcCore.EventArgs): void;
    setPageSettings(pageSettings: _IPageSettings): IPromise;
    _updatePageSettings(newValue: _IPageSettings): void;
    readonly _innerService: _DocumentService;
    readonly paginated: boolean;
    readonly hasOutlines: boolean;
    readonly pageCount: number;
    initialPosition: _IDocumentPosition;
    readonly service: _IDocumentService;
    getSupportedExportDescriptions(): IPromise;
    getBookmark(name: string): IPromise;
    executeCustomAction(actionString: string): IPromise;
    getOutlines(): IPromise;
    getFeatures(): IPromise;
    dispose(): IPromise;
    load(): IPromise;
    _updateExecutionInfo(data: _IExecutionInfo): void;
    _updateDocumentStatus(data: _IDocumentStatus): void;
    _getExecutionDateTime(data: _IExecutionInfo): Date;
    _getExpiredDateTime(data: _IDocumentStatus | _IExecutionInfo): Date;
    _getPageCount(data: _IDocumentStatus): number;
    _updatePageCount(value: number): void;
    getStatus(): IPromise;
    _createDocumentService(options: _IDocumentService): _DocumentService;
    onPageCountChanged(e?: wjcCore.EventArgs): void;
    print(rotations?: _RotateAngle[]): void;
    private _removeScript(doc);
    private _rotate(doc, rotations);
    renderToFilter(options: Object): IPromise;
    getRenderToFilterUrl(options: Object): string;
    search(searchOptions: _ISearchOptions): IPromise;
}
export declare function _statusJsonReviver(k: string, v: any): any;
export interface _IDocumentStatus {
    status: string;
    errorList: string[];
    progress: number;
    pageCount: number;
    expiredDateTime: Date;
    hasOutlines: boolean;
    initialPosition: any;
}
export interface _IDocumentFeatures {
    paginated: boolean;
    nonPaginated: boolean;
    textSearchInPaginatedMode: boolean;
    pageSettings: boolean;
}
export interface _IExecutionInfo {
    path: string;
    loadedDateTime: Date;
    expiredDateTime: Date;
    pageSettings?: _IPageSettings;
    features?: _IDocumentFeatures;
    status?: _IDocumentStatus;
    outlinesLocation: string;
    statusLocation: string;
    pageSettingsLocation: string;
    featuresLocation: string;
    supportedFormatsLocation: string;
}
export interface _IPageSettings {
    paginated: boolean;
    height: _Unit;
    width: _Unit;
    bottomMargin: _Unit;
    landscape: boolean;
    leftMargin: _Unit;
    paperSize: _PaperKind;
    rightMargin: _Unit;
    topMargin: _Unit;
}
export interface _ISearchResult {
    nearText: string;
    positionInNearText: number;
    boundsList: _IRect[];
    pageIndex: number;
}
export interface _IOutlineNode {
    caption: string;
    children: _IOutlineNode[];
    level: number;
    target: string;
    position?: _IDocumentPosition;
}
export interface _IRect {
    x: number;
    y: number;
    width: number;
    height: number;
}
export interface _IDocumentPosition {
    pageBounds?: _IRect;
    pageIndex: number;
}
export interface _IExportDescription {
    name: string;
    format: string;
    optionDescriptions?: _IExportOptionDescription[];
}
export interface _IExportOptionDescription {
    name: string;
    type: string;
    nullable: boolean;
    defaultValue: any;
    allowedValues?: string[];
    group: string;
}
export interface _IDocumentService {
    serviceUrl: string;
    filePath: string;
}
export interface _IDocumentOptions extends _IDocumentService {
    paginated?: boolean;
}
export declare class _DocumentService implements _IDocumentService {
    private _url;
    private _documentPath;
    constructor(options: _IDocumentService);
    readonly serviceUrl: string;
    readonly filePath: string;
    getStatus(): IPromise;
    setPageSettings(pageSettings: _IPageSettings): IPromise;
    getBookmark(name: string): IPromise;
    executeCustomAction(actionString: string): IPromise;
    load(data?: any): IPromise;
    dispose(): IPromise;
    getOutlines(): IPromise;
    renderToFilter(options: Object): IPromise;
    search(searchOptions: _ISearchOptions): IPromise;
    getRenderToFilterUrl(options: Object): string;
    getSupportedExportDescriptions(): IPromise;
    getFeatures(): IPromise;
}
export declare function _pageSettingsJsonReviver(k: string, v: any): any;
export declare function _strEndsWith(text: string, suffix: string): boolean;
export declare function _appendQueryString(url: string, queries: Object): string;
export declare function _joinUrl(...data: (string | string[])[]): string;
export declare function _joinStringUrl(data: string[]): string[];
export declare function _prepareStringUrl(data: string): string[];
export declare function _httpRequest(url: string, settings?: _IHttpRequest): XMLHttpRequest;
export declare function _objToParams(obj: Object): string;
export interface _IHttpRequest {
    method?: string;
    data?: any;
    async?: boolean;
    cache?: boolean;
    success?: (xhr: XMLHttpRequest) => void;
    user?: string;
    password?: string;
    requestHeaders?: any;
    beforeSend?: (xhr: XMLHttpRequest) => void;
    error?: (xhr: XMLHttpRequest) => void;
    complete?: (xhr: XMLHttpRequest) => void;
}
export declare function _disableCache(url: string): string;
export declare enum _UnitType {
    Document = 0,
    Inch = 1,
    Mm = 2,
    Pica = 3,
    Point = 4,
    Twip = 5,
    InHs = 6,
    Display = 7,
    Cm = 8,
    Dip = 9,
}
export declare class _Unit {
    static _MmPerInch: number;
    static _DocumentUnitsPerInch: number;
    static _PointsPerInch: number;
    static _TwipsPerInch: number;
    static _PicaPerInch: number;
    static _CmPerInch: number;
    static _DisplayPerInch: number;
    static _DipPerInch: number;
    private static _unitTypes;
    private static _unitTypeDic;
    private _value;
    private _units;
    private _valueInPixel;
    constructor(value: any, units?: _UnitType);
    private static _initUnitTypeDic();
    readonly value: number;
    readonly units: _UnitType;
    readonly valueInPixel: number;
    toString(): string;
    static toString(unit: _Unit): string;
    static convertValue(value: number, from: _UnitType, to: _UnitType): number;
}
export interface IPromise {
    then(onFulfilled?: (value?: any) => any, onRejected?: (reason?: any) => any): IPromise;
    catch(onRejected: (reason?: any) => any): IPromise;
}
export declare class _Promise implements IPromise {
    private _callbacks;
    then(onFulfilled?: (value?: any) => any, onRejected?: (reason?: any) => any): IPromise;
    catch(onRejected: (reason?: any) => any): IPromise;
    resolve(value?: any): void;
    reject(reason?: any): void;
    onFulfilled(value: any): void;
    onRejected(reason: any): void;
}
export declare class _CompositedPromise extends _Promise {
    private _promises;
    constructor(promises: IPromise[]);
    _init(): void;
}
export declare enum _PaperKind {
    Custom = 0,
    Letter = 1,
    LetterSmall = 2,
    Tabloid = 3,
    Ledger = 4,
    Legal = 5,
    Statement = 6,
    Executive = 7,
    A3 = 8,
    A4 = 9,
    A4Small = 10,
    A5 = 11,
    B4 = 12,
    B5 = 13,
    Folio = 14,
    Quarto = 15,
    Standard10x14 = 16,
    Standard11x17 = 17,
    Note = 18,
    Number9Envelope = 19,
    Number10Envelope = 20,
    Number11Envelope = 21,
    Number12Envelope = 22,
    Number14Envelope = 23,
    CSheet = 24,
    DSheet = 25,
    ESheet = 26,
    DLEnvelope = 27,
    C5Envelope = 28,
    C3Envelope = 29,
    C4Envelope = 30,
    C6Envelope = 31,
    C65Envelope = 32,
    B4Envelope = 33,
    B5Envelope = 34,
    B6Envelope = 35,
    ItalyEnvelope = 36,
    MonarchEnvelope = 37,
    PersonalEnvelope = 38,
    USStandardFanfold = 39,
    GermanStandardFanfold = 40,
    GermanLegalFanfold = 41,
    IsoB4 = 42,
    JapanesePostcard = 43,
    Standard9x11 = 44,
    Standard10x11 = 45,
    Standard15x11 = 46,
    InviteEnvelope = 47,
    LetterExtra = 50,
    LegalExtra = 51,
    TabloidExtra = 52,
    A4Extra = 53,
    LetterTransverse = 54,
    A4Transverse = 55,
    LetterExtraTransverse = 56,
    APlus = 57,
    BPlus = 58,
    LetterPlus = 59,
    A4Plus = 60,
    A5Transverse = 61,
    B5Transverse = 62,
    A3Extra = 63,
    A5Extra = 64,
    B5Extra = 65,
    A2 = 66,
    A3Transverse = 67,
    A3ExtraTransverse = 68,
    JapaneseDoublePostcard = 69,
    A6 = 70,
    JapaneseEnvelopeKakuNumber2 = 71,
    JapaneseEnvelopeKakuNumber3 = 72,
    JapaneseEnvelopeChouNumber3 = 73,
    JapaneseEnvelopeChouNumber4 = 74,
    LetterRotated = 75,
    A3Rotated = 76,
    A4Rotated = 77,
    A5Rotated = 78,
    B4JisRotated = 79,
    B5JisRotated = 80,
    JapanesePostcardRotated = 81,
    JapaneseDoublePostcardRotated = 82,
    A6Rotated = 83,
    JapaneseEnvelopeKakuNumber2Rotated = 84,
    JapaneseEnvelopeKakuNumber3Rotated = 85,
    JapaneseEnvelopeChouNumber3Rotated = 86,
    JapaneseEnvelopeChouNumber4Rotated = 87,
    B6Jis = 88,
    B6JisRotated = 89,
    Standard12x11 = 90,
    JapaneseEnvelopeYouNumber4 = 91,
    JapaneseEnvelopeYouNumber4Rotated = 92,
    Prc16K = 93,
    Prc32K = 94,
    Prc32KBig = 95,
    PrcEnvelopeNumber1 = 96,
    PrcEnvelopeNumber2 = 97,
    PrcEnvelopeNumber3 = 98,
    PrcEnvelopeNumber4 = 99,
    PrcEnvelopeNumber5 = 100,
    PrcEnvelopeNumber6 = 101,
    PrcEnvelopeNumber7 = 102,
    PrcEnvelopeNumber8 = 103,
    PrcEnvelopeNumber9 = 104,
    PrcEnvelopeNumber10 = 105,
    Prc16KRotated = 106,
    Prc32KRotated = 107,
    Prc32KBigRotated = 108,
    PrcEnvelopeNumber1Rotated = 109,
    PrcEnvelopeNumber2Rotated = 110,
    PrcEnvelopeNumber3Rotated = 111,
    PrcEnvelopeNumber4Rotated = 112,
    PrcEnvelopeNumber5Rotated = 113,
    PrcEnvelopeNumber6Rotated = 114,
    PrcEnvelopeNumber7Rotated = 115,
    PrcEnvelopeNumber8Rotated = 116,
    PrcEnvelopeNumber9Rotated = 117,
    PrcEnvelopeNumber10Rotated = 118,
}
export declare class QueryLoadingDataEventArgs extends wjcCore.EventArgs {
    private _data;
    constructor(data?: any);
    readonly data: any;
}
export interface _ISearchOptions {
    text: string;
    matchCase?: boolean;
    wholeWord?: boolean;
}
export declare class _Report extends _DocumentSource {
    private _hasParameters;
    private _parameters;
    private _status;
    constructor(options: _IReportOptions);
    static getReportNames(serviceUrl: string, reportFilePath: string): IPromise;
    static getReports(serviceUrl: string, path: string, data?: any): IPromise;
    readonly reportName: string;
    statusChanged: wjcCore.Event;
    readonly hasParameters: boolean;
    readonly status: string;
    load(): IPromise;
    _updateStatus(newValue: string): void;
    cancel(): IPromise;
    onStatusChanged(e?: wjcCore.EventArgs): void;
    dispose(): IPromise;
    setParameters(parameters: Object): IPromise;
    getParameters(): IPromise;
    _getIsDisposed(): boolean;
    _updateExecutionInfo(data: _IReportExecutionInfo): void;
    _updateDocumentStatus(data: _IReportStatus): void;
    _checkIsLoadCompleted(data: _IReportStatus): boolean;
    _createDocumentService(options: _IReportService): _ReportService;
    readonly _innerService: _ReportService;
    render(): IPromise;
    executeCustomAction(actionString: string): IPromise;
}
export interface _IReportService extends _IDocumentService {
    reportName: string;
}
export interface _IReportOptions extends _IDocumentOptions, _IReportService {
}
export declare class _ReportService extends _DocumentService implements _IReportService {
    private _reportName;
    private _instanceId;
    private _status;
    private _outlinesLocation;
    private _statusLocation;
    private _pageSettingsLocation;
    private _featuresLocation;
    private _parametersLocation;
    private static _reportCommand;
    private static _instancesCommand;
    private static _customActionParam;
    private static _renderAction;
    private static _searchAction;
    private static _cancelAction;
    private static _outlinesAction;
    private static _exportAction;
    private static _parametersAction;
    private static _bookmarkAction;
    private static _pageSettingsAction;
    private static _supportedFormatsAction;
    private static _invalidReportControllerError;
    private static _invalidReportCacheControllerError;
    constructor(options: _IReportService);
    readonly isCleared: boolean;
    static getReportNames(serviceUrl: string, reportFilePath: string): IPromise;
    static getReports(serviceUrl: string, path: string, data?: any): IPromise;
    readonly reportName: string;
    getBookmark(name: string): IPromise;
    executeCustomAction(actionString: string): IPromise;
    getStatus(): IPromise;
    getDocumentStatus(): IPromise;
    _getReportCache(): IPromise;
    getParameters(): IPromise;
    _getUrlMainPart(): string;
    _getReportUrl(...params: string[]): string;
    _getReportInstancesUrl(...params: string[]): string;
    _checkReportController(promise: _Promise): boolean;
    _checkReportInstanceController(promise?: _Promise): boolean;
    _getError(xhr: XMLHttpRequest): string;
    render(data?: any): IPromise;
    load(data?: any): IPromise;
    cancel(): IPromise;
    dispose(): IPromise;
    getOutlines(): IPromise;
    renderToFilter(options: Object): IPromise;
    getRenderToFilterUrl(options: Object): string;
    search(searchOptions: _ISearchOptions): IPromise;
    setPageSettings(pageSettings: _IPageSettings): IPromise;
    setParameters(parameters: Object): IPromise;
    getSupportedExportDescriptions(): IPromise;
    getFeatures(): IPromise;
}
export declare function _parseReportExecutionInfo(json: string): _IReportExecutionInfo;
export interface _IReportStatus extends _IDocumentStatus {
    initialPosition: _IDocumentPosition;
}
export interface _IReportExecutionInfo extends _IExecutionInfo {
    id: string;
    hasParameters: boolean;
    parametersLocation: string;
}
export declare class _ExecutionStatus {
    static loaded: string;
    static rendering: string;
    static completed: string;
    static stopped: string;
    static cleared: string;
    static notFound: string;
}
export interface _IParameter {
    name: string;
    dataType: _ParameterType;
    nullable: boolean;
    allowedValues: any[];
    value: any;
    hidden: boolean;
    multiValue: boolean;
    prompt: string;
    error?: string;
}
export declare enum _ParameterType {
    Boolean = 0,
    DateTime = 1,
    Time = 2,
    Date = 3,
    Integer = 4,
    Float = 5,
    String = 6,
}
export interface ICatalogItem {
    name: string;
    path: string;
    type: CatalogItemType;
    items: ICatalogItem[];
}
export declare enum CatalogItemType {
    Folder = 0,
    File = 1,
    Report = 2,
}
export declare class _PdfDocumentSource extends _DocumentSource {
    private _status;
    constructor(options: _IDocumentService);
    readonly status: string;
    readonly _innerService: _PdfDocumentService;
    _createDocumentService(options: _IDocumentService): _PdfDocumentService;
    load(): IPromise;
    _updateStatus(newValue: string): void;
    getStatus(): IPromise;
    renderToFilter(options: Object): IPromise;
    _updateDocumentStatus(data: _IDocumentStatus): void;
}
export declare class _PdfDocumentService extends _DocumentService {
    private static _pdfCommand;
    private static _exportAction;
    private static _supportedFormatsAction;
    private static _searchAction;
    private static _invalidPdfControllerError;
    private _status;
    private _statusLocation;
    private _featuresLocation;
    _getPdfUrl(...params: string[]): string;
    _getPdfStatus(data?: any): IPromise;
    _checkPdfController(promise?: _Promise): boolean;
    dispose(): IPromise;
    load(data?: any): IPromise;
    getStatus(data?: any): IPromise;
    renderToFilter(options: Object, data?: any): IPromise;
    getRenderToFilterUrl(options: Object): string;
    getSupportedExportDescriptions(): IPromise;
    getFeatures(): IPromise;
    search(searchOptions: _ISearchOptions): IPromise;
}
export declare function _parseExecutionInfo(json: string): _IExecutionInfo;
export declare class _SearchManager {
    private _documentSource;
    private _text;
    private _matchCase;
    private _wholeWord;
    private _searchResults;
    private _currentIndex;
    private _needUpdate;
    currentChanged: wjcCore.Event;
    searchCompleted: wjcCore.Event;
    private _onCurrentChanged();
    private _onSearchCompleted();
    text: string;
    matchCase: boolean;
    wholeWord: boolean;
    readonly searchResults: _ISearchResult[];
    currentIndex: number;
    readonly current: _ISearchResult;
    private _clearResults();
    private _getSearchResults();
    documentSource: _DocumentSource;
    search(pre?: boolean): void;
}
export interface _ITouchEventsMap {
    startName: string;
    moveName: string;
    endName: string;
}
export declare function _getTouchEventMap(): _ITouchEventsMap;
export declare enum _TouchDirection {
    None = 0,
    Left = 1,
    Up = 2,
    Right = 3,
    Down = 4,
}
export declare class _TouchInfo {
    static getCenter(start: wjcCore.Point, end: wjcCore.Point): wjcCore.Point;
    static getCenterClient(startInfo: _TouchInfo, endInfo: _TouchInfo): wjcCore.Point;
    static getCenterScreen(startInfo: _TouchInfo, endInfo: _TouchInfo): wjcCore.Point;
    static getDistance(startInfo: _TouchInfo, endInfo: _TouchInfo): number;
    static _getDirection(start: _TouchInfo, end: _TouchInfo): _TouchDirection;
    private _id;
    private _target;
    private _screenX;
    private _screenY;
    private _clientX;
    private _clientY;
    private _systemTouchInfo;
    constructor(source: Touch | PointerEvent);
    readonly id: number;
    readonly systemTouchInfo: Touch | PointerEvent;
    readonly screenX: number;
    readonly screenY: number;
    readonly clientX: number;
    readonly clientY: number;
}
export declare class _SpeedReducer {
    private _timeInterval;
    private _speedInterval;
    private _timer;
    private _disposeEvents;
    timeInterval: number;
    speedInterval: number;
    stop(): void;
    start(speedX: number, speedY: number, intervalAction: (x: number, y: number) => void): void;
}
export declare enum _TouchEventType {
    Start = 0,
    Move = 1,
    End = 2,
}
export declare class _TouchEventArgs extends wjcCore.EventArgs {
    private _systemEvent;
    private _type;
    private _touchInfos;
    constructor(systemEvent: TouchEvent | PointerEvent | _TouchEventArgs);
    readonly timeStamp: number;
    readonly touchInfos: _TouchInfo[];
    readonly systemEvent: TouchEvent | PointerEvent;
    readonly target: EventTarget;
    readonly currentTarget: EventTarget;
    readonly type: _TouchEventType;
    readonly pointersCount: number;
    cancelBubble: boolean;
    preventDefault(): void;
}
export declare class _TouchEvent extends wjcCore.Event {
    raise(sender: any, args: _TouchEventArgs): void;
}
export declare class _TouchTrigger {
    private _element;
    private _disposeAction;
    private static _elementDataName;
    private static bindElement(element, trigger);
    private static unbindElement(element);
    static getTrigger(element: HTMLElement): _TouchTrigger;
    constructor(source: any);
    _onSystemTouchEvent(event: any): void;
    _createTouchEventArgs(e: any): _TouchEventArgs;
    dispose(): void;
    readonly hostElement: HTMLElement;
    _onTouchEvent(sender: any, e: _TouchEventArgs): void;
    touchMove: wjcSelf._TouchEvent;
    touchStart: wjcSelf._TouchEvent;
    touchEnd: wjcSelf._TouchEvent;
    onTouchEnd(event: _TouchEventArgs): void;
    onTouchStart(event: _TouchEventArgs): void;
    onTouchMove(event: _TouchEventArgs): void;
}
export declare class _PanEventArgs extends _TouchEventArgs {
    private _panType;
    private _client;
    private _screen;
    private _clientDelta;
    private _screenDelta;
    constructor(args: _TouchEventArgs, pre?: _PanEventArgs, type?: _TouchEventType);
    readonly type: wjcSelf._TouchEventType;
    readonly clientDelta: wjcCore.Point;
    readonly screenDelta: wjcCore.Point;
    readonly client: wjcCore.Point;
    readonly screen: wjcCore.Point;
    readonly pointersCount: number;
    readonly touchInfo: _TouchInfo;
}
export declare class _PanEvent extends _TouchEvent {
    raise(sender: any, args: _PanEventArgs): void;
}
export declare class _PanTrigger extends _TouchTrigger {
    private _panEvents;
    private _panStartTimer;
    private static _threhold;
    private _prePanEventArgs;
    panMove: wjcSelf._PanEvent;
    panStart: wjcSelf._PanEvent;
    panEnd: wjcSelf._PanEvent;
    onPanEnd(args: _PanEventArgs): void;
    onPanStart(args: _PanEventArgs): void;
    onPanMove(args: _PanEventArgs): void;
    private _prepareMove(args);
    private _prepareStart(args);
    private _prepareEnd(args);
    private _clearPanStartTimer();
    private _tryStopPan(args);
    private _stopPan();
    private _processPan(args);
    onTouchStart(args: _TouchEventArgs): void;
    onTouchMove(args: _TouchEventArgs): void;
    onTouchEnd(args: _TouchEventArgs): void;
    private _createPanEventArgs(args);
}
export declare class _SwipeEventArgs extends _PanEventArgs {
    private _duration;
    private _startTouchInfo;
    private _endTouchInfo;
    private _speed;
    private _direction;
    constructor(startInfo: _TouchInfo, endInfo: _TouchInfo, panEventArgs: _PanEventArgs, duration: number);
    readonly duration: number;
    readonly startTouchInfo: _TouchInfo;
    readonly endTouchInfo: _TouchInfo;
    readonly speed: wjcCore.Point;
    readonly pointersCount: number;
    readonly direction: _TouchDirection;
}
export declare class _SwipeEvent extends _PanEvent {
    raise(sender: any, args: _SwipeEventArgs): void;
}
export declare class _SwipeTrigger extends _PanTrigger {
    static minDistance: number;
    static maxDuration: number;
    private _panStartEventArgs;
    private _prePanMoveEventArgs;
    swipe: wjcSelf._SwipeEvent;
    static getSpeed(distance: number, duration: number): number;
    onPanStart(args: _PanEventArgs): void;
    onPanMove(args: _PanEventArgs): void;
    onPanEnd(args: _PanEventArgs): void;
    onSwipe(args: _SwipeEventArgs): void;
    _createSwipeEventArgs(endArgs: _PanEventArgs): _SwipeEventArgs;
}
export declare class _PinchEventArgs extends _TouchEventArgs {
    private _pinchType;
    private _pinchDistance;
    private _centerClient;
    private _centerClientDelta;
    private _centerScreen;
    private _centerScreenDelta;
    private _pre;
    private _zoom;
    constructor(touchEventArgs: _TouchEventArgs, pinchType: _TouchEventType, pre?: _PinchEventArgs);
    readonly zoom: number;
    readonly pointersCount: number;
    readonly prePinchDistance: number;
    readonly pinchDistance: number;
    readonly centerScreenDelta: wjcCore.Point;
    readonly centerClientDelta: wjcCore.Point;
    readonly centerClient: wjcCore.Point;
    readonly preCenterClient: wjcCore.Point;
    readonly centerScreen: wjcCore.Point;
    readonly preCenterScreen: wjcCore.Point;
    readonly type: _TouchEventType;
}
export declare class _PinchEvent extends _TouchEvent {
    raise(sender: any, args: _PinchEventArgs): void;
}
export declare class _PinchTrigger extends _TouchTrigger {
    private _preEventArgs;
    pinch: wjcSelf._PinchEvent;
    onPinch(args: _PinchEventArgs): void;
    onTouchStart(args: _TouchEventArgs): void;
    onTouchend(args: _TouchEventArgs): void;
    onTouchMove(args: _TouchEventArgs): void;
    private _onPinching(args);
    private _onPinchEnd(args);
    private _process(args);
}
export declare class _TouchManager {
    private static _touchPointerName;
    static _allTouchInfos: _TouchInfo[];
    static _isTouchEvent(event: PointerEvent | TouchEvent): boolean;
    static _isTouchStart(type: string): boolean;
    static _isTouchEnd(type: string): boolean;
    static _isTouchMove(type: string): boolean;
    static _eventTypeContains(current: string, definitions: string): boolean;
    static _registerTouchInfo(systemEvent: TouchEvent | PointerEvent): void;
    private _trigger;
    private _pinchTrigger;
    private _removeDefaultTouch;
    private _defaultTouchAction;
    private _defaultMsTouchAction;
    constructor(element: any, removeDefaultTouch?: boolean);
    touchMove: wjcSelf._TouchEvent;
    touchStart: wjcSelf._TouchEvent;
    touchEnd: wjcSelf._TouchEvent;
    panMove: wjcSelf._PanEvent;
    panStart: wjcSelf._PanEvent;
    panEnd: wjcSelf._PanEvent;
    swipe: wjcSelf._SwipeEvent;
    pinch: wjcSelf._PinchEvent;
    onPinch(event: _PinchEventArgs): void;
    onSwipe(event: _SwipeEventArgs): void;
    onTouchEnd(event: _TouchEventArgs): void;
    onTouchStart(event: _TouchEventArgs): void;
    onTouchMove(event: _TouchEventArgs): void;
    onPanEnd(args: _PanEventArgs): void;
    onPanStart(args: _PanEventArgs): void;
    onPanMove(args: _PanEventArgs): void;
    removeDefaultTouch: boolean;
    readonly hostElement: HTMLElement;
    readonly contentElement: Element;
    dispose(): void;
}
export declare class _PageSetupEditor extends wjcCore.Control {
    private _divPaperKind;
    private _divOrientation;
    private _divMarginsLeft;
    private _divMarginsTop;
    private _divMarginsRight;
    private _divMarginsBottom;
    private _cmbPaperKind;
    private _cmbOrientation;
    private _numMarginsLeft;
    private _numMarginsTop;
    private _numMarginsRight;
    private _numMarginsBottom;
    private _uiUpdating;
    private _gPaperKind;
    private _gOrientation;
    private _gMargins;
    private _gLeft;
    private _gRight;
    private _gTop;
    private _gBottom;
    private _pageSettings;
    static controlTemplate: string;
    constructor(ele: any);
    pageSettings: _IPageSettings;
    private _globalize();
    private _updateValue();
    _updateUI(): void;
    refresh(fullUpdate?: boolean): void;
}
export declare class _ExportOptionEditor extends wjcCore.Control {
    private _exportDescription;
    private _options;
    private _previousEmbedFonts;
    private _previousShowNavigator;
    private static _optionIdAttr;
    private static _optionNameAttr;
    private static _skippedOptions;
    private static _generalGroupName;
    private _optionLabels;
    private _groupTitleField;
    constructor(element: any);
    readonly options: Object;
    exportDescription: _IExportDescription;
    private _skipOption(name);
    private _render();
    private _generateEditor(desc);
    private _generateComboEditor(desc);
    private _generateBoolEditor(desc);
    private _generateNumberEditor(desc);
    private _generateStringEditor(desc);
    private _generateGroup(optionDescs);
    private _updateEditors(optionName?);
    private _getOptionLabel(optionName);
    private _getOptionDescByName(optionName);
    private _getOptionValue(optionName);
    private _setOptionValue(optionName, value);
    private readonly _optionLabelsText;
    private readonly _groupTitle;
    private _globalize();
    refresh(fullUpdate?: boolean): void;
}
export declare class _Toolbar extends wjcCore.Control {
    _toolbarWrapper: HTMLElement;
    private _toolbarContainer;
    private _toolbarLeft;
    private _toolbarRight;
    private _toolbarMoveTimer;
    private static _moveStep;
    private static _moveInterval;
    private static _enabledCss;
    static controlTemplate: string;
    constructor(element: any);
    applyTemplate(css: string, tpl: string, parts: Object): HTMLElement;
    private _clearToolbarMoveTimer();
    private _scrollRight();
    private _scrollLeft();
    private _checkMoveButtonEnabled();
    private _showToolbarMoveButton(show);
    _globalize(): void;
    resetWidth(): void;
    addSeparator(): HTMLElement;
    svgButtonClicked: wjcCore.Event;
    onSvgButtonClicked(e: _ToolbarSvgButtonClickedEventArgs): void;
    addCustomItem(element: any, commandTag?: any): void;
    addSvgButton(title: string, svgContent: string, commandTag: any, isToggle?: boolean): HTMLElement;
    refresh(fullUpdate?: boolean): void;
}
export interface _ToolbarSvgButtonClickedEventArgs {
    commandTag: string;
}
export declare class _ViewerToolbarBase extends _Toolbar {
    private _viewer;
    constructor(element: any, viewer: ViewerBase);
    _initToolbarItems(): void;
    onSvgButtonClicked(e: _ToolbarSvgButtonClickedEventArgs): void;
    readonly viewer: ViewerBase;
    static _initToolbarZoomValue(hostToolbar: HTMLElement, viewer: ViewerBase): void;
    static _initToolbarPageNumberInput(hostToolbar: HTMLElement, viewer: ViewerBase): void;
}
export declare class _ViewerToolbar extends _ViewerToolbarBase {
    private _gPaginated;
    private _gPrint;
    private _gExports;
    private _gPortrait;
    private _gLandscape;
    private _gPageSetup;
    private _gFirstPage;
    private _gPreviousPage;
    private _gNextPage;
    private _gLastPage;
    private _gBackwardHistory;
    private _gForwardHistory;
    private _gSelectTool;
    private _gMoveTool;
    private _gContinuousMode;
    private _gSingleMode;
    private _gWholePage;
    private _gPageWidth;
    private _gZoomOut;
    private _gZoomIn;
    private _gRubberbandTool;
    private _gMagnifierTool;
    private _gRotatePage;
    private _gRotateDocument;
    private _gFullScreen;
    constructor(element: any, viewer: ViewerBase);
    _globalize(): void;
    _initToolbarItems(): void;
}
export declare class _ViewerMiniToolbar extends _ViewerToolbarBase {
    private _gPrint;
    private _gPreviousPage;
    private _gNextPage;
    private _gZoomOut;
    private _gZoomIn;
    private _gExitFullScreen;
    constructor(element: any, viewer: ViewerBase);
    _initToolbarItems(): void;
    _globalize(): void;
}
export declare class _ViewerMobileToolbarBase extends _ViewerToolbarBase {
    constructor(element: any, viewer: ViewerBase);
}
export declare class _ViewerMobileToolbar extends _ViewerMobileToolbarBase {
    private _gShowHamburgerMenu;
    private _gPrevPage;
    private _gNextPage;
    private _gShowViewMenu;
    private _gShowSearchBar;
    private _gFullScreen;
    constructor(element: any, viewer: ViewerBase);
    _initToolbarItems(): void;
    _globalize(): void;
}
export declare class _ViewerZoomBar extends _ViewerMobileToolbarBase {
    private _gZoomOut;
    private _gZoomIn;
    constructor(element: any, viewer: ViewerBase);
    _initToolbarItems(): void;
    _globalize(): void;
}
export declare class _SearchBar extends _ViewerMobileToolbarBase {
    private _gSearchOptions;
    private _gSearchPrev;
    private _gSearchNext;
    constructor(element: any, viewer: ViewerBase);
    _initToolbarItems(): void;
    private _initSearchInput();
    private _initSearchBtnGroups();
    _globalize(): void;
}
export declare enum _RotateAngle {
    NoRotate = 0,
    Rotation90 = 1,
    Rotation180 = 2,
    Rotation270 = 3,
}
export interface _IHitTestInfo {
    pageIndex: number;
    x: number;
    y: number;
    hitWorkingArea: boolean;
}
export interface _IPageHitTestInfo {
    pageIndex: number;
    x: number;
    y: number;
}
export interface _IPageView {
    pageIndex: number;
    pages: _Page[];
    scrollTop: number;
    scrollLeft: number;
    panMode: boolean;
    zoomFactor: number;
    zoomMode: ZoomMode;
    pageIndexChanged: wjcCore.Event;
    zoomFactorChanged: wjcCore.Event;
    zoomModeChanged: wjcCore.Event;
    positionChanged: wjcCore.Event;
    rotateAngleChanged: wjcCore.Event;
    moveToPage(pageIndex: number): IPromise;
    moveToPosition(position: _IDocumentPosition): IPromise;
    rotatePageTo(pageIndex: number, rotateAngle: _RotateAngle): any;
    hitTest(x: number, y: number): _IHitTestInfo;
    isPageContentLoaded(pageIndex: number): boolean;
    resetPages(): any;
    invalidate(): any;
    refresh(): any;
}
export interface _ZoomModeChangedEventArgs {
    oldValue: ZoomMode;
    newValue: ZoomMode;
}
export interface _ZoomFactorChangedEventArgs {
    oldValue: number;
    newValue: number;
}
export declare class _Page {
    private _documentSource;
    private _parent;
    private _size?;
    private _content;
    private _index;
    private _rotateAngle;
    private static _bookmarkReg;
    static _bookmarkAttr: string;
    private static _customActionReg;
    static _customActionAttr: string;
    private static _idReg;
    private static _idReferReg;
    private static _invalidHref;
    constructor(documentSource: _DocumentSource, index: number, size?: _ISize);
    linkClicked: wjcCore.Event;
    readonly index: number;
    readonly size: _ISize;
    rotateAngle: _RotateAngle;
    readonly content: any;
    getContent(): IPromise;
    private _onLinkClicked(e);
    private _replaceActionLinks(svg);
    private _addGlobalUniqueId(svgHtml);
}
export declare class _CompositePageView extends wjcCore.Control implements _IPageView {
    private _activePageView;
    private _singlePageView;
    private _continuousPageView;
    private _viewMode;
    static controlTemplate: string;
    constructor(element: any);
    pageIndexChanged: wjcCore.Event;
    zoomFactorChanged: wjcCore.Event;
    zoomModeChanged: wjcCore.Event;
    positionChanged: wjcCore.Event;
    rotateAngleChanged: wjcCore.Event;
    applyTemplate(css: string, tpl: string, parts: Object): HTMLElement;
    readonly pageIndex: number;
    pages: _Page[];
    zoomMode: ZoomMode;
    zoomFactor: number;
    panMode: boolean;
    viewMode: ViewMode;
    readonly scrollTop: number;
    readonly scrollLeft: number;
    readonly _activePageViewElement: HTMLElement;
    onPageIndexChanged(): void;
    onZoomFactorChanged(oldValue: number, newValue: number): void;
    onZoomModeChanged(oldValue: ZoomMode, newValue: ZoomMode): void;
    onPositionChanged(): void;
    onRotateAngleChanged(): void;
    private _updateActivePageView();
    private _initPageView();
    private _addPageViewHandlers(pageView);
    private _removePageViewHandlers(pageView);
    private _updatePageViewsVisible();
    moveToPage(pageIndex: number): IPromise;
    moveToPosition(position: _IDocumentPosition): IPromise;
    rotatePageTo(pageIndex: number, rotateAngle: _RotateAngle): void;
    hitTest(x: number, y: number): _IHitTestInfo;
    resetPages(): void;
    refresh(fullUpdate?: boolean): void;
    isPageContentLoaded(pageIndex: number): boolean;
}
export declare class _PageViewBase extends wjcCore.Control implements _IPageView {
    private _autoHeightCalculated;
    private _startX;
    private _startY;
    private _panMode;
    private _pageIndex;
    private _pages;
    private _zoomFactor;
    private _zoomMode;
    private _touchManager;
    private _zoomModeUpdating;
    protected _pagesWrapper: HTMLElement;
    private _fBorderBoxMode;
    static _pageMargin: number;
    static _pageBorderWidth: number;
    static controlTemplate: string;
    constructor(element: any);
    _getTemplateParts(): {
        _pagesWrapper: string;
    };
    _getPagesContainer(): HTMLElement;
    pageIndexChanged: wjcCore.Event;
    zoomFactorChanged: wjcCore.Event;
    zoomModeChanged: wjcCore.Event;
    positionChanged: wjcCore.Event;
    rotateAngleChanged: wjcCore.Event;
    _init(): void;
    dispose(): void;
    _bindTouchEvents(touchManager: _TouchManager): void;
    _initTouchEvents(): void;
    protected readonly _borderBoxMode: boolean;
    private _zoomByPinch(touchManager, args);
    private _getFixedPosition(position);
    _getAbovePageCount(top: number): number;
    private _zoom(container, value, center, delta);
    readonly pageIndex: number;
    pages: _Page[];
    readonly scrollTop: number;
    readonly scrollLeft: number;
    zoomFactor: number;
    zoomMode: ZoomMode;
    panMode: boolean;
    private _bindEvents();
    private _startPanning(e);
    private _panning(e);
    private _stopPanning();
    _onPageIndexChanged(): void;
    _onZoomFactorChanged(oldValue: number, newValue: number): void;
    _onZoomModeChanged(oldValue: ZoomMode, newValue: ZoomMode): void;
    _onPositionChanged(): void;
    _onRotateAngleChanged(): void;
    _onPageLoaded(pageIndex: number): void;
    _renderViewPage(viewPage: HTMLDivElement, pageIndex: number): IPromise;
    _reserveViewPage(): void;
    _getViewPortHeight(): number;
    _getViewPortWidth(): number;
    _setPageTransform(viewPage: HTMLDivElement, pageIndex: number): void;
    _addViewPage(): HTMLDivElement;
    _getPageSize(pageIndex: number): _ISize;
    _render(pageIndex: number): IPromise;
    _moveToPagePosition(position: _IDocumentPosition): void;
    _updatePageViewTransform(): void;
    _updatePageIndex(index: number): void;
    moveToPage(pageIndex: number): IPromise;
    resolvePageIndex(pageIndex: number): number;
    moveToPosition(position: _IDocumentPosition): IPromise;
    private _calcZoomModeZoom(zoomMode?);
    _zoomToView(): void;
    _zoomToViewWidth(): void;
    _getTransformedPoint(pageIndex: number, top: number, left: number): wjcCore.Point;
    _hitTestPagePosition(pnt: _IPageHitTestInfo): _IHitTestInfo;
    rotatePageTo(pageIndex: number, rotateAngle: _RotateAngle): void;
    hitTest(clientX: number, clientY: number): _IHitTestInfo;
    resetPages(): void;
    refresh(fullUpdate?: boolean): void;
    isPageContentLoaded(pageIndex: number): boolean;
    protected _hitTestPageIndex(top: number): number;
    protected _pointInViewPanelClientArea(clientX: number, clientY: number): boolean;
    protected _panelViewPntToPageView(clientX: number, clientY: number): _IPageHitTestInfo;
}
export declare class _Scroller extends wjcCore.Control {
    private static _scrollbarWidth;
    static getScrollbarWidth(refresh?: boolean): number;
}
export declare class _VScroller extends _Scroller {
    private _wrapper;
    private _height;
    private _max;
    private _desiredValue;
    static controlTemplate: string;
    constructor(element: any);
    valueChanged: wjcCore.Event;
    onValueChanged(): void;
    preventScrollEvent(): void;
    height: number;
    value: number;
    max: number;
    refresh(fullUpdate?: boolean): void;
}
export declare class _SinglePageView extends _PageViewBase {
    private _pagesContainer;
    private _vscroller;
    private _desiredPageScrollTop;
    private _innerNavigating;
    private _virtualScrollMode;
    static controlTemplate: string;
    constructor(element: any);
    _init(): void;
    private _initScroller();
    private _initEvents();
    _bindTouchEvents(touchManager: _TouchManager): void;
    _getTemplateParts(): {
        _pagesWrapper: string;
        _pagesContainer: string;
        _vscroller: string;
    };
    applyTemplate(css: string, tpl: string, parts: Object): HTMLElement;
    virtualScrollMode: boolean;
    readonly _isScrollerVisible: boolean;
    readonly _scroller: _VScroller;
    readonly _hasPageVScrollBar: boolean;
    readonly _hasPageHScrollBar: boolean;
    _getPagesContainer(): HTMLElement;
    _getPageHeightWithoutZoom(pageIndex: number): number;
    private _updateScroller();
    _updateScrollerValue(): void;
    _doScrollerValueChanged(): void;
    _doContainerWheel(e: WheelEvent): void;
    _doContainerScroll(): void;
    _doContainerKeyDown(): void;
    _preventContainerScroll(): void;
    _innerMoveToPreviousPageAtBottom(e?: UIEvent): void;
    _innerMoveToNextPageAtTop(e?: UIEvent): void;
    _innerMoveToPage(pageIndex: number, pagePercent: number): void;
    _innerMoveToPagePosition(pagePercent: number): void;
    moveToPosition(position: _IDocumentPosition): IPromise;
    _moveToPagePosition(position: _IDocumentPosition): void;
    protected _hitTestPageIndex(top: number): number;
    protected _pointInViewPanelClientArea(clientX: number, clientY: number): boolean;
    protected _panelViewPntToPageView(clientX: number, clientY: number): _IPageHitTestInfo;
    _render(pageIndex: number): IPromise;
    _guessPageIndex(): number;
    _reserveViewPage(): void;
    _updatePageViewTransform(): void;
    _onPageLoaded(pageIndex: number): void;
    _onZoomFactorChanged(oldValue: number, newValue: number): void;
    _zoomToViewWidth(): void;
    refresh(fullUpdate?: boolean): void;
}
export declare class _ContinuousPageView extends _PageViewBase {
    private static _preFetchPageCount;
    private _swipeSpeedReducer;
    private _disposeBodyStopSwipe;
    private _scrollingTimer;
    private _zoomFactorTimer;
    constructor(element: any);
    _init(): void;
    dispose(): void;
    _stopSwip(): void;
    _bindTouchEvents(touchManager: _TouchManager): void;
    _getAbovePageCount(top: number): number;
    refresh(fullUpdate?: boolean): void;
    protected _hitTestPageIndex(top: number): number;
    _guessPageIndex(): number;
    _render(pageIndex: number): IPromise;
    _moveToPagePosition(position: _IDocumentPosition): void;
    protected _pointInViewPanelClientArea(clientX: number, clientY: number): boolean;
    protected _panelViewPntToPageView(clientX: number, clientY: number): _IPageHitTestInfo;
    _reserveViewPage(): void;
    _updatePageViewTransform(): void;
    _zoomToViewWidth(): void;
    private _ensurePageIndexPosition();
    private _getPageViewOffsetLeft(pageIndex);
}
export declare class _SideTabs extends wjcCore.Control {
    private _headersContainer;
    private _contentsContainer;
    private _idCounter;
    private _tabPages;
    private _tabPageDic;
    tabPageActived: wjcCore.Event;
    tabPageVisibilityChanged: wjcCore.Event;
    expanded: wjcCore.Event;
    collapsed: wjcCore.Event;
    static _activedCss: string;
    static _collapsedCss: string;
    static controlTemplate: string;
    constructor(element: any);
    applyTemplate(css: string, tpl: string, parts: Object): HTMLElement;
    readonly tabPages: _TabPage[];
    getTabPage(id: string): _TabPage;
    getFirstShownTabPage(except?: _TabPage): _TabPage;
    readonly visibleTabPagesCount: number;
    readonly activedTabPage: _TabPage;
    removePage(page: string | _TabPage): void;
    addPage(title: string, svgIcon: string, index?: number): _TabPage;
    readonly isCollapsed: boolean;
    hide(page: string | _TabPage): void;
    show(page: string | _TabPage): void;
    deactive(page: string | _TabPage): void;
    active(page: string | _TabPage): void;
    enable(page: string | _TabPage, value?: boolean): void;
    enableAll(value?: boolean): void;
    onTabPageActived(): void;
    onTabPageVisibilityChanged(tabPage: _TabPage): void;
    onExpanded(): void;
    onCollapsed(): void;
    collapse(): void;
    expand(): void;
    toggle(): void;
    private _clearActiveStyles();
    private _getNewTabPageId();
}
export interface _TabPageVisibilityChangedEventArgs {
    tabPage: _TabPage;
}
export declare class _TabPage {
    private _header;
    private _outContent;
    private _content;
    private _id;
    constructor(outContent: HTMLElement, header: HTMLElement, id: string);
    readonly isActived: boolean;
    readonly isHidden: boolean;
    readonly id: string;
    readonly header: HTMLElement;
    readonly content: HTMLElement;
    readonly outContent: HTMLElement;
    enable(value?: boolean): void;
    format(customizer: (_TabPage: this) => void): void;
}
export interface _ViewerMenuItem {
    title: string;
    icon?: string;
    commandTag?: number;
}
export declare class _ViewerMenuBase extends wjcInput.Menu {
    private _viewer;
    constructor(viewer: ViewerBase, owner: HTMLElement, options?: any);
    readonly viewer: ViewerBase;
    private _bindMenuItems();
    _initItems(): any[];
    _internalFormatItem(item: _ViewerMenuItem, itemElement: HTMLElement): void;
    private _formatItem(sender, e);
    private _onItemClicked(menu);
    _updateActionStatus(actionElement: HTMLElement, actionType: _ViewerActionType): void;
    private _updateActionStatusCore(actionElement, action);
    _updateItemsStatus(): void;
    refresh(fullUpdate?: boolean): void;
    showMenu(above?: boolean): void;
}
export declare class _HamburgerMenu extends _ViewerMenuBase {
    constructor(viewer: ViewerBase, owner: HTMLElement, options?: any);
    _initItems(): any[];
}
export declare class _ViewMenu extends _ViewerMenuBase {
    constructor(viewer: ViewerBase, owner: HTMLElement, options?: any);
    _initItems(): any[];
}
export declare class _SearchOptionsMenu extends _ViewerMenuBase {
    constructor(viewer: ViewerBase, owner: HTMLElement, options?: any);
    _initItems(): any[];
    _internalFormatItem(item: _ViewerMenuItem, itemElement: HTMLElement): void;
    _updateActionStatus(actionElement: HTMLElement, actionType: _ViewerActionType): void;
}
export declare enum MouseMode {
    SelectTool = 0,
    MoveTool = 1,
    RubberbandTool = 2,
    MagnifierTool = 3,
}
export declare enum ViewMode {
    Single = 0,
    Continuous = 1,
}
export declare enum ZoomMode {
    Custom = 0,
    PageWidth = 1,
    WholePage = 2,
}
export interface _ISize {
    width: _Unit;
    height: _Unit;
}
export interface _IHistory {
    zoomMode?: ZoomMode;
    zoomFactor?: number;
    position?: _IDocumentPosition;
    viewMode?: ViewMode;
    pageAngles?: _RotateAngle[];
}
export declare class _LinkClickedEventArgs extends wjcCore.EventArgs {
    private _a;
    constructor(a: SVGAElement);
    readonly element: SVGAElement;
}
export declare class _HistoryManager {
    private _items;
    private _position;
    statusChanged: wjcCore.Event;
    private _onStatusChanged();
    readonly current: _IHistory;
    clear(): void;
    add(): void;
    forward(): _IHistory;
    backward(): _IHistory;
    canForward(): boolean;
    canBackward(): boolean;
}
export declare class ViewerBase extends wjcCore.Control {
    private _leftPanel;
    _viewpanelContainer: HTMLElement;
    private _initialPosition;
    private _viewerContainer;
    private _pages;
    _documentEventKey: string;
    private _keepSerConnTimer;
    private _documentSource;
    private _pageIndex;
    private _mouseMode;
    private _viewMode;
    private _serviceUrl;
    private _filePath;
    private _paginated;
    private _needBind;
    private _historyManager;
    private _fullScreen;
    private _miniToolbarPinnedTimer;
    private _autoHeightCalculated;
    private _exportFormats;
    _searchManager: _SearchManager;
    private _rubberband;
    private _magnifier;
    private _thresholdWidth;
    private _outlinesPageId;
    private _thumbnailsPageId;
    private _exportsPageId;
    private _pageSetupPageId;
    _sidePanel: HTMLElement;
    private _toolbar;
    private _mobileToolbar;
    private _miniToolbar;
    private _splitter;
    private _pageSetupDialog;
    private _expiredTime;
    private _hostOriginWidth;
    private _hostOriginHeight;
    private _bodyOriginScrollTop;
    private _bodyOriginScrollLeft;
    private _footer;
    private _zoomBar;
    private _searchBar;
    private _searchOptionsMenu;
    _hamburgerMenu: _HamburgerMenu;
    private _viewMenu;
    private _historyMoving;
    private _historyTimer;
    private _gSearchTitle;
    private _gMatchCase;
    private _gWholeWord;
    private _gSearchResults;
    private _gThumbnailsTitle;
    private _gOutlinesTitle;
    private _gPageSetupTitle;
    private _gPageSetupApplyBtn;
    private _gExportsPageTitle;
    private _gExportsPageApplyBtn;
    private _gExportFormatTitle;
    static _seperatorHtml: string;
    private static _viewpanelContainerMinHeight;
    private static _miniToolbarPinnedTime;
    private static _narrowCss;
    private static _narrowWidthThreshold;
    private static _thumbnailWidth;
    private static _historyTimeout;
    static _defaultZoomValues: {
        name: string;
        value: number;
    }[];
    private static _exportItems;
    static controlTemplate: string;
    _documentSourceChanged: wjcCore.Event;
    pageIndexChanged: wjcCore.Event;
    viewModeChanged: wjcCore.Event;
    selectMouseModeChanged: wjcCore.Event;
    mouseModeChanged: wjcCore.Event;
    fullScreenChanged: wjcCore.Event;
    zoomFactorChanged: wjcCore.Event;
    queryLoadingData: wjcCore.Event;
    constructor(element: any, options?: any);
    serviceUrl: string;
    filePath: string;
    thresholdWidth: number;
    _innerPaginated: boolean;
    reload(): void;
    refresh(fullUpdate?: boolean): void;
    private _updateLayout();
    private _switchTemplate(mobile);
    _getSource(): _DocumentSource;
    _needBindDocumentSource(): void;
    _supportsPageSettingActions(): boolean;
    _isMobileTemplate(): boolean;
    private _init(options?);
    private _initTools();
    _globalize(): void;
    private _autoCalculateHeight();
    private _bindEvents();
    private _checkMiniToolbarVisible(e);
    private _showMiniToolbar(visible);
    _goToBookmark(name: string): void;
    _executeCustomAction(actionString: string): void;
    _getStatusUtilCompleted(documentSource: _DocumentSource): void;
    private _initChildren();
    private _initSearchBar();
    private _showSearchBar(show);
    private _initFooter();
    private _showFooter(show);
    private _createChildren();
    private _initPageView();
    private readonly _pageView;
    private _initSplitter();
    _toggleSplitter(collapsed?: boolean): void;
    private _resetMiniToolbarPosition();
    private _resetToolbarWidth();
    private _resetViewPanelContainerWidth();
    _shouldAutoHeight(): boolean;
    private _initSidePanel();
    private _clearPreHightLights();
    private _highlightPosition(pageIndex, boundsList);
    private _scrollToPosition(position, addHistory?);
    private _initSidePanelSearch();
    private _initSidePanelOutlines();
    private _initSidePanelThumbnails();
    private _initSidePanelExports();
    private _ensureExportFormatsLoaded();
    private _updateExportTab(refresh?);
    private _initSidePanelPageSetup();
    _executeAction(action: _ViewerActionType): void;
    _initSearchOptionsMenu(owner: HTMLElement): void;
    _initHamburgerMenu(owner: HTMLElement): void;
    _initViewMenu(owner: HTMLElement): void;
    private _initToolbar();
    private _clearExportFormats();
    private _supportedExportsDesc;
    private readonly _exportItemDescriptions;
    _actionIsChecked(action: _ViewerActionType): boolean;
    _isDocumentSourceLoaded(): boolean;
    _actionIsDisabled(action: _ViewerActionType): boolean;
    _actionIsShown(action: _ViewerActionType): boolean;
    _viewerActionStatusChanged: wjcCore.Event;
    _onViewerActionStatusChanged(e: _ViewerActionChangedEventArgs): void;
    private _setViewerAction(actionType, disabled?, checked?, shown?);
    private _updateViewerActions();
    private _updateViewModeActions();
    private _updatePageSettingsActions();
    private _updateMouseModeActions();
    private _updateZoomModeActions();
    private _updateZoomFactorActions();
    private _onPageSettingsUpdated();
    private _onPageCountUpdated();
    private _updatePageNavActions();
    private _onHistoryManagerStatusUpdated();
    _updateUI(): void;
    private _updateViewContainerCursor();
    private _updateFullScreenStyle();
    private _export(options);
    showPageSetupDialog(): void;
    private _createPageSetupDialog();
    zoomToView(): void;
    zoomToViewWidth(): void;
    private _setPageLandscape(landscape);
    _setPaginated(paginated: boolean): void;
    private _setPageSettings(pageSettings);
    _showViewPanelErrorMessage(message: string): void;
    _showViewPanelMessage(message?: string, className?: string): void;
    _removeViewPanelMessage(): void;
    _reRenderDocument(): void;
    private _zoomBtnClicked(zoomIn, zoomValues);
    _getDocumentSource(): _DocumentSource;
    _setDocumentSource(value: _DocumentSource): void;
    _loadDocument(value: _DocumentSource): IPromise;
    private _hyperlinkClicked(a);
    private _onDocumentSourceLoadCompleted();
    _clearKeepSerConnTimer(): void;
    _keepServiceConnection(): void;
    _getExpiredTime(): number;
    _disposeDocument(): void;
    _resetDocument(): void;
    _setDocumentRendering(): void;
    moveToPage(index: number): IPromise;
    private _getCurrentPosition();
    private _resolvePageIndex(pageIndex);
    private _innerMoveToPage(pageIndex);
    private _moveToLastPage();
    private _moveBackwardHistory();
    private _moveForwardHistory();
    private _moveToHistory(history);
    private _isPositionEquals(p1, p2, checkBounds);
    private _isPageAnglesChanged(pageAngles);
    private _updateHistoryCurrent();
    private _innerAddHistory(checkBounds);
    private _addHistory(checkBounds, delay, history?);
    private _updateCurrentPageAngles(current);
    private _mergeHistory(history?);
    private _ensureDocumentLoadCompleted(promise?);
    _updatePageIndex(index: number): void;
    private _getRotatedAngle(currentAngle);
    private _rotateDocument();
    private _rotatePage();
    zoomMode: ZoomMode;
    zoomFactor: number;
    viewMode: ViewMode;
    selectMouseMode: boolean;
    mouseMode: MouseMode;
    fullScreen: boolean;
    readonly pageIndex: number;
    private _initMiniToolbar();
    private _pinMiniToolbar();
    _onDocumentSourceChanged(e?: wjcCore.EventArgs): void;
    onPageIndexChanged(e?: wjcCore.EventArgs): void;
    onViewModeChanged(e?: wjcCore.EventArgs): void;
    onSelectMouseModeChanged(e?: wjcCore.EventArgs): void;
    onMouseModeChanged(e?: wjcCore.EventArgs): void;
    onFullScreenChanged(e?: wjcCore.EventArgs): void;
    onZoomFactorChanged(e?: wjcCore.EventArgs): void;
    onQueryLoadingData(e: QueryLoadingDataEventArgs): void;
}
export declare class _PageSetupDialog extends wjcInput.Popup {
    private _pageSetupEditorElement;
    private _btnClose;
    private _btnCancel;
    private _btnApply;
    private _pageSetupEditor;
    private _gHeader;
    applied: wjcCore.Event;
    static controlTemplate: string;
    constructor(ele: any);
    readonly pageSettings: _IPageSettings;
    private _globalize();
    private _addEvents();
    private _apply();
    private onApplied();
    showWithValue(pageSettings: _IPageSettings): void;
    refresh(fullUpdate?: boolean): void;
}
export interface _IEnumItem {
    text: string;
    value: number;
}
export declare enum _ViewerActionType {
    TogglePaginated = 0,
    Print = 1,
    Portrait = 2,
    Landscape = 3,
    ShowPageSetupDialog = 4,
    FirstPage = 5,
    PrePage = 6,
    NextPage = 7,
    LastPage = 8,
    PageNumber = 9,
    PageCountLabel = 10,
    Backward = 11,
    Forward = 12,
    SelectTool = 13,
    MoveTool = 14,
    Continuous = 15,
    Single = 16,
    ZoomOut = 17,
    ZoomIn = 18,
    ZoomValue = 19,
    FitWholePage = 20,
    FitPageWidth = 21,
    ToggleFullScreen = 22,
    ShowHamburgerMenu = 23,
    ShowViewMenu = 24,
    ShowSearchBar = 25,
    ShowThumbnails = 26,
    ShowOutlines = 27,
    ShowExportsPanel = 28,
    ShowPageSetupPanel = 29,
    ShowZoomBar = 30,
    ShowSearchOptions = 31,
    SearchPrev = 32,
    SearchNext = 33,
    SearchMatchCase = 34,
    SearchMatchWholeWord = 35,
    RubberbandTool = 36,
    MagnifierTool = 37,
    RotateDocument = 38,
    RotatePage = 39,
}
export interface _ViewerActionChangedEventArgs {
    action: _IViewerAction;
}
export interface _IViewerAction {
    actionType: _ViewerActionType;
    disabled: boolean;
    checked: boolean;
    shown: boolean;
}
export declare class _MouseTool extends wjcCore.Control {
    private _pageView;
    private _viewPanelContainer;
    private _isActive;
    private _isStarted;
    private _startPnt;
    private _stopOnClientOut;
    private _css;
    private _activeCss;
    private _visibleCss;
    constructor(element: any, viewPanelContainer: HTMLElement, pageView: _IPageView, stopOnClientOut: boolean, css: string, activeCss: string, visibleCss: string);
    activate(): void;
    deactivate(): void;
    reset(): void;
    readonly isActive: boolean;
    readonly startPnt: wjcCore.Point;
    readonly pageView: wjcSelf._IPageView;
    readonly viewPanelContainer: HTMLElement;
    protected _initElement(): void;
    protected _innerStop(pnt?: wjcCore.Point): void;
    protected _getTemplateParts(): Object;
    protected _onMouseDown(e: MouseEvent): void;
    protected _onMouseMove(e: MouseEvent): void;
    protected _onMouseUp(e: MouseEvent): void;
    protected _start(ht: _IHitTestInfo): void;
    protected _move(pnt: wjcCore.Point, ht: _IHitTestInfo): void;
    protected _stop(pnt?: wjcCore.Point): void;
    protected _bindEvents(): void;
    protected _toClientPoint(e: MouseEvent): wjcCore.Point;
    protected _testPageWorkingAreaHit(pnt: wjcCore.Point): _IHitTestInfo;
}
export declare class _RubberbandOnAppliedEventArgs extends wjcCore.EventArgs {
    private _rect;
    constructor(rect: wjcCore.Rect);
    readonly rect: wjcCore.Rect;
}
export declare class _Rubberband extends _MouseTool {
    applied: wjcCore.Event;
    constructor(element: any, viewPanelContainer: HTMLElement, pageView: _IPageView);
    protected _start(ht: _IHitTestInfo): void;
    protected _move(pnt: wjcCore.Point, ht: _IHitTestInfo): void;
    protected _stop(pnt?: wjcCore.Point): void;
    private _onApplied(e);
}
export declare class _Magnifier extends _MouseTool {
    static controlTemplate: string;
    private readonly _Magnification;
    private _viewPageDiv;
    private _currentPageIndex;
    constructor(element: any, viewPanelContainer: HTMLElement, pageView: _IPageView);
    deactivate(): void;
    reset(): void;
    protected _getTemplateParts(): {
        _viewPageDiv: string;
    };
    protected _bindEvents(): void;
    protected _start(ht: _IHitTestInfo): void;
    protected _move(pnt: wjcCore.Point, ht: _IHitTestInfo): void;
    private _showMagnifer(pnt, ht);
    private _fillPage(hitPosition);
    private _showHitPosition(hitPosition);
}
export declare class ReportViewer extends ViewerBase {
    private _reportName;
    private _paramsEditor;
    private _gParameterTitle;
    private _parametersPageId;
    static _parameterCommandTag: number;
    constructor(element: any, options?: any);
    reportName: string;
    paginated: boolean;
    static getReportNames(serviceUrl: string, reportFilePath: string): IPromise;
    static getReports(serviceUrl: string, path: string, data?: any): IPromise;
    _globalize(): void;
    _executeAction(action: _ViewerActionType): void;
    _actionIsDisabled(action: _ViewerActionType): boolean;
    _initHamburgerMenu(owner: HTMLElement): void;
    private _initSidePanelParameters();
    readonly _innerDocumentSource: _Report;
    _loadDocument(value: _Report): IPromise;
    _reRenderDocument(): void;
    _onDocumentStatusChanged(): void;
    private _renderDocumentSource();
    _disposeDocument(): void;
    _setDocumentRendering(): void;
    _getSource(): _Report;
    _supportsPageSettingActions(): boolean;
    refresh(fullUpdate?: boolean): void;
}
export declare class _ParametersEditor extends wjcCore.Control {
    private _itemSources;
    private _parameters;
    private _errors;
    private static _paramIdAttr;
    private static _errorsHiddenCss;
    private _errorsVisible;
    private _validateTimer;
    private _lastEditedParam;
    private static _dateTimeFormat;
    commit: wjcCore.Event;
    validate: wjcCore.Event;
    constructor(element: any);
    _setErrors(value: any[]): void;
    readonly parameters: Object;
    itemsSource: _IParameter[];
    _reset(): void;
    _setErrorsVisible(value: boolean): void;
    _updateErrorsVisible(): void;
    onCommit(): void;
    onValidate(): void;
    _deferValidate(paramName: string, beforeValidate?: Function, afterValidate?: Function): void;
    private _updateErrorDiv();
    _render(): void;
    refresh(fullUpdate?: boolean): void;
    _validateParameters(): boolean;
    static _isFloat(value: string): boolean;
    static _checkValueType(value: string, isSpecificType: Function): boolean;
    private _generateComboEditor(parameter);
    private _updateParameters(parameter, value);
    private _generateBoolEditor(parameter);
    private _generateStringEditor(parameter);
    private _createTextarea(value, dataType);
    private _bindTextChangedEvent(element, parameter);
    private _generateNumberEditor(parameter);
    private _generateDateTimeEditor(parameter);
    private _validateNullValueOfParameter(element);
}
export declare class _MultiSelectEx {
    private _itemsSource;
    private _selectAllItem;
    private _multiSelect;
    private _selectedAll;
    private _innerCheckedItemsChanged;
    checkedItemsChanged: wjcCore.Event;
    constructor(element: HTMLElement);
    _updateHeader(): string;
    onIsDroppedDownChanged(): void;
    onCheckedItemsChanged(sender: any, e: any): void;
    isEditable: boolean;
    isDisabled: boolean;
    displayMemberPath: string;
    selectedValuePath: string;
    itemsSource: any[];
    checkedItems: any[];
    _updateSelectedAll(): void;
}
export declare class _ReportHamburgerMenu extends _HamburgerMenu {
    constructor(viewer: ViewerBase, owner: HTMLElement, options?: any);
    _initItems(): any[];
}
export declare class PdfViewer extends ViewerBase {
    constructor(element: any, options?: any);
    readonly _innerDocumentSource: _PdfDocumentSource;
    _getSource(): _PdfDocumentSource;
}
