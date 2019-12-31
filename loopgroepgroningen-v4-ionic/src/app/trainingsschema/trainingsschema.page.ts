import {Component, HostListener, OnInit} from '@angular/core';
import {TrainingsschemaService} from './trainingsschema.service';
import {Trainingsweek} from './model/trainingsweek';
import {Trainingsdag} from './model/trainingsdag';
import {takeUntil} from 'rxjs/operators';
import {DateService} from '../shared/datetime/date.service';
import {DateTime} from 'luxon';
import {Destroyable} from '../shared/components/destroyable';

@Component({
  selector: 'lg-trainingsschema',
  templateUrl: './trainingsschema.page.html',
  styleUrls: ['./trainingsschema.page.scss']
})
export class TrainingsschemaPage extends Destroyable implements OnInit {

  volledigTrainingsschema: Trainingsweek[];
  trainingsschema: Trainingsweek[];
  groepen: ('A' | 'B' | 'C')[] = ['C'];

  constructor(private trainingsschemaService: TrainingsschemaService, private dateService: DateService) {
    super();
  }

  ngOnInit(): void {
    this.trainingsschemaService.getTrainingsschema().pipe(
      takeUntil(this.destroy)
    ).subscribe(schema => {
      this.volledigTrainingsschema = schema;
      const datum = this.dateService.now().set({hour: 0, minute: 0, second: 0});
      this.trainingsschema = TrainingsschemaPage.trainingenVanafDatum(schema, datum);
    });
    this.detectSize();
  }

  toonOudereTrainingen(event: any) {
    this.trainingsschema = this.volledigTrainingsschema;
    event.target.complete();
  }

  @HostListener('window:resize')
  @HostListener('window:orientationchange')
  detectSize(): void {
    const width = window.innerWidth;
    if (width < 520) {
      this.groepen = ['C'];
    } else {
      this.groepen = ['A', 'B', 'C'];
    }
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

  private static trainingenVanafDatum(schema: Trainingsweek[], datum: DateTime): Trainingsweek[] {
    const trainingsschema = [] as Trainingsweek[];
    for (const trainingsweek of schema) {
      const resultaatweek: Trainingsweek = {
        weeknummer: trainingsweek.weeknummer,
        weektype: trainingsweek.weektype,
        trainingsdagen: []
      };
      for (const trainingsdag of trainingsweek.trainingsdagen) {
        if (datum.diff(DateTime.fromISO(trainingsdag.datum), 'days').days <= 0) {
          resultaatweek.trainingsdagen.push(trainingsdag);
        }
      }
      if (resultaatweek.trainingsdagen.length > 0) {
        trainingsschema.push(resultaatweek);
      }
    }
    return trainingsschema;
  }
}
