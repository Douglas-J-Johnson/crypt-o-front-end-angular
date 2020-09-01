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

  ngOnInit(): void {
    this.quotesService.getExchanges()
      .subscribe(response => {
        this.exchanges = response;
        this.exchanges.forEach(exchange => {
          this.exchangeRequests[exchange] = this.quotesService.getSymbols(`${exchange}`);
        });

        const symbolObservable = forkJoin(this.exchangeRequests);
        symbolObservable.subscribe({
          next: value => console.log(value)
        });
      });
  }

}
