import { QuotesService } from './../quotes.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.css']
})
export class QuotesComponent implements OnInit {

  constructor(private quotesService: QuotesService) { }

  ngOnInit(): void {
    this.quotesService.getExchanges()
      .subscribe(response => {
        console.log('Exchanges:', response);
      });
  }

}
