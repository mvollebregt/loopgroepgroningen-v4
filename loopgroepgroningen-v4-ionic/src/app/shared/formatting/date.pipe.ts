import {Pipe, PipeTransform} from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'lgDate'
})
export class DatePipe implements PipeTransform {

  private static readonly dateFormats = {
    mini: 'dd D'
  };


  transform(value: any, args?: any): any {
    return value && moment(value).format(DatePipe.dateFormats[args || 'mini']);
  }

}
