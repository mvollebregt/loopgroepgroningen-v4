import {Component, OnDestroy, OnInit} from '@angular/core';
import {EvenementService} from '../evenement.service';
import {ActivatedRoute} from '@angular/router';
import {filter, map, switchMap, takeUntil} from 'rxjs/operators';
import {Evenement} from '../../api'
import {Destroyable} from '../../shared/components/destroyable';

@Component({
  selector: 'lg-evenement-detail',
  templateUrl: './evenement-detail.page.html'
})
export class EvenementDetailPage extends Destroyable implements OnInit, OnDestroy {

  evenement: Evenement | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private evenementService: EvenementService
  ) {
    super();
  }

  ngOnInit() {
    this.activatedRoute.paramMap.pipe(
      map(paramMap => paramMap.get('id')),
      filter(id => !!id),
      switchMap((id: string) => this.evenementService.get(id)),
      takeUntil(this.destroy)
    ).subscribe(evenement => this.evenement = evenement);
  }

}
