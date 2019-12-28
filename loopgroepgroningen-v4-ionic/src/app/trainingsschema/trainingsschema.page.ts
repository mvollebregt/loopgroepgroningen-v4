import {Component, OnInit} from '@angular/core';
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

  private trainingsschema: Observable<Trainingsweek[]>;

  constructor(private trainingsschemaService: TrainingsschemaService) {
  }

  ngOnInit(): void {
    this.trainingsschema = this.trainingsschemaService.getTrainingsschema();
  }

  toonLocatie(trainingsdag: Trainingsdag, groep: 'A' | 'B' | 'C'): boolean {
    if (!TrainingsschemaPage.getLocatie(trainingsdag, groep)) {
      return false;
    } else if (groep === 'A') {
      return true;
    } else {
      return !TrainingsschemaPage.enkeleLocatie(trainingsdag);
    }
  }

  locatieVolleRegel(trainingsdag: Trainingsdag, groep: string) {
    return groep === 'A' && TrainingsschemaPage.enkeleLocatie(trainingsdag);
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
