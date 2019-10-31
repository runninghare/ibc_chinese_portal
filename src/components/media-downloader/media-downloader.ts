import { Component } from '@angular/core';
import { ModalController, NavParams, ViewController} from 'ionic-angular';
import { CommonProvider } from '../../providers/common/common';
import { BrowserProvider } from '../../providers/browser/browser';
import { LoadTrackerProvider } from '../../providers/load-tracker/load-tracker';
import { DataProvider } from '../../providers/data-adaptor/data-adaptor';

/**
 * Generated class for the MediaDownloaderComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'media-downloader',
  templateUrl: 'media-downloader.html'
})
export class MediaDownloaderComponent {

  imageUrl: string;
  removeFunc: Function;

  constructor(public navParams: NavParams, public viewCtrl: ViewController, public commonSvc: CommonProvider, public content: DataProvider, public browser: BrowserProvider, public loadTrackerSvc: LoadTrackerProvider) {
      this.imageUrl = navParams.get('imageUrl');
      this.removeFunc = navParams.get('removeFunc');
      // console.log(this.imageUrl);
  }

  download() {

      if (this.commonSvc.isWeb) {
          window.open(this.imageUrl, '_blank');
      } else {
          cordova.plugins['photoLibrary'].requestAuthorization(
              () => {
                  // User gave us permission to his library, retry reading it!

                  // cordova.plugins['photoLibrary'].getAlbums(
                  //     function(albums) {
                  //         albums.forEach(function(album) {
                  //             console.log(album.id);
                  //             console.log(album.title);
                  //         });
                  //     },
                  //     function(err) {
                  //         console.log("--- error ---");
                  //         console.log(err);
                  //     }
                  // );

                  this.loadTrackerSvc.loading = true;

                  cordova.plugins['photoLibrary'].saveImage(this.imageUrl, 'IBC', (libraryItem) => {
                      this.commonSvc.toastSuccess('圖片已保存至IBC相冊！')
                      this.loadTrackerSvc.loading = false;
                      this.back();
                  }, err => {
                      this.commonSvc.toastFailure(`保存失败：${err}`);
                      this.loadTrackerSvc.loading = false;
                      this.back();
                  })
              },
              (err) => {
                  // User denied the access
                  this.commonSvc.toastFailure(`相冊訪問權限被拒絕，無法保存圖片！`);
              }, // if options not provided, defaults to {read: true}.
              {
                  read: true,
                  write: true
              }
          );          
      }

  }

  openPage() {
      this.browser.openPage(this.imageUrl);
  }

  back() {
      this.viewCtrl.dismiss();
  }

  remove() {
      if (this.removeFunc) {
          this.removeFunc(() => {
              this.back();
          });
      };
  }

}
