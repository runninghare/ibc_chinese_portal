import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { LoadTrackerProvider } from '../../providers/load-tracker/load-tracker';
import { CommonProvider } from '../../providers/common/common';
import * as $ from 'jquery';

/**
 * Generated class for the EditorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
    selector: 'page-editor',
    templateUrl: 'editor.html',
})
export class EditorPage {

    titleHtml: string = '';

    titleContent: string = '';

    useNavController: boolean = false;

    callBack: (any) => Promise<any>;

    @ViewChild('myInput') myInput: ElementRef;

    constructor(
        public navCtrl: NavController, 
        public navParams: NavParams,
        public viewCtrl: ViewController,
        public commonSvc: CommonProvider,
        public loadTrackerSvc: LoadTrackerProvider
    ) {
        this.titleHtml = navParams.get('titleHtml') || this.titleHtml;
        this.titleContent = navParams.get('titleContent') || this.titleContent;
        this.useNavController = navParams.get('useNavController');
        this.callBack = navParams.get('callBack');
    }

    resize(reset?: boolean) {
        let element = this.myInput['_elementRef'].nativeElement.getElementsByClassName("text-input")[0];
        if (reset) {
            element.style.height = 'auto';
            this.myInput['_elementRef'].nativeElement.style.height = 'auto';
        } else {
            let scrollHeight = element.scrollHeight;
            element.style.height = scrollHeight + 'px';
            this.myInput['_elementRef'].nativeElement.style.height = (scrollHeight + 25) + 'px';
        }
    }

    send(inputElem: HTMLInputElement) {
        let message = inputElem.value;
        // console.log(message);
        if (this.useNavController && this.callBack) {
            this.loadTrackerSvc.loading = true;
            this.callBack({message}).then(() => {
                this.loadTrackerSvc.loading = false;
                this.navCtrl.pop();
            });
        } else {
            this.viewCtrl.dismiss({message});
        }
    }

    cancel(): void {
        if (this.useNavController) {
            this.navCtrl.pop();
        } else {
            this.viewCtrl.dismiss();
        }
    }

    ionViewDidLoad() {

        /* Users should still be allowed to type Enter from mobile. */
        if (this.commonSvc.isWeb) {
            setTimeout(() => {
                $('textarea').keyup((event) => {
                    if (event.keyCode == 13) {
                        if (event.shiftKey) {
                            event.stopPropagation();
                        } else {
                            setTimeout(() => {
                                this.send(<any>this.myInput);
                            })
                        }
                    }
                });
            }, 1000);
        }      
    }

}
