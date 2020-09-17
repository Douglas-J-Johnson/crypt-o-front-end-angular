import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-currencies',
  templateUrl: './currencies.component.html',
  styleUrls: ['./currencies.component.css']
})
export class CurrenciesComponent {
  @Input('currencies') currencies: [];
  @Input('displayMax') displayMax: number;

}
