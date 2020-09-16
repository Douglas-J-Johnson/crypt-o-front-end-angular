import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-exhanges',
  templateUrl: './exhanges.component.html',
  styleUrls: ['./exhanges.component.css']
})
export class ExhangesComponent{
  @Input('exchanges') exchanges: any;
  @Output() click = new EventEmitter();

  public setSelected($event, index): void {
    $event.stopPropagation();
    this.exchanges[index]['isSelected'] = !this.exchanges[index]['isSelected'];
    this.click.emit(index);
  }

  public selectedCount(): number {
    let selected = 0;

    this.exchanges.forEach(element => {
      if (element.isSelected) {
        selected += 1;
      }
    });

    return selected;
  }
}
