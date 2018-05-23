import { Component, OnInit } from '@angular/core';
import { animate, state, trigger, style, transition } from '@angular/core';
import { Http } from '@angular/http';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';
import { IbcFirebaseProvider } from '../../providers/ibc-firebase/ibc-firebase';
import { ToastController } from 'ionic-angular';
import { PhotoProvider } from '../../providers/photo/photo';
// import { PhotoProvider, IntCropperSettings } from '../../providers/photo/photo';
import { DataProvider, IntContact } from '../../providers/data-adaptor/data-adaptor';
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
            console.log('true');
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
        "影音": false
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
        public cacheSvc: FileCacheProvider
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
            visited: [null]
        });
    }

    ngOnInit(): void {
        this.uid = this.ibcFB.afAuth.auth.currentUser.uid
        console.log(this.uid);

        this.content.currentUser$.subscribe((user: IntContact) => {
            console.log("---- user ----");
            console.log(JSON.stringify(user));
            if (!user.visited) {
                this.showAuthInfo = true;
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

    save(): void {

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

            this.content.myselfContactDB.update(this.userForm.value).then(data => {
                let toast = this.toastCtrl.create({
                    message: '您的個人資料已成功保存',
                    duration: 3000,
                    position: 'top',
                    cssClass: 'toast-success'
                });

                toast.present();
                this.userForm.markAsPristine();

                this.submittingUserForm = false;
                this.avatarDirty = false;
            }).catch(err => {
                let toast = this.toastCtrl.create({
                    message: '資料保存出錯',
                    duration: 3000,
                    position: 'top',
                    cssClass: 'toast-danger'
                });

                toast.present();
                this.userForm.markAsPristine();
                console.log(err);
                this.submittingUserForm = false;
            });
        }
    }

    changeAvatar(): void {
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
            this.ibcFB.uploadFile(data, {path: `/avatar/${this.uid}`, encoding: "base64", fileType: "image/png"}, (url) => {
                if (url) {
                    this.userForm.controls.photoURL.setValue(url);
                    this.userForm.controls.photoURL.markAsDirty();
                }
                this.loadingAvatar = false;
                this.avatarDirty = true;
            }, err => {
                this.loadingAvatar = false;
            });
        })
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad UserProfilePage');
    }

}
