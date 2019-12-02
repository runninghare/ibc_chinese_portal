import * as wjcViewer from 'wijmo/wijmo.viewer';
import * as wjcCore from 'wijmo/wijmo';
import { EventEmitter, AfterViewInit } from '@angular/core';
import { ElementRef, Injector } from '@angular/core';
import { OnInit, OnDestroy } from '@angular/core';
import { IWjComponentMetadata, IWjComponentMeta } from 'wijmo/wijmo.angular2.directiveBase';
export declare var wjReportViewerMeta: IWjComponentMeta;
export declare class WjReportViewer extends wjcViewer.ReportViewer implements OnInit, OnDestroy, AfterViewInit {
    static readonly meta: IWjComponentMetadata;
    private _wjBehaviour;
    isInitialized: boolean;
    initialized: EventEmitter<any>;
    wjModelProperty: string;
    asyncBindings: boolean;
    pageIndexChangedNg: EventEmitter<any>;
    viewModeChangedNg: EventEmitter<any>;
    viewModeChangePC: EventEmitter<any>;
    mouseModeChangedNg: EventEmitter<any>;
    mouseModeChangePC: EventEmitter<any>;
    selectMouseModeChangedNg: EventEmitter<any>;
    selectMouseModeChangePC: EventEmitter<any>;
    fullScreenChangedNg: EventEmitter<any>;
    fullScreenChangePC: EventEmitter<any>;
    zoomFactorChangedNg: EventEmitter<any>;
    zoomFactorChangePC: EventEmitter<any>;
    queryLoadingDataNg: EventEmitter<any>;
    constructor(elRef: ElementRef, injector: Injector, parentCmp: any);
    created(): void;
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    addEventListener(target: EventTarget, type: string, fn: any, capture?: boolean): void;
    onSelectMouseModeChanged(e?: wjcCore.EventArgs): void;
}
export declare var wjPdfViewerMeta: IWjComponentMeta;
export declare class WjPdfViewer extends wjcViewer.PdfViewer implements OnInit, OnDestroy, AfterViewInit {
    static readonly meta: IWjComponentMetadata;
    private _wjBehaviour;
    isInitialized: boolean;
    initialized: EventEmitter<any>;
    wjModelProperty: string;
    asyncBindings: boolean;
    pageIndexChangedNg: EventEmitter<any>;
    viewModeChangedNg: EventEmitter<any>;
    viewModeChangePC: EventEmitter<any>;
    mouseModeChangedNg: EventEmitter<any>;
    mouseModeChangePC: EventEmitter<any>;
    selectMouseModeChangedNg: EventEmitter<any>;
    selectMouseModeChangePC: EventEmitter<any>;
    fullScreenChangedNg: EventEmitter<any>;
    fullScreenChangePC: EventEmitter<any>;
    zoomFactorChangedNg: EventEmitter<any>;
    zoomFactorChangePC: EventEmitter<any>;
    queryLoadingDataNg: EventEmitter<any>;
    constructor(elRef: ElementRef, injector: Injector, parentCmp: any);
    created(): void;
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    addEventListener(target: EventTarget, type: string, fn: any, capture?: boolean): void;
    onSelectMouseModeChanged(e?: wjcCore.EventArgs): void;
}
export declare class WjViewerModule {
}
