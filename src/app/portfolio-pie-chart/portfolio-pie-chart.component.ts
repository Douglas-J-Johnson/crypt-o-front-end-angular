import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-portfolio-pie-chart',
  templateUrl: './portfolio-pie-chart.component.html',
  styleUrls: ['./portfolio-pie-chart.component.css']
})
export class PortfolioPieChartComponent implements OnInit {
  @Input('allocations') allocations: {};

  constructor() { }

  ngOnInit(): void {
  }

}
