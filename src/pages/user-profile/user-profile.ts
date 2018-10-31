import { Component, OnInit } from '@angular/core';
import { animate, state, trigger, style, transition } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { AbstractControl, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams, ModalController, ViewController } from 'ionic-angular';
import { IbcFirebaseProvider, IntProvider } from '../../providers/ibc-firebase/ibc-firebase';
import { ToastController } from 'ionic-angular';
import { PhotoProvider } from '../../providers/photo/photo';
// import { PhotoProvider, IntCropperSettings } from '../../providers/photo/photo';
import { DataProvider, IntContact } from '../../providers/data-adaptor/data-adaptor';
import { CommonProvider } from '../../providers/common/common';
import { FileCacheProvider } from '../../providers/file-cache/file-cache';
import { ENV } from '@app/env';

export class PasswordValidation {
    static MatchPassword(AC: AbstractControl) {
       let password = AC.get('password1').value; // to get value in input tag
       let confirmPassword = AC.get('password2').value; // to get value in input tag
        if(password != confirmPassword) {
            console.log('false');
            AC.get('password2').setErrors( {MatchPassword: true} )
        } else {
            return null
        }
    }
}

/**
 * Generated class for the UserProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
    name: 'user-profile'
})
@Component({
  selector: 'page-user-profile',
  templateUrl: 'user-profile.html',
  animations: [
        trigger(
            'showAnimation', [
                state('invisible', style({
                    opacity: 0,
                    visibility: 'hidden',
                    height: '0px',
                    overflow: 'hidden'
                })),
                state('visible', style({
                    opacity: 1,
                    visibility: 'visible',
                    height: 'auto',
                    overflow: 'hidden'
                })),
                transition('invisible => visible', animate('300ms ease-in')),
                transition('visible => invisible', animate('300ms ease-out'))
            ]
        )      
    ]
})
export class UserProfilePage implements OnInit {

    uid: string;

    userForm: FormGroup;
    authForm: FormGroup;

    loadingAvatar: boolean = false;
    avatarDirty: boolean = false;

    showTaC: boolean = false;
    showAuthInfo: boolean = false;
    showPersonalInfo: boolean = false;
    showMinistrySkills: boolean = false;

    submittingAuthForm: boolean = false;
    submittingUserForm: boolean = false;

    skills = {
        "傳道": false,
        "主席": false,
        "敬拜": false,
        "司事": false,
        "司琴": false,
        "翻譯": false,
        "影音": false,
        "主餐": false
    };

    get allSkills(): string[] {
        return Object.keys(this.skills);
    }

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public fb: FormBuilder,
        public ibcFB: IbcFirebaseProvider,
        public toastCtrl: ToastController,
        public photoSvc: PhotoProvider,
        public http: Http,
        public content: DataProvider,
        public cacheSvc: FileCacheProvider,
        public modalCtrl: ModalController,
        public commonSvc: CommonProvider
    ) {

        this.authForm = fb.group({
            username:     [null, Validators.required],
            oldpassword:  [null, Validators.required],
            password1:    [null, Validators.required],
            password2:    [null, Validators.required],
        }, {
            validator: PasswordValidation.MatchPassword
        });

        this.userForm = fb.group({
            id: [null, Validators.required],
            name: [null, Validators.required],
            chinese_name: [null],
            photoURL: [null],
            email: [null],
            mobile: [null],
            dob: [null],
            address1: [null],
            address2: [null],
            province: [null],
            state: [null],
            country: [null],
            postcode: [null],
            wechat: [null],
            skills: [null],
            visited: [null],
            shareInfo: [null]
        });
    }

    ngOnInit(): void {

        this.content.currentUser$.subscribe((user: IntContact) => {
            this.uid = this.ibcFB.afAuth.auth.currentUser.uid
            this.authForm.controls.username.setValue(user.username);

            if (!user.visited) {
                this.showAuthInfo = true;
                this.showTaC = true;
            }
            if (!user.skills) {
                user.skills = [];
            }
            user.skills.forEach(k => {
                this.skills[k] = true;
            });
            this.userForm.patchValue(user);
        }, err => {});
    }

    confirmShareInfo(val: HTMLInputElement): void {
        if (val && !val.value) {
            this.commonSvc.confirmDialog(null, '你真要關閉聯繫方式共享嗎？這樣你也無法看到其他兄弟姊妹的聯繫方式了', () => {
               this.userForm.controls['shareInfo'].setValue(false);
               this.content.myselfContactDB.update(this.userForm.value);
            }, () => {
               this.userForm.controls['shareInfo'].setValue(true);
               val.value = <any>true;
            }, {negativeLabel: '公開', positiveLabel: '關閉'});
        } else {
            this.userForm.controls['shareInfo'].setValue(true);
            this.content.myselfContactDB.update(this.userForm.value);
        }
    }

    clearFormControl(c: FormControl): void {
        c.reset();
        c.markAsDirty();
    }    

    save(): void {

        let headers = new Headers({ 
            Authorization: `Bearer ${this.content.auth.uid}`, 
            Accept: 'application/json', 
            'Content-Type': 'application/json' });

        if (this.authForm.dirty) {
            this.submittingAuthForm = true;

            if (this.authForm.invalid) {
                return;
            }

            this.http.post(`${ENV.apiServer}/auth/changepassword`, this.authForm.value).subscribe(result => {

                this.content.myselfContactDB.child('visited').set(true).then(data => {
                    let toast = this.toastCtrl.create({
                        message: '您的密碼已成功修改，請務必保存',
                        duration: 3000,
                        position: 'top',
                        cssClass: 'toast-success'
                    });

                    toast.present();
                    this.authForm.markAsPristine();
                    this.submittingAuthForm = false;
                }, console.error);

            }, err => {
                let toast = this.toastCtrl.create({
                    message: '密碼修改失敗',
                    duration: 3000,
                    position: 'top',
                    cssClass: 'toast-danger'
                });

                toast.present();
                this.authForm.markAsPristine();
                this.submittingAuthForm = false;
            });
        }

        if (this.userForm.dirty) {
            this.submittingUserForm = true;

            if (this.userForm.invalid) {
                return;
            }

            // generate skill list
            this.userForm.controls['skills'].setValue(Object.keys(this.skills).filter(k => this.skills[k])); 

            let success_toast = this.toastCtrl.create({
                message: '您的個人資料已成功保存',
                duration: 3000,
                position: 'top',
                cssClass: 'toast-success'
            });

            let failure_toast = this.toastCtrl.create({
                message: '資料保存出錯',
                duration: 3000,
                position: 'top',
                cssClass: 'toast-danger'
            });

            this.content.myselfContactDB.update(this.userForm.value).then(data => {

                success_toast.present();
                this.userForm.markAsPristine();
                this.submittingUserForm = false;
                this.avatarDirty = false;

                /* 2018-06-02: At the moment we don't want to update email on API server because 
                 the email on API server is associated with the login Gmail account, which doesn't have
                 to be the same as the one in firebase. 

                 The email on API server will only be updated when user associated their account with
                 Gmail plus. See ibcFB.linkGoogle()
                 */

                // if (this.userForm.controls.email.dirty) {
                //     this.http.post(`${ENV.apiServer}/auth/changeemail`, {
                //         email: this.userForm.controls.email.value
                //     }, new RequestOptions({ headers })).subscribe(res => {
                //         success_toast.present();
                //         this.userForm.markAsPristine();
                //         this.submittingUserForm = false;
                //         this.avatarDirty = false;
                //     }, err => { 
                //         failure_toast.present();
                //         this.userForm.markAsPristine();
                //         console.log(err);
                //         this.submittingUserForm = false;
                //     });
                // } else {
                //     success_toast.present();
                //     this.userForm.markAsPristine();
                //     this.submittingUserForm = false;
                //     this.avatarDirty = false;
                // }

            }).catch(err => {
                failure_toast.present();
                this.userForm.markAsPristine();
                console.log(err);
                this.submittingUserForm = false;
            });
        }
    }

    selectAvatar() {
        let selectModal = this.modalCtrl.create(ModalSelectAvatar, {form: this.userForm});
        selectModal.present();
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad UserProfilePage');
    }

}

