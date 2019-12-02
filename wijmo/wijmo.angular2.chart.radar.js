/*
    *
    * Wijmo Library 5.20173.380
    * http://wijmo.com/
    *
    * Copyright(c) GrapeCity, Inc.  All rights reserved.
    *
    * Licensed under the GrapeCity Commercial License.
    * sales@wijmo.com
    * wijmo.com/products/wijmo-5/license/
    *
    */
"use strict";var __extends=this&&this.__extends||function(){var e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])};return function(t,r){function o(){this.constructor=t}e(t,r),t.prototype=null===r?Object.create(r):(o.prototype=r.prototype,new o)}}();Object.defineProperty(exports,"__esModule",{value:!0});var wjcChartRadar=require("wijmo/wijmo.chart.radar"),core_1=require("@angular/core"),core_2=require("@angular/core"),core_3=require("@angular/core"),common_1=require("@angular/common"),forms_1=require("@angular/forms"),wijmo_angular2_directiveBase_1=require("wijmo/wijmo.angular2.directiveBase");exports.wjFlexRadarMeta={selector:"wj-flex-radar",template:"<div><ng-content></ng-content></div>",inputs:["asyncBindings","wjModelProperty","isDisabled","binding","footer","header","selectionMode","palette","plotMargin","footerStyle","headerStyle","tooltipContent","itemsSource","bindingX","interpolateNulls","legendToggle","symbolSize","options","selection","itemFormatter","labelContent","chartType","startAngle","totalAngle","reversed","stacking"],outputs:["initialized","gotFocusNg: gotFocus","lostFocusNg: lostFocus","renderingNg: rendering","renderedNg: rendered","selectionChangedNg: selectionChanged","selectionChangePC: selectionChange","seriesVisibilityChangedNg: seriesVisibilityChanged"],providers:[{provide:forms_1.NG_VALUE_ACCESSOR,useFactory:wijmo_angular2_directiveBase_1.WjValueAccessorFactory,multi:!0,deps:["WjComponent"]}]};var WjFlexRadar=function(e){function t(t,r,o){var i=e.call(this,wijmo_angular2_directiveBase_1.WjDirectiveBehavior.getHostElement(t,r))||this;i.isInitialized=!1;i._wjBehaviour=wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(i,t,r,o);return i.created(),i}return __extends(t,e),t.prototype.created=function(){},t.prototype.ngOnInit=function(){this._wjBehaviour.ngOnInit()},t.prototype.ngAfterViewInit=function(){this._wjBehaviour.ngAfterViewInit()},t.prototype.ngOnDestroy=function(){this._wjBehaviour.ngOnDestroy()},t.prototype.addEventListener=function(t,r,o,i){var n=this;void 0===i&&(i=!1);var a=wijmo_angular2_directiveBase_1.WjDirectiveBehavior,s=a.ngZone;s&&a.outsideZoneEvents[r]?s.runOutsideAngular(function(){e.prototype.addEventListener.call(n,t,r,o,i)}):e.prototype.addEventListener.call(this,t,r,o,i)},Object.defineProperty(t.prototype,"tooltipContent",{get:function(){return this.tooltip.content},set:function(e){this.tooltip.content=e},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"labelContent",{get:function(){return this.dataLabel.content},set:function(e){this.dataLabel.content=e},enumerable:!0,configurable:!0}),t.meta={outputs:exports.wjFlexRadarMeta.outputs,changeEvents:{selectionChanged:["selection"]}},t.decorators=[{type:core_1.Component,args:[{selector:exports.wjFlexRadarMeta.selector,template:exports.wjFlexRadarMeta.template,inputs:exports.wjFlexRadarMeta.inputs,outputs:exports.wjFlexRadarMeta.outputs,providers:[{provide:"WjComponent",useExisting:core_2.forwardRef(function(){return t})}].concat(exports.wjFlexRadarMeta.providers)}]}],t.ctorParameters=function(){return[{type:core_2.ElementRef,decorators:[{type:core_3.Inject,args:[core_2.ElementRef]}]},{type:core_2.Injector,decorators:[{type:core_3.Inject,args:[core_2.Injector]}]},{type:void 0,decorators:[{type:core_3.Inject,args:["WjComponent"]},{type:core_3.SkipSelf},{type:core_2.Optional}]}]},t}(wjcChartRadar.FlexRadar);exports.WjFlexRadar=WjFlexRadar,exports.wjFlexRadarAxisMeta={selector:"wj-flex-radar-axis",template:"",inputs:["wjProperty","axisLine","format","labels","majorGrid","majorTickMarks","majorUnit","max","min","position","reversed","title","labelAngle","minorGrid","minorTickMarks","minorUnit","origin","logBase","plotArea","labelAlign","name","overlappingLabels","labelPadding","itemFormatter","itemsSource","binding"],outputs:["initialized","rangeChangedNg: rangeChanged"],providers:[]};var WjFlexRadarAxis=function(e){function t(t,r,o){var i=e.call(this)||this;i.isInitialized=!1,i.wjProperty="axes";i._wjBehaviour=wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(i,t,r,o);return i.created(),i}return __extends(t,e),t.prototype.created=function(){},t.prototype.ngOnInit=function(){this._wjBehaviour.ngOnInit()},t.prototype.ngAfterViewInit=function(){this._wjBehaviour.ngAfterViewInit()},t.prototype.ngOnDestroy=function(){this._wjBehaviour.ngOnDestroy()},t.meta={outputs:exports.wjFlexRadarAxisMeta.outputs},t.decorators=[{type:core_1.Component,args:[{selector:exports.wjFlexRadarAxisMeta.selector,template:exports.wjFlexRadarAxisMeta.template,inputs:exports.wjFlexRadarAxisMeta.inputs,outputs:exports.wjFlexRadarAxisMeta.outputs,providers:[{provide:"WjComponent",useExisting:core_2.forwardRef(function(){return t})}].concat(exports.wjFlexRadarAxisMeta.providers)}]}],t.ctorParameters=function(){return[{type:core_2.ElementRef,decorators:[{type:core_3.Inject,args:[core_2.ElementRef]}]},{type:core_2.Injector,decorators:[{type:core_3.Inject,args:[core_2.Injector]}]},{type:void 0,decorators:[{type:core_3.Inject,args:["WjComponent"]},{type:core_3.SkipSelf},{type:core_2.Optional}]}]},t}(wjcChartRadar.FlexRadarAxis);exports.WjFlexRadarAxis=WjFlexRadarAxis,exports.wjFlexRadarSeriesMeta={selector:"wj-flex-radar-series",template:"<div><ng-content></ng-content></div>",inputs:["asyncBindings","wjProperty","axisX","axisY","binding","bindingX","cssClass","name","style","altStyle","symbolMarker","symbolSize","symbolStyle","visibility","itemsSource","chartType"],outputs:["initialized","renderingNg: rendering","renderedNg: rendered","visibilityChangePC: visibilityChange"],providers:[]};var WjFlexRadarSeries=function(e){function t(t,r,o){var i=e.call(this)||this;i.isInitialized=!1,i.wjProperty="series";i._wjBehaviour=wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(i,t,r,o);return i.created(),i}return __extends(t,e),t.prototype.created=function(){},t.prototype.ngOnInit=function(){this._wjBehaviour.ngOnInit()},t.prototype.ngAfterViewInit=function(){this._wjBehaviour.ngAfterViewInit()},t.prototype.ngOnDestroy=function(){this._wjBehaviour.ngOnDestroy()},t.meta={outputs:exports.wjFlexRadarSeriesMeta.outputs,changeEvents:{"chart.seriesVisibilityChanged":["visibility"]},siblingId:"series"},t.decorators=[{type:core_1.Component,args:[{selector:exports.wjFlexRadarSeriesMeta.selector,template:exports.wjFlexRadarSeriesMeta.template,inputs:exports.wjFlexRadarSeriesMeta.inputs,outputs:exports.wjFlexRadarSeriesMeta.outputs,providers:[{provide:"WjComponent",useExisting:core_2.forwardRef(function(){return t})}].concat(exports.wjFlexRadarSeriesMeta.providers)}]}],t.ctorParameters=function(){return[{type:core_2.ElementRef,decorators:[{type:core_3.Inject,args:[core_2.ElementRef]}]},{type:core_2.Injector,decorators:[{type:core_3.Inject,args:[core_2.Injector]}]},{type:void 0,decorators:[{type:core_3.Inject,args:["WjComponent"]},{type:core_3.SkipSelf},{type:core_2.Optional}]}]},t}(wjcChartRadar.FlexRadarSeries);exports.WjFlexRadarSeries=WjFlexRadarSeries;var moduleExports=[WjFlexRadar,WjFlexRadarAxis,WjFlexRadarSeries],WjChartRadarModule=function(){function e(){}return e.decorators=[{type:core_1.NgModule,args:[{imports:[wijmo_angular2_directiveBase_1.WjDirectiveBaseModule,common_1.CommonModule],declarations:moduleExports.slice(),exports:moduleExports.slice()}]}],e.ctorParameters=function(){return[]},e}();exports.WjChartRadarModule=WjChartRadarModule;