import {Training} from './training';

export interface Trainingsdag {
  algemeen?: string;
  datum: string;
  titel?: string;
  A?: Training;
  B?: Training;
  C?: Training;
}
