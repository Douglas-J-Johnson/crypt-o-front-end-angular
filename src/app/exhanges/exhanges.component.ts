import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-exhanges',
  templateUrl: './exhanges.component.html',
  styleUrls: ['./exhanges.component.css']
})
export class ExhangesComponent  implements OnInit, OnChanges{
  @Input('exchanges') exchanges: any;
  @Output() click = new EventEmitter();
  public allAreSelected: boolean;
  public noneAreSelected: boolean;

  public setSelected($event, index: number): void {
    $event.stopPropagation();
    this.exchanges[index]['isSelected'] = !this.exchanges[index]['isSelected'];
    this.click.emit(index);
  }

  public setBulkSelection(bulkSelection: string): void {
    console.log(bulkSelection);
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

  ngOnInit(): void {
    console.log('OnInit', this.selectedCount());
  }

  ngOnChanges(): void {
    console.log('OnChanges', this.selectedCount());
  }
}
