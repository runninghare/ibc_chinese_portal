import { Http, Headers, RequestOptions } from '@angular/http';
import { Injectable, Inject, forwardRef } from '@angular/core';
import { ENV } from '@app/env';
import { Observable } from 'rxjs';

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

    constructor(public http: Http) {
    }

    wechatInstalled(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            Wechat.isInstalled(resolve, reject);
        });
    }

    weChatLogin(): Promise<any> {
        var scope = "snsapi_userinfo",
            state = "_" + (+new Date());

        return new Promise<any>((resolve, reject) => {
            Wechat.auth(scope, state, (response) => {
                // you may use response.code to get the access token.
                // console.log(`code = ${response.code}`);
                // resolve(response);
                this.http.post(`${ENV.apiServer}/wechat/login`, {code: response.code}).subscribe(res => {
                    resolve(res);
                }, reject);
                // this.weChatShare();
            }, reject);
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

        return this.http.post(`${ENV.apiServer}/wechat/associate`, { code: code }, new RequestOptions({ headers }))
    }

    weChatShareLink(webpageUrl: string, title?: string, description?: string, thumb?: string): void {
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

        Wechat.share(params, function () {
            alert("Success");
        }, function (reason) {
            alert("Failed: " + reason);
        });
    }    

}
