import * as wjcNav from 'wijmo/wijmo.nav';
import { EventEmitter, AfterViewInit } from '@angular/core';
import { ElementRef, Injector } from '@angular/core';
import { OnInit, OnDestroy } from '@angular/core';
import { IWjComponentMetadata, IWjComponentMeta } from 'wijmo/wijmo.angular2.directiveBase';
export declare var wjTreeViewMeta: IWjComponentMeta;
export declare class WjTreeView extends wjcNav.TreeView implements OnInit, OnDestroy, AfterViewInit {
    static readonly meta: IWjComponentMetadata;
    private _wjBehaviour;
    isInitialized: boolean;
    initialized: EventEmitter<any>;
    wjModelProperty: string;
    asyncBindings: boolean;
    gotFocusNg: EventEmitter<any>;
    lostFocusNg: EventEmitter<any>;
    itemsSourceChangedNg: EventEmitter<any>;
    loadingItemsNg: EventEmitter<any>;
    loadedItemsNg: EventEmitter<any>;
    itemClickedNg: EventEmitter<any>;
    selectedItemChangedNg: EventEmitter<any>;
    selectedItemChangePC: EventEmitter<any>;
    selectedNodeChangePC: EventEmitter<any>;
    checkedItemsChangedNg: EventEmitter<any>;
    checkedItemsChangePC: EventEmitter<any>;
    isCollapsedChangingNg: EventEmitter<any>;
    isCollapsedChangedNg: EventEmitter<any>;
    isCheckedChangingNg: EventEmitter<any>;
    isCheckedChangedNg: EventEmitter<any>;
    formatItemNg: EventEmitter<any>;
    dragStartNg: EventEmitter<any>;
    dragOverNg: EventEmitter<any>;
    dropNg: EventEmitter<any>;
    dragEndNg: EventEmitter<any>;
    nodeEditStartingNg: EventEmitter<any>;
    nodeEditStartedNg: EventEmitter<any>;
    nodeEditEndingNg: EventEmitter<any>;
    nodeEditEndedNg: EventEmitter<any>;
    constructor(elRef: ElementRef, injector: Injector, parentCmp: any);
    created(): void;
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    addEventListener(target: EventTarget, type: string, fn: any, capture?: boolean): void;
}
export declare class WjNavModule {
}
