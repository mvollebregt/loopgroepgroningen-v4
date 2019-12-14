import {Component, OnInit} from '@angular/core';
import {EvenementService} from '../evenement.service';
import {ActivatedRoute} from '@angular/router';
import {filter, map, switchMap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Evenement} from '../../api'

@Component({
  selector: 'lg-evenement-detail',
  templateUrl: './evenement-detail.page.html'
})
export class EvenementDetailPage implements OnInit {

  evenement: Observable<Evenement>;

  constructor(private evenementService: EvenementService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.evenement = this.activatedRoute.paramMap.pipe(
      map(paramMap => paramMap.get('id')),
      filter(id => !!id),
      switchMap((id: string) => this.evenementService.get(id)),
      filter(evenement => !!evenement)
    ) as Observable<Evenement>;
  }

}
