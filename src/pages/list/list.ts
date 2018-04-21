import { Component, ViewChild, OnDestroy } from '@angular/core';
import { ModalController, NavController, NavParams, Searchbar } from 'ionic-angular';
import { AngularFireList } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import * as moment from 'moment';
import { CommonProvider } from '../../providers/common/common';
import { BrowserProvider } from '../../providers/browser/browser';
import { PopupComponent } from '../../components/popup/popup';
import { ActivityPage } from '../activity/activity';
import { MinistryPage } from '../ministry/ministry';
import { S2tProvider } from '../../providers/s2t/s2t';
import { Observable, Subscription } from 'rxjs';
import { DataProvider, IntPopupTemplateItem, IntSummaryData, IntListItem } from '../../providers/data-adaptor/data-adaptor';

export { IntListItem } from '../../providers/data-adaptor/data-adaptor';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage implements OnDestroy {
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

  subscription: Subscription;

  @ViewChild('searchBar') searchBar: Searchbar;

  constructor(
    public content: DataProvider,
    public commonSvc: CommonProvider,
    public modalCtrl: ModalController,
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public s2t: S2tProvider,
    public browser: BrowserProvider) {
    // If we navigated to this page, we will have an item available as a nav param
    this.itemsDB = navParams.get('itemsDB');
    this.items$ = navParams.get('items$');
    this.groupBy = navParams.get('groupBy');
    this.checkNew = navParams.get('checkNew');
    this.hideEdit = navParams.get('hideEdit');
    this.hideDelete = navParams.get('hideDelete');
    this.showReadOrUnread = navParams.get('showReadOrUnread');
    this.listHasKeys = navParams.get('listHasKeys');
    this.fullPermission = navParams.get('fullPermission');

    let subtitleAs = navParams.get('subtitleAs');
    if (typeof subtitleAs == 'string') {
      this.subtitleAs = item => item[subtitleAs];
    } else if (typeof subtitleAs == 'function') {
      this.subtitleAs = subtitleAs;
    } else {
      this.subtitleAs = null;
    }

    if (this.items$) {
      this.subscription = this.items$.subscribe(items => {
        this.items = items;

        if (this.groupBy) {
          this.groupValues = this.items.map(item => item[this.groupBy]).filter(this.commonSvc.arrayUniq).sort(this.groupOrderByFunc);
        } else {
          this.groupValues =[null];
        }

        this.groupValues.forEach(gv => {
          this.visibility[gv] = [];
          this.mappedItems[gv] = this.mappedItemsFunc(gv).sort(this.orderByFunc);
        })

        let value = this.searchBar.value;
        this.getItems({target: {value}});
      }, err => {});
    }

    this.title = navParams.get('title');
    this.templateForAdd = navParams.get('templateForAdd');

    this.filterFunc = navParams.get('filterFunc');
    if (!this.filterFunc) {
      this.filterFunc = (val, item) => {
        return `${item.title} ${item.subtitle}`.toLowerCase().indexOf(this.s2t.tranStr(val, true)) > -1;
      }
    }
    this.mapFunc = navParams.get('mapFunc');
    if (!this.mapFunc) {
      this.mapFunc = item => item;
    }
    this.reverseMapFunc = navParams.get('reverseMapFunc');
    if (!this.reverseMapFunc) {
      this.reverseMapFunc = item => item;
    }
    this.callFunc = navParams.get('callFunc');
    if (!this.callFunc) {
      this.callFunc = () => console.log('=== default callFunc ===');
    }
    this.groupOrderByFunc = navParams.get('groupOrderByFunc');
    if (!this.groupOrderByFunc) {
      this.groupOrderByFunc = (a,b) => a < b ? -1 : 1;
    }
    this.orderByFunc = navParams.get('orderByFunc');
    if (!this.orderByFunc) {
      this.orderByFunc = (a,b) => a < b ? -1 : 1;
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  filterFunc: (a:string, b:any) => boolean;
  mapFunc: (a?:any) => any;
  orderByFunc: (a:any, b:any) => number;
  groupOrderByFunc: (a:any, b:any) => number;
  reverseMapFunc: (a?:any) => any;
  callFunc: (a?:any) => any;
  subtitleAs: (a?:any) => any;

  visibility: boolean[][] = [];

  mappedItems: IntListItem[][] = [];

  filterText: string;

  groupByCaptionFunc(val, key?: string): string {
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
      return this.items.filter(item => item[this.groupBy] == groupVal).map((item, i) => {
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

              console.log(`key = ${key}`);

              if (key) {
                this.itemsDB.child(`${key}`).remove().then(() => {
                    this.commonSvc.toastSuccess('删除成功');
                }, err => {
                    this.commonSvc.toastFailure('删除失败', err);
                });
              }
            } else {
                let item = this.items.splice(i, 1)[0];
                let itemsToSave = this.items.map(item => this.reverseMapFunc(item));
                this.itemsDB.set(itemsToSave).then(() => {
                    this.commonSvc.toastSuccess('删除成功');
                }, err => {
                    this.commonSvc.toastFailure('删除失败', err);
                    this.items.splice(i, 0, item);
                });              
            }

        });
  }

  addItemPopup(): void {
    let popupModal = this.modalCtrl.create(PopupComponent, { 
      title: this.title,
      definitions: this.templateForAdd || [],
      cancel: () => popupModal.dismiss(),
      save: (data: any) => {

        if (this.listHasKeys) {
            data.key = data.key || this.commonSvc.makeRandomString(8);
            data.isNew = true;

            this.itemsDB.child(data.key).set(data).then(() => {
                this.commonSvc.toastSuccess('添加成功');
                popupModal.dismiss();
            }, err => {
                this.commonSvc.toastFailure('添加失败', err);
                this.items.pop();
                popupModal.dismiss();
            })
        } else {
            data.id = data.id || this.commonSvc.makeRandomString(8);
            data.isNew = true;
            
            this.items.push(data);

            let itemsToSave = this.items.map(item => this.reverseMapFunc(item));

            this.itemsDB.set(itemsToSave).then(() => {
                this.commonSvc.toastSuccess('添加成功');
                popupModal.dismiss();
            }, err => {
                this.commonSvc.toastFailure('添加失败', err);
                this.items.pop();
                popupModal.dismiss();
            })          
        }

      }
    });
    popupModal.present();
  }

  editItemPopup(i: number): void {

    let itemToEdit = {};

    this.templateForAdd.forEach(d => {
      itemToEdit[d.key] = this.items[i][d.key] || null;
    });

    let popupModal = this.modalCtrl.create(PopupComponent, { 
      title: this.title,
      definitions: this.templateForAdd || [],
      item: itemToEdit,
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

  // .sort((a,b) => (a['params'] && a['params']['datetime']) > (b['params'] && b['params']['datetime']) ? -1 : 1)

  itemTapped(event: any, item: IntListItem) {
      console.log(event);

      let i = this.getItemIndex(item);
      let k = this.listHasKeys ? item.key : i;

      if (this.fullPermission) {
        this.itemsDB.child(`${k}/isNew`).set(false);
      }

      if (item.hyperlink) {
          this.browser.openPage(item.hyperlink);
      } else if (item.redirect) {
          let component;
          let index = this.items.map(item => item.id).indexOf(item.id);
          switch (item.redirect) {
              case "ActivityPage":
                  component = ActivityPage;
                  break;
              case "MinistryPage":
                  component = MinistryPage;
                  break;

              default:
                  // code...
                  break;
          }
          this.navCtrl.push(component, Object.assign({
              item$: this.items$.map(res => res.filter(resItem => this.listHasKeys ? (resItem.key == item.key) : (resItem.id == item.id))[0]),
              itemDB: this.itemsDB.child(`${index}`),
              itemKey: item.key,
              itemId: item.id,
              itemIndex: i
          }, item.params || {}));
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

}
