import * as wjcGrid from 'wijmo/wijmo.grid';
import { EventEmitter, AfterViewInit } from '@angular/core';
import { ElementRef, Injector, ViewContainerRef, TemplateRef, Renderer } from '@angular/core';
import { OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import * as ngCore from '@angular/core';
import { IWjComponentMetadata, IWjComponentMeta } from 'wijmo/wijmo.angular2.directiveBase';
export declare var wjFlexGridMeta: IWjComponentMeta;
export declare class WjFlexGrid extends wjcGrid.FlexGrid implements OnInit, OnDestroy, AfterViewInit {
    static readonly meta: IWjComponentMetadata;
    private _wjBehaviour;
    isInitialized: boolean;
    initialized: EventEmitter<any>;
    wjModelProperty: string;
    gotFocusNg: EventEmitter<any>;
    lostFocusNg: EventEmitter<any>;
    beginningEditNg: EventEmitter<any>;
    cellEditEndedNg: EventEmitter<any>;
    cellEditEndingNg: EventEmitter<any>;
    prepareCellForEditNg: EventEmitter<any>;
    formatItemNg: EventEmitter<any>;
    resizingColumnNg: EventEmitter<any>;
    resizedColumnNg: EventEmitter<any>;
    autoSizingColumnNg: EventEmitter<any>;
    autoSizedColumnNg: EventEmitter<any>;
    draggingColumnNg: EventEmitter<any>;
    draggingColumnOverNg: EventEmitter<any>;
    draggedColumnNg: EventEmitter<any>;
    sortingColumnNg: EventEmitter<any>;
    sortedColumnNg: EventEmitter<any>;
    resizingRowNg: EventEmitter<any>;
    resizedRowNg: EventEmitter<any>;
    autoSizingRowNg: EventEmitter<any>;
    autoSizedRowNg: EventEmitter<any>;
    draggingRowNg: EventEmitter<any>;
    draggingRowOverNg: EventEmitter<any>;
    draggedRowNg: EventEmitter<any>;
    deletingRowNg: EventEmitter<any>;
    deletedRowNg: EventEmitter<any>;
    loadingRowsNg: EventEmitter<any>;
    loadedRowsNg: EventEmitter<any>;
    rowEditStartingNg: EventEmitter<any>;
    rowEditStartedNg: EventEmitter<any>;
    rowEditEndingNg: EventEmitter<any>;
    rowEditEndedNg: EventEmitter<any>;
    rowAddedNg: EventEmitter<any>;
    groupCollapsedChangedNg: EventEmitter<any>;
    groupCollapsedChangingNg: EventEmitter<any>;
    itemsSourceChangedNg: EventEmitter<any>;
    selectionChangingNg: EventEmitter<any>;
    selectionChangedNg: EventEmitter<any>;
    scrollPositionChangedNg: EventEmitter<any>;
    updatingViewNg: EventEmitter<any>;
    updatedViewNg: EventEmitter<any>;
    updatingLayoutNg: EventEmitter<any>;
    updatedLayoutNg: EventEmitter<any>;
    pastingNg: EventEmitter<any>;
    pastedNg: EventEmitter<any>;
    pastingCellNg: EventEmitter<any>;
    pastedCellNg: EventEmitter<any>;
    copyingNg: EventEmitter<any>;
    copiedNg: EventEmitter<any>;
    constructor(elRef: ElementRef, injector: Injector, parentCmp: any, cdRef: ChangeDetectorRef);
    created(): void;
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    addEventListener(target: EventTarget, type: string, fn: any, capture?: boolean): void;
}
export declare var wjFlexGridColumnMeta: IWjComponentMeta;
export declare class WjFlexGridColumn extends wjcGrid.Column implements OnInit, OnDestroy, AfterViewInit {
    static readonly meta: IWjComponentMetadata;
    private _wjBehaviour;
    isInitialized: boolean;
    initialized: EventEmitter<any>;
    wjProperty: string;
    asyncBindings: boolean;
    isSelectedChangePC: EventEmitter<any>;
    constructor(elRef: ElementRef, injector: Injector, parentCmp: any);
    created(): void;
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
}
export declare class WjFlexGridCellTemplate implements ngCore.OnInit, ngCore.OnDestroy {
    viewContainerRef: ViewContainerRef;
    templateRef: TemplateRef<any>;
    elRef: ElementRef;
    private domRenderer;
    cdRef: ChangeDetectorRef;
    wjFlexGridCellTemplate: any;
    cellTypeStr: string;
    cellOverflow: string;
    cellType: CellTemplateType;
    valuePaths: Object;
    autoSizeRows: boolean;
    forceFullEdit: boolean;
    grid: WjFlexGrid;
    column: WjFlexGridColumn;
    ownerControl: any;
    constructor(viewContainerRef: ViewContainerRef, templateRef: TemplateRef<any>, elRef: ElementRef, parentCmp: any, domRenderer: Renderer, injector: Injector, cdRef: ChangeDetectorRef);
    static _getTemplContextProp(templateType: CellTemplateType): string;
    ngOnInit(): void;
    ngOnDestroy(): void;
    _instantiateTemplate(parent: HTMLElement, dataContext: any): {
        viewRef: ngCore.EmbeddedViewRef<any>;
        rootElement: Element;
    };
    private _attachToControl();
}
export declare enum CellTemplateType {
    Cell = 0,
    CellEdit = 1,
    ColumnHeader = 2,
    RowHeader = 3,
    RowHeaderEdit = 4,
    TopLeft = 5,
    GroupHeader = 6,
    Group = 7,
    NewCellTemplate = 8,
    ColumnFooter = 9,
    BottomLeft = 10,
}
export declare class WjGridModule {
}
