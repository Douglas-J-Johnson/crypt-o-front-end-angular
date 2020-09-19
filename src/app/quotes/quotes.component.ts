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

  public searchText = '';
  public filteredCurrenciesCount = 0;

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

  private filterCurrenciesBySearchText(currencies, searchText: string): any {
    const filtered = {};
    searchText = searchText.toLowerCase();

    if (this.searchText === '') {
      return currencies;
    }
    else {
      Object.keys(currencies).forEach(exchange => {
        const matchingCurrencies = [];

        currencies[exchange].forEach(currency => {
          const currencySymbol = currency.symbol.toLowerCase();
          if (currencySymbol.includes(searchText)) {
            matchingCurrencies.push(currency);
          }
        });

        if (matchingCurrencies.length > 0) {
          filtered[exchange] = matchingCurrencies;
        }
      });
    }

    return filtered;
  }

  private countCurrencies(currencies): number {
    let count = 0;

    Object.keys(currencies).forEach(exchange => {
      count += currencies[exchange].length;
    });

    return count;
  }

  private filterCurrencies(): any {
    this.filteredCurrencies = this.filterCurrenciesByExchange(this.baseCurrencyFilteredCurrencies);
    this.filteredCurrencies = this.filterCurrenciesBySearchText(this.filteredCurrencies, this.searchText);
    this.filteredCurrenciesCount = this.countCurrencies(this.filteredCurrencies);
  }

  public toggleExhange($event): void {
    console.log('Filter by exchanges');
    this.filterCurrencies();
  }

  public searchCurrencies(searchText): void {
    console.log('Filter by search text', searchText);
    this.searchText = searchText;
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
            this.filteredCurrenciesCount = this.countCurrencies(this.filteredCurrencies);
            // console.log('Exchanges', this.exchanges);
            // console.log('Raw Currencies', this.rawCurrencies);
            // console.log('Filterd Currencies', this.baseCurrencyFilteredCurrencies);
          },
        });
      });
  }
}
