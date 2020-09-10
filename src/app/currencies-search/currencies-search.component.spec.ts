import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrenciesSearchComponent } from './currencies-search.component';

describe('CurrenciesSearchComponent', () => {
  let component: CurrenciesSearchComponent;
  let fixture: ComponentFixture<CurrenciesSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrenciesSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrenciesSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
