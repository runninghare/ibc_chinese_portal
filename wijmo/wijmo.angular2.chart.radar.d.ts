import * as wjcChartRadar from 'wijmo/wijmo.chart.radar';
import { EventEmitter, AfterViewInit } from '@angular/core';
import { ElementRef, Injector } from '@angular/core';
import { OnInit, OnDestroy } from '@angular/core';
import { IWjComponentMetadata, IWjComponentMeta } from 'wijmo/wijmo.angular2.directiveBase';
export declare var wjFlexRadarMeta: IWjComponentMeta;
export declare class WjFlexRadar extends wjcChartRadar.FlexRadar implements OnInit, OnDestroy, AfterViewInit {
    static readonly meta: IWjComponentMetadata;
    private _wjBehaviour;
    isInitialized: boolean;
    initialized: EventEmitter<any>;
    wjModelProperty: string;
    asyncBindings: boolean;
    gotFocusNg: EventEmitter<any>;
    lostFocusNg: EventEmitter<any>;
    renderingNg: EventEmitter<any>;
    renderedNg: EventEmitter<any>;
    selectionChangedNg: EventEmitter<any>;
    selectionChangePC: EventEmitter<any>;
    seriesVisibilityChangedNg: EventEmitter<any>;
    constructor(elRef: ElementRef, injector: Injector, parentCmp: any);
    created(): void;
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    addEventListener(target: EventTarget, type: string, fn: any, capture?: boolean): void;
    tooltipContent: any;
    labelContent: any;
}
export declare var wjFlexRadarAxisMeta: IWjComponentMeta;
export declare class WjFlexRadarAxis extends wjcChartRadar.FlexRadarAxis implements OnInit, OnDestroy, AfterViewInit {
    static readonly meta: IWjComponentMetadata;
    private _wjBehaviour;
    isInitialized: boolean;
    initialized: EventEmitter<any>;
    wjProperty: string;
    rangeChangedNg: EventEmitter<any>;
    constructor(elRef: ElementRef, injector: Injector, parentCmp: any);
    created(): void;
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
}
export declare var wjFlexRadarSeriesMeta: IWjComponentMeta;
export declare class WjFlexRadarSeries extends wjcChartRadar.FlexRadarSeries implements OnInit, OnDestroy, AfterViewInit {
    static readonly meta: IWjComponentMetadata;
    private _wjBehaviour;
    isInitialized: boolean;
    initialized: EventEmitter<any>;
    wjProperty: string;
    asyncBindings: boolean;
    renderingNg: EventEmitter<any>;
    renderedNg: EventEmitter<any>;
    visibilityChangePC: EventEmitter<any>;
    constructor(elRef: ElementRef, injector: Injector, parentCmp: any);
    created(): void;
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
}
export declare class WjChartRadarModule {
}
