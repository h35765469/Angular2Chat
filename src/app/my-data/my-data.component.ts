import {AfterViewInit, Component, ElementRef, isDevMode, OnInit, TemplateRef} from '@angular/core';
import {User} from '../shared/user';
import {HttpService} from '../http.service';
import {TalentService} from '../talent.service';
import {NavigationExtras, Router} from '@angular/router';
import {Talent} from '../shared/talent';
import {ChatService} from '../chat.service';
import {Buy} from '../shared/buy';
import {Rate} from '../shared/rate';
import {GeneralService} from '../general.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {BaseComponent} from '../base/base.component';
import {moduleDef} from '@angular/core/src/view';
import {SocketService} from "../socket.service";


@Component({
  selector: 'app-my-data',
  templateUrl: './my-data.component.html',
  styleUrls: ['./my-data.component.css'],
  providers: [HttpService, TalentService, ChatService, GeneralService]
})
export class MyDataComponent implements OnInit {
  user: User;
  user_id: String;
  my_talents: Talent[] = [];
  my_buys: Buy[] = [];
  my_rates: Rate[] = [];
  my_temp_rates: Rate[] = [];
  rates_count = {
    type: 0,
    type1: 0,
    type2: 0,
    type3: 0,
    type4: 0
  };
  /*
    0: show my_talents
    1: show  my_buys
    2: show my_rates
   */
  my_type = 0;
  public modalRef: BsModalRef;
  report_content: String;

  // below for chart
  chart_labels: String[] = ['推', '爽', '鬧', '喔', '幹'];
  chart_datas: any = [{data: [this.rates_count.type, this.rates_count.type1, this.rates_count.type2, this.rates_count.type3, this.rates_count.type4], label: '評價'}];
  chart_type: String = 'radar';
  chart_legend: Boolean = false;

  more_talents = false;
  more_buys = false;
  more_rates = false;

  // below for rate
  rate_type = 0;
  rate_description = '';
  // -------------------

  constructor(
    private elementRef: ElementRef,
    private http_service: HttpService,
    private talent_service: TalentService,
    private chat_service: ChatService,
    private general_service: GeneralService,
    private socket_service: SocketService,
    private modalService: BsModalService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.user_id = localStorage.getItem('user_id');
    if (!this.user_id) {
      this.router.navigate(['/catalog/']);
    }else {
      this.getMyTalents();
      this.getUserData();
      this.getMyBuys();
      this.getMyRates();

      // const s = document.createElement('script');
      // s.type = 'text/javascript';
      // s.innerHTML = 'var linesData = {\n' +
      //   '                labels: ["推", "爽", "喔", "鬧", "幹"],\n' +
      //   '                datasets: [\n' +
      //   '                  {\n' +
      //   '                    label: "評價",\n' +
      //   '                    // fillColor: "rgba(220,0,0,0.5)",\n' +
      //   '                    // strokeColor: "rgba(220,220,220,0.8)",\n' +
      //   '                    // highlightFill: "rgba(220,220,220,0.75)",\n' +
      //   '                    // highlightStroke: "rgba(220,220,220,1)",\n' +
      //   '                    data: [' + '99' + ',' + '66' + ',' + '87' +
      //   ',' + '88' + ',' + '65' + '],\n' +
      //   '                    backgroundColor: \'rgba(220,0,0,0.2)\',\n' +
      //   '                    pointBackgroundColor: \'#ff0000\'\n' +
      //   '                    // pointStyle: \'star\',\n' +
      //   '                  }\n' +
      //   '                ]\n' +
      //   '              };\n' +
      //   '              var options = {\n' +
      //   '                legend: {\n' +
      //   '                  display: false\n' +
      //   '                },\n' +
      //   '                scale: {\n' +
      //   '                  ticks:{\n' +
      //   '                    // beginAtZero: true,\n' +
      //   '                    min: 0,\n' +
      //   '                    max: 100,\n' +
      //   '                    stepSize: 100,\n' +
      //   '                    display: false\n' +
      //   '                  }\n' +
      //   '                }\n' +
      //   '              };\n' +
      //   '              window.onload = function(){\n' +
      //   '                var ctx = document.getElementById("chart-area").getContext("2d");\n' +
      //   '                var myRadar = new Chart(ctx, {\n' +
      //   '                  type: \'radar\',\n' +
      //   '                  data: linesData,\n' +
      //   '                  options: options\n' +
      //   '                });\n' +
      //   '              };';
      // this.elementRef.nativeElement.appendChild(s);
    }
  }


