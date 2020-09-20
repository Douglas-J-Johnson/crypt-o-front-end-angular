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
  public rawCurrencies = {};
  public baseCurrencyFilteredCurrencies = {};
  public filteredCurrencies = {};
  public flattenedFilteredCurrencies = [];

  public searchText = '';
  public baseCurrency = 'USD';
  public filteredCurrenciesCount = 0;

  private exchangeRequests = {};

  constructor(private quotesService: QuotesService) { }

  private filterCurrenciesByBaseCurrency(): void {
    const baseCurrency = this.baseCurrency.toLowerCase();
    const currencies = this.rawCurrencies;
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

    this.baseCurrencyFilteredCurrencies = currenciesFilteredByBaseCurrency;
  }

  private filterCurrenciesByExchange(): void {
    const currencies = this.baseCurrencyFilteredCurrencies;
    const filtered = {};

    this.exchanges.forEach(exchange => {
      if (exchange.isSelected) {
        filtered[exchange.name] = currencies[exchange.name];
      }
    });

    this.filteredCurrencies = filtered;
  }

  private filterCurrenciesBySearchText(): void {
    const currencies = this.filteredCurrencies;
    const searchText = this.searchText.toLowerCase();

    let filtered = {};

    if (this.searchText === '') {
      filtered = currencies;
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

    this.filteredCurrencies = filtered;
  }

  private countCurrencies(): void {
    const currencies = this.filteredCurrencies;
    let count = 0;

    Object.keys(currencies).forEach(exchange => {
      count += currencies[exchange].length;
    });

    this.filteredCurrenciesCount = count;
  }

  private filterCurrencies(): void {
    console.log('Start Filter', this.filteredCurrencies);
    this.filterCurrenciesByExchange();
    console.log('After Exchanges', this.filteredCurrencies);
    this.filterCurrenciesBySearchText();
    console.log('After Search Text', this.filteredCurrencies);
    this.countCurrencies();
  }

  public toggleExhange($event): void {
    this.filterCurrencies();
  }

  public searchCurrencies(searchText): void {
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
            this.filterCurrenciesByBaseCurrency();
            this.filterCurrencies();
            // console.log('Exchanges', this.exchanges);
            // console.log('Raw Currencies', this.rawCurrencies);
            // console.log('Filterd Currencies by Base Currency', this.baseCurrencyFilteredCurrencies);
            // console.log('Filtered Currencies', this.filterCurrencies);
            // console.log('Filtered Currencies Count', this.filteredCurrenciesCount);
          },
        });
      });
  }
}
