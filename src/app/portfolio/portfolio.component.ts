import { Component, EventEmitter, Input, Output, OnInit, OnChanges } from '@angular/core';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit, OnChanges {
  @Input() allocations: [];
  @Output() removeCurrencyFromPortfolio = new EventEmitter();
  public currencyAllocations: Array<number> = [];
  public currencyNames: Array<string> = [];

  public graphLayout = {};

  public isZeroAllocation(index: number): boolean {
    if (this.allocations[index]['allocation'] === 0) {
      return true;
    }
    else {
      return false;
    }
  }

  public getCurrencyAllocations(): void {
    const currencyAllocations: Array<number> = [];
    const allocations = this.allocations;

    if(this.incompleteAllocation()) {
      currencyAllocations.push(100 - this.totalAllocation());
    }

    for (let i = 0; i < allocations.length; i++) {
      currencyAllocations.push(allocations[i]['allocation']);
    }

    console.log('Allocations -->', currencyAllocations);
    this.currencyAllocations = currencyAllocations;
  }

  public getCurrencyNames(): void {
    const currencyNames: Array<string> = [];
    const allocations = this.allocations;

    if(this.incompleteAllocation()) {
      currencyNames.push('UNALLOCATED');
    }

    for (let i = 0; i < allocations.length; i++) {
      currencyNames.push(allocations[i]['symbol']);
    }

    console.log('Names -->', currencyNames);
    this.currencyNames = currencyNames;
  }

  public removeCurrency($event: Event, index: number): void {
    $event.stopPropagation();
    this.removeCurrencyFromPortfolio.emit(index);
  }

  public totalAllocation(): number {
    let totalAllocation = 0;

    this.allocations.forEach(allocation => {
      totalAllocation += allocation['allocation'];
    });

    return totalAllocation;
  }

  public incompleteAllocation(): boolean {
    if (this.allocations.length > 0) {
      if (this.totalAllocation() === 100) {
        return false;
      }
      else {
        return true;
      }
    }
    else {
      return false;
    }
  }

  public updatePercent(): void {
    console.log('Percent Update');
    this.getCurrencyAllocations();
    this.getCurrencyNames();
  }

  ngOnInit(): void {
    console.log('Init');
    this.getCurrencyAllocations();
    this.getCurrencyNames();
  }

  ngOnChanges(): void {
    console.log('Change');
    this.getCurrencyAllocations();
    this.getCurrencyNames();
  }
}
