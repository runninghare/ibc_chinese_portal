import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { S2tProvider } from '../../providers/s2t/s2t';

@Pipe({ name: 'highlight' })
// @Pipe({ name: 'keepHtml', pure: false })
export class HighlightPipe implements PipeTransform {

    constructor(private sanitizer: DomSanitizer, private s2t: S2tProvider) {
    }

    transform(content, filterText:string, matchTrC?: boolean) {
        /* matchTrC: match traditional chinese */
        if (!filterText) return content;
        if (matchTrC) {
            filterText = this.s2t.tranStr(filterText, true);
        }
        filterText = filterText.replace(/^\s*|\s*$/, '');
        let result = content && content.replace(new RegExp(filterText,'ig'), '<span style="font-size: 2rem; color: blue">$&</span>');
        return this.sanitizer.bypassSecurityTrustHtml(result || "");
    }

}