import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
  // public allocations: [];
  public allocations = [
    {
      symbol: 'crypto 1',
      cryptoCurrencyValue: 0.005,
      baseCurrencyValue: 75,
      initialBaseCurrencyCost: 50
    },
    {
      symbol: 'crypto 2',
      cryptoCurrencyValue: 0.5,
      baseCurrencyValue: 45,
      initialBaseCurrencyCost: 50
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
