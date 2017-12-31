import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TalentRateComponent } from './talent-rate.component';

describe('TalentRateComponent', () => {
  let component: TalentRateComponent;
  let fixture: ComponentFixture<TalentRateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TalentRateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TalentRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
