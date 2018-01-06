import {Component, OnInit} from '@angular/core';
import {ChatService} from '../chat.service';
import {SocketService} from '../socket.service';
import {HttpService} from '../http.service';
import {ActivatedRoute, Router} from '@angular/router';
import {GeneralService} from '../general.service';
import {stringify} from "querystring";

@Component({
  selector: 'app-chat-history',
  templateUrl: './chat-history.component.html',
  styleUrls: ['./chat-history.component.css'],
  providers : [ChatService, HttpService, SocketService, GeneralService]
})
export class ChatHistoryComponent implements OnInit {

  /*
   * UI related variables starts
   */
  overlayDisplay = false;
  selectedUserId = '';
  selectedSocketId = '';
  selectedUserName = '';
  selectedName = '';
  /*
    * UI related variables ends
    */

  /*
    * Chat and message related variables starts
    */
  username = null;
  userId = null;
  socketId = '';
  chatListUsers = [];
  message = '';
  messages = [];
  profile = '';
  /*
    * Chat and message related variables ends
    */

  // conversion
  conversation_id;
  conversation_list = [];
  unread_conversation_list = [];
  is_unread = false;


  constructor(
    private chatService: ChatService,
    private socketService: SocketService,
    private general_service: GeneralService,
    private route: ActivatedRoute,
    private router: Router,
) { }

  ngOnInit() {

    /*
        * getting userID from URL using 'route.snapshot'
        */
    this.userId = localStorage.getItem('user_id');

    if (this.userId === '' || typeof this.userId === 'undefined') {
      console.log('malevolent');
      this.router.navigate(['/catalog/']) ;
    }else {

      /*
            * function to check if user is logged in or not starts
            */
      this.chatService.userSessionCheck(this.userId, ( error, response ) => {
        if (error) {
          this.router.navigate(['/']); /* Home page redirection */
        }else {

          this.username = response.username;
          this.overlayDisplay = true;

          /*
                * making socket connection by passing UserId.
                */
          // this.socketService.connectSocket(this.userId);

          /*
                    * calling method of service to get the chat list.
                    */
          // this.socketService.getChatList(this.userId).subscribe(response => {
          //
          //   if (!response.error) {
          //
          //     if (response.singleUser) {
          //
          //       /*
          //                     * Removing duplicate user from chat list array.
          //                     */
          //       if (this.chatListUsers.length > 0) {
          //         this.chatListUsers = this.chatListUsers.filter(function( obj ) {
          //           return obj._id !== response.chatList._id;
          //         });
          //       }
          //
          //       /*
          //                     * Adding new online user into chat list array
          //                     */
          //       this.chatListUsers.push(response.chatList);
          //
          //     }else if (response.userDisconnected) {
          //       this.chatListUsers = this.chatListUsers.filter(function( obj ) {
          //         return obj.socketId !== response.socketId;
          //       });
          //     }else {
          //       /*
          //                     * Updating entire chatlist if user logs in.
          //                     */
          //       this.chatListUsers = response.chatList;
          //     }
          //   }else {
          //     alert(`Chat list failure.`);
          //   }
          // });


          /*
                    * subscribing for messages statrts
                    */
          // this.socketService.receiveMessages().subscribe(response => {
          //   if (this.selectedUserId && this.selectedUserId === response.fromUserId) {
          //     this.messages.push(response);
          //     setTimeout( () => {
          //       document.querySelector(`.message-thread`).scrollTop = document.querySelector(`.message-thread`).scrollHeight;
          //     }, 100 );
          //   }
          // });
          /*
                  * subscribing for messages statrts
                  */

          this.getConversationList(); // get all recent messages

          // this.socketService.receiveConversationReplies().subscribe(response => {
          //   console.log('purse ' + JSON.stringify(response));
          //   if (this.selectedUserId && this.selectedUserId === response.sender_id) {
          //     this.messages.push(response);
          //     setTimeout( () => {
          //       document.querySelector(`.message-thread`).scrollTop = document.querySelector(`.message-thread`).scrollHeight;
          //     }, 100 );
          //   }
          // });
          this.socketService.receiveConversationReplies().subscribe(response => {
            let is_in_conversation_list = false;
            if (this.is_unread) {
              for (let i = 0; i < this.unread_conversation_list.length; i++) {
                if (this.unread_conversation_list[i].conversation_result) {
                  if (this.unread_conversation_list[i].conversation_result.user1_id[0]._id === response.sender_id) {
                    is_in_conversation_list = true;
                    this.unread_conversation_list[i].message = response.message;
                    this.unread_conversation_list[i].conversation_result.is_read = 0;
                    break;
                  }else if (this.unread_conversation_list[i].conversation_result.user2_id[0]._id === response.sender_id) {
                    is_in_conversation_list = true;
                    this.unread_conversation_list[i].message = response.message;
                    this.unread_conversation_list[i].conversation_result.is_read = 0;
                    break;
                  }
                }else {
                  if (this.unread_conversation_list[i].sender_id === response.sender_id) {
                    is_in_conversation_list = true;
                    this.unread_conversation_list[i].message = response.message;
                    break;
                  }
                }
              }
              if (!is_in_conversation_list) {
                this.unread_conversation_list.unshift(response); // add object to first position
              }
            }else {
              for (let i = 0; i < this.conversation_list.length; i++) {
                if (this.conversation_list[i].conversation_result) { // update conversation_list depend on data from remote mongodb
                  if (this.conversation_list[i].conversation_result.user1_id[0]._id === response.sender_id) {
                    is_in_conversation_list = true;
                    this.conversation_list[i].message = response.message;
                    this.conversation_list[i].conversation_result.is_read = 0;
                    break;
                  }else if (this.conversation_list[i].conversation_result.user2_id[0]._id === response.sender_id) {
                    is_in_conversation_list = true;
                    this.conversation_list[i].message = response.message;
                    this.conversation_list[i].conversation_result.is_read = 0;
                    break;
                  }
                }else { // other update conversation_list depend on instant message
                  if (this.conversation_list[i].sender_id === response.sender_id) {
                    is_in_conversation_list = true;
                    this.conversation_list[i].message = response.message;
                    break;
                  }
                }
              }
              if (!is_in_conversation_list) {
                this.conversation_list.unshift(response); // add object to first position
              }
            }

          });

          this.sendAlreadyNotificationConversations();

        }
      });
    }
  }

