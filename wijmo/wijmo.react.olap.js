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
"use strict";var __extends=this&&this.__extends||function(){var t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var o in e)e.hasOwnProperty(o)&&(t[o]=e[o])};return function(e,o){function r(){this.constructor=e}t(e,o),e.prototype=null===o?Object.create(o):(r.prototype=o.prototype,new r)}}();Object.defineProperty(exports,"__esModule",{value:!0});var wjcReactBase=require("wijmo/wijmo.react.base"),wjcOlap=require("wijmo/wijmo.olap"),wjcSelf=require("wijmo/wijmo.react.olap");window.wijmo=window.wijmo||{},window.wijmo.react=window.wijmo.react||{},window.wijmo.react.olap=wjcSelf;var PivotGrid=function(t){function e(e){return t.call(this,e,wjcOlap.PivotGrid,{objectProps:["childItemsPath","mergeManager","itemsSource"]})||this}return __extends(e,t),e}(wjcReactBase.ComponentBase);exports.PivotGrid=PivotGrid;var PivotChart=function(t){function e(e){return t.call(this,e,wjcOlap.PivotChart,{objectProps:["itemsSource"]})||this}return __extends(e,t),e}(wjcReactBase.ComponentBase);exports.PivotChart=PivotChart;var PivotPanel=function(t){function e(e){return t.call(this,e,wjcOlap.PivotPanel,{objectProps:["engine","itemsSource"]})||this}return __extends(e,t),e}(wjcReactBase.ComponentBase);exports.PivotPanel=PivotPanel;var Wj=wjcReactBase;