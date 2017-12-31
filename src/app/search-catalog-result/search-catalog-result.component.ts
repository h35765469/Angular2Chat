import { Component, OnInit } from '@angular/core';
import {HttpService} from '../http.service';
import {TalentService} from '../talent.service';
import {Talent} from '../shared/talent';
import {ActivatedRoute, Router} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import {BaseComponent} from "../base/base.component";

@Component({
  selector: 'app-search-catalog-result',
  templateUrl: './search-catalog-result.component.html',
  styleUrls: ['./search-catalog-result.component.css'],
  providers: [HttpService, TalentService]
})
export class SearchCatalogResultComponent extends BaseComponent implements OnInit {
  talents: Talent[];
  private user_id;
  search_word: string;
  result_word;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private talent_service: TalentService,
    private sanitizer: DomSanitizer
  ) {
    super();
  }

  ngOnInit() {
    this.user_id = localStorage.getItem('user_id');
    this.search_word = this.route.snapshot.params['search_word'];
    this.result_word = this.search_word;
    this.getSearchTalents();
  }

  public showTalentPreview(talent_id): void {
    this.router.navigate(['/talent/' + talent_id]);
  }

  public getSearchTalents(): void {
    this.talent_service.getSearchTalents({search_word: this.search_word}, (error, response) => {
      this.talents = response.message;
    });
  }

  public getMoreSearchTalents(): void {

  }

  // make url safe
  urlSafe(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  public toSearchCatalogResult(event) {
    if (event.keyCode === 13) {
      if (this.search_word !== '' && this.search_word !== null) {
        this.getSearchTalents();
        this.result_word = this.search_word;
      }
    }
  }



}
