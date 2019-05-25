import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Action} from './action';
import {NavigationEnd, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PageService {

  private _action = new BehaviorSubject<Action | null>(null);
  private currentUrl: string;
  private history: { [path: string]: Action | null } = {};

  constructor(router: Router) {
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this._action.next(this.history[event.url]);
        this.currentUrl = event.url;
      }
    });
  }

  get action(): Observable<Action | null> {
    return this._action;
  }

  setAction(action: Action | null): void {
    if (action) {
      action.routerLink = `${this.currentUrl}/${action.routerLink}`;
    }
    this.history[this.currentUrl] = action;
    this._action.next(action);
  }
}
