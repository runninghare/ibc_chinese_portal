import { Injectable } from '@angular/core';

/*
  Generated class for the IbcStyleProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class IbcStyleProvider {

  constructor() {
  }

  get randomBg(): string {
      return `home-bg-${Math.round(Math.random()*10)}`;
  }

  get stdBg(): string {
      return 'std-bg';
  }

}
