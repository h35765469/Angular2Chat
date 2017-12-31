/*
* Real time private chatting app using Angular 2,Nodejs, mongodb and Socket.io
* @author Shashank Tiwari
*/

import { Injectable } from '@angular/core';

/* Importing http service starts*/
import { HttpService } from './http.service';
/* Importing http service ends*/

@Injectable()
export class ChatService {
  constructor(private httpService: HttpService) { }
  /* * check if username already exists.
   * */
  public checkUserNameCheck(params, callback ) {
    this.httpService.userNameCheck(params).subscribe(
      response => {
        callback(response);
        },
        error => {
        alert('HTTP fail.');
      }
      );
  }

	/* * Login the user
	**/
  public login(params , callback): any {
    this.httpService.login(params).subscribe(
      response => {
        callback(false, response);
      },
      error => {
        callback(true, 'HTTP fail.');
      }
    );
  }


  /** method to add new users*/
  public registerUser(params, callback): any {
    this.httpService.registerUser(params).subscribe(
      response => {
        callback(false, response);
      },
      error => {
        callback(true, 'HTTP fail.');
      }
    );
  }


  /** method to get the messages between two users*/
  public getMessages(params , callback): any {
        this.httpService.getMessages(params).subscribe(
          response => {
            callback(false, response );
            console.log('getMessages ' + response);
          },
          error => {
            callback(true, 'HTTP fail.');
          }
        );
  }


  /** Method to check the session of user.*/
  public userSessionCheck(userId , callback): any {
    this.httpService.userSessionCheck({userId : userId}).subscribe(
      response => {
        callback(false, response );
      },
      error => {
        callback(true, 'HTTP fail.');
      }
    );
  }

  // get User data you chat
  public getUserData(params, callback): any {
    this.httpService.getUserData(params).subscribe(
      response => {
        callback(false, response);
      },
      error => {
        callback(true, 'HTTP fail');
      }
    );
  }

  // check if conversation existed or not
  public checkConversation(params, callback): any {
    this.httpService.checkConversation(params).subscribe(
      response => {
        callback(false, response);
      },
      error => {
        callback(true, 'HTTP fail');
      }
    );
  }

  // get conversation list
  public getConversationList(params, callback): any {
    this.httpService.getConversationList(params).subscribe(
      response => {
        callback(false, response);
      },
      error => {
        callback(true, 'Http fail');
      }
    );
  }
  // get unread conversations
  public getUnNotificationConversations(params, callback): any {
    this.httpService.getUnNotificationConversations(params).subscribe(
      response => {
        callback(false, response);
      },
      error => {
        callback(true, 'Http fail');
      }
    );
  }
  // send conversations already read
  public sendAlreadyRead(params, callback): any {
    this.httpService.sendAlreadyRead(params).subscribe(
      response => {
        callback(false, response);
      },
      error => {
        callback(true, 'Http fail');
      }
    );
  }
  // send conversations already notify
  public sendAlreadyNotificationConversations(params, callback): any {
    this.httpService.sendAlreadyNotificationConversations(params).subscribe(
      response => {
        callback(false, response);
      },
      error => {
        callback(true, 'Http fail');
      }
    )
  }
}
