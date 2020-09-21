import { PortfolioComponent } from './../portfolio/portfolio.component';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-currencies',
  templateUrl: './currencies.component.html',
  styleUrls: ['./currencies.component.css']
})
export class CurrenciesComponent {
  @Input('filteredCurrenciesCount') filteredCurrenciesCount: number;
  @Input('currencies') currencies: [];
  @Input('portfolioCurrencies') portfolioCurrencies: {};
  @Input('displayMax') displayMax: number;
  @Output() addCurrencyToPortfolio = new EventEmitter();

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

  public addToPortfolio($event: Event, index: number): void {
    $event.stopPropagation();
    this.addCurrencyToPortfolio.emit(this.currencies[index].id);
  }

  public inPortfolio(index: number): boolean {
    return (this.portfolioCurrencies[this.currencies[index].id]);
  }
}
