import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController } from 'ionic-angular';
import { DataProvider, IntAccounting, IntContact } from '../../providers/data-adaptor/data-adaptor';
import { IbcHttpProvider } from '../../providers/ibc-http/ibc-http';
import { CommonProvider } from '../../providers/common/common';
import { NotificationProvider } from '../../providers/notification/notification';
import { ListPage } from '../../pages/list/list';

import * as wjcCore from 'wijmo/wijmo';
import * as wjcGrid from 'wijmo/wijmo.grid';
import * as wjcGridSheet from 'wijmo/wijmo.grid.sheet';
import * as wjcInput from 'wijmo/wijmo.input';
import * as moment from 'moment';

import * as _ from 'lodash';

interface IntAccountingColumn {
    id?: string;
    datetime?: Date;
    adults?: number;
    children?: number;
    offering?: number;
    cny?: number;
    expense?: number;
    saving?: string;
    notes?: string;    
    countedBy?: string; /* Contact Name */
    middleman?: string; /* Contact Name */
    recipient?: string; /* Contact Name */
    preacher?: string; /* Contact Name */
}

interface IntColumnDefinition {
    name: string;
    binding: string;
    dataType: number;
    readOnly: boolean;
    visible?: boolean;
}

/**
 * Generated class for the AccountingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
    name: 'accounting-page',
    segment: 'accounting/:id'
})
@Component({
    selector: 'page-accounting',
    templateUrl: 'accounting.html',
})
export class AccountingPage {

    @ViewChild('flexInline') flexInline: wjcGrid.FlexGrid;

    _flexSheet: wjcGridSheet.FlexSheet;
    @ViewChild('flexSheet') set flexSheet(_content: wjcGridSheet.FlexSheet) {
        this._flexSheet= _content;
    };
    get flexSheet(): wjcGridSheet.FlexSheet {
        return this._flexSheet;
    }

    accountingData: wjcCore.CollectionView;

    highlightId: string;

    contacts: {[a: string]: IntContact};

    testingData: any[] = [
        { id: 'aaaa', country: 'AU', contacts: [101, 102] },
        { id: 'abcd', country: 'US', contacts: [] },
        { id: 'efgh', country: 'CN', contacts: [] }
    ];

    flexGridColumns: wjcGrid.Column[] = [];

    columns: any[] = [
        {
            name: 'datetime',
            binding: 'datetime',
            header: '日期',
            format: 'dd/MM/yyyy',
            dataType: 4,
            visible: true,
        },
        {
            name: 'adults',
            binding: 'adults',
            header: '大人出席',
            dataType: 2,
            visible: true,
        },
        {
            name: 'children',
            binding: 'children',
            header: '小孩出席',
            dataType: 2,
            visible: true,
        },
        {
            name: 'offering',
            binding: 'offering',
            header: '澳幣收入',
            format: 'c2',
            aggregate: 1,
            dataType: 2,
            visible: true,
        },
        {
            name: 'cny',
            binding: 'cny',
            header: '人民幣收入',
            format: 'c2¥',
            aggregate: 1,            
            dataType: 2,
            visible: true,
        },        
        {
            name: 'expense',
            binding: 'expense',
            header: '支出',
            format: 'c2',
            aggregate: 1,            
            dataType: 2,
            visible: true,
        },
        {
            name: 'saving',
            binding: 'saving',
            header: '存银行',
            format: 'c2',
            aggregate: 1,            
            dataType: 2,
            visible: true,
        },
        {
            name: 'countedBy',
            binding: 'countedBy',
            header: '經手',
            wordWrap: true,
            dataType: 1,
            // isReadOnly: true,
            visible: true,
        },
        {
            name: 'middleman',
            binding: 'middleman',
            header: '中間人',
            wordWrap: true,
            dataType: 1,
            // isReadOnly: true,
            visible: true,
        },
        {
            name: 'recipient',
            binding: 'recipient',
            header: '接收人',
            wordWrap: true,
            dataType: 1,
            // isReadOnly: true,
            visible: true,
        },
        {
            name: 'preacher',
            binding: 'preacher',
            header: '傳道人',
            wordWrap: true,
            dataType: 1,
            // isReadOnly: true,
            visible: true,
        },
        {
            name: 'notes',
            binding: 'notes',
            header: '備注',
            dataType: 1,
            wordWrap: true,
            // isReadOnly: true,
            visible: true,
        },
        {
            name: 'id',
            binding: 'id',
            header: 'Id',
            dataType: 1,
            visible: false,
        }        
    ];

    refreshFooter(sheet: wjcGridSheet.FlexSheet) {
        for (let i = 0; i < sheet.columns.length; i++) {
            var agg = this.getAggregatedValue(sheet, sheet.columns[i]);
            if (agg) {
                sheet.columnFooters.setCellData(0, i, agg);
            }
        }

        for (let i = 0; i < this.accountingData._src.length; i++) {
            this.flexSheet.setCellData(i+1, this.content.commonSvc.globals.excelSavingColumnIndex, 
                _.template(this.content.commonSvc.globals.excelSavingColumnExpression)({
                    row: i+2,
                    audcny: this.content.commonSvc.exchangeRates.audcny
                }));
        }
    }

    onCopying(e: wjcGrid.CellRangeEventArgs): void {
        // console.log('--- copy value ---');
        // console.log(e);
    }

    onCopied(e: wjcGrid.CellRangeEventArgs): void {
        // console.log('--- value copied ---');
        // console.log(e);
    }

    onPasting(e: wjcGrid.CellRangeEventArgs): void {
        // console.log('--- pasting value ---');
        // console.log(e);
    }    

    onPasted(e: wjcGrid.CellRangeEventArgs): void {
        let s = this.flexSheet.getClipString();
        s = s.replace(/[$¥]/g, '');

        // console.log('--- pasted value ---');
        // console.log(s);

        this.flexSheet.setClipString(s, e.range);

        e.cancel = true;

        this.refreshFooter(this.flexSheet);

        setTimeout(() => {
            this.flexSheet.autoSizeRows();
        })
    }

    private getAggregatedValue(sheet: wjcGridSheet.FlexSheet, col: wjcGrid.Column) {
        if (col.aggregate === wjcCore.Aggregate.None) {
            return null;
        }
        var arr = [];
        for (let i = 0; i < sheet.rows.length; i++) {
            arr.push(sheet.getCellValue(i, col.index, false));
        }
        return wjcCore.getAggregate(col.aggregate, arr);
    }

    initFlexSheet(flex: wjcGridSheet.FlexSheet) {
        if (flex) {
            let hostElem = document.createElement('div');

            let grid = new wjcGrid.FlexGrid(hostElem, {
                autoGenerateColumns: false,
                itemsSource: this.accountingData,
                columns: this.columns
            });

            let sheet = new wjcGridSheet.Sheet(flex, grid, 'General');
            sheet.itemsSource = this.accountingData;

            flex.sheets.push(sheet);

            let row = new wjcGrid.GroupRow();
            flex.columnFooters.rows.push(row);
            flex.allowDelete = true;
            flex.allowAddNew = true;
            // flex.allowSorting = true;
            flex.bottomLeftCells.setCellData(0, 0, '\u03A3');

            flex.columns[2].header = 'AAA';

            this.refreshFooter(flex);
        }
    }    

    formatData(accounting: IntAccounting[]): IntAccountingColumn[] {
        if (!accounting) return [];

        let result: IntAccountingColumn[] = accounting.map((a,index) => {
            return {
                id: a.id,
                datetime: new Date(a.datetime),
                adults: a.adults, 
                children: a.children,
                offering: a.offering,
                cny: a.cny,
                saving: a.saving,
                expense: a.expense,
                notes: a.notes,
                countedBy: a.countedBy ? a.countedBy.map(c => this.contacts[c] && this.contacts[c].name).join(', ') : null,
                middleman: a.middleman ? a.middleman.map(c => this.contacts[c] && this.contacts[c].name).join(', ') : null,
                recipient: a.recipient ? a.recipient.map(c => this.contacts[c] && this.contacts[c].name).join(', ') : null,
                preacher: a.preacher ? a.preacher.map(c => this.contacts[c] && this.contacts[c].name).join(', ') : null
            }
        });

        return result;
    }

    reverseFormatData(items: IntAccountingColumn[]): IntAccounting[] {
        if (!items) return [];

        return items.filter(item => item.datetime).map(item => {
            let result = {
                id: item.id || this.content.commonSvc.makeRandomString(8),
                datetime: `${moment(item.datetime).format('YYYY-MM-DD')}`,
                adults: item.adults, 
                children: item.children,
                offering: item.offering,
                cny: item.cny,
                expense: item.expense,
                notes: item.notes,
                saving: item.saving,
                countedBy: this.contactNamesToIds(item.countedBy),
                middleman: this.contactNamesToIds(item.middleman),
                recipient: this.contactNamesToIds(item.recipient),
                preacher: this.contactNamesToIds(item.preacher)
            };

            Object.keys(result).forEach(k => {
                if (result[k] ==  null) {
                    delete result[k];
                }
            });

            return result;
        })
    }

    contactNamesToIds(csvnames: string): string[] {
        if (!csvnames) return null;
        let names = csvnames.split(/\s*,\s*/);
        return this.content.allContacts.filter(c => names.indexOf(c.name) > -1).map(c => c.id);
    }    

    constructor(public navCtrl: NavController, public navParams: NavParams, public content: DataProvider, public notificationSvc: NotificationProvider,
        public common: CommonProvider, public modalCtrl: ModalController, public ibcHttp: IbcHttpProvider) {

        this.highlightId = this.navParams.get('id');

        window['accounting'] = this;

        this.content.allContactsDB.once('value', snapshot => {
            this.contacts = snapshot.val();
            this.content.accounting$.subscribe(accounting => {
                if (!this.accountingData) {
                    this.accountingData = new wjcCore.CollectionView(this.formatData(accounting));


                    let highlightRowIndex = accounting.map(item => item.id).indexOf(this.highlightId);

                    if (highlightRowIndex > -1) {
                        setTimeout(() => {
                            this.flexSheet.select(new wjcGrid.CellRange(highlightRowIndex + 1, 0, highlightRowIndex + 1, this.columns.length - 1), true);
                            this.flexSheet.autoSizeRows();
                        }, 500);
                    }

                } else {
                    // console.log('--- update accounting data ---');
                    // console.log(accounting);
                    this.accountingData._src = this.formatData(accounting);
                    this.accountingData.refresh();
                }
            });
        });
    }

    save() {
        let data = this.reverseFormatData(this.accountingData._src);
        // console.log(data);
        this.content.accountingDB.set(data).then(res => {
            this.content.commonSvc.toastSuccess('財務信息已保存');
            this.flexSheet.autoSizeRows();
        }, error => {
            this.content.commonSvc.toastFailure('保存失敗');
        })
    }

    ionViewDidLoad() {
        // console.log('ionViewDidLoad AccountingPage');
    }

}
