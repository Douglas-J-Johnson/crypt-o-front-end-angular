import { PortfolioComponent } from './../portfolio/portfolio.component';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-currencies',
  templateUrl: './currencies.component.html',
  styleUrls: ['./currencies.component.css']
})
export class CurrenciesComponent {
  @Input() filteredCurrenciesCount: number;
  @Input() currencies: [];
  @Input() portfolioAllocations: [];
  @Input() displayMax: number;
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
    this.addCurrencyToPortfolio.emit(this.currencies[index]['id']);
  }

  public inPortfolio(index: number): boolean {
    const currencyID = this.currencies[index]['id'];
    let found = false;

    this.portfolioAllocations.forEach(portfolioCurrency => {
      if (portfolioCurrency['id'] === currencyID) {
        found = true;
      }
    });

    return found;
  }
}
