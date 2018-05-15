import { Component, ViewChild, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ImageCropperComponent, CropperSettings, Bounds } from 'ng2-img-cropper';
// import { PhotoProvider } from '../../providers/photo/photo';

export interface IntCropperSettings {
    canvasWidth?: number;
    canvasHeight?: number;
    width?: number;
    height?: number;
    minWidth?: number;
    minHeight?: number;
    minWithRelativeToResolution?: boolean;
    croppedWidth?: number;
    croppedHeight?: number;
    touchRadius?: number;
    cropperDrawSettings?: any;
    noFileInput?: boolean;
    allowedFilesRegex?: RegExp;
    rounded?: boolean;
    keepAspect?: boolean;
    preserveSize?: boolean;
    cropOnResize?: boolean;
    compressRatio?: number;
}

@Component({
    selector: 'photo-edit-page',
    templateUrl: 'photo-edit.html'
})
export class PhotoEditPage implements OnInit  {


    /**
     * Access the image cropper DOM element
     */
    @ViewChild('cropper') ImageCropper: ImageCropperComponent;

    /**
     * Object for storing - and eventually initialising - image cropper settings
     */
    public cropperSettings;

    /**
     * Will set the cropped width for the image
     */
    public croppedWidth: Number;
    /**
     * Will set the cropped height for the image
     */
    public croppedHeight: Number;

    /**
     * Object for storing image data
     */
    public data: any = {};

    /**
     * Determines whether the Save Image button is to be displayed or not
     */
    public canSave: boolean = false;

    public successHandler: Function;
    public failureHandler: Function;


    constructor(public navCtrl: NavController,
        public navParams: NavParams) {   
    }

    ngOnInit(): void {

        if (this.navParams.data) {
            let image: any = new Image();
            image.src = this.navParams.data.imgData;

            // Assign the Image object to the ImageCropper component
            setTimeout(() => {
                this.ImageCropper.setImage(image);
            });

            this.successHandler = this.navParams.data.successHandler;
            this.failureHandler = this.navParams.data.failureHandler;

            // Here we set up the Image Cropper component settings
            this.cropperSettings = new CropperSettings();

            this.cropperSettings.width = 200;

            // this.cropperSettings.croppedWidth = 200;
            // this.cropperSettings.croppedHeight = 200;

            // If you set preserveSize = true, then croppedWidth/Height will not 
            // be used. the actual size of the cropped image is exactly the same
            // one you cropped.
            this.cropperSettings.preserveSize = true;

            // Hide the default file input for image selection (we'll be
            // using the Camera plugin instead)
            this.cropperSettings.noFileInput = true;

            // Create a new cropped image object when the cropping tool
            // is resized
            this.cropperSettings.cropOnResize = true;

            // We want to convert the file type for a cropped image to a
            // JPEG format
            this.cropperSettings.fileType = 'image/png';

            // We want to be able to adjust the size of the cropping tool
            // by dragging from any corner in any direction
            this.cropperSettings.keepAspect = false;

            this.cropperSettings.canvasWidth = window.innerWidth;
            // this.cropperSettings.canvasHeight = window.innerHeight - 120;            

            if (this.navParams.data.croppingOptions) {
                Object.keys(this.navParams.data.croppingOptions).forEach(k => {
                    if (k != null) {
                        this.cropperSettings[k] = this.navParams.data.croppingOptions[k];
                    }
                })
            }
        }

    }

    /**
      *
      * Determine the width & height for the cropped image (and enable the
      * Save Image button)
      *
      * @public
      * @method handleCropping
      * @param bounds              {Bounds}      Capture the component's crop event
                                                 (and subsequent properties)
      * @return none
      */
    handleCropping(bounds: Bounds) {
        this.croppedHeight = bounds.bottom - bounds.top;
        this.croppedWidth = bounds.right - bounds.left;
        this.canSave = true;
    }

    // /**
    //   *
    //   * Select an image from the device Photo Library
    //   *
    //   * @public
    //   * @method selectImage
    //   * @return none
    //   */
    // selectImage() {
    //     this.canSave = false;
    //     this._PHOTO.selectImage()
    //         .then((data: any) => {
    //             // Create an Image object, assign retrieved base64 image from
    //             // the device photo library
    //             let image: any = new Image();
    //             image.src = data;

    //             // Assign the Image object to the ImageCropper component
    //             this.ImageCropper.setImage(image);
    //         })
    //         .catch((error: any) => {
    //             this.navCtrl.pop();
    //         });
    // }

    /**
      *
      * Retrieve the cropped image value (base64 image data)
      *
      * @public
      * @method saveImage
      * @return none
      */
    saveImage() {
        if (typeof this.successHandler == 'function') {
            this.successHandler(this.data.image.replace(/^data.*;base64,/,''));
            this.navCtrl.pop();
        }
    }

}