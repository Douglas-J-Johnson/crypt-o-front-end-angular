import { QuotesService } from './../quotes.service';
import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.css']
})
export class QuotesComponent implements OnInit {
  public exchanges: string[];
  public currencies: [];
  public filteredCurrencies: [];
  private exchangeRequests = {};

  constructor(private quotesService: QuotesService) { }

  private flattenCurrenciesList(currencies: {}): any {
    const flattenedCurrenciesList = [];

    Object.keys(currencies).forEach (exchange => {
      const exchangeCurrencies = currencies[exchange];
      exchangeCurrencies.forEach(currency => {
        const flattenedCurrency = currency;
        flattenedCurrency['exchange'] = exchange;
        flattenedCurrenciesList.push(flattenedCurrency);
      });
    });

    return flattenedCurrenciesList;
  }

  private filterCurrencyByBaseCurrency(currencies: [], baseCurrency: string): any {
    baseCurrency = baseCurrency.toLowerCase();
    const currenciesFilteredByBaseCurrency = [];

    currencies.forEach(currency => {
      const displaySymbol: string = currency['displaySymbol'];

      if (displaySymbol.toLowerCase().includes(baseCurrency)) {
        currenciesFilteredByBaseCurrency.push(currency);
      }
    });

    return currenciesFilteredByBaseCurrency;
  }

  ngOnInit(): void {
    this.quotesService.getExchanges()
      .subscribe(response => {
        this.exchanges = response;
        this.exchanges.forEach(exchange => {
          this.exchangeRequests[exchange] = this.quotesService.getCurrencies(`${exchange}`);
        });

        const currencyObservable = forkJoin(this.exchangeRequests);
        currencyObservable.subscribe({
          next: value => this.currencies = this.flattenCurrenciesList(value),
          complete: () => {
            this.filteredCurrencies = this.filterCurrencyByBaseCurrency(this.currencies, 'USD');
          },
        });
      });
  }

}
