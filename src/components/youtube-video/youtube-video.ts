import { Component, Input } from '@angular/core';
import { VideoProvider } from '../../providers/video/video';

/**
 * Generated class for the YoutubeVideoComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'youtube-video',
  templateUrl: 'youtube-video.html',
  host: {
      '(click)': 'play()'
  }
})
export class YoutubeVideoComponent {

  @Input('title') title: string;
  @Input('youtubeId') youtubeId: string;

  play(): void {
      this.videoSvc.play(this.youtubeId);
  }

  constructor(public videoSvc: VideoProvider) {
    this.title = 'Hello World';
  }

}
