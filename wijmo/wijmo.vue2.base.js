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
"use strict";function _getProps(e,o){for(var i=window,t=e.split("."),r=0;r<t.length&&null!=i;r++)i=i[t[r]];if(!i)return null;for(var n=["control","initialized"],a=i.prototype;a!=Object.prototype;a=Object.getPrototypeOf(a))for(var c=Object.getOwnPropertyNames(a),r=0;r<c.length;r++){var w=c[r],p=Object.getOwnPropertyDescriptor(a,w),s=w.match(/^on[A-Z]/);(p.set||s)&&(s&&(w=w[2].toLowerCase()+w.substr(3)),n.indexOf(w)<0&&!w.match(/disabled|required/)&&n.push(w))}return o&&Array.prototype.push.apply(n,o),n}function _initialize(e,o){function i(e){this.ctl[this.prop]=e}var t=[];for(var r in e.$options.propsData)t.push(r);return t.sort(),t.forEach(function(t){!(t in o)||o[t]instanceof wjcCore.Event||wjcCore.isUndefined(e[t])||(o[t]=e[t],e.$watch(t,i.bind({ctl:o,prop:t})))}),t.forEach(function(i){if(o[i]instanceof wjcCore.Event){var t=o[i];wjcCore.isFunction(e[i])&&t.addHandler(e[i],o)}}),e.control&&e.$parent&&(e.$parent[e.control]=o),wjcCore.isFunction(e.initialized)&&e.initialized(o),o}Object.defineProperty(exports,"__esModule",{value:!0});var wjcCore=require("wijmo/wijmo"),wjcSelf=require("wijmo/wijmo.vue2.base");window.wijmo=window.wijmo||{},window.wijmo.vue2=window.wijmo.vue2||{},window.wijmo.vue2.base=wjcSelf,exports._getProps=_getProps,exports._initialize=_initialize;