import {Component, HostListener, OnInit} from '@angular/core';
import {TrainingsschemaService} from './trainingsschema.service';
import {Observable} from 'rxjs';
import {Trainingsweek} from './model/trainingsweek';
import {Trainingsdag} from './model/trainingsdag';

@Component({
  selector: 'lg-trainingsschema',
  templateUrl: './trainingsschema.page.html',
  styleUrls: ['./trainingsschema.page.scss']
})
export class TrainingsschemaPage implements OnInit {

  trainingsschema: Observable<Trainingsweek[]>;
  groepen: ('A' | 'B' | 'C')[] = ['C'];

  constructor(private trainingsschemaService: TrainingsschemaService) {
  }

  ngOnInit(): void {
    this.trainingsschema = this.trainingsschemaService.getTrainingsschema();
    this.detectSize();
  }

  toonLocatie(trainingsdag: Trainingsdag, groep: 'A' | 'B' | 'C'): boolean {
    if (this.groepen.length === 1) {
      return true;
    } else if (!TrainingsschemaPage.getLocatie(trainingsdag, groep)) {
      return false;
    } else if (groep === 'A') {
      return true;
    } else {
      return !TrainingsschemaPage.enkeleLocatie(trainingsdag);
    }
  }

  locatieVolleRegel(trainingsdag: Trainingsdag, groep: string) {
    return this.groepen.length === 3 && groep === 'A' && TrainingsschemaPage.enkeleLocatie(trainingsdag);
  }

  @HostListener('window:resize')
  detectSize(): void {
    const width = window.innerWidth;
    if (width < 520) {
      this.groepen = ['C'];
    } else {
      this.groepen = ['A', 'B', 'C'];
    }
  }

  private static enkeleLocatie(trainingsdag: Trainingsdag) {
    const locatieA = TrainingsschemaPage.getLocatie(trainingsdag, 'A');
    const locatieB = TrainingsschemaPage.getLocatie(trainingsdag, 'B');
    const locatieC = TrainingsschemaPage.getLocatie(trainingsdag, 'C');
    return locatieA === locatieB && locatieB === locatieC;
  }

  private static getLocatie(trainingsdag: Trainingsdag, groep: 'A' | 'B' | 'C') {
    const training = trainingsdag[groep];
    return training && training.locatie;
  }

}
