
import { Injectable } from '@angular/core';
import { App, NavController, Platform, ModalController } from 'ionic-angular';
import { PhotoEditComponent, IntCropperSettings } from '../../components/photo-edit/photo-edit';
import 'rxjs/add/operator/map';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Crop } from '@ionic-native/crop';

export * from '../../components/photo-edit/photo-edit';

// @Component({
//   template: `
//     <ion-list>
//       <button ion-item (click)="editUserProfile();close()">編輯 Edit</button>
//       <button ion-item (click)="navParams.data.logout(); close()">登出 Sign Out</button>
//     </ion-list>
//   `
// })
// class ImageSelectionPopOver implements OnInit {
//   constructor(public app: App, public viewCtrl: ViewController, public navParams: NavParams, public navCtrl: NavController) {}

//   ngOnInit(): void {
//     console.log(this.navParams);
//   }

//   close() {
//     this.viewCtrl.dismiss();
//   }
// }

/*
  Generated class for the PhotoProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class PhotoProvider {


    /**
     * Stores retrieved camera image from device photo library as a base64 string
     */
    public imgData: String;

    get navCtrl(): NavController {
        return this.app.getRootNav();
    }

    constructor(
        private app: App,
        public  camera: Camera,
        private crop: Crop,
        private platform: Platform,
        private modalCtrl: ModalController
    ) {
    }

    // takePicture(): void {
    //     this.ibcFB.takePicture()
    //         .then(imageContent => {
    //             console.log("=== base64 string ===");
    //             console.log(imageContent);
    //             this.ibcFB.uploadFile(imageContent, "/random_images/test1_pic.png", "base64", "image/png");
    //         });
    //     // this.ibcFB.uploadFile("aaabbbccc", "test.txt", "");
    // }

    // shotAndCrop(): void {
    //     this.ibcFB.shotAndCrop()
    //         .then(imageContent => {
    //         }, err => {
    //             console.log("Error cropping");
    //             console.log(err);
    //         });
    // }

    captureAndCrop(options: CameraOptions, croppingOptions: IntCropperSettings = {}, successHandler: any, failureHandler?: any): void {
        let cameraOptions: CameraOptions = {
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            destinationType: this.camera.DestinationType.DATA_URL,
            // quality: 100,
            targetWidth: 1024,
            targetHeight: 768,            
            // targetWidth: 800,
            // targetHeight: 400,
            encodingType: this.camera.EncodingType.PNG,
            correctOrientation: true
        };

        if (options) {
            cameraOptions = Object.assign({}, cameraOptions, options);
        }

        if (typeof failureHandler != 'function') {
            failureHandler = (err) => {
                console.error(err);
            }
        }

        if (this.platform.is('android')) {
            cameraOptions.allowEdit = true;
        }

        this.camera.getPicture(cameraOptions)
            .then((data) => {
                if (this.platform.is('android')) {
                    successHandler(data);
                } else {
                    this.imgData = "data:image/png;base64," + data;
                    // console.log(this.imgData);
                    // this.navCtrl.push(PhotoEditComponent, { imgData: this.imgData, croppingOptions, successHandler, failureHandler });
                    let selectCtrl = this.modalCtrl.create(PhotoEditComponent, { imgData: this.imgData, croppingOptions, successHandler, failureHandler });
                    selectCtrl.present();
                }
            }, failureHandler);
    }

    selectFromAlbumAndCrop(): Promise<any> {
      return this.camera.getPicture({
        allowEdit: true,
        sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
        mediaType: this.camera.MediaType.ALLMEDIA,
        destinationType: this.camera.DestinationType.FILE_URI,
        targetWidth: 1024,
        targetHeight: 768,
        encodingType: this.camera.EncodingType.JPEG,
        correctOrientation: true
      })
      .then((fileUri) => {
        // Crop Image, on android this returns something like, '/storage/emulated/0/Android/...'
        // Only giving an android example as ionic-native camera has built in cropping ability
        if (this.platform.is('ios')) {
          return fileUri
        } else if (this.platform.is('android')) {
          // Modify fileUri format, may not always be necessary
          fileUri = 'file://' + fileUri;

          /* Using cordova-plugin-crop starts here */
          return this.crop.crop(fileUri, { quality: 100 });
        }
      })
      .then((path) => {
        // path looks like 'file:///storage/emulated/0/Android/data/com.foo.bar/cache/1477008080626-cropped.jpg?1477008106566'
        console.log('Cropped Image Path!: ' + path);
        return path;
      })
    }

}