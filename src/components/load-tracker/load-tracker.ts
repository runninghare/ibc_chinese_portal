import { Component } from '@angular/core';
import { LoadTrackerProvider } from '../../providers/load-tracker/load-tracker';

/**
 * Generated class for the LoadTrackerComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'load-tracker',
  templateUrl: 'load-tracker.html'
})
export class LoadTrackerComponent {

  constructor(public loadTracker: LoadTrackerProvider) {
  }

}
