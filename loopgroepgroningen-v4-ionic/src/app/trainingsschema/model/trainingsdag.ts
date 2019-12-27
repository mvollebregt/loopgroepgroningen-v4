import {Training} from './training';

export interface Trainingsdag {
  datum: string;
  titel?: string;
  A?: Training;
  B?: Training;
  C?: Training;
}
