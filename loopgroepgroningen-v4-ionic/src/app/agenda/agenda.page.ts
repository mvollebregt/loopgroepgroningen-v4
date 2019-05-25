import {Component, OnInit} from '@angular/core';
import {EvenementService} from './evenement.service';
import {Observable} from 'rxjs';
import {Evenement} from '../api';
import * as moment from 'moment';

@Component({
  selector: 'lg-agenda',
  templateUrl: './agenda.page.html'
})
export class AgendaPage implements OnInit {

  evenementen: Observable<Evenement[]>;

  constructor(private evenementService: EvenementService) {
  }

  ngOnInit(): void {
    this.evenementen = this.evenementService.getEvenementen();
  }

  getGroupName(evenement: Evenement): string {
    return moment(evenement.datum).format('MMMM');
  }

}
