import { Component, OnInit } from '@angular/core';
import { Talent } from '../shared/talent';
import { Router } from '@angular/router';
import { HttpService} from '../http.service';
import { TalentService} from '../talent.service';
import {BaseComponent} from '../base/base.component';
import {DomSanitizer} from '@angular/platform-browser';
import {InfiniteScroll} from 'angular2-infinite-scroll';


@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: [
    './catalog.component.css'
  ],
  providers: [HttpService, TalentService, InfiniteScroll],
})
export class CatalogComponent  extends BaseComponent implements OnInit {
  talents: Talent[];
  private user_id;
  search_word: String;
  is_loading = false;
  constructor(
    private router: Router,
    private talent_service: TalentService,
    private sanitizer: DomSanitizer
  ) {
    super();
  }

  ngOnInit() {
    this.user_id = localStorage.getItem('user_id');
    this.getAllTalents();
  }

  public showTalentPreview(talent_id): void {
    this.router.navigate(['/talent/' + talent_id]);
  }
  public getAllTalents(): void {
    this.talent_service.getAllTalents({}, (error, response) => {
      this.talents = response.message;
    });
  }

  // make url safe
  urlSafe(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  public toSearchCatalogResult(event) {
    if (event.keyCode === 13) {
      if (this.search_word !== '' && this.search_word !== null) {
       this.router.navigate(['/searchCatalogResult/' + this.search_word]);
     }
    }
  }

  public getMoreTalents(): void {
    // if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight ) {
      this.is_loading = true;
      this.talent_service.getMoreTalents({talent_amount: this.talents.length + 20}, (error, response) => {
        setTimeout( () => {
          this.is_loading = false;
          this.talents = response.message;
        }, 2000);
      });
    // }
  }
}
