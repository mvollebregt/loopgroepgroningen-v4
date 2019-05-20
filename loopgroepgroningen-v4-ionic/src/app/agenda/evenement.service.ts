import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Evenement} from '../api'

@Injectable({
  providedIn: 'root'
})
export class EvenementService {

  getEvenementen(): Observable<Evenement[]> {
    return of([
      {datum: '2019-06-15', naam: 'Leijenloop Opeinde'},
      {datum: '2019-06-29', naam: 'Lustrum'},
      {datum: '2019-06-29', naam: 'KaFieRun'}
    ]);
  }

}
