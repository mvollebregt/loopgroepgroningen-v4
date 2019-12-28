import {Trainingsdag} from './trainingsdag';

export interface Trainingsweek {
  weeknummer: number;
  weektype?: 'omvang' | 'intensiteit' | 'herstel';
  trainingsdagen: Trainingsdag[];
}
