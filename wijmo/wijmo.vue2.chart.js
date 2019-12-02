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
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var wjcVue2Base=require("wijmo/wijmo.vue2.base"),wjcChart=require("wijmo/wijmo.chart"),wjcSelf=require("wijmo/wijmo.vue2.chart");window.wijmo=window.wijmo||{},window.wijmo.vue2=window.wijmo.vue2||{},window.wijmo.vue2.chart=wjcSelf;var vue_1=require("vue"),VueModule=require("vue");exports.Vue=vue_1.default||VueModule,exports.WjFlexChart=exports.Vue.component("wj-flex-chart",{template:"<div><slot/></div>",props:wjcVue2Base._getProps("wijmo.chart.FlexChart",["tooltipContent"]),mounted:function(){var e=this,t=new wjcChart.FlexChart(this.$el);this.$children.forEach(function(r){switch(r.$options.name){case"wj-flex-chart-series":var i=wjcVue2Base._initialize(r,new wjcChart.Series);if(r.$el.style.cssText.length){var o={};r.$el.style.cssText.split(";").forEach(function(e){var t=e.split(":");2==t.length&&(o[t[0].trim()]=t[1].trim())}),i.style=o}t.series.push(i);break;case"wj-flex-chart-legend":var s=wjcVue2Base._initialize(r,new wjcChart.Legend(null));t.legend=s;break;case"wj-flex-chart-axis":var a=wjcVue2Base._initialize(r,new wjcChart.Axis);r.wjProperty?t[r.wjProperty]=a:t.axes.push(a)}e.$el.removeChild(r.$el)}),this.tooltipContent&&(t.tooltip.content=this.tooltipContent),wjcVue2Base._initialize(this,t)}}),exports.WjFlexChartAxis=exports.Vue.component("wj-flex-chart-axis",{template:"<div/>",props:wjcVue2Base._getProps("wijmo.chart.Axis",["wjProperty"])}),exports.WjFlexChartLegend=exports.Vue.component("wj-flex-chart-legend",{template:"<div/>",props:wjcVue2Base._getProps("wijmo.chart.Legend")}),exports.WjFlexChartSeries=exports.Vue.component("wj-flex-chart-series",{template:"<div/>",props:wjcVue2Base._getProps("wijmo.chart.Series")});