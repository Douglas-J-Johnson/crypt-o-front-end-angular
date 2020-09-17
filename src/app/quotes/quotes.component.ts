import { QuotesService } from './../quotes.service';
import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.css']
})
export class QuotesComponent implements OnInit {
  public exchanges = [];
  public rawCurrencies: [];
  public baseCurrencyFilteredCurrencies: [];
  public filteredCurrencies: [];
  public searchTerm = '';

  private exchangeRequests = {};

  constructor(private quotesService: QuotesService) { }

  private filterCurrenciesByBaseCurrency(currencies, baseCurrency: string): any {
    baseCurrency = baseCurrency.toLowerCase();
    const currenciesFilteredByBaseCurrency = {};

    Object.keys(currencies).forEach(exchange => {
      const exchangeCurrencies = [];

      currencies[exchange].forEach(currency => {
        const displaySymbol: string = currency.displaySymbol;

        if (displaySymbol.toLowerCase().includes(baseCurrency)) {
          exchangeCurrencies.push(currency);
        }
      });

      if (exchangeCurrencies.length > 0) {
        currenciesFilteredByBaseCurrency[exchange] = exchangeCurrencies;
      }
    });

    return currenciesFilteredByBaseCurrency;
  }

  private filterCurrenciesByExchange(currencies): any {
    const filtered = {};

    this.exchanges.forEach(exchange => {
      if (exchange.isSelected) {
        filtered[exchange.name] = currencies[exchange.name];
      }
    });

    return filtered;
  }

  private filterCurrenciesByKeyword(currencies): any {
    const filtered = {};

    if (this.searchTerm === '') {
      return currencies;
    }
    else {
      // this.exchanges.forEach(exchange => {
      //   if (exchange.isSelected) {
      //     filtered[exchange.name] = currencies[exchange.name];
      //   }
      // });
    }

    return filtered;
  }

  private filterCurrencies(): any {
    console.log(this.baseCurrencyFilteredCurrencies);
    this.filteredCurrencies = this.filterCurrenciesByExchange(this.baseCurrencyFilteredCurrencies);
    console.log(this.filteredCurrencies);
    this.filteredCurrencies = this.filterCurrenciesByKeyword(this.filteredCurrencies);
    console.log(this.filteredCurrencies);
  }

  public toggleExhange(): void {
    this.filterCurrencies();
  }

  ngOnInit(): void {
    this.quotesService.getExchanges()
      .subscribe(response => {
        response.forEach(exchange => {
          const exchangeName = exchange.toString();
          this.exchanges.push({name: exchangeName, isSelected: true});
          this.exchangeRequests[exchangeName] = this.quotesService.getCurrencies(exchangeName);
        });

        const currencyObservable = forkJoin(this.exchangeRequests);
        currencyObservable.subscribe({
          next: currencies => {
            this.rawCurrencies = currencies;
          },
          complete: () => {
            this.baseCurrencyFilteredCurrencies = this.filterCurrenciesByBaseCurrency(this.rawCurrencies, 'USD');
            this.filteredCurrencies = this.baseCurrencyFilteredCurrencies;
            // console.log('Exchanges', this.exchanges);
            // console.log('Raw Currencies', this.rawCurrencies);
            // console.log('Filterd Currencies', this.baseCurrencyFilteredCurrencies);
          },
        });
      });
  }
}
