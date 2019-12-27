import {OnDestroy} from '@angular/core';
import {Subject} from 'rxjs';

export class Destroyable implements OnDestroy {

  protected destroy = new Subject<void>();

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

}
