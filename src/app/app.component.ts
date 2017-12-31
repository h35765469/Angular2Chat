import {Component, OnInit, TemplateRef} from '@angular/core';
import {Router} from '@angular/router';
import {GeneralService} from './general.service';
import {ChatService} from './chat.service';
import {HttpService} from './http.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {SocketService} from './socket.service';
import {NotificationService} from './notification.service';
declare const FB: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [GeneralService, ChatService, HttpService, SocketService, NotificationService],
})
export class AppComponent implements OnInit {
  title = 'app';
  public modalRef: BsModalRef;
  user_id = localStorage.getItem('user_id');
  is_login = localStorage.getItem('is_login');
  profile = localStorage.getItem('profile');
  unnotification_conversations = [];
  notifications = [];
  message_come = false;
  talent_notification_come = false;

  constructor(
    private router: Router,
    private general_service: GeneralService,
    private chat_service: ChatService,
    private modalService: BsModalService,
    private socket_service: SocketService,
    private notification_service: NotificationService
  ) {
    FB.init({
      appId      : '401033070321043',
      cookie     : false,  // enable cookies to allow the server to access
      // the session
      xfbml      : true,  // parse social plugins on this page
      version    : 'v2.8' // use graph api version 2.5
    });
  }

  ngOnInit() {
    if (this.user_id !== '' && this.user_id !== null) {
      this.socket_service.connectSocket(this.user_id);
      this.getUnNotificationConversations();

      this.socket_service.remindConversationReplies().subscribe(response => {
        this.message_come = true;
      });

      // receive the talent_notification
      this.socket_service.receiveTalentNotification().subscribe(response => {
        this.talent_notification_come = true;
        this.getUserNotifications();
      });


      this.getUserNotifications();
    }
  }
  public fbLogout() {
    FB.getLoginStatus((response) => {
      if (response.status === 'connected') {
        FB.logout((response) => {
          this.is_login = null;
          localStorage.removeItem('profile');
          localStorage.removeItem('name');
          localStorage.removeItem('is_login');
          localStorage.removeItem('user_id');
          localStorage.removeItem('user_type');
        });
      }
    });
  }

  public generalLogout() {
    this.is_login = null;
    localStorage.removeItem('profile');
    localStorage.removeItem('name');
    localStorage.removeItem('is_login');
    localStorage.removeItem('user_id');
    localStorage.removeItem('user_type');
    this.user_id = null;
    this.router.navigate(['/catalog/']);
  }

  onFacebookLoginClick() {
    // FB.login((result: any) => {
    //   this.token = result;
    // }, {scope: 'email'});
    FB.login((response: any) => {
      if (response.status === 'connected') {
        this.me(response.authResponse.userID, response.authResponse.accessToken);
        // Logged into your app and Facebook.
      } else if (response.status === 'not_authorized') {
        // The person is logged into Facebook, but not your app.
      } else {

        // The person is not logged into Facebook, so we're not sure if
        // they are logged into this app or not.
      }
    }, {scope: 'user_friends, email, public_profile'});
  }

  me(userId, accessToken) {
    FB.api(
      '/' + userId + '?fields=id,name,first_name,last_name, email, gender,picture.width(150).height(150),age_range,friends',
      (result) => {
        console.log('result===', result);
        if (result && !result.error) {
          this.facebookLogin(result);
        }
      });
  }

  facebookLogin(facebook_data) {
    this.general_service.facebookLogin({username: facebook_data.id, password: 'fb',
      profile: facebook_data.picture.data.url, name: facebook_data.name}, (error, response) => {
      if (error) {
        console.log(response);
      }else {
        if (!response.error) {
          this.is_login = 'y';
          localStorage.setItem('user_id', response.user_id);
          localStorage.setItem('name', facebook_data.name);
          localStorage.setItem('profile', facebook_data.picture.data.url);
          localStorage.setItem('is_login', 'y');
          localStorage.setItem('user_type', 'fb');
          this.chat_service.userSessionCheck(response.user_id, (error, user_session_check_response) => {
            if (error) {
              alert('登入失敗,請重新登入');
            } else {
              this.modalRef.hide();
              this.general_service.reloadPage();
            }
          });
        }
      }
    });
  }

  // open login dialog
  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  openNotificationModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    this.talent_notification_come = false;
    this.getUserNotificationInModal();

    this.notification_service.sendAlreadyReadNotifications({user_id: this.user_id}, (error, response) => {
      if (error) {
      }else {
      }
    });
  }

  // get the amount of conversations  that you don`t read
  public getUnNotificationConversations() {
    this.chat_service.getUnNotificationConversations({user_id: this.user_id}, (error, response) => {
      if (error) {
      }else {
        this.unnotification_conversations = response.message;
        if (this.unnotification_conversations.length > 0) {
          this.message_come = true;
        }
      }
    });
  }

  // get all notification
  public getUserNotifications() {
    this.notification_service.getUserNotifications({user_id: this.user_id}, (error, response) => {
      if (error) {

      }else {
        this.notifications = response.message;
        if (this.notifications.length > 0) {
          if (this.notifications[0].is_read === 0) {
            this.talent_notification_come = true;
          }
        }
      }
    });
  }

  public getMoreUserNotifications() {
  }
  public getUserNotificationInModal() {
    this.notification_service.getUserNotifications({user_id: this.user_id}, (error, response) => {
      if (error) {

      }else {
        this.notifications = response.message;
      }
    });
  }

  public toTalentPreview(talent_id): void {
    this.router.navigate(['/talent/' + talent_id]);
    this.modalRef.hide();
    this.general_service.reloadPage();
  }

  toMyData(): void {
    this.router.navigate(['/myData/']);
    this.modalRef.hide();
    this.general_service.reloadPage();
  }
  toChatHistory(): void {
    this.message_come = false;
    this.router.navigate(['/chatHistory/']);
  }


  urlSafe(url) {
    return this.general_service.urlSafe(url);
  }

  timeConverter(time_stamp) {
    return this.general_service.timeConverter(time_stamp);
  }

}
