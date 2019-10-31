import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the VersePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'verse',
})
export class VersePipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {
    return value && value.replace(/<[^>]*>/g, '');
  }
}
