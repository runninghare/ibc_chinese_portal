import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighlightPipe } from './highlight/highlight';
import { KeepHtmlPipe } from './keep-html/keep-html';
import { VersePipe } from './verse/verse';
@NgModule({
	declarations: [HighlightPipe,
    KeepHtmlPipe,
    VersePipe],
	imports: [CommonModule],
	exports: [HighlightPipe,
    KeepHtmlPipe,
    VersePipe]
})
export class PipesModule {}
