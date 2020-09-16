import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-exhanges',
  templateUrl: './exhanges.component.html',
  styleUrls: ['./exhanges.component.css']
})
export class ExhangesComponent{
  @Input('exchanges') exchanges: any;
  @Output() click = new EventEmitter();
  public allAreSelected: boolean;
  public noneAreSelected: boolean;

  public setSelected($event: Event, index: number): void {
    $event.stopPropagation();
    this.exchanges[index]['isSelected'] = !this.exchanges[index]['isSelected'];
    this.click.emit(index);
  }

  public setBulkSelection($event: Event, bulkSelectionAction: string): void {
    $event.stopPropagation();

    if (bulkSelectionAction === 'selectAll' && !this.allAreSelected) {
      for (let i = 0; i < this.exchanges.length; i++) {
        this.exchanges[i].isSelected = true;
      }
    }
    if (bulkSelectionAction === 'selectNone' && !this.noneAreSelected) {
      for (let i = 0; i < this.exchanges.length; i++) {
        this.exchanges[i].isSelected = false;
      }
    }
  }

  public selectedCount(): number {
    let total = 0;
    let selected = 0;

    this.exchanges.forEach(element => {
      total += 1;
      if (element.isSelected) {
        selected += 1;
      }
    });

    selected === 0 ? this.noneAreSelected = true : this.noneAreSelected = false;
    selected === total ? this.allAreSelected = true : this.allAreSelected = false;

    return selected;
  }
}
