import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { InAppBrowser, InAppBrowserObject } from '@ionic-native/in-app-browser';
import { DataProvider } from '../../providers/data-adaptor/data-adaptor';
import { FileCacheProvider } from '../../providers/file-cache/file-cache';
import { FileOpener } from '@ionic-native/file-opener';
import { LoadTrackerProvider } from '../../providers/load-tracker/load-tracker';

const applicationMap = {
    doc: "application/msword",
    dot: "application/msword",

    docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    dotx: "application/vnd.openxmlformats-officedocument.wordprocessingml.template",
    docm: "application/vnd.ms-word.document.macroEnabled.12",
    dotm: "application/vnd.ms-word.template.macroEnabled.12",

    xls: "application/vnd.ms-excel",
    xlt: "application/vnd.ms-excel",
    xla: "application/vnd.ms-excel",

    xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    xltx: "application/vnd.openxmlformats-officedocument.spreadsheetml.template",
    xlsm: "application/vnd.ms-excel.sheet.macroEnabled.12",
    xltm: "application/vnd.ms-excel.template.macroEnabled.12",
    xlam: "application/vnd.ms-excel.addin.macroEnabled.12",
    xlsb: "application/vnd.ms-excel.sheet.binary.macroEnabled.12",

    ppt: "application/vnd.ms-powerpoint",
    pot: "application/vnd.ms-powerpoint",
    pps: "application/vnd.ms-powerpoint",
    ppa: "application/vnd.ms-powerpoint",

    pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    potx: "application/vnd.openxmlformats-officedocument.presentationml.template",
    ppsx: "application/vnd.openxmlformats-officedocument.presentationml.slideshow",
    ppam: "application/vnd.ms-powerpoint.addin.macroEnabled.12",
    pptm: "application/vnd.ms-powerpoint.presentation.macroEnabled.12",
    potm: "application/vnd.ms-powerpoint.template.macroEnabled.12",
    ppsm: "application/vnd.ms-powerpoint.slideshow.macroEnabled.12",

    mdb: "application/vnd.ms-access",

    png: "image/png",
    jpeg: "image/jpeg",
    jpg: "image/jpeg"
}

// const regexPatternsForCode: { regex: string, code?: string, css?: string }[] = [
//     {
//         regex: 'adm/a-3QUEstions.htm$',
//         code: `
//             elm = \$('#content_container_inner');
//             \$('body').empty();
//             \$('body').append(elm);
//             \$('body').css({'background-color':'#695B42','color':'white'});
//             elm.css({padding: '1rem'});
//           `
//     }
// ];

/*
  Generated class for the BrowserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BrowserProvider {

    constructor(public platform: Platform, public iab: InAppBrowser, public content: DataProvider, public loadTrackerSvc: LoadTrackerProvider,
        public fileOpener: FileOpener, public fileCacheSvc: FileCacheProvider) {
    }

    openMobilePage(url: string, isMedia: boolean = false, callback?: any) {
        let browser: InAppBrowserObject;

        if (this.platform.is('android')) {
            let target = '_blank';
            if (isMedia) {
                target = '_system';
            }
            browser = this.iab.create(url, target, {
                location: 'no',
                hardwareback: 'no',
                hidden: 'yes'
            });
        } else if (this.platform.is('ios')) {
            browser = this.iab.create(url, '_blank', {
                presentationstyle: 'pagesheet',
                toolbarposition: 'top',
                location: 'no',
                zoom: 'yes',
                enableViewportScale: 'yes',
                toolbar: 'yes',
                closebuttoncaption: '返回',
                transitionstyle: 'fliphorizontal'
            });
        }

        if (browser) {
            browser.on('loadstart').subscribe(() => {
                this.loadTrackerSvc.loading = true;
            });

            browser.on('loadstop').subscribe((res: { type: string, url: string }) => {

                this.loadTrackerSvc.loading = false;

                let url = res.url;
                if (typeof callback == 'function') {
                    callback(browser);
                }

                let code;
                let regexPatternsForCode = this.content.urlPageAdjustments;
                for (let i = 0; i < regexPatternsForCode.length; i++) {
                    if (url.match(new RegExp(regexPatternsForCode[i].regex, 'i'))) {
                        code = regexPatternsForCode[i].code;
                        break;
                    }
                }

                if (code) {
                    browser.executeScript({ code });
                }
                browser.show();
                // browser.insertCSS({ code: "html {margin-top: 200px;" });
                // 
                //  , () => {
                //   console.log('Finished loading!');
                //   browser.insertCSS({ code: "body{font-size: 25px;" });
                // })

                // browser.close();

                // browser.executeScript(...);
                // browser.close();
            }, err => {
                this.loadTrackerSvc.loading = false;
            });
        }
    }

    openPage(sourceUrl: string, callback?: (browser: InAppBrowserObject) => void) {
        // let browser: InAppBrowserObject;

        if (!sourceUrl) return;

        /* Open it in another tab if it is run in the browsesr */
        
        if (this.platform.is('core') || this.platform.is('mobileweb')) {
            window.open(sourceUrl, '_blank');
            return;
        }

        let regex = /\.(pdf|ppt|pptx|mp4|flv|png|jpg|jpeg)$/;
        let matches = sourceUrl.match(regex);

        if (matches) {
            let ext = matches[1];

            // ext = 'vnd.openxmlformats-officedocument.presentationml.presentation';
            let contentType = applicationMap[ext] || 'application/'+ext;
            console.log(`--- contentType = ${contentType} ---`);

            /* Above types requires caching */
            this.fileCacheSvc.cacheFile(sourceUrl).then(url => {
                console.log(`==== URL cached in Browser service ====`);

                if (this.platform.is('android')) {
                    console.log(`=== Using fileOpener to open ${url}`);
                    this.fileOpener.open(url, contentType).then(() => {}).catch(err => console.error(JSON.stringify(err)));
                    /* local cdvfile:// url type does not work in android's inAppBrowser */
                    // this.openMobilePage(sourceUrl, true, callback);
                } else {
                    this.openMobilePage(url, true, callback);
                }
            }, err => console.error(JSON.stringify(err)));
        } else {
            /* No caching, directly open the source URL in the inAppBrowser */
            this.openMobilePage(sourceUrl, false, callback);
        }

    }

}
