import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighlightPipe } from './highlight/highlight';
import { KeepHtmlPipe } from './keep-html/keep-html';
@NgModule({
	declarations: [HighlightPipe,
    KeepHtmlPipe],
	imports: [CommonModule],
	exports: [HighlightPipe,
    KeepHtmlPipe]
})
export class PipesModule {}
