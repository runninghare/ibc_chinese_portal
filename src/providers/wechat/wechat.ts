import { HttpClient } from '@angular/common/http';
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

    constructor(public http: HttpClient) {
    }

    wechatInstalled(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            Wechat.isInstalled(resolve, reject);
        });
    }

    weChatAuth(): Promise<any> {
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
