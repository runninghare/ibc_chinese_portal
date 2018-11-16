import { Http, Headers, RequestOptions } from '@angular/http';
import { Injectable, Inject, forwardRef } from '@angular/core';
import { ENV } from '@app/env';
import { Observable } from 'rxjs';
import { LoadTrackerProvider } from '../../providers/load-tracker/load-tracker';

export interface IntWeChatAuth {
    openid?: string;
    unionid?: string;
    nickname?: string;
    sex?: number;
    language?: string;
    city?: string;
    province?: string;
    country?: string;
    headimgurl?: string;
    privilege?: any[];
}

declare var Wechat;

/*
  Generated class for the WechatProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WechatProvider {

    linkingInProgress: boolean;
    LoggingInProgress: boolean;

    constructor(public http: Http, public loadTrackerSvc: LoadTrackerProvider) {
    }

    wechatInstalled(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            Wechat.isInstalled(resolve, reject);
        });
    }

    weChatLogin(): Promise<any> {
        var scope = "snsapi_userinfo",
            state = "_" + (+new Date());

        this.LoggingInProgress = true;

        return new Promise<any>((resolve, reject) => {
            Wechat.auth(scope, state, (response) => {
                // you may use response.code to get the access token.
                // console.log(`code = ${response.code}`);
                // resolve(response);
                this.http.post(`${ENV.apiServer}/wechat/login`, {code: response.code}).subscribe(res => {
                    this.LoggingInProgress = false;
                    resolve(res);
                }, err => {
                    this.LoggingInProgress = false;
                    reject(err);
                });
                // this.weChatShare();
            }, reject);
        });
    }

    weChatLoginSendApiRequest(code: string): Observable<any> {
        return this.http.post(`${ENV.apiServer}/wechat/login`, { code: code }).do(() => {
            console.log('========= weChat successfully logged in! ===========');
            this.LoggingInProgress = false;
        });
    }

    weChatLink(uid): Promise<any> {
        var scope = "snsapi_userinfo",
            state = "_" + (+new Date());

        let headers = new Headers({ 
            Authorization: `Bearer ${uid}`, 
            Accept: 'application/json', 
            'Content-Type': 'application/json' });            

        this.linkingInProgress = true;
        return new Promise<any>((resolve, reject) => {
            Wechat.auth(scope, state, (response) => {
                this.linkingInProgress = false;
                this.http.post(`${ENV.apiServer}/wechat/associate`, { code: response.code }, new RequestOptions({ headers })).subscribe(res => {
                    this.linkingInProgress = false;
                    resolve(res);
                }, err => {
                    this.linkingInProgress = false;
                    reject(err);
                });
                // this.weChatShare();
            }, err => {
                this.linkingInProgress = false;
                reject(err);
            });
        });
    }

    weChatLinkSendApiRequest(fbAuthUid: string, code: string): Observable<any> {
        let headers = new Headers({
            Authorization: `Bearer ${fbAuthUid}`,
            Accept: 'application/json',
            'Content-Type': 'application/json'
        });  

        // console.log('======= calling weChatLinkSendApiRequest =========');
        // console.log(`authUid = ${fbAuthUid}; code = ${code}`);

        return this.http.post(`${ENV.apiServer}/wechat/associate`, { code: code }, new RequestOptions({ headers })).do(() => {
            console.log('========= weChat successfully linked! ===========');
            this.linkingInProgress = false;
        });
    }

    weChatShareLink(webpageUrl: string, title?: string, description?: string, thumb?: string): void {
        this.loadTrackerSvc.loading = true;

        let params = {
            scene: 0,   // share to Timeline
            message: {
                title,
                description,
                thumb,
                media: {
                    type: Wechat.Type.LINK,
                    webpageUrl
                }
            }
        };

        Wechat.share(params, () => {
            this.loadTrackerSvc.loading = false;
        }, (reason) => {
            this.loadTrackerSvc.loading = false;
        });

        setTimeout(() => {
            this.loadTrackerSvc.loading = false;
        }, 10000);
    }

}
