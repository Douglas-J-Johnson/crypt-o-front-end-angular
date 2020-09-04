import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-exhanges',
  templateUrl: './exhanges.component.html',
  styleUrls: ['./exhanges.component.css']
})
export class ExhangesComponent implements OnInit {
  @Input('exchanges') exchanges: [];

  constructor() { }

  ngOnInit(): void {
  }

}
