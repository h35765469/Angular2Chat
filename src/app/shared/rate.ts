import {User} from './user';
import {Talent} from './talent';

export interface Rate {
  _id?: String;
  type?: number;
  description?: String;
  talent?: Talent;
  user?: User;
}