  /*
    * Method to select the user from the Chat list starts
    */
  selectedUser(user): void {
    this.selectedUserId = user._id;
    this.selectedSocketId = user.socketId;
    this.selectedUserName = user.username;
    this.selectedName = user.name;
    //

    /*
        * calling method to get the messages
        */
    // this.chatService.getMessages({ userId : this.userId, toUserId : user._id} , ( error , response) => {
    //   if (!response.error) {
    //     this.messages = response.messages;
    //   }
    // });

    // this.checkConversation();
    this.router.navigate(['/chatRoom/' + this.selectedUserId]) ;
  }

  selectedUserFromInstantMessage(user): void {
    this.selectedUserId = user.sender_id;
    this.selectedSocketId = user.fromSocketId;
    this.selectedUserName = user.name;
    this.selectedName = user.name;

    // this.checkConversation();
    this.router.navigate(['/chatRoom/' + this.selectedUserId]) ;
  }

  isUserSelected(userId: string): boolean {
    if (!this.selectedUserId) {
      return false;
    }
    return this.selectedUserId ===  userId ? true : false;
  }

  logout() {
    this.socketService.logout({userId : this.userId}).subscribe(response => {
      this.router.navigate(['/']); /* Home page redirection */
    });
  }

  // check if conversation between two users existed or not
  checkConversation() {
    this.chatService.checkConversation({ user1_id : this.userId, user2_id : this.selectedUserId}, (error, response) => {
      if (!error) {
        if (response.message.insert) {
          this.conversation_id = response.conversation_id;
        }else {
          this.conversation_id = response.conversation_id;
          this.messages = response.message;
        }
      }
    });
  }

  // get recent message list
  getConversationList() {
    this.chatService.getConversationList({user_id: this.userId, conversation_amount: 10}, (error, response) => {
      this.conversation_list = response.message;
      for (let i = 0 ; i < this.conversation_list.length ; i++) {
        if (this.conversation_list[i].sender_id !== this.userId && this.conversation_list[i].conversation_result.is_read === 0) {
          this.unread_conversation_list.push(this.conversation_list[i]);
        }
      }
    });
  }

  getMoreConversationList() {
    this.chatService.getConversationList({user_id: this.userId, conversation_amount: this.conversation_list.length + 6}, (error, response) => {
      this.conversation_list = response.message;
    });
  }

  getMoreUnReadConversationList() {
    this.chatService.getConversationList({user_id: this.userId, conversation_amount: this.unread_conversation_list.length + 6}, (error, response) => {
      this.unread_conversation_list.length = 0;
      for (let i = 0 ; i < response.message.length ; i++) {
        if (response.message[i].sender_id !== this.userId && response.message[i].conversation_result.is_read === 0) {
          this.unread_conversation_list.push(response.message[i]);
        }
      }
    });
  }

  sendConversationReply(event) {
    if (event.keyCode === 13) {
      if (this.message === '' || this.message === null) {
        alert(`Message can't be empty.`);
      }else {

        if (this.message === '') {
          alert(`Message can't be empty.`);
        }else if (this.userId === '') {
          this.router.navigate(['/']);
        }else if (this.selectedUserId === '') {
          alert(`Select a user to chat.`);
        }else {

          const data = {
            message : (this.message).trim(),
            sender_id : this.userId,
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
  set_is_unread(is_unread) {
    this.is_unread = is_unread;
    this.conversation_list.length = 0;
    this.unread_conversation_list.length = 0;
    this.getConversationList();
  }
  sendAlreadyNotificationConversations() {
    this.chatService.sendAlreadyNotificationConversations({user_id: this.userId}, (error, response) => {

    });
  }

  timeConverter(time_stamp) {
    return this.general_service.timeConverter(time_stamp);
  }
}
