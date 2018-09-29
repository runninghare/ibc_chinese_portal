import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { IbcFirebaseProvider } from '../../providers/ibc-firebase/ibc-firebase';
import { LoadTrackerProvider } from '../../providers/load-tracker/load-tracker';
import { ENV } from '@app/env';

/*
  Generated class for the IbcHttpProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class IbcHttpProvider {

  headers: any;

  constructor(public http: HttpClient, public ibcFB: IbcFirebaseProvider, public loadTrackerSvc: LoadTrackerProvider) {
    console.log('Hello IbcHttpProvider Provider');

    this.ibcFB.userProfile$.filter(auth => auth != null).subscribe(auth => {
        console.log('--- auth ---');
        console.log(auth);
        this.headers = { Authorization: `Bearer ${auth.uid}`, Accept: 'application/json', 'Content-Type': 'application/json' };
    });
  }

  get(url: string): Promise<any> {
      this.loadTrackerSvc.loading = true;
      return this.http.get(`${ENV.apiServer}/${url}`, { headers: this.headers }).toPromise().then(res => {
          this.loadTrackerSvc.loading = false;
          return res;
      }).catch(err => {
          this.loadTrackerSvc.loading = false;
          throw(err);
      });
  }

  post(url: string, body: any): Promise<any> {
      this.loadTrackerSvc.loading = true;
      return this.http.post(`${ENV.apiServer}/${url}`, body, { headers: this.headers }).toPromise().then(res => {
          this.loadTrackerSvc.loading = false;
          return res;
      }).catch(err => {
          this.loadTrackerSvc.loading = false;
          throw(err);
      });
  }

}
