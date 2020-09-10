import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-exhanges',
  templateUrl: './exhanges.component.html',
  styleUrls: ['./exhanges.component.css']
})
export class ExhangesComponent{
  @Input('exchanges') exchanges: [];
  @Input('currencies') currencies: [];

  public setSelected(): void {
    console.log('toggle');
  }
}
