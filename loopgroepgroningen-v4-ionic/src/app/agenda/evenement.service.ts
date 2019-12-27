import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Deelname, Evenement} from '../api';
import {AngularFirestore} from '@angular/fire/firestore';
import {BaseFirestoreService} from '../shared/firestore/base-firestore.service';
import {AuthService} from '../shared/auth/auth.service';
import {map, switchMap} from 'rxjs/operators';
import {DateTime} from 'luxon';


@Injectable({
  providedIn: 'root'
})
export class EvenementService extends BaseFirestoreService<Evenement> {

  constructor(db: AngularFirestore, private authService: AuthService) {
    super(db, 'evenementen');
  }

  getAll(): Observable<Evenement[]> {
    const today = DateTime.local().toISODate();
    return super.getAll(ref => ref
      .orderBy('datum')
      .where('datum', '>=', today));
  }

  get(id: string): Observable<Evenement | undefined> {
    return super.get(id).pipe(
      switchMap(evenement => !evenement ? of(undefined) : this.authService.getCurrentUser().pipe(
        switchMap(user => user ?
          super.subcollection<Deelname>(id, 'deelnames').get(user.uid) :
          of(undefined)
        ),
        map(deelname => ({...evenement, deelname}))
      ))
    );
  }

  getAllDeelnames(evenementId: string): Observable<Deelname[]> {
    return super.subcollection<Deelname>(evenementId, 'deelnames').getAll();
  }

  saveDeelname(evenementId: string, deelname: Deelname) {
    this.authService.doWithCurrentUser(currentUser =>
      super.subcollection<Deelname>(evenementId, 'deelnames').set(currentUser.uid, deelname));
  }
}
