import { Component, OnInit } from '@angular/core';
import {ChatService} from '../chat.service';
import {SocketService} from '../socket.service';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpService} from '../http.service';
import {AppComponent} from '../app.component';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css'],
  providers: [ChatService, HttpService, SocketService]
})
export class ChatRoomComponent implements OnInit {
  /*
   * UI related variables starts
   */
  overlayDisplay = false;
  selectedUserId = null;
  selectedSocketId = null;
  selectedUserName = null;
  selectedName = null;
  selectedProfile = null;
  /*
    * UI related variables ends
    */

  /*
    * Chat and message related variables starts
    */
  username = null;
  userId = null;
  socketId = null;
  message = '';
  messages = [];
  profile = '';
  name = '';
  /*
    * Chat and message related variables ends
    */

  // conversion
  conversation_id;

  constructor(
    private chatService: ChatService,
    private socketService: SocketService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    /*
        * getting userID from URL using 'route.snapshot'
        */
    this.selectedUserId = this.route.snapshot.params['to_user_id'];

    // get my personal data-----------
    this.userId = localStorage.getItem('user_id');
    this.profile = localStorage.getItem('profile');
    this.name = localStorage.getItem('name');

    if (this.userId === '' || typeof this.userId === 'undefined') {
      this.router.navigate(['/']);
    }else {

      /*
            * function to check if user is logged in or not starts
            */
      this.chatService.userSessionCheck(this.userId, ( error, response ) => {
        if (error) {
          this.router.navigate(['/']); /* Home page redirection */
        }else {

          this.username = response.username;
          this.socketId = response.socketId;
          this.overlayDisplay = true;
          this.getUserData(); // get user data you chat

          /*
                * making socket connection by passing UserId.
                */
          this.socketService.connectSocket(this.userId);

          /*
                    * subscribing for messages statrts
                    */
          this.socketService.receiveConversationReplies().subscribe(response => {
            if (this.selectedUserId && this.selectedUserId === response.sender_id) {
              this.messages.push(response);
              setTimeout( () => {
                if (document.querySelector(`.message-thread`) != null) {
                  document.querySelector('.message-thread').scrollTop = document.querySelector(`.message-thread`).scrollHeight;
                }
              }, 100 );
            }
          });
          /*
                  * subscribing for messages statrts
                  */

          /*
        * calling method to get the messages
        */
          this.checkConversation();

          // send already read message
          this.sendAleadyRead();
        }
      });
    }
  }


  logout() {
    this.socketService.logout({userId : this.userId}).subscribe(response => {
      this.router.navigate(['/']); /* Home page redirection */
    });
  }
  getUserData() {
    this.chatService.getUserData({user_id: this.selectedUserId}, (error, response) => {
      this.selectedUserName = response.message.username;
      this.selectedName = response.message.name;
      this.selectedProfile = response.message.profile;
      this.selectedSocketId = response.message.socketId;
    });
  }

  sendConversationReply(event) {
    if (event.keyCode === 13) {
      if (this.message === '' || this.message === null) {
        alert('訊息不能為空');
      }else {
        if (this.userId === '') {
          this.router.navigate(['/catalog/']);
        }else {

          const data = {
            message : (this.message).trim(),
            sender_id : this.userId,
            receiver_id: this.selectedUserId,
            conversation_id: this.conversation_id,
            toSocketId : this.selectedSocketId,
            fromSocketId : this.socketId,
            name: this.username,
            profile: this.profile
          };
          this.messages.push(data);
          setTimeout( () => {
            document.querySelector(`.message-thread`).scrollTop = document.querySelector(`.message-thread`).scrollHeight;
          }, 100);

          /*
                    * calling method to send the messages
                    */
          this.message = null;
          this.socketService.sendConversationReply(data);
        }
      }
    }
  }

  alignConversationReply(userId) {
    return this.userId ===  userId ? true : false;
  }

  // check if conversation between two users existed or not
  checkConversation() {
    this.chatService.checkConversation({ user1_id : this.userId, user2_id : this.selectedUserId}, (error, response) => {
      if (response.message.insert) {
        this.conversation_id = response.conversation_id;
      }else {
        this.conversation_id = response.conversation_id;
        this.messages = response.message;
        setTimeout( () => {
          document.querySelector(`.message-thread`).scrollTop = document.querySelector(`.message-thread`).scrollHeight;
        }, 100);
      }
    });
  }

  toOtherData() {
    this.router.navigate(['/otherData/' + this.selectedUserId]);
  }

  sendAleadyRead() {
    this.chatService.sendAlreadyRead({user_id: this.userId, to_user_id: this.selectedUserId}, (error, response) => {
      if (error) {
      }else {
      }
    });
  }
}
