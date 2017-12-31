import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchCatalogResultComponent } from './search-catalog-result.component';

describe('SearchCatalogResultComponent', () => {
  let component: SearchCatalogResultComponent;
  let fixture: ComponentFixture<SearchCatalogResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchCatalogResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchCatalogResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
