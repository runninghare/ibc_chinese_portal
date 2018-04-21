import { NgModule } from '@angular/core';
import { LoadTrackerComponent } from './load-tracker/load-tracker';
import { IbcMapComponent } from './ibc-map/ibc-map';
@NgModule({
	declarations: [LoadTrackerComponent,
    IbcMapComponent],
	imports: [],
	exports: [LoadTrackerComponent,
    IbcMapComponent]
})
export class ComponentsModule {}
