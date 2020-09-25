import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent {
  @Input() allocations: [];
  @Output() removeCurrencyFromPortfolio = new EventEmitter();

  public zeroAllocation(): boolean {
    // let returnValue = true;

    // if (this.allocations.length > 0) {
    //   returnValue = false;
    // }

    // console.log(returnValue);
    // return returnValue;
    return false;
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
}
