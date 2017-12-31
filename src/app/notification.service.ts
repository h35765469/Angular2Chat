import { Injectable } from '@angular/core';
import {HttpService} from './http.service';

@Injectable()
export class NotificationService {

  constructor(private http_service: HttpService) { }

  public getUserNotifications(params, callback): any {
    this.http_service.getUserNotifications(params).subscribe(
      response => {
        callback(false, response);
      },
      error => {
        callback(true, 'Http failed');
      }
    );
  }


  public sendAlreadyReadNotifications(params, callback): any {
    this.http_service.sendAlreadyReadNotifications(params).subscribe(
      response => {
        callback(false, response);
      },
      error => {
        callback(true, 'Http failed');
      }
    );
  }

}
