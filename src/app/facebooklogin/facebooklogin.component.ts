import { Component, OnInit } from '@angular/core';
import {GeneralService} from '../general.service';
import {Router} from '@angular/router';
import {HttpService} from '../http.service';
import {ChatService} from '../chat.service';
import {SocketService} from '../socket.service';
declare const FB: any;

@Component({
  selector: 'app-facebooklogin',
  templateUrl: './facebooklogin.component.html',
  styleUrls: ['./facebooklogin.component.css'],
  providers: [GeneralService, HttpService, ChatService, SocketService],
})
export class FacebookloginComponent implements OnInit {
  token: any;
  hide_facebook_logout = true;

  constructor(
    private general_service: GeneralService,
    private chat_service: ChatService,
    private socket_service: SocketService,
    private router: Router
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
  }

  onFacebookLoginClick() {
    // FB.login((result: any) => {
    //   this.token = result;
    // }, {scope: 'email'});
    FB.login((response: any) => {
      if (response.status === 'connected') {
        this.me(response.authResponse.userID, response.authResponse.accessToken);
        this.hide_facebook_logout = false;
        // Logged into your app and Facebook.
      } else if (response.status === 'not_authorized') {
        // The person is logged into Facebook, but not your app.
      } else {

        // The person is not logged into Facebook, so we're not sure if
        // they are logged into this app or not.
      }
    }, {scope: 'user_friends, email, public_profile'});
  }

  onFacebookLogoutClick() {
    FB.getLoginStatus((response) => {
      if (response.status === 'connected') {
        FB.logout((response) => {
          localStorage.removeItem('profile');
          localStorage.removeItem('name');
          localStorage.removeItem('is_login');
          localStorage.removeItem('user_id');
          localStorage.removeItem('user_type');
          this.hide_facebook_logout = true;
        });
      }
    });
  }

  me(userId, accessToken) {
    FB.api(
      '/' + userId + '?fields=id,name,first_name,last_name, email, gender,picture.width(150).height(150),age_range,friends',
      (result) => {
        console.log('result===', result);
        if (result && !result.error) {
          this.facebookLogin(result);
          console.log(result.id + ' ' + result.picture.data.url + ' ' + result.name );
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
          localStorage.setItem('user_id', response.user_id);
          localStorage.setItem('name', facebook_data.name);
          localStorage.setItem('profile', facebook_data.picture.data.url);
          localStorage.setItem('is_login', 'y');
          localStorage.setItem('user_type', 'fb');
          this.chat_service.userSessionCheck(response.user_id, (error, user_session_check_response) => {
            if (error) {

            } else {
              /*
                * making socket connection by passing UserId.
                */
              // this.socket_service.connectSocket(response.user_id);
              this.router.navigate(['/catalog/']);
            }
          });
        }
      }
    });
  }
}
