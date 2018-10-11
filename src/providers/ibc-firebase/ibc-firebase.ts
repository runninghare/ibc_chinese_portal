import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Platform } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestore } from 'angularfire2/firestore';
// import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
// import * as firebase from 'firebase/app';
import * as firebase from 'firebase/app';
import 'firebase/storage';
import { GooglePlus } from '@ionic-native/google-plus';
import { Subject, BehaviorSubject } from 'rxjs';
import { ToastController } from 'ionic-angular';
import { AudioProvider } from '../audio/audio';
import { LoadTrackerProvider } from '../load-tracker/load-tracker';
import { WechatProvider, IntWeChatAuth } from '../wechat/wechat';
import { ENV } from '@app/env';
import { Base64 } from 'js-base64';

/*
  Generated class for the IbcFirebaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

export interface IntUser {
    name?: string;
    email?: string;
    mobile?: string;
}

export interface IntProvider {
    uid?: string;
    displayName?: string;
    email?: string;
    photoURL?: string;
    phoneNumber?: string;
    providerId?: string;
}

@Injectable()
export class IbcFirebaseProvider {

    public userProfile$: Subject<firebase.User> = new BehaviorSubject<firebase.User>(null);

    public userProfile: firebase.User;

    public access_level: number;

    public visited: boolean;

    public wechatAuthInfo: IntWeChatAuth = {};

    constructor(
        public platform: Platform, 
        public afDB: AngularFireDatabase, 
        public afAuth: AngularFireAuth, 
        public afStore: AngularFirestore, 
        private googlePlus: GooglePlus, 
        public http: Http,
        public loadTrackerSvc: LoadTrackerProvider,
        public toastCtrl: ToastController,
        public audioSvc: AudioProvider,
        public wechatSvc: WechatProvider
    ) {

        window['firebase'] = firebase;
        window['ibcFB'] = this;

        /* If user has already logged In, but didn't logout, when they reopen the App,
         * authSuccessHandler will not be called, but following event onAuthStateChanged
         * will still be triggered.
         */
        firebase.auth().onAuthStateChanged(user => {
            if (user) {

                let val = user.toJSON(), token;
                if (token = val['stsTokenManager'] && val['stsTokenManager'].accessToken) {
                    try {
                        let base64str = token.split('.')[1];
                        let extraTokenData = JSON.parse(Base64.decode(base64str));
                        if (extraTokenData.wechat) {
                            this.wechatAuthInfo = extraTokenData.wechat;
                        }
                    } catch (e) {
                    }

                }
                // let subscription = this.afDB.object(`/users/${user.uid}`).valueChanges().subscribe((res) => {
                //     this.myselfContact = res;
                //     console.log('---- myself contact ---');
                //     console.log(this.myselfContact);
                //     subscription.unsubscribe();
                // }, err => subscription.unsubscribe());

                if (user != this.userProfile ||
                    user && this.userProfile && user.uid != this.userProfile.uid) {
                    this.userProfile$.next(user);
                }
            }
        });

    }

    get user() {
        return this.afAuth.authState;
    }

    get isAuthed(): boolean {
        return this.afAuth && this.afAuth.auth && this.afAuth.auth.currentUser ? true : false;
    }

    get providerData(): IntProvider[] {
        if (this.afAuth && 
            this.afAuth.auth.currentUser &&
            this.afAuth.auth.currentUser.providerData &&
            this.afAuth.auth.currentUser.providerData.length > 0) {
            return this.afAuth.auth.currentUser.providerData;
        } else {
            return [];
        }
    }    

    myselfContact: any = {};

