import * as wjcChartFinance from 'wijmo/wijmo.chart.finance';
import { EventEmitter, AfterViewInit } from '@angular/core';
import { ElementRef, Injector } from '@angular/core';
import { OnInit, OnDestroy } from '@angular/core';
import { IWjComponentMetadata, IWjComponentMeta } from 'wijmo/wijmo.angular2.directiveBase';
export declare var wjFinancialChartMeta: IWjComponentMeta;
export declare class WjFinancialChart extends wjcChartFinance.FinancialChart implements OnInit, OnDestroy, AfterViewInit {
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
export declare var wjFinancialChartSeriesMeta: IWjComponentMeta;
export declare class WjFinancialChartSeries extends wjcChartFinance.FinancialSeries implements OnInit, OnDestroy, AfterViewInit {
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
export declare class WjChartFinanceModule {
}
