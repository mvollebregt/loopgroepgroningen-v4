import {Component, OnInit} from '@angular/core';
import {EvenementService} from './evenement.service';
import {Observable} from 'rxjs';
import {Evenement} from '../api';
import {DateTime} from 'luxon';

@Component({
  selector: 'lg-agenda',
  templateUrl: './agenda.page.html'
})
export class AgendaPage implements OnInit {

  evenementen: Observable<Evenement[]>;

  constructor(private evenementService: EvenementService) {
  }

  ngOnInit(): void {
    this.evenementen = this.evenementService.getAll();
  }

  getGroupName(evenement: Evenement): string {
    return DateTime.fromISO(evenement.datum).toFormat('MMMM');
  }

}
