import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-trait',
  templateUrl: './trait.component.html',
  styleUrls: ['./trait.component.scss']
})
export class TraitComponent implements OnInit {
  @Input() t: any;

  constructor() {
  }

  ngOnInit() {
  }

}
