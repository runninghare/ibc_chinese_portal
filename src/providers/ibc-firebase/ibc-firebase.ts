import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { NavController, Platform } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
// import * as firebase from 'firebase/app';
import * as firebase from 'firebase/app';
import 'firebase/storage';
import { GooglePlus } from '@ionic-native/google-plus';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Crop } from '@ionic-native/crop';
import { ToastController } from 'ionic-angular';
import { EnvVariables } from '../../app/environment/environment.token';
import { AudioProvider } from '../audio/audio';
import { LoadTrackerProvider } from '../load-tracker/load-tracker';

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

@Injectable()
export class IbcFirebaseProvider {

    public userProfile$: Subject<firebase.User> = new BehaviorSubject<firebase.User>(null);

    public userProfile: firebase.User;

    public access_level: number = 0;

    constructor(
        public platform: Platform, 
        public afDB: AngularFireDatabase, 
        public afAuth: AngularFireAuth, 
        public afStore: AngularFirestore, 
        private googlePlus: GooglePlus, 
        private camera: Camera, 
        private crop: Crop,
        public http: Http,
        public loadTrackerSvc: LoadTrackerProvider,
        public toastCtrl: ToastController,
        public audioSvc: AudioProvider,
        @Inject(EnvVariables) public envVariables
    ) {

        window['firebase'] = firebase;
        window['ibcFB'] = this;

        firebase.auth().onAuthStateChanged(user => {
            // Unlike firebase.auth().signInWithCredential, this event is only triggered once when
            // the user is redirected from Google's sign-in page.
            if (user) {
                console.log("======= Redirected from Google SignIn page ====");

                // let subscription = this.afDB.object(`/users/${user.uid}`).valueChanges().subscribe((res) => {
                //     this.myselfContact = res;
                //     console.log('---- myself contact ---');
                //     console.log(this.myselfContact);
                //     subscription.unsubscribe();
                // }, err => subscription.unsubscribe());

                this.audioSvc.play('loginOk');

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

    myselfContact: any = {};

    authSuccessHandler = (user) => {
        console.log("Info (App): Sign-In successfully!");
        // console.log("Firebase success: " + JSON.stringify(user, null, 2));

        if (this.afAuth.auth.currentUser != this.userProfile ||
            this.afAuth.auth.currentUser && this.userProfile && this.afAuth.auth.currentUser.uid != this.userProfile.uid)
        {
            this.userProfile = this.afAuth.auth.currentUser;
            this.userProfile$.next(this.userProfile);
        }

        this.loadTrackerSvc.loading = false;
    }

    authFailureHandler = err => {
        // console.log("Error (App): Sign-In failed: ", JSON.stringify(err,null,2));

        this.loadTrackerSvc.loading = false;

        let toast = this.toastCtrl.create({
            message: '用戶名和密碼錯誤',
            duration: 3000,
            position: 'top',
            cssClass: 'toast-danger'
        });

        toast.present();
    }

    providerAuthSuccessHandler = () => {
        let uid = this.afAuth.auth.currentUser.uid;

        console.log(`uid = ${uid}`);

        // if (!uid.match(/^ibc_.*/)) {

            this.logoutGoogle().then(() => {
                this.http.post(`${this.envVariables.apiServer}/auth/uid`, {
                    uid
                }).subscribe(res => {
                    let data = res.json();
                    if (data && data.token) {
                        console.log("=== token ===");
                        console.log(data.token);
                        firebase.auth().signInWithCustomToken(data.token).then(this.authSuccessHandler, this.authFailureHandler);
                    } else {
                        this.loadTrackerSvc.loading = false;
                    }
                }, this.authFailureHandler);                
            }, this.authFailureHandler);

        // } else {
        //     this.authSuccessHandler(this.afAuth.auth.currentUser);
        // }
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
        } else {

            return this.googlePlus.login({
                // 'webClientId': '870700462998-0nfjspo3fkbqp1jft5jm985t41p5v0tj.apps.googleusercontent.com', // this is the web app client Id, not iOS client Id, nor Android client ID.
                'webClientId': '1050330285156-njj7aova0gar2q26l8spgu2hkv5fo7lb.apps.googleusercontent.com',
                'offline': true
            }).then(res => {

                /* SignIn to Firebase */

                const googleCredential = firebase.auth.GoogleAuthProvider.credential(res.idToken);

                return firebase.auth().signInWithCredential(googleCredential)
                    .then(this.providerAuthSuccessHandler, this.authFailureHandler);

            }, this.authFailureHandler);
        }

    }

    logoutGoogle(): Promise<any> {

        this.userProfile = null;
        this.userProfile$.next(this.userProfile);

        if (this.platform.is('core') || this.platform.is('mobileweb')) {
            return firebase.auth().signOut().then(() => this.afAuth.auth.signOut());            
        } else {
            return firebase.auth().signOut().then(() => {
                this.googlePlus.logout();
                this.audioSvc.play('logoutOk');
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
        this.http.post(`${this.envVariables.apiServer}/auth`, {
            username,
            password
        }).subscribe(res => {
            let data = res.json();
            if (data && data.token) {
                console.log(data.token);
                firebase.auth().signInWithCustomToken(data.token).then(this.authSuccessHandler, this.authFailureHandler);
            } else {
                this.loadTrackerSvc.loading = false;
            }
        }, this.authFailureHandler);
    }

    linkAccount(): void {
        let provider = new firebase.auth.GoogleAuthProvider();

        let linkSuccessHandler = result => {
            // Accounts successfully linked.
            var credential = result.credential;
            var user = result.user;

            console.log(result);

            let toast = this.toastCtrl.create({
                message: '成功關聯到Google帳戶',
                duration: 3000,
                position: 'top',
                cssClass: 'toast-success'
            });

            toast.present();

            window['result_user'] = result.user;

            if (this.afAuth.auth.currentUser.providerData.length > 0) {
                let displayName = this.afAuth.auth.currentUser.providerData[0].displayName;
                let photoURL = this.afAuth.auth.currentUser.providerData[0].photoURL;
                this.updateAuthUserProfile(this.afAuth.auth.currentUser, displayName, photoURL);
            }

            // ...
        };

        let linkErrorHandler = error => {
            // Handle Errors here.
            // ...
            console.log(error);

            let toast = this.toastCtrl.create({
                message: 'Google帳戶關聯失敗！',
                duration: 3000,
                position: 'top',
                cssClass: 'toast-danger'
            });

            toast.present();
        };

        if (this.platform.is('core') || this.platform.is('mobileweb')) {
            this.afAuth.auth.currentUser.linkWithPopup(provider).then(linkSuccessHandler).catch(linkErrorHandler);
        } else {
            this.afAuth.auth.currentUser.linkWithCredential(<any>provider).then(linkSuccessHandler).catch(linkErrorHandler);
        }

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

        let storageRef = firebase.storage().ref();
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


        // firebase.storage().ref().child('homecards.json').getDownloadURL()
        //     .then((savedPicture) => {
        //         console.log("=== image saved! ===");
        //     }, err => {
        //         console.log("=== image uploading failed ===");
        //         console.log(JSON.stringify(err));
        //     })
        //     .catch(err => {
        //         console.log(JSON.stringify(err));
        //     })
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
