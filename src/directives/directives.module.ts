import { NgModule } from '@angular/core';
import { ContactLinkDirective } from './contact-link/contact-link';
import { MapLinkDirective } from './map-link/map-link';
@NgModule({
	declarations: [ContactLinkDirective,
    MapLinkDirective],
	imports: [],
	exports: [ContactLinkDirective,
    MapLinkDirective]
})
export class DirectivesModule {}
