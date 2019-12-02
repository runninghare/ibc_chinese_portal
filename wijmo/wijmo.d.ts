import * as wjcSelf from 'wijmo/wijmo';
export declare function getVersion(): string;
export declare enum Key {
    Back = 8,
    Tab = 9,
    Enter = 13,
    Escape = 27,
    Space = 32,
    PageUp = 33,
    PageDown = 34,
    End = 35,
    Home = 36,
    Left = 37,
    Up = 38,
    Right = 39,
    Down = 40,
    Delete = 46,
    F1 = 112,
    F2 = 113,
    F3 = 114,
    F4 = 115,
    F5 = 116,
    F6 = 117,
    F7 = 118,
    F8 = 119,
    F9 = 120,
    F10 = 121,
    F11 = 122,
    F12 = 123,
}
export declare enum DataType {
    Object = 0,
    String = 1,
    Number = 2,
    Boolean = 3,
    Date = 4,
    Array = 5,
}
export interface IQueryInterface {
    implementsInterface(interfaceName: string): boolean;
}
export declare function tryCast(value: any, type: any): any;
export declare function isPrimitive(value: any): boolean;
export declare function isString(value: any): boolean;
export declare function isNullOrWhiteSpace(value: string): boolean;
export declare function isNumber(value: any): boolean;
export declare function isInt(value: any): boolean;
export declare function isBoolean(value: any): boolean;
export declare function isFunction(value: any): boolean;
export declare function isUndefined(value: any): boolean;
export declare function isDate(value: any): boolean;
export declare function isArray(value: any): boolean;
export declare function isObject(value: any): boolean;
export declare function getUniqueId(baseId: string): string;
export declare function mouseToPage(e: any): Point;
export declare function getType(value: any): DataType;
export declare function changeType(value: any, type: DataType, format: string): any;
export declare function toFixed(value: number, prec: number, truncate: boolean): number;
export declare function format(format: string, data: any, formatFunction?: Function): string;
export declare function clamp(value: number, min: number, max: number): number;
export declare function copy(dst: any, src: any): void;
export declare function assert(condition: boolean, msg: string): void;
export declare function _deprecated(oldMember: string, newMember: string): void;
export declare function asString(value: string, nullOK?: boolean): string;
export declare function asNumber(value: number, nullOK?: boolean, positive?: boolean): number;
export declare function asInt(value: number, nullOK?: boolean, positive?: boolean): number;
export declare function asBoolean(value: boolean, nullOK?: boolean): boolean;
export declare function asDate(value: Date, nullOK?: boolean): Date;
export declare function asFunction(value: any, nullOK?: boolean): Function;
export declare function asArray(value: any, nullOK?: boolean): any[];
export declare function asType(value: any, type: any, nullOK?: boolean): any;
export declare function asEnum(value: number, enumType: any, nullOK?: boolean): number;
export declare function asCollectionView(value: any, nullOK?: boolean): ICollectionView;
export declare function hasItems(value: ICollectionView): boolean;
export declare function toHeaderCase(text: string): string;
export declare function escapeHtml(text: string): string;
export declare function hasClass(e: Element, className: string): boolean;
export declare function removeClass(e: Element, className: string): void;
export declare function addClass(e: Element, className: string): void;
export declare function toggleClass(e: Element, className: string, addOrRemove?: boolean): void;
export declare function setAttribute(e: Element, name: string, value?: any, keep?: boolean): void;
export declare function setSelectionRange(e: HTMLInputElement, start: number, end?: number): void;
export declare function getActiveElement(): HTMLElement;
export declare function moveFocus(parent: HTMLElement, offset: number): void;
export declare function getElement(selector: any): HTMLElement;
export declare function createElement(html: string, appendTo?: HTMLElement): HTMLElement;
export declare function setText(e: HTMLElement, text: string): void;
export declare function contains(parent: any, child: any): boolean;
export declare function closest(e: any, selector: string): Node;
export declare function closestClass(e: any, className: string): Node;
export declare function enable(e: HTMLElement, value: boolean): void;
export declare function getElementRect(e: Element): Rect;
export declare function setCss(e: any, css: any): void;
export declare function animate(apply: Function, duration?: number, step?: number): any;
export declare class Point {
    x: number;
    y: number;
    constructor(x?: number, y?: number);
    equals(pt: Point): boolean;
    clone(): Point;
}
export declare class Size {
    width: number;
    height: number;
    constructor(width?: number, height?: number);
    equals(sz: Size): boolean;
    clone(): Size;
}
export declare class Rect {
    left: number;
    top: number;
    width: number;
    height: number;
    constructor(left: number, top: number, width: number, height: number);
    readonly right: number;
    readonly bottom: number;
    equals(rc: Rect): boolean;
    clone(): Rect;
    static fromBoundingRect(rc: any): Rect;
    static union(rc1: Rect, rc2: Rect): Rect;
    static intersection(rc1: Rect, rc2: Rect): Rect;
    contains(pt: any): boolean;
    inflate(dx: number, dy: number): Rect;
}
export declare class DateTime {
    static addDays(value: Date, days: number): Date;
    static addMonths(value: Date, months: number): Date;
    static addYears(value: Date, years: number): Date;
    static addHours(value: Date, hours: number): Date;
    static addMinutes(value: Date, minutes: number): Date;
    static addSeconds(value: Date, seconds: number): Date;
    static sameDate(d1: Date, d2: Date): boolean;
    static sameTime(d1: Date, d2: Date): boolean;
    static equals(d1: Date, d2: Date): boolean;
    static fromDateTime(date: Date, time: Date): Date;
    static toFiscal(date: Date, govt: boolean): Date;
    static fromFiscal(date: Date, govt: boolean): Date;
    static newDate(year?: number, month?: number, day?: number, hour?: number, min?: number, sec?: number, ms?: number): Date;
    static clone(date: Date): Date;
}
export declare function httpRequest(url: string, settings?: any): XMLHttpRequest;
export declare var culture: any;
export declare class Globalize {
    static format(value: any, format: string, trim?: boolean, truncate?: boolean): string;
    static formatNumber(value: number, format: string, trim?: boolean, truncate?: boolean): string;
    static formatDate(value: Date, format: string): string;
    static parseInt(value: string, format?: string): number;
    static parseFloat(value: string, format?: string): number;
    static parseDate(value: string, format: string): Date;
    static _CJK: string;
    static getFirstDayOfWeek(): number;
    static getNumberDecimalSeparator(): string;
    private static _toFixedStr(num, digits);
    private static _unquote(s);
    private static _dateFormatParts;
    private static _parseDateFormat(format);
    private static _formatDatePart(d, format, part);
    private static _getEra(d, cal);
    private static _expandFormat(format);
    private static _zeroPad(num, places);
    private static _h12(d);
    private static _mul100(n);
}
export declare function _updateCulture(): void;
export declare class Binding {
    _path: string;
    _parts: any[];
    _key: string;
    constructor(path: string);
    path: string;
    getValue(object: any): any;
    setValue(object: any, value: any): void;
}
export interface IEventHandler {
    (sender: any, args: EventArgs): void;
}
export declare class Event {
    private _handlers;
    addHandler(handler: IEventHandler, self?: any): void;
    removeHandler(handler: IEventHandler, self?: any): void;
    removeAllHandlers(): void;
    raise(sender: any, args?: wjcSelf.EventArgs): void;
    readonly hasHandlers: boolean;
}
export declare class EventArgs {
    static empty: wjcSelf.EventArgs;
}
export declare class CancelEventArgs extends EventArgs {
    cancel: boolean;
}
export declare class PropertyChangedEventArgs extends EventArgs {
    _name: string;
    _oldVal: any;
    _newVal: any;
    constructor(propertyName: string, oldValue: any, newValue: any);
    readonly propertyName: string;
    readonly oldValue: any;
    readonly newValue: any;
}
export declare class RequestErrorEventArgs extends CancelEventArgs {
    _xhr: XMLHttpRequest;
    _msg: string;
    constructor(xhr: XMLHttpRequest, msg?: string);
    readonly request: XMLHttpRequest;
    message: string;
}
export declare class Control {
    protected static _wme: HTMLElement;
    static _touching: boolean;
    static _REFRESH_INTERVAL: number;
    static _ANIM_DEF_DURATION: number;
    static _ANIM_DEF_STEP: number;
    static _CTRL_KEY: string;
    static _OWNR_KEY: string;
    static _SCRL_KEY: string;
    static _rxInputAtts: RegExp;
    protected _e: HTMLElement;
    protected _orgOuter: string;
    protected _orgInner: string;
    protected _listeners: any;
    protected _orgTag: string;
    protected _focus: boolean;
    protected _updating: number;
    protected _fullUpdate: boolean;
    protected _toInv: any;
    protected _szCtl: Size;
    protected _rtlDir: boolean;
    constructor(element: any, options?: any, invalidateOnResize?: boolean);
    getTemplate(): string;
    applyTemplate(classNames: string, template: string, parts: Object, namePart?: string): HTMLElement;
    dispose(): void;
    static getControl(element: any): Control;
    readonly hostElement: HTMLElement;
    readonly rightToLeft: boolean;
    focus(): void;
    containsFocus(): boolean;
    invalidate(fullUpdate?: boolean): void;
    refresh(fullUpdate?: boolean): void;
    static invalidateAll(e?: HTMLElement): void;
    static refreshAll(e?: HTMLElement): void;
    static disposeAll(e?: HTMLElement): void;
    beginUpdate(): void;
    endUpdate(): void;
    readonly isUpdating: boolean;
    deferUpdate(fn: Function): void;
    readonly isTouching: boolean;
    isDisabled: boolean;
    initialize(options: any): void;
    addEventListener(target: EventTarget, type: string, fn: any, capture?: boolean): void;
    removeEventListener(target?: EventTarget, type?: string, fn?: any, capture?: boolean): number;
    readonly gotFocus: wjcSelf.Event;
    onGotFocus(e?: EventArgs): void;
    readonly lostFocus: wjcSelf.Event;
    onLostFocus(e?: EventArgs): void;
    _hasPendingUpdates(): boolean;
    private static _updateWme();
    protected _handleResize(): void;
    protected _updateFocusState(): void;
    protected _updateState(): void;
    protected _handleTouchStart(e: any): void;
    protected _handleTouchEnd(e: any): void;
    private _handleDisabled(e);
    private _replaceWithDiv(element);
}
export declare enum Aggregate {
    None = 0,
    Sum = 1,
    Cnt = 2,
    Avg = 3,
    Max = 4,
    Min = 5,
    Rng = 6,
    Std = 7,
    Var = 8,
    StdPop = 9,
    VarPop = 10,
    CntAll = 11,
    First = 12,
    Last = 13,
}
export declare function getAggregate(aggType: Aggregate, items: any[], binding?: string): any;
export interface INotifyCollectionChanged {
    collectionChanged: Event;
}
export declare enum NotifyCollectionChangedAction {
    Add = 0,
    Remove = 1,
    Change = 2,
    Reset = 3,
}
export declare class NotifyCollectionChangedEventArgs extends EventArgs {
    static reset: wjcSelf.NotifyCollectionChangedEventArgs;
    action: NotifyCollectionChangedAction;
    item: any;
    index: number;
    constructor(action?: wjcSelf.NotifyCollectionChangedAction, item?: any, index?: number);
}
export interface IPredicate {
    (item: any): boolean;
}
export interface IComparer {
    (x: any, y: any): number;
}
export declare class SortDescription {
    _bnd: Binding;
    _asc: boolean;
    constructor(property: string, ascending: boolean);
    readonly property: string;
    readonly ascending: boolean;
}
export interface ICollectionView extends INotifyCollectionChanged, IQueryInterface {
    canFilter: boolean;
    canGroup: boolean;
    canSort: boolean;
    currentItem: any;
    currentPosition: number;
    filter: IPredicate;
    groupDescriptions: ObservableArray;
    groups: any[];
    isEmpty: boolean;
    sortDescriptions: ObservableArray;
    sourceCollection: any;
    contains(item: any): boolean;
    moveCurrentTo(item: any): boolean;
    moveCurrentToFirst(): boolean;
    moveCurrentToLast(): boolean;
    moveCurrentToNext(): boolean;
    moveCurrentToPosition(index: number): boolean;
    moveCurrentToPrevious(): any;
    refresh(): any;
    currentChanged: Event;
    currentChanging: Event;
    beginUpdate(): any;
    endUpdate(): any;
    deferUpdate(fn: Function): any;
    items: any[];
}
export interface IEditableCollectionView extends ICollectionView {
    canAddNew: boolean;
    canCancelEdit: boolean;
    canRemove: boolean;
    currentAddItem: any;
    currentEditItem: any;
    isAddingNew: boolean;
    isEditingItem: boolean;
    addNew(): any;
    cancelEdit(): any;
    cancelNew(): any;
    commitEdit(): any;
    commitNew(): any;
    editItem(item: any): any;
    remove(item: any): any;
    removeAt(index: number): any;
}
export interface IPagedCollectionView extends ICollectionView {
    canChangePage: boolean;
    isPageChanging: boolean;
    itemCount: number;
    pageIndex: number;
    pageSize: number;
    totalItemCount: number;
    moveToFirstPage(): boolean;
    moveToLastPage(): boolean;
    moveToNextPage(): boolean;
    moveToPage(index: number): boolean;
    moveToPreviousPage(): boolean;
    pageChanged: Event;
    pageChanging: Event;
}
export declare class PageChangingEventArgs extends CancelEventArgs {
    newPageIndex: number;
    constructor(newIndex: number);
}
export declare class GroupDescription {
    groupNameFromItem(item: any, level: number): any;
    namesMatch(groupName: any, itemName: any): boolean;
}
export declare class PropertyGroupDescription extends GroupDescription {
    _bnd: Binding;
    _converter: Function;
    constructor(property: string, converter?: Function);
    readonly propertyName: string;
    groupNameFromItem(item: any, level: number): any;
    namesMatch(groupName: any, itemName: any): boolean;
}
export declare class ArrayBase extends Array {
    constructor();
}
export declare class ObservableArray extends ArrayBase implements INotifyCollectionChanged {
    private _updating;
    constructor(data?: any[]);
    push(...item: any[]): number;
    pop(): any;
    splice(index: number, count: number, item?: any): any[];
    slice(begin?: number, end?: number): any[];
    indexOf(searchElement: any, fromIndex?: number): number;
    sort(compareFn?: Function): this;
    insert(index: number, item: any): void;
    remove(item: any): boolean;
    removeAt(index: number): void;
    setAt(index: number, item: any): void;
    clear(): void;
    beginUpdate(): void;
    endUpdate(): void;
    readonly isUpdating: boolean;
    deferUpdate(fn: Function): void;
    implementsInterface(interfaceName: string): boolean;
    readonly collectionChanged: wjcSelf.Event;
    onCollectionChanged(e?: wjcSelf.NotifyCollectionChangedEventArgs): void;
    private _raiseCollectionChanged(action?, item?, index?);
}
export declare class CollectionView implements IEditableCollectionView, IPagedCollectionView {
    _src: any[];
    _ncc: INotifyCollectionChanged;
    _view: any[];
    _pgView: any[];
    _groups: CollectionViewGroup[];
    _fullGroups: CollectionViewGroup[];
    _digest: string;
    _idx: number;
    _filter: IPredicate;
    _srtDsc: wjcSelf.ObservableArray;
    _grpDesc: wjcSelf.ObservableArray;
    _newItem: any;
    _edtItem: any;
    _edtClone: any;
    _committing: boolean;
    _canceling: boolean;
    _pgSz: number;
    _pgIdx: number;
    _updating: number;
    _itemCreator: Function;
    _stableSort: boolean;
    _canFilter: boolean;
    _canGroup: boolean;
    _canSort: boolean;
    _canAddNew: boolean;
    _canCancelEdit: boolean;
    _canRemove: boolean;
    _canChangePage: boolean;
    _trackChanges: boolean;
    _chgAdded: wjcSelf.ObservableArray;
    _chgRemoved: wjcSelf.ObservableArray;
    _chgEdited: wjcSelf.ObservableArray;
    _srtCvt: Function;
    _srtCmp: Function;
    _getError: Function;
    constructor(sourceCollection?: any, options?: any);
    _copy(key: string, value: any): boolean;
    newItemCreator: Function;
    sortConverter: Function;
    sortComparer: Function;
    useStableSort: boolean;
    getAggregate(aggType: Aggregate, binding: string, currentPage?: boolean): any;
    trackChanges: boolean;
    readonly itemsAdded: ObservableArray;
    readonly itemsRemoved: ObservableArray;
    readonly itemsEdited: ObservableArray;
    clearChanges(): void;
    implementsInterface(interfaceName: string): boolean;
    getError: Function;
    readonly collectionChanged: wjcSelf.Event;
    onCollectionChanged(e?: wjcSelf.NotifyCollectionChangedEventArgs): void;
    private _raiseCollectionChanged(action?, item?, index?);
    readonly sourceCollectionChanging: wjcSelf.Event;
    onSourceCollectionChanging(e: CancelEventArgs): boolean;
    readonly sourceCollectionChanged: wjcSelf.Event;
    onSourceCollectionChanged(e?: EventArgs): void;
    canFilter: boolean;
    canGroup: boolean;
    canSort: boolean;
    currentItem: any;
    currentPosition: number;
    filter: IPredicate;
    readonly groupDescriptions: ObservableArray;
    readonly groups: CollectionViewGroup[];
    readonly isEmpty: boolean;
    readonly sortDescriptions: ObservableArray;
    sourceCollection: any;
    private _sourceChanged(s, e);
    contains(item: any): boolean;
    moveCurrentTo(item: any): boolean;
    moveCurrentToFirst(): boolean;
    moveCurrentToLast(): boolean;
    moveCurrentToPrevious(): boolean;
    moveCurrentToNext(): boolean;
    moveCurrentToPosition(index: number): boolean;
    refresh(): void;
    _performRefresh(): void;
    _performSort(items: any[]): void;
    _compareItems(): (a: any, b: any) => number;
    _performFilter(items: any[]): any[];
    readonly currentChanged: wjcSelf.Event;
    onCurrentChanged(e?: wjcSelf.EventArgs): void;
    readonly currentChanging: wjcSelf.Event;
    onCurrentChanging(e: CancelEventArgs): boolean;
    readonly items: any[];
    beginUpdate(): void;
    endUpdate(): void;
    readonly isUpdating: boolean;
    deferUpdate(fn: Function): void;
    canAddNew: boolean;
    canCancelEdit: boolean;
    canRemove: boolean;
    readonly currentAddItem: any;
    readonly currentEditItem: any;
    readonly isAddingNew: boolean;
    readonly isEditingItem: boolean;
    editItem(item: any): void;
    commitEdit(): void;
    cancelEdit(): void;
    addNew(): any;
    commitNew(): void;
    cancelNew(): void;
    remove(item: any): void;
    removeAt(index: number): void;
    _trackItemChanged(item: any): void;
    _extend(dst: any, src: any): void;
    _sameContent(dst: any, src: any): boolean;
    _sameValue(v1: any, v2: any): boolean;
    canChangePage: boolean;
    readonly isPageChanging: boolean;
    readonly itemCount: number;
    readonly pageIndex: number;
    pageSize: number;
    readonly totalItemCount: number;
    readonly pageCount: number;
    moveToFirstPage(): boolean;
    moveToLastPage(): boolean;
    moveToPreviousPage(): boolean;
    moveToNextPage(): boolean;
    moveToPage(index: number): boolean;
    readonly pageChanged: wjcSelf.Event;
    onPageChanged(e?: wjcSelf.EventArgs): void;
    readonly pageChanging: wjcSelf.Event;
    onPageChanging(e: PageChangingEventArgs): boolean;
    _getFullGroup(g: CollectionViewGroup): CollectionViewGroup;
    _getGroupByPath(groups: CollectionViewGroup[], level: number, path: string): wjcSelf.CollectionViewGroup;
    _getPageView(): any[];
    _createGroups(items: any[]): CollectionViewGroup[];
    private _getGroupsDigest(groups);
    private _mergeGroupItems(groups);
    private _getGroup(gd, groups, map, name, level, isBottomLevel);
}
export declare class CollectionViewGroup {
    _gd: GroupDescription;
    _name: string;
    _path: string;
    _level: number;
    _isBottomLevel: boolean;
    _groups: CollectionViewGroup[];
    _items: any[];
    constructor(groupDescription: GroupDescription, name: string, level: number, isBottomLevel: boolean);
    readonly name: string;
    readonly level: number;
    readonly isBottomLevel: boolean;
    readonly items: any[];
    readonly groups: CollectionViewGroup[];
    readonly groupDescription: GroupDescription;
    getAggregate(aggType: Aggregate, binding: string, view?: ICollectionView): any;
}
export declare class Tooltip {
    private static _eTip;
    private _toShow;
    private _toHide;
    private _showAutoTipBnd;
    private _hideAutoTipBnd;
    private _html;
    private _gap;
    private _showAtMouse;
    private _showDelay;
    private _hideDelay;
    private _tips;
    constructor(options?: any);
    setTooltip(element: any, content: string): void;
    getTooltip(element: any): string;
    show(element: any, content: string, bounds?: Rect): void;
    hide(): void;
    dispose(): void;
    readonly isVisible: boolean;
    isContentHtml: boolean;
    gap: number;
    showAtMouse: boolean;
    showDelay: number;
    hideDelay: number;
    readonly popup: wjcSelf.Event;
    onPopup(e: TooltipEventArgs): boolean;
    private _indexOf(e);
    private _attach(e);
    private _detach(e);
    private _showAutoTip(e);
    private _hideAutoTip();
    private _clearTimeouts();
    private _getContent(content);
    private _setContent(content);
}
export declare class TooltipEventArgs extends CancelEventArgs {
    private _content;
    constructor(content: string);
    content: string;
}
export declare class Color {
    _r: number;
    _g: number;
    _b: number;
    _a: number;
    constructor(color: string);
    r: number;
    g: number;
    b: number;
    a: number;
    equals(clr: Color): boolean;
    toString(): string;
    static fromRgba(r: number, g: number, b: number, a?: number): Color;
    static fromHsb(h: number, s: number, b: number, a?: number): Color;
    static fromHsl(h: number, s: number, l: number, a?: number): Color;
    static fromString(value: string): Color;
    getHsb(): number[];
    getHsl(): number[];
    static interpolate(c1: Color, c2: Color, pct: number): Color;
    static toOpaque(c: any, bkg?: any): Color;
    _parse(c: string): boolean;
    static _hslToRgb(h: number, s: number, l: number): number[];
    static _hue2rgb(p: number, q: number, t: number): number;
    static _rgbToHsl(r: number, g: number, b: number): number[];
    static _rgbToHsb(r: number, g: number, b: number): number[];
    static _hsbToRgb(h: number, s: number, b: number): number[];
    static _hsbToHsl(h: number, s: number, b: number): number[];
    static _hslToHsb(h: number, s: number, l: number): number[];
}
export declare class Clipboard {
    static copy(text: string): void;
    static paste(callback: Function): void;
    private static _copyPasteInternal(textOrCallback);
}
export declare function showPopup(popup: HTMLElement, ref?: any, above?: boolean, fadeIn?: boolean, copyStyles?: boolean): any;
export declare function hidePopup(popup: HTMLElement, remove?: boolean, fadeOut?: boolean): any;
export declare class PrintDocument {
    _iframe: HTMLIFrameElement;
    _title: string;
    _css: string[];
    _copyCss: boolean;
    constructor(options?: any);
    title: string;
    copyCss: boolean;
    addCSS(href: string): void;
    append(child: any): void;
    print(): void;
    _cloneNode(child: Node): Node;
    _getDocument(): Document;
    _close(): void;
    _addStyle(style: string): void;
}
export declare class _MaskProvider {
    _tbx: HTMLInputElement;
    _msk: string;
    _promptChar: string;
    _mskArr: _MaskElement[];
    _firstPos: number;
    _lastPos: number;
    _backSpace: boolean;
    _composing: boolean;
    _full: boolean;
    _autoComplete: string;
    _spellCheck: boolean;
    _hbInput: any;
    _hbKeyDown: any;
    _hbKeyPress: any;
    _hbCompositionStart: any;
    _hbCompositionEnd: any;
    static _X_DBCS_BIG_HIRA: string;
    static _X_DBCS_BIG_KATA: string;
    static _X_SBCS_BIG_KATA: string;
    constructor(input: HTMLInputElement, mask?: any, promptChar?: string);
    input: HTMLInputElement;
    mask: string;
    promptChar: string;
    readonly maskFull: boolean;
    getMaskRange(): number[];
    getRawValue(): string;
    refresh(): void;
    _input(): void;
    _keydown(e: KeyboardEvent): void;
    _keypress(e: KeyboardEvent): void;
    _compositionstart(e: KeyboardEvent): void;
    _compositionend(e: KeyboardEvent): void;
    _preventKey(charCode: number): boolean;
    _connect(connect: boolean): void;
    _valueChanged(): void;
    _applyMask(): string;
    _handleVagueLiterals(text: string): string;
    _isCharValid(mask: string, c: string): boolean;
    _validatePosition(start: number): void;
    _parseMask(): void;
}
export declare class _MaskElement {
    wildCard: string;
    charCase: string;
    literal: string;
    vague: boolean;
    constructor(wildcardOrLiteral: string, charCase?: string);
}
export declare function isMobile(): boolean;
export declare function isFirefox(): boolean;
export declare function isSafari(): boolean;
export declare function isIE(): boolean;
export declare function isIE9(): boolean;
export declare function getEventOptions(capture: boolean, passive: boolean): any;
export declare function _startDrag(dataTransfer: any, effectAllowed: string): void;
