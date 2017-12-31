import { Injectable } from '@angular/core';
import {HttpService} from './http.service';


@Injectable()
export class TalentService {

  constructor(private http_service: HttpService) { }

  // method to post talent
  public postTalent(params, callback): any {
    this.http_service.postTalent(params).subscribe(
      response => {
        callback(false, response);
      },
      error => {
        callback(true, '上傳失敗');
      }
    );
  }

  // method to edit talent
  public editTalent(params, callback): any {
    this.http_service.editTalent(params).subscribe(
      response => {
        callback(false, response);
      },
      error => {
        callback(true, 'Http failed');
      }
    );
  }
  // mehtod to get all talents
  public getAllTalents(params, callback): any {
    this.http_service.getAllTalents(params).subscribe(
      response => {
        callback(false, response);
      },
      error => {
        callback(true, 'Http failed');
      }
    );
  }
  // method to get talent
  public getTalent(params, callback): any {
    this.http_service.getTalent(params).subscribe(
      response => {
        callback(false, response);
      },
      error => {
        callback(true, 'Http failed');
      }
    );
  }
  // method to get my talents
  public getMyTalents(params, callback): any {
    this.http_service.getMyTalents(params).subscribe(
      response => {
        callback(false, response);
      },
      error => {
        callback(true, 'Http failed');
      }
    );
  }
  // method to delete talent
  public deleteTalent(params, callback): any {
    this.http_service.deleteTalent(params).subscribe(
      response => {
        callback(false, response);
      },
      error => {
        callback(true, 'Http failed');
      }
    );
  }
  // method to rate talent
  public rateTalent(params, callback): any {
    this.http_service.rateTalent(params).subscribe(
      response => {
        callback(false, response);
      },
      error => {
        callback(true, 'Http faied');
      }
    );
  }
  // method to get talent rates
  public getTalentRates(params, callback): any {
    this.http_service.getTalentRates(params).subscribe(
      response => {
        callback(false, response);
      },
      error => {
        callback(true, 'Http failed');
      }
    );
  }
  // method to buyTalent
  public buyTalent(params, callback): any {
    this.http_service.buyTalent(params).subscribe(
      response => {
        callback(false, response);
      },
      error => {
        callback(true, 'Http failed');
      }
    );
  }
  // method to get my buys
  public getMyBuys(params, callback): any {
    this.http_service.getMyBuys(params).subscribe(
      response => {
        callback(false, response);
      },
      error => {
        callback(true, 'Http failed');
      }
    );
  }
  // method to get my rates
  public getMyRates(params, callback): any {
    this.http_service.getMyRates(params).subscribe(
      response => {
        callback(false, response);
      },
      error => {
        callback(true, 'Http failed');
      }
    );
  }
  // methdo to get search talents
  public getSearchTalents(params, callback): any {
    this.http_service.getSearchTalents(params).subscribe(
      response => {
        callback(false, response);
      },
      error => {
        callback(true, 'Http failed');
      }
    );
  }
  // method to load more talents
  public getMoreTalents(params, callback): any {
    this.http_service.getMoreTalents(params).subscribe(
      response => {
        callback(false, response);
      },
      error => {
        callback(true, 'Http failed');
      }
    );
  }
  // method to load more talents of user
  public getUserMoreTalents(params, callback): any {
    this.http_service.getUserMoreTalents(params).subscribe(
      response => {
        callback(false, response);
      },
      error => {
        callback(true, 'Http failed');
      }
    );
  }
  // method to load more buys of user
  public getUserMoreBuys(params, callback): any {
    this.http_service.getUserMoreBuys(params).subscribe(
      response => {
        callback(false, response);
      },
      error => {
        callback(true, 'Http failed');
      }
    );
  }
  // method to load more rates of user
  public getUserMoreRates(params, callback): any {
    this.http_service.getUserMoreRates(params).subscribe(
      response => {
        callback(false, response);
      },
      error => {
        callback(true, 'Http failed');
      }
    );
  }
  // method to get buys from talent
  public getTalentBuys(params, callback): any {
    this.http_service.getTalentBuys(params).subscribe(
      response => {
        callback(false, response);
      },
      error => {
        callback(true, 'Http failed');
      }
    )
  }
}
