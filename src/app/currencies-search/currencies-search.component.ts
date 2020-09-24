import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-currencies-search',
  templateUrl: './currencies-search.component.html',
  styleUrls: ['./currencies-search.component.css']
})
export class CurrenciesSearchComponent {
  @Input() filteredCurrenciesCount: number;
  @Input() searchText: string;
  @Output() searchCurrencies = new EventEmitter();

  public search($event): void {
    $event.stopPropagation();
    this.searchCurrencies.emit(this.searchText);
  }
}
