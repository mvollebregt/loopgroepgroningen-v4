import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Trainingsmetadata} from './model/trainingsmetadata';
import {Observable} from 'rxjs';
import {Trainingsweek} from './model/trainingsweek';
import {DateTime} from 'luxon';
import {Training} from './model/training';
import {Trainingsdag} from './model/trainingsdag';
import {trainingsschemaUrl} from './trainingsschema.url';
import {DateService} from '../shared/datetime/date.service';

@Injectable({
  providedIn: 'root'
})
export class TrainingsschemaService {

  static readonly weektypes: ('omvang' | 'intensiteit' | 'herstel')[] = ['omvang', 'intensiteit', 'herstel'];

  constructor(private httpClient: HttpClient, private dateService: DateService) {
  }

  static readonly url = trainingsschemaUrl;

  private static tsvToArray(tsv: string): string[][] {
    return tsv.split('\n').map(line => line.split('\t'));
  }

  getTrainingsschema(): Observable<Trainingsweek[]> {
    return this.httpClient.get(TrainingsschemaService.url, {responseType: 'text'}).pipe(
      map(TrainingsschemaService.tsvToArray),
      map(cellen => this.leesCellen(cellen))
    );
  }

  private leesCellen(cellen: string[][]): Trainingsweek[] {
    // We gaan rij voor rij door het gehele trainingsschema heen.
    // De trainingsmetadata bevat gegevens over welke informatie (trainer, omschrijving, locatie) we in welke kolom
    // kunnen vinden. Deze lezen we uit één enkele rij.
    let trainingsmetadatarijnummer: number | undefined;
    const trainingsmetadata = [] as Trainingsmetadata[];
    const trainingsweken = [] as Trainingsweek[];
    // trainingsweek bevat de trainingsweek die we op dit moment aan het inlezen zijn.
    let trainingsweek = {trainingsdagen: [] as Trainingsdag[]} as Trainingsweek;
    for (let rijnummer = 0; rijnummer < cellen.length; rijnummer++) {
      const rij = cellen[rijnummer];
      for (let kolomnummer = 0; kolomnummer < rij.length; kolomnummer++) {
        // We bepalen de letterlijke inhoud van de cel, de cel geparseerd als datum, en de cel in hoofdletters.
        const cel = rij[kolomnummer].trim();
        let alsDatum = DateTime.fromFormat(cel, 'd-MMM', {locale: 'nl'});
        const uppercase = cel.toUpperCase();
        if (/^\d+$/.test(cel)) {
          // Als de cel alleen een getal bevat is dat het weeknummer. Dat slaan we op in de huidige trainingsweek.
          trainingsweek.weeknummer = parseInt(uppercase, 10);
          // Bij een weeknummer kan algemene data staan die voor zowel A, B als C geldt
          for (let i = 0; i < trainingsmetadata.length; i++) {
            const omschrijvingIndex = trainingsmetadata[i].omschrijving;
            if (omschrijvingIndex) {
              if (trainingsweek.trainingsdagen[i] && rij[omschrijvingIndex]) {
                trainingsweek.trainingsdagen[i].algemeen = rij[omschrijvingIndex].trim();
              }
            }
          }
        } else if (uppercase === 'O' || uppercase === 'I' || uppercase === 'H') {
          // Als de cel alleen O, I of H bevat, dan is dat het weektype. Dat slaan we op in de huidige trainingsweek.
          trainingsweek.weektype = TrainingsschemaService.weektypes.find(weektype => weektype[0].toUpperCase() === uppercase);
        } else if (uppercase === 'A' || uppercase === 'B' || uppercase === 'C') {
          // Als de cel alleen A, B, of C bevat, betekent dat dat de rest van de regel de alle trainingen voor groep A
          // B of C in de huidige trainingsweek bevat. Deze lezen we in met behulp van de trainingsmetadata.
          for (let i = 0; i < trainingsmetadata.length; i++) {
            const training = {} as Training;
            for (const [veld, index] of Object.entries(trainingsmetadata[i])) {
              training[veld] = rij[index] || undefined;
              if (!rij[index] && veld !== 'trainer') {
                // Als het veld leeg is, en niet het trainerveld is, dan moeten we de waarde kopieren uit één van de
                // twee regels daarboven.
                training[veld] =
                  (uppercase >= 'B' && cellen[rijnummer - 1][index]) ||
                  (uppercase >= 'C' && cellen[rijnummer - 2][index]) ||
                  undefined;
              }
            }
            // als een training geen omschrijving heeft is het een lege cel
            if (training.omschrijving && training.omschrijving.trim()) {
              trainingsweek.trainingsdagen[i][uppercase] = training;
            }
          }
          if (uppercase === 'C') {
            // De regel voor de C-groep is altijd de laatste regel van een trainingsweek. We voegen de trainingsweek
            // toe aan de array, en beginnen met een nieuwe trainingsweek.
            // Verwijder eerst lege trainingsdagen.
            const trainingsdagen = trainingsweek.trainingsdagen.filter(trainingsdag => trainingsdag.A || trainingsdag.B || trainingsdag.C);
            if (trainingsdagen.length > 0) {
              trainingsweken.push({...trainingsweek, trainingsdagen});
            }
            trainingsweek = {trainingsdagen: [] as Trainingsdag[]} as Trainingsweek;
          }
          // Met het lezen van alle trainingen voor een groep zijn we klaar met de regel, en willen we meteen door naar
          // de volgende regel.
          break;
        } else if (alsDatum.isValid) {
          // Als we een datum tegenkomen dan is dit een datum voor één van de trainingsdagen in de trainingsweek.
          const now = this.dateService.now();
          alsDatum = alsDatum.set({year: now.year});
          if (alsDatum && alsDatum.diff(now, 'months').months < -6) {
            alsDatum = alsDatum.plus({years: 1});
          }
          trainingsweek.trainingsdagen.push({datum: alsDatum.toISODate()});
        } else if (trainingsmetadatarijnummer === undefined || trainingsmetadatarijnummer === rijnummer) {
          // Onderstaande code voeren we alleen uit indien we nog geen (trainingsmetadatarijnummer === undefined) of nog
          // geen volledige (trainingsmetadatarijnummer === huidige rijnumme)rij met kolomkoppen gelezen hebben.
          trainingsmetadatarijnummer = rijnummer;
          // Kunnen we in de cel een kolomtitel herkennen?
          const kolomtitel: keyof Training | undefined =
            uppercase.indexOf('TRAINER') > -1 ? 'trainer'
              : uppercase.indexOf('LOCATIE') > -1 ? 'locatie'
              : uppercase.indexOf('TRAINING') > -1 ? 'omschrijving'
                : undefined;
          if (kolomtitel) {
            // Zo ja, check of we al een ander kolomnummer voor dezelfde kolomtitel hebben.
            if (trainingsmetadata.length === 0 || trainingsmetadata[trainingsmetadata.length - 1][kolomtitel] !== undefined) {
              // Zo ja? Dan is dit het begin van een nieuw setje van kolomkoppen.
              trainingsmetadata.push({} as Trainingsmetadata);
            }
            trainingsmetadata[trainingsmetadata.length - 1][kolomtitel] = kolomnummer;
          }
        }
      }
      if (trainingsweek.trainingsdagen && trainingsweek.trainingsdagen.length === 2) {
        // In een trainingsweek staan twee datums genoemd, maar er is ook nog een derde eigen training, waarvoor geen
        // datum in de Excel-sheet staat. Voor deze training nemen als datum de zaterdagtraining plus twee dagen.
        const plus2dagen = DateTime.fromISO(trainingsweek.trainingsdagen[1].datum).plus({days: 2});
        trainingsweek.trainingsdagen.push({datum: plus2dagen.toISODate(), titel: 'eigen 3e training'});
      }
    }
    console.log(JSON.stringify(this.schemaOudeFormaat(trainingsweken), null, 2));
    return trainingsweken;
  }

  private schemaOudeFormaat(trainingsweken: Trainingsweek[]) {
    return {
      A: this.schemaVoorGroep(trainingsweken, 'A'),
      B: this.schemaVoorGroep(trainingsweken, 'B'),
      C: this.schemaVoorGroep(trainingsweken, 'C')
    };
  }

  private schemaVoorGroep(trainingsweken: Trainingsweek[], groep: string) {
    return trainingsweken.map(week => ({
      titel: `Week ${week.weeknummer} - ${week.weektype}`,
      inhoud: week.trainingsdagen.map((dag, index) => ({
        ...index === 2 ? {titel: 'eigen 3e training'} : undefined,
        datum: dag.datum,
        omschrijving: dag[groep].omschrijving + (dag.algemeen ? ` (${dag.algemeen})` : ''),
        locatie: dag[groep].locatie,
      }))
    }));
  }
}
