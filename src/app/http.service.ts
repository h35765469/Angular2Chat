/*
* Real time private chatting app using Angular 2,Nodejs, mongodb and Socket.io
* @author Shashank Tiwari
*/


import { Injectable } from '@angular/core';

import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import * as url from 'url';
import {ELEMENT_PROBE_PROVIDERS} from '@angular/platform-browser/src/dom/debug/ng_probe';

@Injectable()
export class HttpService {
  	/** specifying Base URL.*/
    private BASE_URL = 'http://1.34.63.239:4000/';

    /** Setting the Request headers.*/
    private headerOptions = new RequestOptions({
        headers : new Headers({ 'Content-Type' : 'application/json;charset=UTF-8' })
    });
  constructor( private http: Http) { }
  public userNameCheck(params) {
    return this.http.post(`${this.BASE_URL}usernameCheck`, JSON.stringify(params), this.headerOptions)
      .map( (response: Response) => response.json())
      .catch( (error: any) => Observable.throw(error.json().error || `Server error`) );
  }
  public login(params) {
        return this.http.post(`${this.BASE_URL}login`, JSON.stringify(params), this.headerOptions)
          .map( (response: Response) => response.json())
          .catch( (error: any) => Observable.throw(error.json().error || `Server error`) );
  }
  public registerUser(params) {
    return this.http.post(`${this.BASE_URL}registerUser`, JSON.stringify(params), this.headerOptions)
      .map( (response: Response) => response.json())
      .catch( (error: any) => Observable.throw(error.json().error || `Server error`) );
  }

  public userSessionCheck(params) {
    return this.http.post(`${this.BASE_URL}userSessionCheck`, JSON.stringify(params), this.headerOptions)
      .map( (response: Response) => response.json())
      .catch( (error: any) => Observable.throw(error.json().error || `Server error`) );
  }
  public getMessages(params) {
    return this.http.post(`${this.BASE_URL}getMessages`, JSON.stringify(params), this.headerOptions)
      .map( (response: Response) => response.json())
      .catch( (error: any) => Observable.throw(error.json().error || `Server error`) );
  }
  public postTalent(params) {
    return this.http.post(this.BASE_URL + 'postTalent', JSON.stringify(params), this.headerOptions)
      .map((response: Response) => response.json())
      .catch( (error: any) => Observable.throw(error.json().error || 'Server error') );
  }
  public editTalent(params) {
    return this.http.post(this.BASE_URL + 'editTalent', JSON.stringify(params), this.headerOptions)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  public getAllTalents(params) {
    return this.http.post(this.BASE_URL + 'getAllTalents', JSON.stringify(params), this.headerOptions)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  public getTalent(params) {
    return this.http.post(this.BASE_URL + 'getTalent', JSON.stringify(params), this.headerOptions)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  public getMyTalents(params) {
    return this.http.post(this.BASE_URL + 'getMyTalents', JSON.stringify(params), this.headerOptions).
      map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error) || 'Server error');
  }
  public deleteTalent(params) {
    return this.http.post(this.BASE_URL + 'deleteTalent', JSON.stringify(params), this.headerOptions)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  public rateTalent(params) {
    return this.http.post(this.BASE_URL + 'rateTalent', JSON.stringify(params), this.headerOptions)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  public getTalentRates(params) {
    return this.http.post(this.BASE_URL + 'getTalentRates', JSON.stringify(params), this.headerOptions)
      .map((resposne: Response) => resposne.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  public buyTalent(params) {
    return this.http.post(this.BASE_URL + 'buyTalent', JSON.stringify(params), this.headerOptions)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  public getMyBuys(params) {
    return this.http.post(this.BASE_URL + 'getMyBuys', JSON.stringify(params), this.headerOptions)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  public editUserData(params) {
    return this.http.post(this.BASE_URL + 'editMyData', JSON.stringify(params), this.headerOptions)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  public getUserData(params) {
    return this.http.post(this.BASE_URL + 'getUserData', JSON.stringify(params), this.headerOptions)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  public report(params) {
    return this.http.post(this.BASE_URL + 'report', JSON.stringify(params), this.headerOptions)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  public getMyRates(params) {
    return this.http.post(this.BASE_URL + 'getMyRates', JSON.stringify(params), this.headerOptions)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  public facebookLogin(params) {
    return this.http.post(this.BASE_URL + 'facebookLogin', JSON.stringify(params), this.headerOptions)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  public checkConversation(params) {
    return this.http.post(this.BASE_URL + 'checkConversation', JSON.stringify(params), this.headerOptions)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  public getConversationList(params) {
    return this.http.post(this.BASE_URL + 'getConversationList', JSON.stringify(params), this.headerOptions)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  public getUnNotificationConversations(params) {
    return this.http.post(this.BASE_URL + 'getUnNotificationConversations', JSON.stringify(params), this.headerOptions)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  public sendAlreadyRead(params) {
    return this.http.post(this.BASE_URL + 'sendAlreadyRead', JSON.stringify(params), this.headerOptions)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  public getSearchTalents(params) {
    return this.http.post(this.BASE_URL + 'getSearchTalents', JSON.stringify(params), this.headerOptions)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  public getMoreTalents(params) {
    return this.http.post(this.BASE_URL + 'getMoreTalents', JSON.stringify(params), this.headerOptions)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  public getUserMoreTalents(params) {
    return this.http.post(this.BASE_URL + 'getUserMoreTalents', JSON.stringify(params), this.headerOptions)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  public getUserMoreBuys(params) {
    return this.http.post(this.BASE_URL + 'getUserMoreBuys', JSON.stringify(params), this.headerOptions)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  public getUserMoreRates(params) {
    return this.http.post(this.BASE_URL + 'getUserMoreRates', JSON.stringify(params), this.headerOptions)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  public getTalentBuys(params) {
    return this.http.post(this.BASE_URL + 'getTalentBuys', JSON.stringify(params), this.headerOptions)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  public getUserNotifications(params) {
    return this.http.post(this.BASE_URL + 'getUserNotifications', JSON.stringify(params), this.headerOptions)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  public sendAlreadyReadNotifications(params) {
    return this.http.post(this.BASE_URL + 'sendAlreadyReadNotifications', JSON.stringify(params), this.headerOptions)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  public sendAlreadyNotificationConversations(params) {
    return this.http.post(this.BASE_URL + 'sendAlreadyNotificationConversations', JSON.stringify(params), this.headerOptions)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
}
