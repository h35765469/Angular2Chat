import { Component, OnInit } from '@angular/core';
import { HttpService} from '../http.service';
import { TalentService} from '../talent.service';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../shared/user';
import {Talent} from '../shared/talent';
import {BaseComponent} from "../base/base.component";

@Component({
  selector: 'app-talent-rate',
  templateUrl: './talent-rate.component.html',
  styleUrls: ['./talent-rate.component.css'],
  providers: [HttpService, TalentService]
})
export class TalentRateComponent extends BaseComponent implements OnInit {
  type: number;
  description: String;
  talent_id: String;
  buy_id: String;
  user_id: String;
  talent: Talent;

  constructor(
    private http_service: HttpService,
    private talent_service: TalentService,
    private activated_route: ActivatedRoute,
    private router: Router
  ) {
    super();
  }

  ngOnInit() {
    this.talent_id = this.activated_route.snapshot.params['talent_id'];
    this.activated_route.queryParams.subscribe(params => {
      this.buy_id = params['buy_id'];
    });
    this.user_id = localStorage.getItem('user_id');
    this.getTalent(this.talent_id);
  }
  rateTalent(): void {
    if (!this.type) {
      alert('請輸入評價文字');
    }else if (this.description === null || this.description === '') {
      alert('請輸入評價內容');
    }else {
      this.talent_service.rateTalent({type: this.type, description: this.description, talent_id: this.talent_id,
        user_id: this.user_id, poster_id: this.talent.user._id, buy_id: this.buy_id}, (error, result) => {
        if (error) {
          alert(result);
        }else {
          if (!result.error) {
            alert('rate successfully');
            this.router.navigate(['/catalog/']);
          }else {
            alert('rate failure');
          }
        }
      });
    }
  }
  setType(type: number): void {
    this.type = type;
  }

  getTalent(talent_id) {
    this.talent_service.getTalent({talent_id: talent_id}, (error, result) => {
      this.talent = result.message;
      let user: User = <User>{};
      user._id = result.message.user._id;
      user.username = result.message.user.username;
      user.socketId = result.message.user.socketId;
      this.talent.user = user;
    });
  }
}
