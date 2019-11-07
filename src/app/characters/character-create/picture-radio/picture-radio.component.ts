import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatRadioChange} from '@angular/material';

@Component({
  selector: 'app-picture-radio',
  templateUrl: './picture-radio.component.html',
  styleUrls: ['./picture-radio.component.scss']
})
export class PictureRadioComponent implements OnInit {
  private _gormgroup: any;
  private _choices: any;

  constructor() {
  }

  @Output() change = new EventEmitter<object>();
  @Input() prefix: string;

  @Input()
  set choices(choices: [{ name, description: { main, chapters } }]) {
    this._choices = choices;
  }

  get choices() {
    return this._choices;
  }

  @Input()
  set gormgroup(gorm) {
    this._gormgroup = gorm;
  }

  get gormgroup() {
    return this._gormgroup;
  }

  ngOnInit() {
  }

  onChange(event: MatRadioChange) {
    console.log(event);
    this.change.emit(event);
  }

}
