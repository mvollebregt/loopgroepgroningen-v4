import {Trainingsdag} from './trainingsdag';

export interface Trainingsweek {
  weeknummer: number;
  weektype?: 'O' | 'I' | 'H';
  trainingsdagen: Trainingsdag[];
}
