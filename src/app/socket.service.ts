/*
* Real time private chatting app using Angular 2,Nodejs, mongodb and Socket.io
* @author Shashank Tiwari
*/


import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

/*npm install @types/socket.io-client --save
*/
import * as io from 'socket.io-client';

@Injectable()
export class SocketService {
  public static socket;

  /** specifying Base URL.
	*/
  private BASE_URL = 'http://localhost:4000';
  // private socket;

  constructor() {}

  /* * Method to connect the users to socket
	*/
  connectSocket(userId: string) {
    SocketService.socket = io(this.BASE_URL, { query: `userId=${userId}`});
  }
 	/* * Method to emit the add-messages event.
	*/
 	sendMessage(message: any ): void {
    SocketService.socket.emit('add-message', message);
 	}

	/*
	* Method to emit the logout event.
	*/
	logout(userId): any {
    SocketService.socket.emit('logout', userId);
    let observable = new Observable(observer => {
      SocketService.socket.on('logout-response', (data) => {
        observer.next(data);
      });
      return () => {
        SocketService.socket.disconnect();
      };
    });
    return observable;
	}

	/* * Method to receive add-message-response event.*/
	receiveMessages(): any {
	  let observable = new Observable(observer => {
      SocketService.socket.on('add-message-response', (data) => {
	      observer.next(data);
	    });
	    return () => {
        SocketService.socket.disconnect();
      };
	  });
	  return observable;
	}

	/* * Method to receive chat-list-response event.
	*/
	getChatList(userId: string ): any {
    SocketService.socket.emit('chat-list' , { userId : userId });
    const observable = new Observable(observer => {
      SocketService.socket.on('chat-list-response', (data) => {
        observer.next(data);
      });
      return () => {
        SocketService.socket.disconnect();
      };
    });
    return observable;
	}

	// emit the add_conversation_reply event
  sendConversationReply(message: any): void {
    SocketService.socket.emit('add-conversation-reply', message);
  }

  // receive the add-conversation-reply-response event
  receiveConversationReplies(): any {
	  let observable = new Observable(observer => {
      SocketService.socket.on('add-conversation-reply-response', (data) => {
	      observer.next(data);
      });
	    return () => {
        SocketService.socket.disconnect();
      };
    });
	  return observable;
  }

  // remind the conversation_replay coming event
  remindConversationReplies(): any {
	  let observable = new Observable(observer => {
      SocketService.socket.on('remind-conversation-reply-response', (data) => {
        observer.next(data);
      });
	    return () => {
        SocketService.socket.disconnect();
      };
    });
	  return observable;
  }

  // emit the add_buy_reply event
  sendBuyReply(buy_id, talent, buyer_id, type): void {
	  const data = {buy_id: buy_id, talent: talent, buyer_id: buyer_id, type: type};
    SocketService.socket.emit('add-buy-reply', data);
  }

  //emit the add_rate_reply event
  sendRateReply(data): void {
	  SocketService.socket.emit('add-rate-reply', data);
  }

  // emit the add-buy-talent event
  sendBuyTalent(data: any): void {
    SocketService.socket.emit('add-buy-talent-reply', data);
  }

  // receive the talent notification
  receiveTalentNotification(): any {
	  let observable = new Observable(observer => {
      SocketService.socket.on('add-notification-reply-response', (data) => {
        observer.next(data);
      });
	    return () => {
        SocketService.socket.disconnect();
      };
    });
	  return observable;
  }
}
