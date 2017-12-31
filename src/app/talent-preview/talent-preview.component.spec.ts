import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TalentPreviewComponent } from './talent-preview.component';

describe('TalentPreviewComponent', () => {
  let component: TalentPreviewComponent;
  let fixture: ComponentFixture<TalentPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TalentPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TalentPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
