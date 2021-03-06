import { Component, OnDestroy } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { BrowserProvider } from '../../providers/browser/browser';
import { CommonProvider } from '../../providers/common/common';
import { database, DataProvider, IntListItem, IntContact, IntActivity, IntIBCImage, IntPopupTemplateItem, TypeInputUI} from '../../providers/data-adaptor/data-adaptor';
import { AudioProvider } from '../../providers/audio/audio';
import { NotificationProvider } from '../../providers/notification/notification';
import { Observable, Subscription } from 'rxjs';
import { ChatPage } from '../../pages/chat/chat';
import { PhotoProvider } from '../../providers/photo/photo';
import { IbcFirebaseProvider } from '../../providers/ibc-firebase/ibc-firebase';
import { LoadTrackerProvider } from '../../providers/load-tracker/load-tracker';
import { IbcHttpProvider } from '../../providers/ibc-http/ibc-http';
import { PopupComponent } from '../../components/popup/popup';
import { VideoProvider } from '../../providers/video/video';
import { WechatProvider } from '../../providers/wechat/wechat';

import { MediaDownloaderComponent } from '../../components/media-downloader/media-downloader';

import * as moment from 'moment';


/**
 * Generated class for the ActivityPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'activity-page',
  segment: 'activity/:id'
})
@Component({
  selector: 'page-activity',
  templateUrl: 'activity.html',
  styles: [
    `.act-image {
      padding-left: 0px;
      background: url('assets/img/loading.gif') no-repeat;
      background-size: cover;   
      min-height: 100px;
      background-position: center center;    
    }`
  ]
})
export class ActivityPage implements OnDestroy {

  activityIndex: number;
  activityId: string;
  activity: IntActivity = {};
  activityDB: database.Reference;
  persons: IntContact[] = [];

  currentParticipantsCount: number = 0;

  myIndex: number = -1

  subscriptions: Subscription[] = [];

  question: IntPopupTemplateItem;

  lastContactCounts: number;

  constructor(
      public ibcHttp: IbcHttpProvider,
      public navCtrl: NavController, 
      public modalCtrl: ModalController,
      public navParams: NavParams, 
      public browser: BrowserProvider, 
      public commonSvc: CommonProvider,
      public content: DataProvider,
      public audioSvc: AudioProvider,
      public notificationSvc: NotificationProvider,
      public photoSvc: PhotoProvider,
      public ibcFB: IbcFirebaseProvider,
      public loadTrackerSvc: LoadTrackerProvider,
      public videoSvc: VideoProvider,
      public wechat: WechatProvider
      ) {

      this.activityId = navParams.get('id');

      this.subscriptions.push(this.content.activities$.subscribe((activities: IntActivity[]) => {

          let act = activities.filter(item => item.id == this.activityId)[0];

          if (act) {
            this.activity = act;
            this.activityIndex = activities.indexOf(act);
            this.activity.past = moment().isAfter(act.datetime);
            this.currentParticipantsCount = act.participants ? act.participants.length : 0;
            this.activityDB = this.content.activitiesDB.child(`${this.activityIndex}`);
          }

          if (act && act.participants) {
            if (!this.content.myselfContact) {
              this.myIndex = -1;
            } else {
              this.myIndex = act.participants.map(p => p.userId).indexOf(this.content.myselfContact.id);
            }
            this.persons = this.content.allContacts.filter(contact => this.activity.participants.filter(p => p.userId == contact.id).length > 0);
          } else {
            this.myIndex = -1;
            this.persons = [];
          }

          if (act && act.question) {
              act.answerChoices = act.answerChoices || "";
              this.question = {
                  "caption": act.question,
                  "key": act.questionKey,
                  "type": act.questionType,
                  "lookupSource": Observable.of(act.answerChoices.split(/\s*[,，]\s*/).map(v => {return {
                    caption: v,
                    value: v
                  }}))
              };
          }
      }, err => {}));

      this.subscriptions.push(this.content.lastCounts$.subscribe(lastCounts => {
          this.lastContactCounts = lastCounts && lastCounts['contacts'];
      }, err => { }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub && sub.unsubscribe());
  }

  getParticipantFromPerson(person: IntContact) {
    if (person) {
      return this.activity.participants.filter(p => p.userId == person.id)[0];
    } else {
      return null;
    }
  }

  sendAddNotification(): void {
      let datetimeCaption = moment(this.activity.datetime).format("M月D日");
      let item: IntListItem = {
          datetime: this.activity.datetime,
          // isNew: true,
          key: `${this.activity.key || this.activity.title}-${this.activity.datetime}`,
          value: this.activity.key || this.activity.title,
          params: {
              id: this.activityId
          },
          redirect: "activity-page",
          sender: this.content.myselfContact.id,
          subtitle: "",
          title: `教會活動：${datetimeCaption} - ${this.activity.title}`
      }

      this.notificationSvc.addNotification(this.content.myselfContact.id, item);
  } 

  sendCancelNotification(): void {
    this.notificationSvc.removeMyNotification(`${this.activity.key || this.activity.title}-${this.activity.datetime}`);
  }

  register(val: string): void {

    if (this.myIndex >= 0) {
      /* Already registered */
      return;
    }    

    this.activityDB
        .child('participants')
        .child(`${this.currentParticipantsCount}`)
        .set({
            userId: this.content.myselfContact.id,
            comment: val
        }).then(() => {
            this.commonSvc.toastSuccess(`歡迎加入 ${this.activity.title} 活動!`);
            this.sendAddNotification()
        }, err => {
            this.commonSvc.toastFailure('加入失敗', err);
        })


    // let createAnserFunc = (val: string = null) => {
    //   console.log(val);
    //   return () => {
    //     this.activityDB
    //       .child('participants')
    //       .child(`${this.currentParticipantsCount}`)
    //       .set({
    //         userId: this.content.myselfContact.id,
    //         comment: val
    //       }).then(() => {
    //         this.commonSvc.toastSuccess(`歡迎加入 ${this.activity.title} 活動!`);
    //       }, err => {
    //         this.commonSvc.toastFailure('加入失敗', err);
    //       })
    //     }
    // };

    // if (this.activity.question) {
    //     let alert;
    //     switch (this.activity.questionType) {
    //         case "yesOrNo":
    //             alert = this.commonSvc.alertCtrl.create({
    //                 message: this.activity.question,
    //                 // inputs: [
    //                 //     {
    //                 //       type: 'radio',
    //                 //       label: '否',
    //                 //       value: '否',
    //                 //     },
    //                 //     {
    //                 //       type: 'radio',
    //                 //       label: '是',
    //                 //       value: '是',
    //                 //     },                        
    //                 // ],
    //                 buttons: [{
    //                     text: '否',
    //                     role: 'cancel',
    //                     handler: createAnserFunc('否')
    //                 },
    //                 {
    //                     text: '是',
    //                     handler: createAnserFunc('是')
    //                   }
    //                 ]
    //             });
    //             alert.present();
    //             // code...
    //             break;

    //         case "selection":
    //             alert = this.commonSvc.alertCtrl.create({
    //                 message: this.activity.question,
    //                 inputs: [],
    //                 buttons: [
    //                   {
    //                     text: '確定參加',
    //                     handler: data => createAnserFunc(data)()
    //                   }
    //                 ]
    //             });
    //             if (this.activity.answerChoices) {
    //               this.activity.answerChoices.split(/\s*[,，]\s*/).forEach(choice => {
    //                 alert.addInput({
    //                   type: 'radio',
    //                   label: choice,
    //                   value: choice
    //                 });
    //               });
    //             }
    //             alert.present();
    //             break;

    //         default:
    //             alert = this.commonSvc.alertCtrl.create({
    //                 message: this.activity.question,
    //                 inputs: [
    //                     {
    //                       name: 'answer',
    //                     }
    //                 ],
    //                 buttons: [
    //                   {
    //                     text: '確定參加',
    //                     handler: data => createAnserFunc(data.answer)()
    //                   }
    //                 ]
    //             });
    //             alert.present();            
    //             break;
    //       }
    // } else {
    //   createAnserFunc()();
    // }
  }

  cancel(): void {
      this.commonSvc.confirmDialog(null, '你真的要退出嗎？', () => {
          if (this.myIndex >= 0) {
              this.activity.participants.splice(this.myIndex, 1);
              console.log(this.activity.participants);
              this.activityDB
                  .child('participants')
                  .set(this.activity.participants).then(() => {
                      this.commonSvc.toastSuccess(`你已經退出 ${this.activity.title} 活動!`);
                      this.sendCancelNotification();
                  }, err => {
                      this.commonSvc.toastFailure('退出失敗', err);
                  })
          }
      });
  }

  addContact(): void {
      let newId = this.lastContactCounts + 1;
      Promise.all([
          this.content.allContactsDB.child(`${newId}`).set({
              id: newId,
              name: 'Activity',
              chinese_name: this.activity.title,
              skills: [],
              class: 'group',
              hidden: true,
              createDT: moment().format("YYYY-MM-DD HH:mm:ss")
          }),
          this.content.lastCountDB.child('contacts').set(newId)
      ])
          .then(() => {
              this.commonSvc.toastSuccess('添加成功');
          })
          .catch(err => {
              this.commonSvc.toastFailure('添加失败', err);
          });
  }

  goToChat(): void {
    this.navCtrl.push(ChatPage, {contact: {id: this.activity.chatId, name: '留言', chinese_name: this.activity.title, class: 'group'}});
  }

  openLink(url?: string): void {
    let selectCtrl = this.modalCtrl.create(MediaDownloaderComponent, {imageUrl: url, removeFunc: this.removePhoto.bind(this, url)});
    selectCtrl.present();
      // this.browser.openPage(url);
  }

  removePhoto(photo: string|IntIBCImage, callback?: Function): void {
    if (!photo || !this.activity.pictures) return;

    let allUrls = [];
    this.activity.pictures.forEach(p => {
      if (typeof p == 'string') {
        allUrls.push(p);
      } else if (p && p.detail) {
        allUrls.push(p.detail);
      }
    });

    let index = allUrls.indexOf(photo);

    console.log(`==== remove photo at index: ${index} ===`);
    console.log(photo);

    this.commonSvc.confirmDialog("你確定要刪除這張照片嗎", "刪除後所有人將無法看見", () => {
      this.activity.pictures.splice(index,1);
      this.activityDB.child(`pictures`).set(this.activity.pictures).then(() => {
        this.commonSvc.toastSuccess('相片已成功删除');
        callback && callback();
      }).catch(err => {
        console.log(this.activity.pictures);
        this.commonSvc.toastFailure('删除失败', err => {console.error(JSON.stringify(err, null, 2))});
        callback && callback();
      });
    });
  }

  addPhoto(url: string|IntIBCImage[]): void {
    if (url) {

      if (!this.activity.pictures) {
        this.activity.pictures = [];
      }

      if (typeof url == 'string') {
        this.activity.pictures.push(url);
      } else if (Array.isArray(url)) {
        url.forEach(u => {
          this.activity.pictures.push(u);
        })
      }

      this.activityDB.child(`pictures`).set(this.activity.pictures).then(() => {
        this.commonSvc.toastSuccess('圖片上傳成功');
      }).catch(err => {
        console.log(this.activity.pictures);
        this.commonSvc.toastFailure('上傳失敗', err => { console.error(JSON.stringify(err, null, 2)) });
      });
    }
  }

  addVideo(): void {
    if (this.commonSvc.isWeb) {
      let itemToEdit = {};

      let popupModal = this.modalCtrl.create(PopupComponent, {
        title: 'Youtube',
        definitions: [
              {
                  key: 'title',
                  caption: '標題'
              },
              {
                  key: 'youtubeId',
                  caption: 'Youtube ID'
              }              
            ],
        item: itemToEdit,
        cancel: () => popupModal.dismiss(),
        save: (item) => {
          if (item.youtubeId) {
            if (!this.activity.videos) {
              this.activity.videos = [];
            }

            this.activity.videos.push(item);

            this.activityDB.child(`videos`).set(this.activity.videos).then(() => {
              this.commonSvc.toastSuccess('影像上傳成功');
            }).catch(err => {
              console.log(this.activity.videos);
              this.commonSvc.toastFailure('上傳失敗', err => { console.error(JSON.stringify(err, null, 2)) });
            }); 

            popupModal.dismiss();
          }
        }
      });
      popupModal.present();
    }
  }

  uploadPhoto(): void {
    if (this.commonSvc.isWeb) {
      let itemToEdit = {
        url: 'http://ibc.medocs.com.au/photos/thumbnails.php?dir=20190914&size=200',
        type: 'single',
        pattern: "20190914/.*\\.JPG",
        detailURLRegex: "photo.php\\?fn=show&sizeh=300&sizew=0&file=\\./",
        detailURLTarget: "",
        baseUrl: "http://ibc.medocs.com.au/photos/photo.php?fn=show&sizeh=300&sizew=0&file=./"
      };

      let popupModal = this.modalCtrl.create(PopupComponent, {
        title: '圖片',
        definitions: [
              {
                  key: 'url',
                  caption: 'URL'
              },
              {
                  key: 'type',
                  caption: '上傳類型',
                  type: TypeInputUI.Dropdown,
                  lookupSource: Observable.of([
                      {
                          val: 'single',
                          cap: '單張圖片'
                      },
                      {
                          val: 'multiple',
                          cap: '提取所有圖片'
                      },                     
                  ]),
                  lookupCaption: 'cap',
                  lookupValue: 'val'  
              },     
              {
                  key: 'pattern',
                  caption: '匹配表達式',
                  hidden: (item) => item.type != 'multiple'
              },
              {
                  key: 'detailURLRegex',
                  caption: '大圖URL替換正則表達式',
                  hidden: (item) => item.type != 'multiple'
              },
              {
                  key: 'detailURLTarget',
                  caption: '大圖URL替換目標表達式',
                  hidden: (item) => item.type != 'multiple'
              },      
              {
                  key: 'baseUrl',
                  caption: 'Base URL',
                  hidden: (item) => item.type != 'multiple'
              }
            ],
        item: itemToEdit,
        cancel: () => popupModal.dismiss(),
        save: (item) => {
            if (item.url) {
                if (item.type == 'multiple') {
                    console.log(item);
                    this.ibcHttp.post('jsdom/images', item).then(result => {
                        if (result && result.images) {

                            let images: IntIBCImage[] = result.images;

                            if (item.detailURLRegex) {
                                let regex = new RegExp(item.detailURLRegex);
                                images = result.images.map(image => {
                                    return {
                                        thumbnail: image,
                                        detail: image.replace(regex, item.detailURLTarget)
                                    }
                                });
                            }
                            // console.log(images);
                            this.addPhoto(images);
                        }
                        popupModal.dismiss();
                    }).catch(err => {
                        popupModal.dismiss();
                    });
                } else if (item.type == 'single') {
                    this.addPhoto(item.url);
                    popupModal.dismiss();
                }
            }
        }
      });
      popupModal.present();
      return;
    }

    this.loadTrackerSvc.loading = true;

    this.photoSvc.camera.getPicture({
        cameraDirection: 1,
        sourceType: this.photoSvc.camera.PictureSourceType.PHOTOLIBRARY,
        destinationType: this.photoSvc.camera.DestinationType.DATA_URL,
        // quality: 100,
        targetWidth: 1024,
        targetHeight: 768,
        // targetHeight: 400,
        encodingType: this.photoSvc.camera.EncodingType.PNG,
        correctOrientation: true 
    })
    .then((data) => {
      this.ibcFB.uploadFile(data, { path: `/activity/${this.activityIndex}/${this.commonSvc.makeRandomString(10)}`, encoding: "base64", fileType: "image/png" }, (url) => {
        this.addPhoto(url);
        this.loadTrackerSvc.loading = false;
      }, err => {
        this.loadTrackerSvc.loading = false;
      });

    }, () => {
      this.loadTrackerSvc.loading = false;
    });
  }

  removeVideo(video: any) {
    if (!video || !this.activity.videos) return;

    let index = this.activity.videos.indexOf(video);
    this.commonSvc.confirmDialog("你確定要刪除這段視頻嗎", "刪除後所有人將無法看見", () => {
      this.activity.videos.splice(index,1);
      this.activityDB.child(`videos`).set(this.activity.videos).then(() => {
        this.commonSvc.toastSuccess('視頻已成功删除');
      }).catch(err => {
        console.log(this.activity.videos);
        this.commonSvc.toastFailure('删除失败', err => {console.error(JSON.stringify(err, null, 2))});
      });
    });
  }

  playVideo(id: string) {
    this.videoSvc.play(id);
  }

  share(): void {
      let url = `http://ibc.medocs.com.au/app/#/activity/${this.activityId}`;
      this.wechat.weChatShareLink(url, `教会活动: ${this.activity.title}`, this.activity.description, this.activity.thumbnail || 'https://cordova.apache.org/images/cordova_256.png');
  }

  ionViewDidLoad() {
  }

}
