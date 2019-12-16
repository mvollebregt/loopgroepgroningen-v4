import {Deelname} from './deelname';

export interface Evenement {

  id: string;
  datum: string; // ISO-8601: YYYY-MM-dd
  naam: string
  auto?: boolean;
  fiets?: boolean;

  deelname?: Deelname;

}
