import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Evenement} from '../api';
import {AngularFirestore} from '@angular/fire/firestore';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class EvenementService {

  constructor(private db: AngularFirestore) {
  }

  getEvenementen(): Observable<Evenement[]> {
    const today = moment().format('YYYY-MM-dd');
    return this.db.collection<Evenement>('evenementen', ref => ref
      .orderBy('datum')
      .where('datum', '>=', today)
    ).valueChanges();
  }

}
