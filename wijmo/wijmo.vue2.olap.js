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
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var wjcVue2Base=require("wijmo/wijmo.vue2.base"),wjcOlap=require("wijmo/wijmo.olap"),wjcSelf=require("wijmo/wijmo.vue2.olap");window.wijmo=window.wijmo||{},window.wijmo.vue2=window.wijmo.vue2||{},window.wijmo.vue2.olap=wjcSelf;var vue_1=require("vue"),VueModule=require("vue");exports.Vue=vue_1.default||VueModule,exports.WjPivotGrid=exports.Vue.component("wj-pivot-grid",{template:"<div/>",props:wjcVue2Base._getProps("wijmo.olap.PivotGrid"),mounted:function(){wjcVue2Base._initialize(this,new wjcOlap.PivotGrid(this.$el))}}),exports.WjPivotChart=exports.Vue.component("wj-pivot-chart",{template:"<div/>",props:wjcVue2Base._getProps("wijmo.olap.PivotChart"),mounted:function(){wjcVue2Base._initialize(this,new wjcOlap.PivotChart(this.$el))}}),exports.WjPivotPanel=exports.Vue.component("wj-pivot-panel",{template:"<div/>",props:wjcVue2Base._getProps("wijmo.olap.PivotPanel"),mounted:function(){wjcVue2Base._initialize(this,new wjcOlap.PivotPanel(this.$el))}});