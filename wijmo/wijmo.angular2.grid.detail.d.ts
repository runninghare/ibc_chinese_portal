import * as wjcGridDetail from 'wijmo/wijmo.grid.detail';
import { EventEmitter, AfterViewInit } from '@angular/core';
import { ElementRef, Injector, ViewContainerRef, TemplateRef, Renderer } from '@angular/core';
import { OnInit, OnDestroy } from '@angular/core';
import { IWjComponentMetadata, IWjDirectiveMeta } from 'wijmo/wijmo.angular2.directiveBase';
export declare var wjFlexGridDetailMeta: IWjDirectiveMeta;
export declare class WjFlexGridDetail extends wjcGridDetail.FlexGridDetailProvider implements OnInit, OnDestroy, AfterViewInit {
    private static _viewRefProp;
    wjFlexGridDetail: any;
    _viewContainerRef: ViewContainerRef;
    _templateRef: TemplateRef<any>;
    _domRenderer: Renderer;
    static readonly meta: IWjComponentMetadata;
    private _wjBehaviour;
    isInitialized: boolean;
    initialized: EventEmitter<any>;
    constructor(elRef: ElementRef, injector: Injector, parentCmp: any, viewContainerRef: ViewContainerRef, templateRef: TemplateRef<any>, domRenderer: Renderer);
    created(): void;
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    private _init();
}
export declare class WjGridDetailModule {
}
