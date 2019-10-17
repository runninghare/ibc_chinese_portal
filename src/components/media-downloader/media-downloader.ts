import { Component } from '@angular/core';

/**
 * Generated class for the MediaDownloaderComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'media-downloader',
  templateUrl: 'media-downloader.html'
})
export class MediaDownloaderComponent {

  text: string;

  constructor() {
    console.log('Hello MediaDownloaderComponent Component');
    this.text = 'Hello World';
  }

}
