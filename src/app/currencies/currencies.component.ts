import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-currencies',
  templateUrl: './currencies.component.html',
  styleUrls: ['./currencies.component.css']
})
export class CurrenciesComponent {
  @Input('filteredCurrenciesCount') filteredCurrenciesCount: number;
  @Input('currencies') currencies: [];
  @Input('displayMax') displayMax: number;
  @Output() click = new EventEmitter();

  public currenciesToList(): boolean {
    if (!this.currencies) { return false; }
    else {
      if (this.filteredCurrenciesCount > 0) { return true; }
      else { return false; }
    }
  }

  public displayCurrencies(): boolean {
    if (this.filteredCurrenciesCount <= this.displayMax) { return true; }
    else { return false; }
  }

  public addToPortfolio($event, index: number): void {
    $event.stopPropagation();
    this.click.emit(this.currencies[index].id);
  }
}
