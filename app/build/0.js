webpackJsonp([0],{

/***/ 1114:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppLinkPageModule", function() { return AppLinkPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_link__ = __webpack_require__(1115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_shared_module__ = __webpack_require__(16);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var AppLinkPageModule = (function () {
    function AppLinkPageModule() {
    }
    AppLinkPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__app_link__["a" /* AppLinkPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_3__app_shared_module__["a" /* SharedModule */],
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__app_link__["a" /* AppLinkPage */]),
            ],
            exports: [__WEBPACK_IMPORTED_MODULE_2__app_link__["a" /* AppLinkPage */]],
            entryComponents: [__WEBPACK_IMPORTED_MODULE_2__app_link__["a" /* AppLinkPage */]]
        })
    ], AppLinkPageModule);
    return AppLinkPageModule;
}());

//# sourceMappingURL=app-link.module.js.map

/***/ }),

/***/ 1115:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppLinkPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_common_common__ = __webpack_require__(13);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the AppLinkPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var AppLinkPage = (function () {
    function AppLinkPage(navCtrl, navParams, commonSvc) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.commonSvc = commonSvc;
        this.path = navParams.get('path');
    }
    AppLinkPage.prototype.ionViewDidLoad = function () {
        // this.sanitizedUrl = this.commonSvc.sanitize(location.origin);
        // this.sanitizedUrl = this.commonSvc.sanitize('http://ibc.medocs.com.au/adm/news_cmIBC.htm');
        var _this = this;
        if (this.path) {
            // let hash = `${this.path}`
            // if (this.param1 != 'null') {
            //     hash += `/${this.param1}`;
            // }
            // if (this.param2 != 'null') {
            //     hash += `/${this.param2}`;
            // }
            this.hash = location.hash.replace('#/app-link/', '');
            location.href = "ibcchinese://redirect/" + this.hash;
            setTimeout(function () {
                if (_this.commonSvc.isIos) {
                    location.href = 'https://itunes.apple.com/us/app/id1338517393';
                }
                else if (_this.commonSvc.isAndroid) {
                    location.href = 'https://play.google.com/store/apps/details?id=com.rjwebsolution.ibcchinese';
                }
            }, 2000);
        }
        // $(this.iframe.nativeElement).attr('src', "http://www.google.com.au");
    };
    AppLinkPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-app-link',template:/*ion-inline-start:"/Users/rossz/workspace/ibc_chinese/ibc_chinese_portal/src/pages/app-link/app-link.html"*/'<!--\n  Generated template for the AppLinkPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<!-- <ion-header>\n\n  <ion-navbar>\n    <ion-title>app-link</ion-title>\n  </ion-navbar>\n\n</ion-header> -->\n\n<!-- <script src="https://maps.googleapis.com/maps/api/js?callback=myMap"></script> -->\n\n<!-- <iframe #loader height="500" width="500"></iframe> -->\n\n<!-- <div class="ibc-full-width ibc-top-margin-20">\n    <iframe width="100%" height="500px" [src]="sanitizedUrl" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>\n</div> -->\n\n<div>Href: {{href}}</div>\n<!-- <div>Path: {{path}}</div>\n<div>Param1: {{param1}}</div>\n<div>Param2: {{param2}}</div> -->\n\n'/*ion-inline-end:"/Users/rossz/workspace/ibc_chinese/ibc_chinese_portal/src/pages/app-link/app-link.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_common_common__["a" /* CommonProvider */]])
    ], AppLinkPage);
    return AppLinkPage;
}());

//# sourceMappingURL=app-link.js.map

/***/ })

});
//# sourceMappingURL=0.js.map