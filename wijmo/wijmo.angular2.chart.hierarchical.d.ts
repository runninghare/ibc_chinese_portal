import * as wjcChartHierarchical from 'wijmo/wijmo.chart.hierarchical';
import { EventEmitter, AfterViewInit } from '@angular/core';
import { ElementRef, Injector } from '@angular/core';
import { OnInit, OnDestroy } from '@angular/core';
import { IWjComponentMetadata, IWjComponentMeta } from 'wijmo/wijmo.angular2.directiveBase';
export declare var wjSunburstMeta: IWjComponentMeta;
export declare class WjSunburst extends wjcChartHierarchical.Sunburst implements OnInit, OnDestroy, AfterViewInit {
    static readonly meta: IWjComponentMetadata;
    private _wjBehaviour;
    isInitialized: boolean;
    initialized: EventEmitter<any>;
    wjModelProperty: string;
    gotFocusNg: EventEmitter<any>;
    lostFocusNg: EventEmitter<any>;
    renderingNg: EventEmitter<any>;
    renderedNg: EventEmitter<any>;
    selectionChangedNg: EventEmitter<any>;
    constructor(elRef: ElementRef, injector: Injector, parentCmp: any);
    created(): void;
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    addEventListener(target: EventTarget, type: string, fn: any, capture?: boolean): void;
    tooltipContent: any;
    labelContent: any;
}
export declare var wjTreeMapMeta: IWjComponentMeta;
export declare class WjTreeMap extends wjcChartHierarchical.TreeMap implements OnInit, OnDestroy, AfterViewInit {
    static readonly meta: IWjComponentMetadata;
    private _wjBehaviour;
    isInitialized: boolean;
    initialized: EventEmitter<any>;
    wjModelProperty: string;
    gotFocusNg: EventEmitter<any>;
    lostFocusNg: EventEmitter<any>;
    renderingNg: EventEmitter<any>;
    renderedNg: EventEmitter<any>;
    selectionChangedNg: EventEmitter<any>;
    constructor(elRef: ElementRef, injector: Injector, parentCmp: any);
    created(): void;
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    addEventListener(target: EventTarget, type: string, fn: any, capture?: boolean): void;
    tooltipContent: any;
    labelContent: any;
}
export declare class WjChartHierarchicalModule {
}
