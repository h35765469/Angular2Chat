import {User} from './user';

export interface Talent {
  _id: String;
  user: User;
  title: String;
  description: String;
  money: number;
  location: String;
  main_image: String;
  upload_at: String;
}