  getUserData(): void {
    this.chat_service.getUserData({user_id: this.user_id}, (error, response) => {
      if (error) {
        alert(response);
      }else {
        if (!response.error) {
          this.user = response.message;
        }else {
        }
      }
    });
  }

  getMyTalents(): void {
    this.talent_service.getMyTalents({user_id: this.user_id}, (error, response) => {
      if (error) {
        alert(response);
      }else {
        if (!response.error) {
          this.my_talents = response.message;
          if (this.my_talents.length === 0) {
            this.more_talents = false;
          }else {
            if (this.my_talents.length % 6 === 0) {
              this.more_talents = true;
            }else {
              this.more_talents = false;
            }
          }
        }else {

        }
      }
    });
  }
  getUserMoreTalents(): void {
    this.talent_service.getUserMoreTalents({user_id: this.user_id, talent_amount: this.my_talents.length + 6}, (error, response) => {
      if (error) {
        alert(response);
      }else {
        if (!response.error) {
          if (this.my_talents.length !== response.message.length) {
            this.my_talents = response.message;
            if (this.my_talents.length === 6) {
              this.more_talents = false;
            }else {
              if (this.my_talents.length % 6 === 0) {
                this.more_talents = true;
              }else {
                this.more_talents = false;
              }
            }
          }else {
            this.more_talents = false;
          }
        }
      }
    });
  }

  getMyBuys(): void {
    this.talent_service.getMyBuys({user_id: this.user_id}, (error, response) => {
      if (error) {
        alert(response);
      }else {
        if (!response.error) {
          this.my_buys = response.message;
          if (this.my_buys.length === 0) {
            this.more_buys = false;
          }else {
            if (this.my_buys.length % 6 === 0) {
              this.more_buys = true;
            }else {
              this.more_buys = false;
            }
          }
        }else {

        }
      }
    });
  }
  getUserMoreBuys(): void {
    this.talent_service.getUserMoreBuys({user_id: this.user_id, buy_amount: this.my_buys.length + 6}, (error, response) => {
      if (error) {
        alert(response);
      }else {
        if (!response.error) {
          if (this.my_buys !== response.message.length) {
            this.my_buys = response.message;
            if (this.my_buys.length === 6) {
              this.more_buys = false;
            }else {
              if (this.my_buys.length % 6 === 0) {
                this.more_buys = true;
              }else {
                this.more_buys = false;
              }
            }
          }else {
            this.more_buys = false;
          }
        }
      }
    });
  }
  getMyRates(): void {
    this.talent_service.getMyRates({user_id: this.user_id}, (error, response) => {
      if (error) {
        alert(response);
      }else {
        if (!response.error) {
          for (let i = 0; i < response.message.length; i++) {
            const user: User = response.message[i].commentator_id[0];
            const talent: Talent = response.message[i].talent_id[0];
            const rate: Rate = {} as Rate;
            rate._id = response.message[i]._id;
            rate.type = response.message[i].type;
            rate.description = response.message[i].description;
            rate.user = user;
            rate.talent = talent;
            this.my_rates.push(rate);
            if (rate.type !== null) {
              switch (rate.type.toString()) {
                case '0':
                  this.rates_count.type++;
                  break;
                case '1':
                  this.rates_count.type1++;
                  break;
                case '2':
                  this.rates_count.type2++;
                  break;
                case '3':
                  this.rates_count.type3++;
                  break;
                case '4':
                  this.rates_count.type4++;
                  break;
              }
            }
          }

          if (this.my_rates.length === 0) {
            this.more_rates = false;
          }else {
            if (this.my_rates.length % 6 === 0) {
              this.more_rates = true;
            }else {
              this.more_rates = false;
            }
          }

          this.chart_datas = [{data: [this.rates_count.type,
                                      this.rates_count.type1,
                                      this.rates_count.type2,
                                      this.rates_count.type3,
                                      this.rates_count.type4], label: '評價'}];
        }
      }
    });
  }

