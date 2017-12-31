import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacebookloginComponent } from './facebooklogin.component';

describe('FacebookloginComponent', () => {
  let component: FacebookloginComponent;
  let fixture: ComponentFixture<FacebookloginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacebookloginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacebookloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
