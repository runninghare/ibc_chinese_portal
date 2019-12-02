import * as wjcChartFinanceAnalytics from 'wijmo/wijmo.chart.finance.analytics';
import { EventEmitter, AfterViewInit } from '@angular/core';
import { ElementRef, Injector } from '@angular/core';
import { OnInit, OnDestroy } from '@angular/core';
import { IWjComponentMetadata, IWjComponentMeta } from 'wijmo/wijmo.angular2.directiveBase';
export declare var wjFlexChartFibonacciMeta: IWjComponentMeta;
export declare class WjFlexChartFibonacci extends wjcChartFinanceAnalytics.Fibonacci implements OnInit, OnDestroy, AfterViewInit {
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
export declare var wjFlexChartFibonacciArcsMeta: IWjComponentMeta;
export declare class WjFlexChartFibonacciArcs extends wjcChartFinanceAnalytics.FibonacciArcs implements OnInit, OnDestroy, AfterViewInit {
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
export declare var wjFlexChartFibonacciFansMeta: IWjComponentMeta;
export declare class WjFlexChartFibonacciFans extends wjcChartFinanceAnalytics.FibonacciFans implements OnInit, OnDestroy, AfterViewInit {
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
export declare var wjFlexChartFibonacciTimeZonesMeta: IWjComponentMeta;
export declare class WjFlexChartFibonacciTimeZones extends wjcChartFinanceAnalytics.FibonacciTimeZones implements OnInit, OnDestroy, AfterViewInit {
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
export declare var wjFlexChartAtrMeta: IWjComponentMeta;
export declare class WjFlexChartAtr extends wjcChartFinanceAnalytics.ATR implements OnInit, OnDestroy, AfterViewInit {
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
export declare var wjFlexChartCciMeta: IWjComponentMeta;
export declare class WjFlexChartCci extends wjcChartFinanceAnalytics.CCI implements OnInit, OnDestroy, AfterViewInit {
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
export declare var wjFlexChartRsiMeta: IWjComponentMeta;
export declare class WjFlexChartRsi extends wjcChartFinanceAnalytics.RSI implements OnInit, OnDestroy, AfterViewInit {
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
export declare var wjFlexChartWilliamsRMeta: IWjComponentMeta;
export declare class WjFlexChartWilliamsR extends wjcChartFinanceAnalytics.WilliamsR implements OnInit, OnDestroy, AfterViewInit {
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
export declare var wjFlexChartMacdMeta: IWjComponentMeta;
export declare class WjFlexChartMacd extends wjcChartFinanceAnalytics.Macd implements OnInit, OnDestroy, AfterViewInit {
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
export declare var wjFlexChartMacdHistogramMeta: IWjComponentMeta;
export declare class WjFlexChartMacdHistogram extends wjcChartFinanceAnalytics.MacdHistogram implements OnInit, OnDestroy, AfterViewInit {
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
export declare var wjFlexChartStochasticMeta: IWjComponentMeta;
export declare class WjFlexChartStochastic extends wjcChartFinanceAnalytics.Stochastic implements OnInit, OnDestroy, AfterViewInit {
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
export declare var wjFlexChartBollingerBandsMeta: IWjComponentMeta;
export declare class WjFlexChartBollingerBands extends wjcChartFinanceAnalytics.BollingerBands implements OnInit, OnDestroy, AfterViewInit {
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
export declare var wjFlexChartEnvelopesMeta: IWjComponentMeta;
export declare class WjFlexChartEnvelopes extends wjcChartFinanceAnalytics.Envelopes implements OnInit, OnDestroy, AfterViewInit {
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
export declare class WjChartFinanceAnalyticsModule {
}
