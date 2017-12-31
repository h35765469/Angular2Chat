 import {AfterViewInit, Component, ElementRef, OnInit} from '@angular/core';
 import {SocketService} from '../socket.service';
 import {HttpService} from '../http.service';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css'],
  providers: [SocketService, HttpService]
})
export class BaseComponent implements OnInit {
  socket_service: SocketService;

  constructor() {}

  ngOnInit() {
  }

}
