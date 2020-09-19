import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-currencies-search',
  templateUrl: './currencies-search.component.html',
  styleUrls: ['./currencies-search.component.css']
})
export class CurrenciesSearchComponent {
  @Input('filteredCurrenciesCount') filteredCurrenciesCount: number;
  @Input('searchText') searchText: string;
  @Output() input = new EventEmitter();

  public search($event): void {
    $event.stopPropagation();
    this.input.emit(this.searchText);
  }
}
