import * as ng2 from '@angular/core';
import { Injector, EventEmitter, NgZone } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
export declare class WjOptions {
    static asyncBindings: boolean;
}
export interface IWjMetaBase {
    selector: string;
    inputs: string[];
    outputs: string[];
    providers: any[];
}
export interface IWjComponentMeta extends IWjMetaBase {
    template: string;
}
export interface IWjDirectiveMeta extends IWjMetaBase {
    exportAs: string;
}
export declare type ChangePropertyEvent = {
    prop: string;
    evExposed: string;
    evImpl: string;
};
export declare type EventPropertiesItem = {
    event: string;
    eventImpl: string;
    props?: ChangePropertyEvent[];
};
export declare type EventProperties = EventPropertiesItem[];
export interface IWjComponentMetadata {
    changeEvents?: {
        [event: string]: string[];
    };
    outputs?: string[];
    siblingId?: string;
    parentRefProperty?: string;
}
export interface IPendingEvent {
    event: EventEmitter<any>;
    args: any;
}
export declare class WjComponentResolvedMetadata {
    readonly changeEventMap: EventPropertiesItem[];
    allImplEvents: string[];
    constructor(rawMeta: IWjComponentMetadata);
    private resolveChangeEventMap(rawMeta);
}
export declare class WjDirectiveBehavior {
    static directiveTypeDataProp: string;
    static directiveResolvedTypeDataProp: string;
    static BehaviourRefProp: string;
    static parPropAttr: string;
    static wjModelPropAttr: string;
    static initializedEventAttr: string;
    static isInitializedPropAttr: string;
    static siblingDirIdAttr: string;
    static asyncBindingUpdatePropAttr: string;
    static siblingDirId: number;
    static wijmoComponentProviderId: string;
    static ngZone: NgZone;
    private static _ngZoneRun;
    static outsideZoneEvents: {
        'pointermove': boolean;
        'pointerover': boolean;
        'mousemove': boolean;
        'wheel': boolean;
        'touchmove': boolean;
    };
    private static _pathBinding;
    private _siblingInsertedEH;
    private _pendingEvents;
    private _pendingEventsTO;
    directive: Object;
    typeData: IWjComponentMetadata;
    resolvedTypeData: WjComponentResolvedMetadata;
    elementRef: ng2.ElementRef;
    injector: ng2.Injector;
    injectedParent: any;
    parentBehavior: WjDirectiveBehavior;
    isInitialized: boolean;
    isDestroyed: boolean;
    static getHostElement(ngHostElRef: ng2.ElementRef, injector?: Injector): HTMLElement;
    static attach(directive: Object, elementRef: ng2.ElementRef, injector: ng2.Injector, injectedParent: any): WjDirectiveBehavior;
    constructor(directive: Object, elementRef: ng2.ElementRef, injector: ng2.Injector, injectedParent: any);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    static instantiateTemplate(parent: HTMLElement, viewContainerRef: ng2.ViewContainerRef, templateRef: ng2.TemplateRef<any>, domRenderer: ng2.Renderer, useTemplateRoot?: boolean, dataContext?: any): {
        viewRef: ng2.EmbeddedViewRef<any>;
        rootElement: Element;
    };
    getPropChangeEvent(propName: string): string;
    private _createEvents();
    private subscribeToEvents(afterInit);
    private addHandlers(eventMap);
    private triggerPropChangeEvents(eventMap, allowAsync?);
    private _setupAsChild();
    private _isAsyncBinding();
    private _isChild();
    private _isParentInitializer();
    private _isParentReferencer();
    private _getParentProp();
    private _getParentReferenceProperty();
    private _useParentObj();
    private _parentInCtor();
    private _initParent();
    _getSiblingIndex(): number;
    private _siblingInserted(e);
    private _isHostElement();
    private _runInsideNgZone(func);
    private _triggerEvent(event, args, allowAsync);
    private _triggerPendingEvents(flush);
    flushPendingEvents(): void;
    private static evaluatePath(obj, path);
    static getBehavior(directive: any): WjDirectiveBehavior;
}
export declare class Ng2Utils {
    static changeEventImplementSuffix: string;
    static wjEventImplementSuffix: string;
    static initEvents(directiveType: any, changeEvents: EventPropertiesItem[]): string[];
    static getChangeEventNameImplemented(propertyName: any): string;
    static getChangeEventNameExposed(propertyName: any): string;
    private static getWjEventNameImplemented(eventName);
    static getWjEventName(ngEventName: string): string;
    static getBaseType(type: any): any;
    static getAnnotations(type: any): any[];
    static getAnnotation(annotations: any[], annotationType: any): any;
    static getTypeAnnotation(type: any, annotationType: any, own?: boolean): any;
    static equals(v1: any, v2: any): boolean;
    static _copy(dst: any, src: any, override?: boolean, includePrivate?: boolean, filter?: (name: string, value: any) => boolean): void;
}
export declare class WjValueAccessor implements ControlValueAccessor {
    private _isFirstChange;
    private _directive;
    private _behavior;
    private _ngModelProp;
    private _modelValue;
    private _isSubscribed;
    private _dirInitEh;
    private _onChange;
    private _onTouched;
    constructor(directive: any);
    writeValue(value: any): void;
    registerOnChange(fn: (_: any) => void): void;
    registerOnTouched(fn: () => void): void;
    private _updateDirective();
    private _ensureSubscribed();
    private _ensureNgModelProp();
    private _ensureInitEhUnsubscribed();
    private _dirValChgEh(s, e);
    private _dirLostFocusEh(s, e);
}
export declare function WjValueAccessorFactory(directive: any): WjValueAccessor;
export declare class WjDirectiveBaseModule {
}
