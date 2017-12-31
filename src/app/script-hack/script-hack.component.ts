import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {InfiniteScroll} from 'angular2-infinite-scroll';

@Component({
  selector: 'app-script-hack',
  templateUrl: './script-hack.component.html',
  styleUrls: ['./script-hack.component.css'],
  providers: [InfiniteScroll],
})
export class ScriptHackComponent implements AfterViewInit {
  ngAfterViewInit() {
    console.log('scrolled down!!');
  }

  onScrollDown () {
    console.log('scrolled down!!');
  }
}
