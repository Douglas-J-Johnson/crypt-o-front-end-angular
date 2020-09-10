import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-exhanges',
  templateUrl: './exhanges.component.html',
  styleUrls: ['./exhanges.component.css']
})
export class ExhangesComponent{
  @Input('exchanges') exchanges: [];
  // @Output() click = new EventEmitter();

  public setSelected(index): void {
    this.exchanges[index].isSelected = !this.exchanges[index].isSelected
  }
}
