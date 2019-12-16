import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, QueryFn} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

export class BaseFirestoreService<T> {

  constructor(private db: AngularFirestore, private basePath: string) {
  }

  getAll(queryFn?: QueryFn): Observable<T[]> {
    return this.collectionWithIds(this.db.collection<T>(this.basePath, queryFn));
  }

  get(id: string): Observable<T | undefined> {
    return this.docWithId(this.db.doc<T>(`${this.basePath}/${id}`));
  }

  add(doc: T): void {
    this.db.collection<T>(this.basePath).add(doc);
  }

  set(id: string, doc: T): void {
    this.db.doc<T>(`${this.basePath}/${id}`).set(doc);
  }

  subcollection<A>(id: string, subcollection: string): BaseFirestoreService<A> {
    return new BaseFirestoreService<A>(this.db, `${this.basePath}/${id}/${subcollection}`)
  }

  private collectionWithIds<T>(collection: AngularFirestoreCollection<T>): Observable<T[]> {
    return collection.snapshotChanges().pipe(
      map(actions => actions.map(action => (
        {id: action.payload.doc.id, ...action.payload.doc.data() as any}
      ))),
    )
  }

  private docWithId<T>(doc: AngularFirestoreDocument<T>): Observable<T | undefined> {
    return doc.snapshotChanges().pipe(
      map(action => {
          const payload = action.payload;
          return payload.data() ? {id: payload.id, ...payload.data() as any} as T : undefined;
        }
      ));
  }
}
