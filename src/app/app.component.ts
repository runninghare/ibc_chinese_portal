import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
// import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { SQLite } from 'ionic-native';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { BiblePage } from '../pages/bible/bible';
import { ContactPage } from '../pages/contact/contact';
import { AboutPage } from '../pages/about/about';
import { UserProfilePage } from '../pages/user-profile/user-profile';
import { MinistryPage } from '../pages/ministry/ministry';
import { BrowserPage } from '../pages/browser/browser';
import { ChatPage } from '../pages/chat/chat';

import { MonthlyVersesPage } from '../pages/monthly-verses/monthly-verses';
import { IbcFirebaseProvider } from '../providers/ibc-firebase/ibc-firebase';

import { S2tProvider } from '../providers/s2t/s2t';
import { DataProvider } from '../providers/data-adaptor/data-adaptor';

import * as $ from 'jquery';

enum AuthLevel {
  Anonymous,
  LoggedIn,
  Member,
  Admin
}

@Component({
  templateUrl: 'app.html'
})
export class MyApp implements AfterViewInit {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  storage: SQLite;

  pages: Array<{title: string, component: any, needAuth?: boolean, params?: any}>;

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen, 
    public s2t: S2tProvider,
    public ibcFB: IbcFirebaseProvider,
    public content: DataProvider,
  ) {

    this.initializeApp();

    // this.platform.ready().then(() => {

    //     this.storage = new SQLite();

    //     this.storage.openDatabase({
    //         name: 'bible.db',
    //         location: 'default',
    //         createFromLocation: 1
    //     }).then(() => {
    //       console.log("=== connected ===");

    //       this.storage.executeSql("SELECT * from Bible limit 10", []).then((data) => {
    //           // console.log("Data received: ", data);
    //           let rows = data.rows;
    //           for (let i = 0; i < rows.length; i++) {
    //             console.log(JSON.stringify(rows.item(i)));
    //           }              
    //           this.storage.close();
    //       }, (error) => {
    //           console.error("Unable to execute sql", JSON.stringify(error));
    //           this.storage.close();
    //       });

    //     }, () => {
    //       console.log("=== error connection ===");
    //       this.storage.close();
    //     })
    // });

    // used for an example of ngFor and navigation
    this.pages = [
      { title: '回到首頁', component: HomePage, needAuth: false },
      { title: '贊美詩歌', component: ListPage, needAuth: false, params: () => this.content.fullSongPageParams},
      // { title: '本月金句', component: MonthlyVersesPage, needAuth: false },
      { title: '教會成員', component: ContactPage, needAuth: true },
      { title: '恆常事工', component: MinistryPage, needAuth: true },
      { title: '牧者分享', component: ListPage, needAuth: false, params: () => this.content.beliefUrlsParams },
      { title: '教會活動', component: ListPage, needAuth: false, params: () => this.content.activitiesParams },
      { title: '中文聖經', component: BiblePage, needAuth: false },
      { title: '我的好友', component: ContactPage, needAuth: true, params: {myFriends: true, title: '我的好友'} },
      { title: '我的任务', component: ListPage, needAuth: true, params: () => this.content.myTasksParams },
      { title: '關於我們', component: AboutPage, needAuth: false },
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngAfterViewInit(): void {
    // let page = this.pages[5];
    // this.openPage(page);
    // this.openPage({component: ChatPage, params: {contact: {
    //   "address1" : "35 King St.",
    //   "address2" : "Waratah West",
    //   "chinese_name" : "張靜",
    //   "country" : "",
    //   "dob" : "1978-03-06",
    //   "email" : "zhangjingets7836@gmail.com",
    //   "id" : "201",
    //   "mobile" : "0426752408",
    //   "name" : "Jill",
    //   "photoURL" : "https://firebasestorage.googleapis.com/v0/b/ibc-app-94466.appspot.com/o/avatar%2Fibc_Uweefae9Gaith?alt=media&token=6832ab37-ef27-47f0-b382-e39b58748187",
    //   "visited" : true
    // }}});
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component, (typeof page.params == 'function' ? page.params() : page.params));
  }
}
