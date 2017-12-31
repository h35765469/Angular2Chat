import {User} from './user';
import {Talent} from './talent';

export interface Buy {
  _id: String;
  talent_id: Talent;
  buyer_id: User;
  count: number;
  money: number;
  type: number;
}