/*=========================================
=            Succeess Handlers            =
=========================================*/

    authSuccessHandler = (user) => {
        console.log("Info (App): Sign-In successfully!");
        this.audioSvc.play('loginOk');
        this.loadTrackerSvc.loading = false;
    }

    providerAuthSuccessHandler = () => {
        let uid = this.afAuth.auth.currentUser.uid;

        /* Only church members have uid with pattern ^ibc_.*, however, no matter it is a church member or not,
           we should always call /auth/uid because that API deletes that invalid account from firebase, otherwise
           you would have no chance to connect that gmail account with the correct uid.
         */
        
        /* Provider doesn't carry additional token data such as access_leve, to make additional token
         * data available, regardless whether it matches ^ibc_.* or not, we have to logout firebase first, 
         * send uid to API server, and then signIn with customer token.
         */
        this.logoutGoogle().then(() => {
            this.http.post(`${ENV.apiServer}/auth/uid`, {
                uid
            }).subscribe(res => {
                let data = res.json();
                if (data && data.token) {
                    firebase.auth().signInWithCustomToken(data.token).then(this.authSuccessHandler, this.authFailureHandler);
                } else {
                    this.loadTrackerSvc.loading = false;
                }
            }, () => {
                this.loadTrackerSvc.loading = false;
            });
        }, this.authFailureHandler);

    }   

