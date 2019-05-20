import {Component, OnInit} from '@angular/core';
import {EvenementService} from './evenement.service';
import {Observable} from 'rxjs';
import {Evenement} from '../api'

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.page.html'
})
export class AgendaPage implements OnInit {

  private evenementen: Observable<Evenement[]>;

  constructor(private evenementService: EvenementService) {
  }

  ngOnInit(): void {
    this.evenementen = this.evenementService.getEvenementen();
  }

}
