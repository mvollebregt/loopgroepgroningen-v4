import {Injectable} from '@angular/core';
import {DateTime} from 'luxon';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() {
  }

  now() {
    return DateTime.local();
  }
}
