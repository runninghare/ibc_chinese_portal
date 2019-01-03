import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighlightPipe } from './highlight/highlight';
@NgModule({
	declarations: [HighlightPipe],
	imports: [CommonModule],
	exports: [HighlightPipe]
})
export class PipesModule {}