@Component({
    template: `
<ion-header>

  <ion-navbar>
    <ion-buttons start>
      <button ion-button (click)="dismiss()">Close</button>
    </ion-buttons>
    <ion-title>Modals</ion-title>
  </ion-navbar>

</ion-header>


<ion-content padding>

    <button ion-item (click)="selectAvatar(ibcFB.wechatAuthInfo.headimgurl)">
        <img class="img-avatar" [src]="ibcFB.wechatAuthInfo.headimgurl" item-left>
        <ion-note>選擇微信頭像</ion-note>
    </button>

    <button ion-item (click)="selectAvatar(ibcFB.providerData[0]?.photoURL)">
        <img class="img-avatar" [src]="ibcFB.providerData[0]?.photoURL" item-left>
        <ion-note>選擇Gmail頭像</ion-note>
    </button> 

    <button ion-item (click)="selectFromAlbum()">
        <img *ngIf="!loadingAvatar" class="img-avatar" [src]="form.controls.photoURL.value" item-left>
        <ion-spinner *ngIf="loadingAvatar" class="page-spinner"></ion-spinner>
        <ion-note>從相簿里選擇照片</ion-note>
    </button>

</ion-content>
    `
})
export class ModalSelectAvatar {
    form: FormGroup;

    loadingAvatar: boolean;

    constructor(
        public viewCtrl: ViewController,
        public ibcFB: IbcFirebaseProvider,
        public content: DataProvider,
        public toastCtr: ToastController,
        public photoSvc: PhotoProvider,
        params: NavParams
    ) {
        this.form = params.get('form');
    }

    showSuccessToast() {
        let toast = this.toastCtr.create({
            message: 'Avatar已成功保存',
            duration: 3000,
            position: 'top',
            cssClass: 'toast-success'
        });

        toast.present();

        this.dismiss();
    }

    showFailureToast() {
        let toast = this.toastCtr.create({
            message: '資料保存出錯',
            duration: 3000,
            position: 'top',
            cssClass: 'toast-danger'
        });

        toast.present();
    } 

    selectAvatar(url: string): void {
        this.form.controls.photoURL.setValue(url);
        this.content.myselfContactDB.update({photoURL: url}).then(() => {
            this.showSuccessToast();
        }).catch(err => {
            this.showFailureToast();
        })
    }

    selectFromAlbum(): void {
        this.photoSvc.captureAndCrop(
            {
                cameraDirection: 1,
                targetWidth: 200,
                targetHeight: 200
            }, 
            {
                croppedWidth: 200, 
                croppedHeight: 200,
                preserveSize: true,
                keepAspect: true
            },
            (data) => {
            console.log('===> image data ready!');
            this.loadingAvatar = true;
            this.ibcFB.uploadFile(data, {path: `/avatar/${this.content.myselfContact.id}`, encoding: "base64", fileType: "image/png"}, (url) => {
                if (url) {
                    this.form.controls.photoURL.setValue(url);
                    this.content.myselfContactDB.update({photoURL: url}).then(() => {
                        this.showSuccessToast();
                    }).catch(err => {
                        this.showFailureToast();
                    });                    
                }
                this.loadingAvatar = false;
            }, err => {
                this.loadingAvatar = false;
            });
        })
    }    

    dismiss() {
        this.viewCtrl.dismiss();
    }
}