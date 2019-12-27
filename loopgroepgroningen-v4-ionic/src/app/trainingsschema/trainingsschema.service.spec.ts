import {TestBed} from '@angular/core/testing';

import {TrainingsschemaService} from './trainingsschema.service';
import {DateService} from '../shared/datetime/date.service';
import {DateTime} from 'luxon';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Trainingsweek} from './model/trainingsweek';
import {trainingsschemaUrl} from './trainingsschema.url';
import createSpyObj = jasmine.createSpyObj;

describe('TrainingsschemaService', () => {

  let service: TrainingsschemaService;
  let httpMock;
  const dateService = createSpyObj<DateService>('DateService', ['now']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        TrainingsschemaService,
        {provide: DateService, useValue: dateService}
      ]
    });
    service = TestBed.get(TrainingsschemaService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('parseert een enkele training', () => {
    dateService.now.and.returnValue(DateTime.fromISO('1976-07-12'));
    const result = parseerResponse([
      ['44', 'Groep', 'Trainer', '', 'Woensdagtraining', 'Trainingslocatie', 'Trainer',
        '', 'Zaterdagtraining', 'Trainingslocatie', 'Eigen 3e training'],
      ['', '', '', '', '30-okt', '', '', '', '2-nov'],
      ['O', 'A', '', '', '6x4', 'Zilvermeer', 'Be', '', '4x800', 'Start 4 mijl parcours', 'Duurloop 50'],
      ['', 'B', '', '', '8x4', '', 'Ja', '', '6x800', '', 'Duurloop 70'],
      ['', 'C', '', '', '10x4', '', 'He', '', '8x800', '', 'Duurloop 90'],
      ['45', 'Groep', 'Trainer', '', 'Woensdagtraining', 'Trainingslocatie', 'Trainer',
        '', 'Zaterdagtraining', 'Trainingslocatie', 'Eigen 3e training'],
      ['', '', '', '', '06-nov', '', '', '', '09-nov'],
      ['I', 'A', 'Ar', '', '3x10', 'Zuidwolde brug', '', '', 'Duurloop 50', '4 mijl parcours', 'Duurloop 51'],
      ['', 'B', 'He', '', '4x10', 'Zuidwolde', 'Ja', '', 'Duurloop 60', '4 mijl parcours', 'Duurloop 71'],
      ['', 'C', 'Er', '', '5x10', 'Zuidwolde', '', '', 'Duurloop 75', 'Richting Thesinge', 'Duurloop 91']
    ]);
    expect(result).toEqual([
      {
        weeknummer: 44,
        weektype: 'O',
        trainingsdagen: [{
          datum: '1976-10-30',
          A: {trainer: undefined, omschrijving: '6x4', locatie: 'Zilvermeer'},
          B: {trainer: undefined, omschrijving: '8x4', locatie: 'Zilvermeer'},
          C: {trainer: undefined, omschrijving: '10x4', locatie: 'Zilvermeer'}
        },
          {
            datum: '1976-11-02',
            A: {trainer: 'Be', omschrijving: '4x800', locatie: 'Start 4 mijl parcours'},
            B: {trainer: 'Ja', omschrijving: '6x800', locatie: 'Start 4 mijl parcours'},
            C: {trainer: 'He', omschrijving: '8x800', locatie: 'Start 4 mijl parcours'}
          },
          {
            datum: '1976-11-04',
            titel: 'eigen 3e training',
            A: {omschrijving: 'Duurloop 50'},
            B: {omschrijving: 'Duurloop 70'},
            C: {omschrijving: 'Duurloop 90'},
          }
        ]
      },
      {
        weeknummer: 45,
        weektype: 'I',
        trainingsdagen: [{
          datum: '1976-11-06',
          A: {trainer: 'Ar', omschrijving: '3x10', locatie: 'Zuidwolde brug'},
          B: {trainer: 'He', omschrijving: '4x10', locatie: 'Zuidwolde'},
          C: {trainer: 'Er', omschrijving: '5x10', locatie: 'Zuidwolde'}
        },
          {
            datum: '1976-11-09',
            A: {trainer: undefined, omschrijving: 'Duurloop 50', locatie: '4 mijl parcours'},
            B: {trainer: 'Ja', omschrijving: 'Duurloop 60', locatie: '4 mijl parcours'},
            C: {trainer: undefined, omschrijving: 'Duurloop 75', locatie: 'Richting Thesinge'}
          },
          {
            datum: '1976-11-11',
            titel: 'eigen 3e training',
            A: {omschrijving: 'Duurloop 51'},
            B: {omschrijving: 'Duurloop 71'},
            C: {omschrijving: 'Duurloop 91'},
          }
        ]
      }
    ] as Trainingsweek[]);
  });

  function parseerResponse(cellen: string[][]): Trainingsweek[] {
    let result: Trainingsweek[];
    service.getTrainingsschema().subscribe(r => result = r);
    const req = httpMock.expectOne(trainingsschemaUrl);
    req.flush(cellen.map(rij => rij.join('\t')).join('\n'));
    return result;
  }
});
