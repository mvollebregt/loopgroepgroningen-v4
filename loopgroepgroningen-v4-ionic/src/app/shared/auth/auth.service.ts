import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Observable, throwError} from 'rxjs';
import {User} from 'firebase';
import {AngularFireFunctions} from '@angular/fire/functions';
import {Permission} from '../../api';
import {catchError, tap} from 'rxjs/operators';
import UserCredential = firebase.auth.UserCredential;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth, private fns: AngularFireFunctions) {
  }

  getCurrentUser(): Observable<User | null> {
    return this.afAuth.authState;
    // this.afAuth.idTokenResult.claims.lid - this.afAuth.idTokenResult.claims.user_id - this.afAuth.idTokenResult.claims.email of
    // user.getIdTokenResult(forceRefresh)
  }

  signIn({email, password}: { email: string, password: string }): Promise<UserCredential> {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  signOut(): Promise<void> {
    return this.afAuth.auth.signOut();
  }

  grantPermission(uid: string, permission: Permission): Observable<void> {
    const grantPermission = this.fns.httpsCallable('grantPermission');
    // TODO: niet meer hard coden
    return grantPermission({uid, permission: {'lid': true}}).pipe(
      tap(console.log),
      catchError(err => {
        console.error(err);
        return throwError(err)
      })
    );
  }

  listUsers() {
    return this.fns.httpsCallable('listUsers')({});
  }
}
