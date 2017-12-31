import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TalentPostComponent } from './talent-post.component';

describe('TalentPostComponent', () => {
  let component: TalentPostComponent;
  let fixture: ComponentFixture<TalentPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TalentPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TalentPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
