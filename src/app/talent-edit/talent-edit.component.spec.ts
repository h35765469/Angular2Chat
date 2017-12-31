import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TalentEditComponent } from './talent-edit.component';

describe('TalentEditComponent', () => {
  let component: TalentEditComponent;
  let fixture: ComponentFixture<TalentEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TalentEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TalentEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
