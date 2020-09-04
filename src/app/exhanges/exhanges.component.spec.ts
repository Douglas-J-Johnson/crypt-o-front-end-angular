import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExhangesComponent } from './exhanges.component';

describe('ExhangesComponent', () => {
  let component: ExhangesComponent;
  let fixture: ComponentFixture<ExhangesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExhangesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExhangesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
