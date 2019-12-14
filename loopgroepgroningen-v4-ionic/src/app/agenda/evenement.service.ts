import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Evenement} from '../api';
import {AngularFirestore} from '@angular/fire/firestore';
import * as moment from 'moment';
import {BaseFirestoreService} from '../shared/firestore/base-firestore.service';


@Injectable({
  providedIn: 'root'
})
export class EvenementService extends BaseFirestoreService<Evenement> {

  constructor(db: AngularFirestore) {
    super(db, 'evenementen');
  }

  getAll(): Observable<Evenement[]> {
    const today = moment().format('YYYY-MM-DD');
    return super.getAll(ref => ref
      .orderBy('datum')
      .where('datum', '>=', today));
  }
}
