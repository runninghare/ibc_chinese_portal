import { Http, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { ENV } from '@app/env';

declare var Wechat;

/*
  Generated class for the WechatProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WechatProvider {

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

        return new Promise<any>((resolve, reject) => {
            Wechat.auth(scope, state, (response) => {
                this.http.post(`${ENV.apiServer}/wechat/associate`, {code: response.code}, new RequestOptions({ headers })).subscribe(res => {
                    resolve(res);
                }, reject);
                // this.weChatShare();
            }, reject);
        });
    }    

    weChatShare(): void {
        Wechat.share({
            text: "This is just a plain string",
            scene: Wechat.Scene.TIMELINE   // share to Timeline
        }, function () {
            alert("Success");
        }, function (reason) {
            alert("Failed: " + reason);
        });
    }    

}
