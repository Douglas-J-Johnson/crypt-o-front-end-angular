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
  public portfolioAllocations = [];

  public searchText = '';
  public baseCurrency = 'USD';
  public filteredCurrenciesCount = 0;

  private exchangeRequests = {};

  constructor(private quotesService: QuotesService) { }

  private addCurrencyIndex(): void {
    const currencies = this.rawCurrencies;
    const appendedAttributesCurrencies = {};
    let id = 1;

    Object.keys(currencies).forEach(exchange => {
      const exchangeCurrencies = [];

      currencies[exchange].forEach(currency => {
        currency.id = id;
        id += 1;
        exchangeCurrencies.push(currency);
      });

      if (exchangeCurrencies.length > 0) {
        appendedAttributesCurrencies[exchange] = exchangeCurrencies;
      }
    });

    this.rawCurrencies = appendedAttributesCurrencies;
  }

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

  private flattenFilteredCurrencies(): void {
    const currencies = this.filteredCurrencies;
    const flattenedCurrencies = [];

    Object.keys(currencies).forEach(exchange => {
      currencies[exchange].forEach(currency => {
        flattenedCurrencies.push(currency);
      });
    });

    this.flattenedFilteredCurrencies = flattenedCurrencies;
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
    this.filterCurrenciesByExchange();
    this.filterCurrenciesBySearchText();
    this.flattenFilteredCurrencies();
    this.countCurrencies();
  }

  public toggleExhange(index: number): void {
    console.log('Toggle Exchange', index);
    this.exchanges[index].isSelected = !this.exchanges[index].isSelected;
    this.filterCurrencies();
  }

  public bulkSelectExchanges(scope: string): void {
    console.log('Bulk Select', scope);
    let selectedValue = true;

    if (scope === 'selectAll') {
      selectedValue = true;
    }
    else if (scope === 'selectNone') {
      selectedValue = false;
    }
    else {
      return;
    }

    for (let i = 0; i < this.exchanges.length; i++) {
      this.exchanges[i].isSelected = selectedValue;
    }

    this.filterCurrencies();
  }

  public searchCurrencies(searchText: string): void {
    console.log('Search Currencies', searchText);
    this.searchText = searchText;
    this.filterCurrencies();
  }

  public sortPortfolioAllocations(): void {
    const portfolioAllocations = this.portfolioAllocations;
    const sortedPortfolioAllocations = [];
    const descriptions = [];
    const descriptionsMap = {};
    let counter = 0;

    for (let i = 0; i < portfolioAllocations.length; i++) {
      const portfolioAllocation = portfolioAllocations[i];
      descriptions.push(portfolioAllocation.description.toLowerCase());
      descriptionsMap[portfolioAllocation.description.toLowerCase()] = i;
    }

    console.log('Map', descriptionsMap);

    descriptions.sort();
    descriptions.forEach(description => {
      const index = descriptionsMap[description];
      sortedPortfolioAllocations[counter] = portfolioAllocations[index];
      counter += 1;
    });

    this.portfolioAllocations = sortedPortfolioAllocations;
  }

  public addCurrencyToPortfolio(index: number): void {
    console.log('Add a currency to portfolio', index);
    let targetCurrency = {};

    this.flattenedFilteredCurrencies.forEach(currency => {
      if (currency.id === index) {
        targetCurrency = currency;
      }
    });

    targetCurrency['allocation'] = 0.00;
    this.portfolioAllocations.push(targetCurrency);
    this.sortPortfolioAllocations();
    console.log(this.portfolioAllocations);
  }

  ngOnInit(): void {
    this.quotesService.getExchanges()
      .subscribe(response => {
        response.sort();
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
            this.addCurrencyIndex();
            this.filterCurrenciesByBaseCurrency();
            this.filterCurrencies();
            console.log('Exchanges', this.exchanges);
            console.log('Raw Currencies', this.rawCurrencies);
            console.log('Filterd Currencies by Base Currency', this.baseCurrencyFilteredCurrencies);
            console.log('Filtered Currencies', this.filteredCurrencies);
            console.log('Filtered Currencies Count', this.filteredCurrenciesCount);
          },
        });
      });
  }
}
