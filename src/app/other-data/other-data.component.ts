import {Component, ElementRef, OnInit, TemplateRef} from '@angular/core';
import {ChatService} from '../chat.service';
import {TalentService} from '../talent.service';
import {HttpService} from '../http.service';
import {User} from '../shared/user';
import {Talent} from '../shared/talent';
import {Rate} from '../shared/rate';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {ActivatedRoute, Router} from '@angular/router';
import {GeneralService} from '../general.service';
import {BaseComponent} from "../base/base.component";

@Component({
  selector: 'app-other-data',
  templateUrl: './other-data.component.html',
  styleUrls: ['./other-data.component.css'],
  providers: [ChatService, TalentService, HttpService, GeneralService]
})
export class OtherDataComponent extends BaseComponent implements OnInit {
  user_id: String;
  user: User;
  other_talents: Talent[] = [];
  other_rates: Rate[] = [];
  rates_count = {
    type: 0,
    type1: 0,
    type2: 0,
    type3: 0,
    type4: 0
  };
  /*
    0: show my_talents
    1: show my_rates
   */
  other_type = 0;
  public modalRef: BsModalRef;
  report_content: String;

  // below for chart
  chart_labels: String[] = ['推', '爽', '喔', '鬧', '幹'];
  chart_datas: any = [{data: [this.rates_count.type, this.rates_count.type1, this.rates_count.type2, this.rates_count.type3, this.rates_count.type4], label: '評價'}];
  chart_type: String = 'radar';
  chart_legend: Boolean = false;

  more_talents = false;

  constructor(
    private elementRef: ElementRef,
    private chat_service: ChatService,
    private talent_service: TalentService,
    private general_service: GeneralService,
    private modalService: BsModalService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    super();
  }

  ngOnInit() {
    this.user_id = this.route.snapshot.params['user_id'];
    this.getUserData();
    this.getOtherTalents();
    this.getOtherRates();
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

  getOtherTalents(): void {
    this.talent_service.getMyTalents({user_id: this.user_id}, (error, response) => {
      if (error) {
        alert(response);
      }else {
        if (!response.error) {
          this.other_talents = response.message;
          if (this.other_talents.length === 0) {
            this.more_talents = false;
          }else {
            if (this.other_talents.length % 6 === 0) {
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

  getOtherMoreTalents(): void {
    this.talent_service.getUserMoreTalents({user_id: this.user_id, talent_amount: this.other_talents.length + 20}, (error, response) => {
      if (error) {
        alert(response);
      }else {
        if (!response.error) {
          this.other_talents = response.message;
        }
      }
    });
  }

  getOtherRates(): void {
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
            this.other_rates.push(rate);
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
          //   '                    data: [' + this.rates_count.type + ',' + this.rates_count.type1 + ',' + this.rates_count.type2 +
          //   ',' + this.rates_count.type3 + ',' + this.rates_count.type4 + '],\n' +
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
    });
  }

  safeUrl(url) {
    return this.general_service.urlSafe(url);
  }
  public openModal(template: TemplateRef<any>) {
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
  setOther_Type(other_type): void {
    this.other_type = other_type;
  }

  toTalentPreview(talent_id) {
    this.router.navigate(['/talent/' + talent_id]);
  }

}
