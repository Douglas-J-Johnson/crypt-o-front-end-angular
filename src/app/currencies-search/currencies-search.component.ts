import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-currencies-search',
  templateUrl: './currencies-search.component.html',
  styleUrls: ['./currencies-search.component.css']
})
export class CurrenciesSearchComponent {
  @Input('filteredCurrenciesCount') filteredCurrenciesCount: number;
}
