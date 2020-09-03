import { QuotesService } from './../quotes.service';
import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { exhaust } from 'rxjs/operators';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.css']
})
export class QuotesComponent implements OnInit {
  private exchanges: string[];
  private exchangeSymbols: {};
  private exchangeRequests = {};

  constructor(private quotesService: QuotesService) { }

  private flattenSymbolsList(symbols: {}): any {
    const flattenedSymbols = [];

    Object.keys(symbols).forEach (exchange => {
      const exchangeSymbols = symbols[exchange];
      exchangeSymbols.forEach(exchangeSymbol => {
        const flattenedSymbol = exchangeSymbol;
        flattenedSymbol['exchange'] = exchange;
        flattenedSymbols.push(flattenedSymbol);
      });
    });

    return flattenedSymbols;
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
          next: value => this.exchangeSymbols = this.flattenSymbolsList(value),
          complete: () => {
            console.log('Quotes Exchanges:', this.exchanges);
            console.log('Quotes Symbols:', this.exchangeSymbols);
          },
        });
      });
  }

}
