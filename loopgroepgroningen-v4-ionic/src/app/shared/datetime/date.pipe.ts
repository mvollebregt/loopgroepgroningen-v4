import {Pipe, PipeTransform} from '@angular/core';
import {DateTime} from 'luxon';

@Pipe({
  name: 'lgDate'
})
export class DatePipe implements PipeTransform {

  private static readonly dateFormats = {
    mini: 'EEE d',
    fullDay: 'EEEE d MMM'
  };

  transform(value: any, args?: any): any {
    return value && DateTime.fromISO(`${value}`).setLocale('nl').toFormat(DatePipe.dateFormats[args || 'mini']);
  }

}