/*=====  End of Succeess Handlers  ======*/
 
 /*========================================
 =            Failure Handlers            =
 ========================================*/
 
     passwordFailureHandler = err => {
        this.loadTrackerSvc.loading = false;

        let toast = this.toastCtrl.create({
            message: '用戶名和密碼錯誤',
            duration: 3000,
            position: 'top',
            cssClass: 'toast-danger'
        });

        toast.present();
    }

    authFailureHandler = err => {
        this.loadTrackerSvc.loading = false;

        let toast = this.toastCtrl.create({
            message: '登入失敗',
            duration: 3000,
            position: 'top',
            cssClass: 'toast-danger'
        });

        toast.present();
    }    

    logOutFailureHandler = err => {
        this.loadTrackerSvc.loading = false;

        let toast = this.toastCtrl.create({
            message: '登出失敗！',
            duration: 3000,
            position: 'top',
            cssClass: 'toast-danger'
        });

        toast.present();
    }
 
 /*=====  End of Failure Handlers  ======*/

    // Utility function called by both loginGoogle and linkGoogle
    googleAuth(): Promise<any> {
        return this.googlePlus.login({
                // 'webClientId': '870700462998-0nfjspo3fkbqp1jft5jm985t41p5v0tj.apps.googleusercontent.com', // this is the web app client Id, not iOS client Id, nor Android client ID.
                'webClientId': '1050330285156-njj7aova0gar2q26l8spgu2hkv5fo7lb.apps.googleusercontent.com',
                'offline': true
            });
    }

    /* Old Android SHA-1: 49:70:97:F3:CB:99:31:40:F8:B7:95:9E:14:2F:8C:BD:40:C2:EB:16 */
    /* New Android SHA-1: FE:60:85:0E:F0:7F:A5:92:FF:DC:67:59:7A:E1:8B:C6:E5:92:83:D5 */
    /* Test Sign-In with custom token:
       firebase.auth().signInWithCustomToken(token).then(res => console.log(res))
     */
    loginGoogle(): Promise<any> {

        /* SignIn to GooglePlus */
        this.loadTrackerSvc.loading = true;

        if (this.platform.is('core') || this.platform.is('mobileweb')) {
            return this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
                            .then(this.providerAuthSuccessHandler, this.authFailureHandler);
                            // .then(this.authSuccessHandler, this.authFailureHandler);
        } else {

            this.googleAuth().then(res => {

                /* SignIn to Firebase */
                const googleCredential = firebase.auth.GoogleAuthProvider.credential(res.idToken);

                return firebase.auth().signInWithCredential(googleCredential)
                    .then(this.providerAuthSuccessHandler, this.authFailureHandler);
                    // .then(this.authSuccessHandler, this.authFailureHandler);

            }, this.authFailureHandler);
        }

    }

    loginWechat(): Promise<any> {

        /* SignIn to GooglePlus */
        this.loadTrackerSvc.loading = true;

        return this.wechatSvc.weChatLogin().then(res => {
            let data = res.json();
            if (data && data.token) {
                return firebase.auth().signInWithCustomToken(data.token).then(this.authSuccessHandler, this.authFailureHandler);
            }
        }, this.authFailureHandler);

    }    

    logoutGoogle(): Promise<any> {

        this.userProfile = null;
        this.userProfile$.next(this.userProfile);

        if (this.platform.is('core') || this.platform.is('mobileweb')) {
            return firebase.auth().signOut().then(() => this.afAuth.auth.signOut());            
        } else {
            return firebase.auth().signOut().then(() => {
                this.googlePlus.logout();
            });
        }
    }

    // loginBrowser(): firebase.Promise<firebase.User> {
    //     this.beingLoggedIn = true;
    //     return this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then((user) => {
    //         // console.log("Info (Browser): Sign-In successfully!");
    //         // console.log("Firebase success: " + JSON.stringify(user,null,2));


    //         this.userProfile = this.afAuth.auth.currentUser;
    //         this.userProfile$.next(this.userProfile);  
    //         this.beingLoggedIn = false;         
    //         return this.userProfile;
    //     }, err => {
    //         this.beingLoggedIn = false;
    //         console.error("Error (Browser): Sign-In failed: ", err)
    //     });
    // }

    // logoutBrowser(): firebase.Promise<any> {
    //     this.userProfile = null;
    //     this.userProfile$.next(this.userProfile);
    //     return firebase.auth().signOut().then(() => this.afAuth.auth.signOut());
    // }

    customLogin(username, password): void {
        if (!username || !password) return;

        console.log(username);
        this.loadTrackerSvc.loading = true;
        this.http.post(`${ENV.apiServer}/auth`, {
            username,
            password
        }).subscribe(res => {
            let data = res.json();
            if (data && data.token) {
                // console.log(data.token);
                firebase.auth().signInWithCustomToken(data.token).then(this.authSuccessHandler, this.authFailureHandler);
            } else {
                this.loadTrackerSvc.loading = false;
            }
        }, this.passwordFailureHandler);
    }

    linkGoogle(): void {
        let provider = new firebase.auth.GoogleAuthProvider();

        let linkErrorHandler = error => {
            let toast = this.toastCtrl.create({
                message: 'Google帳戶關聯失敗！',
                duration: 3000,
                position: 'top',
                cssClass: 'toast-danger'
            });

            toast.present();

            this.loadTrackerSvc.loading = false;
        };        

        let linkSuccessHandler = result => {
            console.log('=== gmail linked ===');
            console.log(JSON.stringify(result));

            let headers = new Headers({
                Authorization: `Bearer ${result.uid}`,
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }); 

            this.http.post(`${ENV.apiServer}/auth/changeemail`, {
                email: result.email
            }, new RequestOptions({ headers })).subscribe(res => {

                let toast = this.toastCtrl.create({
                    message: '成功關聯到Google帳戶',
                    duration: 3000,
                    position: 'top',
                    cssClass: 'toast-success'
                });

                toast.present();

                this.loadTrackerSvc.loading = false;

                this.providerAuthSuccessHandler();
            }, err => {
                linkErrorHandler(err);
            });

            // this.logoutGoogle();

            // window['result_user'] = result.user;

            // if (this.afAuth.auth.currentUser.providerData.length > 0) {
            //     let displayName = this.afAuth.auth.currentUser.providerData[0].displayName;
            //     let photoURL = this.afAuth.auth.currentUser.providerData[0].photoURL;
            //     this.updateAuthUserProfile(this.afAuth.auth.currentUser, displayName, photoURL);
            // }
        };

        this.loadTrackerSvc.loading = true;

        if (this.platform.is('core') || this.platform.is('mobileweb')) {
            this.afAuth.auth.currentUser.linkWithPopup(provider).then(linkSuccessHandler).catch(linkErrorHandler);
        } else {
            this.googleAuth().then(res => {

                const googleCredential = firebase.auth.GoogleAuthProvider.credential(res.idToken);
                this.afAuth.auth.currentUser.linkWithCredential(googleCredential).then(linkSuccessHandler).catch(linkErrorHandler);

            }, linkErrorHandler);
        }
    }

    successHandlerLinkWechat = (message) => (res) => {
        this.loadTrackerSvc.loading = false;
        let userInfo = res.json();

        this.wechatAuthInfo = userInfo;

        let toast = this.toastCtrl.create({
            message,
            duration: 3000,
            position: 'top',
            cssClass: 'toast-success'
        });

        toast.present();

        // this.wechatSvc.linkingInProgress = false;
    }

    failureHandlerLinkWechat = (message) => (err) => {
        this.loadTrackerSvc.loading = false;
        let toast = this.toastCtrl.create({
            message,
            duration: 3000,
            position: 'top',
            cssClass: 'toast-danger'
        });

        toast.present();
        // this.wechatSvc.linkingInProgress = false;
    }

    linkWechat(): void {
        this.loadTrackerSvc.loading = true;
        this.wechatSvc.weChatLink(this.userProfile.uid)
            .then(this.successHandlerLinkWechat('成功關聯到WeChat帳戶'))
            .catch(this.failureHandlerLinkWechat('Wechat帳戶關聯失敗！'));
    }

    /* Ideally we should only use linkWechat/loginWechat. The reason why we must send another request
     via linkWeChatSendApiRequest/loginWeChatSendApiRequest is that deepLinks intercepts the incoming HTTP request such that 
     the callback function from weChat.auth() will never be executed. 

     linkWeChatSendApiRequest/loginWeChatSendApiRequest must be called within the routing logic from deepLinks.
     */
    linkWeChatSendApiRequest(code: string) {
        this.loadTrackerSvc.loading = true;
        this.wechatSvc.weChatLinkSendApiRequest(this.userProfile.uid, code)
                      .subscribe(this.successHandlerLinkWechat('成功關聯到WeChat帳戶'), this.failureHandlerLinkWechat('Wechat帳戶關聯失敗！'));
    }

    loginWeChatSendApiRequest(code: string) {
        this.loadTrackerSvc.loading = true;
        this.wechatSvc.weChatLoginSendApiRequest(code)
            .subscribe(res => {
                let data = res.json();
                if (data && data.token) {
                    return firebase.auth().signInWithCustomToken(data.token).then(this.authSuccessHandler, this.authFailureHandler);
                }
            }, this.failureHandlerLinkWechat('Wechat登入失敗！'));
    }

    uploadFile(
        fileContent: string, 
        options: {path: string, encoding: string, fileType: string}, 
        successHandler?: (any) => void, 
        failureHandler?: (any) => void
    ): void {

        if (!fileContent || !options) {
            console.error("Error: uploadFile function must have fileContent and options parameters");
        }

        let path = options.path;
        let encoding = options.encoding;
        let fileType = options.fileType;

        if (!path || !encoding || !fileType) {
            console.error('Error: uploadFile function must have path, encoding and fileType.')
        }

        try {
            let uploadTask = firebase.storage().ref(path).putString(fileContent, encoding, {contentType: fileType});

            uploadTask.on('state_changed', snapshot => {
            }, (error) => {
                console.log(JSON.stringify(error));
                failureHandler && failureHandler(error);
            }, () => {
                var downloadURL = uploadTask.snapshot.downloadURL;
                console.log(downloadURL);
                successHandler && successHandler(downloadURL);
            });
        } catch (error) {
            console.log(JSON.stringify(error));
            failureHandler && failureHandler(error);
        }
    }

    updateAuthUserEmail(user: firebase.User, email: string): void {
        user.updateEmail(email).then(() => {
        }, (error) => {
        });
    }

    updateAuthUserProfile(user: firebase.User, displayName: string, photoURL: string): void {
        user.updateProfile({
            displayName,
            photoURL
        }).then(() => {
            // Update successful.
        }).catch((error) => {
            // An error happened.
        });
    }

}
