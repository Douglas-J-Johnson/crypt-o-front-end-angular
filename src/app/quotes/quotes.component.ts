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
  public symbols: [];
  public filteredSymbols: [];
  private exchangeRequests = {};

  constructor(private quotesService: QuotesService) { }

  private flattenSymbolsList(symbols: {}): any {
    const flattenedSymbolsList = [];

    Object.keys(symbols).forEach (exchange => {
      const exchangeSymbols = symbols[exchange];
      exchangeSymbols.forEach(exchangeSymbol => {
        const flattenedSymbol = exchangeSymbol;
        flattenedSymbol['exchange'] = exchange;
        flattenedSymbolsList.push(flattenedSymbol);
      });
    });

    return flattenedSymbolsList;
  }

  private filterSymbolByCurrency(symbols: [], currency: string): any {
    currency = currency.toLowerCase();
    const symbolsFilteredByCurrency = [];

    symbols.forEach(symbol => {
      const displaySymbol: string = symbol.displaySymbol;

      if (displaySymbol.toLowerCase().includes(currency)) {
        symbolsFilteredByCurrency.push(symbol);
      }
    });

    return symbolsFilteredByCurrency;
  }

  ngOnInit(): void {
    this.quotesService.getExchanges()
      .subscribe(response => {
        this.exchanges = response;
        this.exchanges.forEach(exchange => {
          this.exchangeRequests[exchange] = this.quotesService.getSymbols(`${exchange}`);
        });

        const symbolObservable = forkJoin(this.exchangeRequests);
        symbolObservable.subscribe({
          next: value => this.symbols = this.flattenSymbolsList(value),
          complete: () => {
            this.filteredSymbols = this.filterSymbolByCurrency(this.symbols, 'USD');
          },
        });
      });
  }

}
