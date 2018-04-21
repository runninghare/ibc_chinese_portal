import { Directive, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { CommonProvider, AlertController } from '../../providers/common/common';
import { DataProvider, IntPopupTemplateItem, TypeInputUI } from '../../providers/data-adaptor/data-adaptor';
import { NotificationProvider } from '../../providers/notification/notification';
import { Observable, Subscription } from 'rxjs';

/**
 * Generated class for the QuestionDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
@Directive({
    selector: '[question]' // Attribute selector
})
export class QuestionDirective {

    @HostListener('click') click() {
        // console.log(this.questionParams);
        if (this.questionParams) {
            this.popUp();
        } else {
            this.answerEvent.emit('ok');
        }
    }

    @Input('question') questionParams: IntPopupTemplateItem;
    @Output('answer') answerEvent: EventEmitter<any> = new EventEmitter<any>(null);

    constructor(public commonSvc: CommonProvider, public content: DataProvider, public notificationSvc: NotificationProvider) {
    }

    popUp(): void {
        console.log('--- question pops up ---');
        console.log(this.questionParams);

        let alert, lookupSource;
        switch (this.questionParams.type) {
            case "boolean":
                alert = this.commonSvc.alertCtrl.create({
                    message: this.questionParams.caption,
                    buttons: [
                        {
                            text: '否',
                            handler: val => {
                               if (this.questionParams.recipient && 
                                   this.questionParams.notifications && this.questionParams.notifications[0]) {
                                   this.notificationSvc.addNotification(this.questionParams.recipient, this.questionParams.notifications[0]);
                               }
                               this.answerEvent.emit('no');
                            }
                        },
                        {
                            text: '是',
                            handler: val => {
                                if (this.questionParams.recipient &&
                                    this.questionParams.notifications && this.questionParams.notifications[1]) {
                                    this.notificationSvc.addNotification(this.questionParams.recipient, this.questionParams.notifications[1]);
                                }
                                this.answerEvent.emit('yes');
                            }
                        }
                    ]
                });
                alert.present();
                // code...
                break;

            case "dropdown":
            case "multi-dropdown":
                console.log('--- go dropdown ---');
                alert = this.commonSvc.alertCtrl.create({
                    message: this.questionParams.caption,
                    inputs: [],
                    buttons: [
                        {
                            text: '取消',
                            role: 'cancel'
                        },
                        {
                            text: '確定',
                            handler: val => this.answerEvent.emit(val)
                        }
                    ]
                });
                lookupSource = this.questionParams.lookupSource;
                if (typeof lookupSource == 'string' && lookupSource.match(/\$$/)) {
                    lookupSource = eval(`this.content.${lookupSource}`);
                    // console.log('--- lookup source as observable ---');
                    // console.log(lookupSource);
                }
                if (lookupSource instanceof Observable) {
                    lookupSource.subscribe(choices => {
                        let lookupCaption = this.questionParams.lookupCaption || 'caption';
                        let lookupValue = this.questionParams.lookupValue || 'value';
                        choices.forEach(choice => {
                            alert.addInput({
                                type:  this.questionParams.type == 'multi-dropdown' ? 'checkbox' : 'radio',
                                label: lookupCaption.match(/choice\./) ? eval(lookupCaption) : choice[lookupCaption],
                                value: lookupValue.match(/choice\./) ? eval(lookupValue) : choice[lookupValue],
                            });
                        });
                        alert.present();
                    });
                }
                break;

            default:
                alert = this.commonSvc.alertCtrl.create({
                    message: this.questionParams.caption,
                    inputs: [
                        {
                            name: "answer",
                        }
                    ],
                    buttons: [
                        {
                            text: '取消',
                            role: 'cancel'
                        },
                        {
                            text: '確定',
                            handler: val => this.answerEvent.emit(val.answer)
                        }
                    ]
                });
                alert.present();
                break;
        }
    }

}
