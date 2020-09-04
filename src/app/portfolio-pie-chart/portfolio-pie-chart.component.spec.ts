import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioPieChartComponent } from './portfolio-pie-chart.component';

describe('PortfolioPieChartComponent', () => {
  let component: PortfolioPieChartComponent;
  let fixture: ComponentFixture<PortfolioPieChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortfolioPieChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortfolioPieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