  getUserMoreRates(): void {
    // if (this.my_rates.length > this.my_temp_rates.length + 6) {
    //   this.more_rates = true;
    //   for (let i = this.my_temp_rates.length ; i < this.my_temp_rates.length + 6 ; i++) {
    //     this.my_temp_rates.push(this.my_rates[i]);
    //   }
    // }else {
    //   this.more_rates = false;
    //   for (let i = this.my_temp_rates.length ; i < this.my_rates.length ; i++) {
    //     this.my_temp_rates.push(this.my_rates[i]);
    //   }
    // }
    this.talent_service.getUserMoreRates({user_id: this.user_id, rate_amount: this.my_rates.length + 6}, (error, response) => {
      if (error) {
        alert(response);
      }else {
        if (!response.error) {
          if (this.my_rates.length !== response.message.length) {
            this.my_rates.length = 0;
            for (let i = 0; i < response.message.length; i++) {
              const user: User = response.message[i].commentator_id[0];
              const talent: Talent = response.message[i].talent_id[0];
              const rate: Rate = {} as Rate;
              rate._id = response.message[i]._id;
              rate.type = response.message[i].type;
              rate.description = response.message[i].description;
              rate.user = user;
              rate.talent = talent;
              this.my_rates.push(rate);
              if (rate.type !== null) {
                switch (rate.type.toString()) {
                  case '0':
                    this.rates_count.type++;
                    break;
                  case '1':
                    this.rates_count.type1++;
                    break;
                  case '2':
                    this.rates_count.type2++;
                    break;
                  case '3':
                    this.rates_count.type3++;
                    break;
                  case '4':
                    this.rates_count.type4++;
                    break;
                }
              }
            }

            if (this.my_rates.length === 0) {
              this.more_rates = false;
            }else {
              if (this.my_rates.length % 6 === 0) {
                this.more_rates = true;
              }else {
                this.more_rates = false;
              }
            }

            this.chart_datas = [{data: [this.rates_count.type,
              this.rates_count.type1,
              this.rates_count.type2,
              this.rates_count.type3,
              this.rates_count.type4], label: '評價'}];
          }else {
            this.more_rates = false;
          }
        }
      }
    });
  }

  leaveComment(talent_id, buy_id): void {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        buy_id: buy_id
      }
    };
    this.router.navigate(['/talentRate/' + talent_id], navigationExtras);
  }
  toMyChatRoom(): void {
    this.router.navigate(['/chatHistory/']);
  }
  safeUrl(url) {
    return this.general_service.urlSafe(url);
  }
  public toTalentPreview(talent_id): void {
    this.router.navigate(['/talent/' + talent_id]);
  }

  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  openCommentModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  // report
  report(type_id, type, description) {
    this.modalRef.hide();
    this.general_service.report({type_id: type_id, type: type, description: description, user_id: this.user_id}, (error, response) => {
      if (error) {
        alert(response);
      }else {
        if (!response.error) {
          alert('檢舉成功');
        }else {
          alert('檢舉失敗');
        }
      }
    });
  }
  // set my_type
  setMy_Type(my_type): void {
    this.my_type = my_type;
  }

  // set rate type
  setType(type: number): void {
    this.rate_type = type;
  }

  rateTalent(buy): void {
    const re = /\s|[　]/g; // check user click white space
    if (!this.rate_type) {
      alert('請輸入評價文字');
    }else if (this.rate_description === null || this.rate_description === '' || re.test(this.rate_description)) {
      alert('請輸入評價內容');
    }else {
      // this.talent_service.rateTalent({type: this.rate_type, description: this.rate_description, talent_id: buy.talent_id[0]._id,
      //   user_id: this.user_id, poster_id: buy.talent_id[0].user_id[0], buy_id: buy._id}, (error, result) => {
      //   if (error) {
      //     alert(result);
      //   }else {
      //     if (!result.error) {
      //       alert('rate successfully');
      //       this.modalRef.hide();
      //     }else {
      //       alert('rate failure');
      //     }
      //   }
      // });
      this.socket_service.sendRateReply({type: this.rate_type, description: this.rate_description, talent_id: buy.talent_id[0]._id,
        user_id: this.user_id, poster_id: buy.talent_id[0].user_id[0], buy_id: buy._id});
      alert('rate successfully');
      this.modalRef.hide();
      buy.type = 2;
    }
  }

}
