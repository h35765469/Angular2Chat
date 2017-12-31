import {Injectable, NgZone} from '@angular/core';
import {HttpService} from './http.service';
import {DomSanitizer} from '@angular/platform-browser';
import { Location } from '@angular/common';

@Injectable()
export class GeneralService {

  constructor(
    private http_service: HttpService,
    private sanitizer: DomSanitizer,
    private zone: NgZone,
    private back_location: Location,
  ) { }

  // report
  public report(params, callback): any {
    this.http_service.report(params).subscribe(
      response => {
        callback(false, response);
      },
      error => {
        callback(true, 'Http fail');
      }
    );
  }

  // make url safe
  public urlSafe(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  // facebook login
  public facebookLogin(params, callback): any {
    this.http_service.facebookLogin(params).subscribe(
      response => {
        callback(false, response);
      },
      error => {
        callback(true, 'Http fail');
      }
    );
  }
  // reload page
  reloadPage() { // click handler or similar
    this.zone.runOutsideAngular(() => {
      location.reload();
    });
  }
  // back last page
  backPage() {
    this.back_location.back();
  }

  timeConverter(UNIX_timestamp) {
    const a = new Date(UNIX_timestamp * 1000);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const year = a.getFullYear();
    const month = months[a.getMonth()];
    const date = a.getDate();
    const hour = a.getHours();
    const min = a.getMinutes();
    const sec = a.getSeconds();
    const time = year + '年' + a.getMonth() + '月' + date + '日' + hour + ':' + min + ':' + sec ;
    return time;
  }

}
