import { Component, ViewChild, OnDestroy } from '@angular/core';
import { IonicPage, ModalController, NavController, NavParams, Searchbar, ViewController } from 'ionic-angular';
import * as firebase from 'firebase/app';
import { CommonProvider } from '../../providers/common/common';
import { BrowserProvider } from '../../providers/browser/browser';
import { PopupComponent } from '../../components/popup/popup';

/// Available Redirect Pages
import { ActivityPage } from '../activity/activity';
import { MinistryPage } from '../ministry/ministry';
import { SongPage } from '../song/song';
import { ChatPage } from '../chat/chat';

/// Providers and Services
import { S2tProvider } from '../../providers/s2t/s2t';
import { Observable, Subscription } from 'rxjs';
import { DataProvider, IntPopupTemplateItem, IntListItem, IntListPageParams, IntAuxiliaryButton } from '../../providers/data-adaptor/data-adaptor';

@IonicPage({
  segment: 'list/:type'
})
@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage implements OnDestroy {
  params: IntListPageParams;
  items$: Observable<IntListItem[]> = Observable.of([]);
  itemsDB: firebase.database.Reference;
  items: IntListItem[] = [];
  title: string;
  templateForAdd: IntPopupTemplateItem[];
  groupBy: string;
  groupValues: string[] = [];
  checkNew: boolean;
  fullPermission: boolean;
  hideEdit: boolean;
  hideDelete: boolean;
  showReadOrUnread: boolean;
  listHasKeys: boolean;
  questionParams: IntPopupTemplateItem = {};
  additionalSlideButton: IntAuxiliaryButton;
  auxiliaryItems: any[] = [];
  postAddCallback: (item: any, keyOrIndex: any) => Promise<any>;
  postDeleteCallback: (item: any, keyOrIndex: any) => Promise<any>;
  defaultAvatarImg: string;
  defaultThumbnailImg: string;
  forSelection: boolean;
  preselectedItemKeys: string[];
  selectFunc?(item: any): void;
  itemTappedPreFunc?(item?: any, index?:any): void;
  addItemUseComponent: string;
  addItemFuncFactory?(modalCtrl: ModalController, componentName: string): () => void;
  noSlideOptions: boolean;

  filterFunc: (a:string, b:any) => boolean;
  mapFunc: (a?:any, index?: number) => any;
  orderByFunc: (a:any, b:any) => number;
  groupOrderByFunc: (a:any, b:any) => number;
  reverseMapFunc: (a?:any) => any;
  callFunc: (a?:any) => any;
  subtitleAs: (a?:any) => any;
  titleAs: (a?:any) => any;

  visibility: boolean[][] = [];

  mappedItems: IntListItem[][] = [];

  filterText: string;

  subscription: Subscription;

  selectedObj: any = {};

  @ViewChild('searchBar') searchBar: Searchbar;

  constructor(
    public content: DataProvider,
    public commonSvc: CommonProvider,
    public modalCtrl: ModalController,
    public viewCtrl: ViewController,
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public s2t: S2tProvider,
    public browser: BrowserProvider) {
    // If we navigated to this page, we will have an item available as a nav param
    let type = navParams.get('type');
    console.log(type);

    if (type) {
      let params = this.params = typeof type == 'string' ? this.content[type] : typeof type == 'function' ? type() : type;

      console.log('--- params ---');
      console.log(params);

      if (params) {
          this.itemsDB = params['itemsDB'];
          this.items$ = params['items$'];
          this.groupBy = params['groupBy'];
          this.checkNew = params['checkNew'];
          this.hideEdit = params['hideEdit'];
          this.hideDelete = params['hideDelete'];
          this.showReadOrUnread = params['showReadOrUnread'];
          this.listHasKeys = params['listHasKeys'];
          this.fullPermission = params['fullPermission'];
          this.postAddCallback = params['postAddCallback'];
          this.postDeleteCallback = params['postDeleteCallback'];
          this.additionalSlideButton = params['additionalSlideButton'];
          this.defaultAvatarImg = params['defaultAvatarImg'];
          this.defaultThumbnailImg = params['defaultThumbnailImg'];
          this.preselectedItemKeys = params['preselectedItemKeys'];
          this.selectFunc = params['selectFunc'];
          this.forSelection = params['forSelection'];
          this.addItemUseComponent = params['addItemUseComponent'];
          this.addItemFuncFactory = params['addItemFuncFactory'];
          this.itemTappedPreFunc = params['itemTappedPreFunc'];
          this.noSlideOptions = params['noSlideOptions'];
      }
    }

    if (this.preselectedItemKeys) {
      this.preselectedItemKeys.forEach(k => {
        this.selectedObj[k] = true;
      });
    }

    if (this.additionalSlideButton && this.additionalSlideButton.getAuxiliaryDB) {
      this.additionalSlideButton.getAuxiliaryDB().on('value', snapshot => {
        this.auxiliaryItems = snapshot.val();
      });
    }

    let titleAs = this.params.titleAs;
    if (typeof titleAs == 'string') {
      this.titleAs = item => titleAs;
    } else if (typeof titleAs == 'function') {
      this.titleAs = titleAs;
    } else {
      this.titleAs = null;
    }    

    let subtitleAs = this.params.subtitleAs;
    if (typeof subtitleAs == 'string') {
      this.subtitleAs = item => subtitleAs;
    } else if (typeof subtitleAs == 'function') {
      this.subtitleAs = subtitleAs;
    } else {
      this.subtitleAs = null;
    }

    if (this.items$) {
      this.subscription = this.items$.subscribe(items => {
        this.items = items;

        if (this.groupBy) {
          /* This trick is aiming at resolving the conflicts between number and string type during uniquification */
          /* e.g. we may have this.groupValues = [1,2,3,4,"4"] if we don't convert the number to string */
          this.items.forEach(item => {
            if (typeof item[this.groupBy] == 'number') {
              item[this.groupBy] = `${item[this.groupBy]}`;
            }
          });
          this.groupValues = this.items.map(item => item[this.groupBy]).filter(this.commonSvc.arrayUniq).sort(this.groupOrderByFunc);
        } else {
          this.groupValues =[null];
        }

        this.groupValues.forEach(gv => {
          this.visibility[gv] = [];
          this.mappedItems[gv] = this.mappedItemsFunc(gv);
        })

        let value = this.searchBar.value;
        this.getItems({target: {value}});
      }, err => {});
    }

    this.title = this.params.title;
    this.templateForAdd = this.params.templateForAdd;

    this.filterFunc = this.params.filterFunc;
    if (!this.filterFunc) {
      this.filterFunc = (val, item) => {
        return `${item.title} ${item.subtitle}`.toLowerCase().indexOf(this.s2t.tranStr(val, true)) > -1;
      }
    }
    this.mapFunc = this.params.mapFunc;
    if (!this.mapFunc) {
      this.mapFunc = item => item;
    }
    this.reverseMapFunc = this.params.reverseMapFunc;
    if (!this.reverseMapFunc) {
      this.reverseMapFunc = item => item;
    }
    this.callFunc = this.params.callFunc;
    if (!this.callFunc) {
      this.callFunc = () => console.log('=== default callFunc ===');
    }
    this.groupOrderByFunc = this.params.groupOrderByFunc;
    if (!this.groupOrderByFunc) {
      this.groupOrderByFunc = (a,b) => a < b ? -1 : 1;
    }
    this.orderByFunc = this.params.orderByFunc;
    if (!this.orderByFunc) {
      this.orderByFunc = (a,b) => a < b ? -1 : 1;
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  groupByCaptionFunc(val, key?: string): string {
    if (!this.templateForAdd) return null;
    let defOfGroupByItem = this.templateForAdd.filter(item => item.key == this.groupBy)[0];
    if (defOfGroupByItem && defOfGroupByItem.groupByFunc) {
      return defOfGroupByItem.groupByFunc(val, key); 
    } else {
      return `${key + ' ' + val}`;
    }
  }

  getItemIndex(mappedItem): number {
    let k = this.listHasKeys ? 'key' : 'id';
    return this.items.map(item => item[k]).indexOf(mappedItem[k]);
  }

  mappedItemsFunc(groupVal: any): IntListItem[] {
      return this.items.filter(item => item[this.groupBy] == groupVal).sort(this.orderByFunc).map((item, i) => {
          this.visibility[groupVal][i] = (!this.filterText || this.filterFunc(this.filterText, item)) ? true : false;
          return item;
      }).map(this.mapFunc);
  }

  groupEmpty(groupVal: any): boolean {
    return !this.groupBy || !this.visibility[groupVal].reduce((prev, curr) => prev || curr, false);
  }

  getItems(ev: any): void {
    this.filterText = `${ev.target.value || ''}`.toLowerCase();
    this.groupValues.forEach(gv => {
      this.mappedItemsFunc(gv);
    });
  }

  deleteItem(i: number): void {
        this.commonSvc.confirmDialog(null, '你确定要删除吗?', () => {

            if (this.listHasKeys) {
              let key = this.items[i].key || i;

              // console.log(`key = ${key}`);

              if (key) {
                this.itemsDB.child(`${key}`).remove().then(() => {
                  if (this.postDeleteCallback) {
                    this.postDeleteCallback(this.items[i], key).then(() => {
                      this.commonSvc.toastSuccess('删除成功');
                    }) 
                  } else {
                    this.commonSvc.toastSuccess('删除成功');
                  }
                }).catch(err => {
                    this.commonSvc.toastFailure('删除失败', err);
                });
              }
            } else {
                let item = this.items.splice(i, 1)[0];
                let itemsToSave = this.items.map(item => this.reverseMapFunc(item));
                this.itemsDB.set(itemsToSave).then(() => {
                  if (this.postDeleteCallback) {
                    this.postDeleteCallback(item, i).then(() => {
                      this.commonSvc.toastSuccess('删除成功');
                    }) 
                  } else {
                    this.commonSvc.toastSuccess('删除成功');
                  }
                }).catch(err => {
                    this.commonSvc.toastFailure('删除失败', err);
                    this.items.splice(i, 0, item);
                });              
            }

        });
  }

  defaultSelectFunc(): void {
    this.viewCtrl.dismiss(this.selectedItems());
  }

  addItemPopup(): void {
    if (this.addItemFuncFactory && this.addItemUseComponent) {
      this.addItemFuncFactory(this.modalCtrl, this.getComponentFromName(this.addItemUseComponent))();
    } else {
        let popupModal = this.modalCtrl.create(PopupComponent, {
            title: this.title,
            definitions: this.templateForAdd || [],
            cancel: () => popupModal.dismiss(),
            save: (data: any) => {

                if (this.listHasKeys) {
                    data.key = data.key || this.commonSvc.makeRandomString(8);
                    data.isNew = true;

                    this.itemsDB.child(data.key).set(data).then(() => {
                        if (this.postAddCallback) {
                            this.postAddCallback(data, data.key).then(() => {
                                this.commonSvc.toastSuccess('添加成功');
                            })
                        } else {
                            this.commonSvc.toastSuccess('添加成功');
                        }
                        popupModal.dismiss();
                    }).catch(err => {
                        this.commonSvc.toastFailure('添加失败', err);
                        this.items.pop();
                        popupModal.dismiss();
                    });
                } else {
                    data.id = data.id || this.commonSvc.makeRandomString(8);
                    data.isNew = true;

                    this.items.push(data);

                    let itemsToSave = this.items.map(item => this.reverseMapFunc(item));

                    this.itemsDB.set(itemsToSave).then(() => {
                        if (this.postAddCallback) {
                            this.postAddCallback(data, this.items.length - 1).then(result => {
                                this.commonSvc.toastSuccess('添加成功');
                            })
                        } else {
                            this.commonSvc.toastSuccess('添加成功');
                        }
                        popupModal.dismiss();
                    }).catch(err => {
                        this.commonSvc.toastFailure('添加失败', err);
                        this.items.pop();
                        popupModal.dismiss();
                    })
                }

            }
        });
        popupModal.present();
    }
  }

  editItemPopup(i: number): void {

    // let itemToEdit = {};
    // this.templateForAdd.forEach(d => {
    //   itemToEdit[d.key] = this.items[i][d.key] || null;
    // });

    let popupModal = this.modalCtrl.create(PopupComponent, { 
      title: this.title,
      definitions: this.templateForAdd || [],
      item: this.items[i],
      index: this.getItemIndex(this.items[i]),
      cancel: () => popupModal.dismiss(),
      save: (item) => {
        // console.log('--- item ---');
        // console.log(this.reverseMapFunc(item));
        // console.log(`--- number i = ${i} ---`);

          let k = this.listHasKeys && this.items[i].key || i;
          console.log(`key = ${k}`);

          this.itemsDB.child(`${k}`).update(this.reverseMapFunc(item)).then(() => {
              this.commonSvc.toastSuccess('编辑成功');
              popupModal.dismiss();
          }, err => {
              this.commonSvc.toastFailure('编辑失败', err);
              this.items.pop();
              popupModal.dismiss();
          });

      }
    });
    popupModal.present();
  }

  getComponentFromName(s: string): any {
      switch (s) {
          case "ActivityPage":
              return ActivityPage;
          case "MinistryPage":
              return MinistryPage;
          case "SongPage":
              return SongPage;
          case "ChatPage":
              return ChatPage;
          case "ListPage":
              return ListPage;
          default:
              return null;
      }
  }

  // .sort((a,b) => (a['params'] && a['params']['datetime']) > (b['params'] && b['params']['datetime']) ? -1 : 1)

  itemTapped(event: any, item: IntListItem) {
      let i = this.getItemIndex(item);

      if (this.itemTappedPreFunc) {
        this.itemTappedPreFunc(item, i);
      }

      let k = this.listHasKeys ? item.key : i;

      if (this.fullPermission) {
        this.itemsDB.child(`${k}/isNew`).set(false);
      }

      if (item.hyperlink) {
          this.browser.openPage(item.hyperlink);
      } else if (item.redirect) {
          let component;
          let index = this.items.map(item => item.id).indexOf(item.id);
          component = this.getComponentFromName(item.redirect);

          if (typeof item.params == 'string') {
            try {
              item.params = JSON.parse(item.params);
            } catch(e) {}
          }

          if (component) {
            this.navCtrl.push(component, Object.assign({
                item$: this.items$.map(res => res.filter(resItem => this.listHasKeys ? (resItem.key == item.key) : (resItem.id == item.id))[0]),
                itemDB: this.itemsDB.child(`${index}`),
                itemKey: item.key,
                itemId: item.id,
                itemIndex: i
            }, item.params || {}));
          } else {
            console.error(`Can't find component with name "${item.redirect}" `);
            return;
          }
      } else if (this.callFunc) {
          this.callFunc(item);
      }
      // That's right, we're pushing to ourselves!
      // this.navCtrl.push(ListPage, {
      //   item: item
      // }); 
  }

  markAsRead(i: number, read: boolean = true): void {
    let k = this.listHasKeys ? this.items[i].key : i;
    this.itemsDB.child(`${k}/read`).set(read);
  }

  selectionFillAll(): void {
    this.items.forEach(item => {
      let mappedItem = this.mapFunc(item);
      if (mappedItem.key) {
        this.selectedObj[mappedItem.key] = true;
      }
    });
  }

  selectionEmptyAll(): void {
    this.items.forEach((item,index) => {
      let mappedItem = this.mapFunc(item, index);
      if (mappedItem.key) {
        this.selectedObj[mappedItem.key] = false;
      }
    });
  }

  selectedItems(): IntListItem[] {
    return this.items.filter(item => this.selectedObj[this.mapFunc(item).key]);
  }

  cancelSelection(): void {
    this.viewCtrl.dismiss();
  }

}
