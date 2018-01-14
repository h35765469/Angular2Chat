import {AfterViewInit, Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import { Talent } from '../shared/talent';
import { TalentService } from '../talent.service';
import { HttpService } from '../http.service';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {Rate} from '../shared/rate';
import {User} from '../shared/user';
import {GeneralService} from '../general.service';
import {Image} from '../shared/image';
import {DomSanitizer} from '@angular/platform-browser';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {BaseComponent} from '../base/base.component';
import {SocketService} from "../socket.service";


@Component({
  selector: 'app-talent-preview',
  templateUrl: './talent-preview.component.html',
  styleUrls: ['./talent-preview.component.css'],
  providers: [HttpService, TalentService, GeneralService, SocketService]
})
export class TalentPreviewComponent implements OnInit {
  talent: Talent;
  talent_rates: Rate[] = [];
  talent_images: Image[] = [];
  talent_buys = [];
  talent_id;
  user_id = null;
  count: number = 1;
  report_content: String;
  public modalRef: BsModalRef;
  rates_count = {
    type: 0,
    type1: 0,
    type2: 0,
    type3: 0,
    type4: 0
  };

  selectedImage;

  // below for chart
  chart_labels: String[] = ['推', '爽', '喔', '鬧', '幹'];
  chart_datas: any = [{data: [this.rates_count.type, this.rates_count.type1, this.rates_count.type2, this.rates_count.type3, this.rates_count.type4], label: '評價'}];
  chart_type: String = 'radar';
  chart_legend: Boolean = false;

  constructor(
    private elementRef: ElementRef,
    private talent_service: TalentService,
    private general_service: GeneralService,
    private socket_service: SocketService,
    private activated_route: ActivatedRoute,
    private modalService: BsModalService,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {
  }

  ngOnInit() {
    this.addScriptTagBySrc('../../assets/js/slideshow.js');
    this.user_id = localStorage.getItem('user_id');
    this.talent_id = this.activated_route.snapshot.params['talent_id'];
    this.getTalent(this.talent_id);
    this.getTalentRates();
    this.getTalentsBuys();
  }
  // mehthod to get talent
  getTalent(talent_id) {
    this.talent_service.getTalent({talent_id: talent_id}, (error, result) => {
      this.talent = result.message;
      const user: User = <User>{};
      user._id = result.message.user._id;
      user.username = result.message.user.username;
      user.name = result.message.user.name;
      user.socketId = result.message.user.socketId;
      user.profile = result.message.user.profile;
      this.talent.user = user;
      this.talent_images = result.message.files_name;
      this.selectedImage = this.talent_images[0];
    });
  }
  // method to buy the talent
  buyTalent() {
    this.modalRef.hide();
    if (this.count === 0 || this.count === null) {
      alert('數量不能為空');
    }else {
      // this.talent_service.buyTalent({talent_id: this.talent_id, user_id: this.user_id, receiver_id: this.talent.user._id, count: this.count, money: this.talent.money}, (error, response) => {
      //   if (error) {
      //     alert(response.message);
      //   }else {
      //     if (!response.error) {
      //       // let navigationExtras: NavigationExtras = {
      //       //   queryParams: {
      //       //     buy_id: response.message.buy_id
      //       //   }
      //       // };
      //       // this.router.navigate(['/talentRate/' + this.talent_id], navigationExtras);
      //       alert('購買確認,等待賣家回覆');
      //     }else {
      //       alert('購買失敗');
      //     }
      //   }
      // });
      this.socket_service.sendBuyTalent({talent_id: this.talent_id, user_id: this.user_id, receiver_id: this.talent.user._id, count: this.count, money: this.talent.money});
    }
  }

  // method to get rates
  getTalentRates() {
    this.talent_service.getTalentRates({talent_id: this.talent_id}, (error, response) => {
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
            this.talent_rates.push(rate);
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

            // this.addScriptTag('var linesData = {\n' +
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
            //   '              };');

            this.chart_datas = [{data: [this.rates_count.type,
              this.rates_count.type1,
              this.rates_count.type2,
              this.rates_count.type3,
              this.rates_count.type4], label: '評價'}];
          }
        }
      }
    });
  }
  // method to get talents buys
  getTalentsBuys() {
    this.talent_service.getTalentBuys({talent_id: this.talent_id, talent_buy_amount: 6}, (error, response) => {
      if (error) {

      }else {
        if (!response.error) {
          this.talent_buys = response.message;
        }
      }
    });
  }

  // method to get more talents buys
  getMoreTalentsBuys() {
    this.talent_service.getTalentBuys({talent_id: this.talent_id, talent_buy_amount: this.talent_buys.length + 6}, (error, response) => {
      if (error) {

      }else {
        if (!response.error) {
          this.talent_buys = response.message;
        }
      }
    });
  }

  sendBuyReply(buy_id, talent, buyer_id, type) {
    this.socket_service.sendBuyReply(buy_id, talent, buyer_id, type);
    this.modalRef.hide();
  }

  // method to chat room
  toChatRoom() {
    if (localStorage.getItem('user_id')) {
      this.router.navigate(['/chatRoom/' + this.talent.user._id]);
    }else {
      alert('請登入會員,方可洽談才能');
    }
  }
  toMyData() {
    this.router.navigate(['/myData/']) ;
  }
  toCatalog() {
    this.router.navigate(['/catalog/']);
  }
  toOtherData(user_id): void {
    this.router.navigate(['/otherData/' + user_id]);
  }
  toEditMyTalent(talent_id): void {
    this.router.navigate(['/talentEdit/' + talent_id]);
  }

  // report
  report(type_id, type, description) {
    this.modalRef.hide();
    this.general_service.report({type_id: type_id, type: type, description: description}, (error, response) => {
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



  // make url safe
  urlSafe(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  // open dialog
  public openModal(template: TemplateRef<any>) {
    if (localStorage.getItem('user_id')) {
      this.modalRef = this.modalService.show(template);
    }else {
      alert('請登入會員');
    }
  }

  public openTalentBuyModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    this.getTalentsBuys();
  }
  public addScriptTag(innerHTML) {
    const s = document.createElement('script');
    s.type = 'text/javascript';
    s.innerHTML = innerHTML;

    this.elementRef.nativeElement.appendChild(s);
  }
  public addScriptTagBySrc(src) {
    const s = document.createElement('script');
    s.type = 'text/javascript';
    s.src = src;
    this.elementRef.nativeElement.appendChild(s);
  }

  // for slide show
  navigate(forward) {
    const index = this.talent_images.indexOf(this.selectedImage) + (forward ? 1 : -1);
    if (index >= 0 && index < this.talent_images.length) {
      this.selectedImage = this.talent_images[index];
    }
  }

  timeConverter(time_stamp) {
    return this.general_service.timeConverter(time_stamp);
  }
}
