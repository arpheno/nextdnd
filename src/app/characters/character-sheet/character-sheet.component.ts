import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DefaultDict} from 'pycollections';

interface CharacterParams {
  ability_bonuses: {};
  race: string;
  category: string;
  traits: [{ type: string, name: string }]
  background: string;
  free_choices: { string: [{}] };

}

@Component({
  selector: 'app-character-sheet',
  templateUrl: './character-sheet.component.html',
  styleUrls: ['./character-sheet.component.scss']
})
export class CharacterSheetComponent implements OnInit {
  @Input()
  set alignment(value: any) {
    this._alignment = value || {traits: [], choices: []};
  }

  @Input()
  set klass(value: { traits: any[]; choices: any[] }) {
    this._klass = value || {traits: [], choices: []};
    this.update();
  }

  @Input()
  set bkg(value: any) {
    this._bkg = value || {traits: [], choices: []};
    this.update();
  }
  @Input()
  set race(value: any) {
    this._race = value || {traits: [], choices: []};
    this.ability_bonuses = this._race.ability_bonuses;
    this.update();
  }

  _traits: DefaultDict;
  private _race = {traits: [], choices: [], ability_bonuses:[]};
  private _choices: any[];
  private _klass = {traits: [], choices: []};
  private ability_bonuses: {};
  private _bkg = {traits: [], choices: []};

  ngOnInit() {

  }

  constructor() {
  }

  @Output() choices = new EventEmitter<object>();
  @Output() traits = new EventEmitter<[{ type, name }]>();
  private _alignment: any;
  private traititems: any[];

  update() {
    this._choices = [];
    this._traits = new DefaultDict([].constructor);
    [this._klass, this._bkg, this._race].forEach(x => {
      x.traits.forEach(y => {
        this._traits.get(y.type).push(y);
      });
      x.choices.forEach(y => {
        this._choices.push(y);
      });
    });
    // this._choices.forEach(x => {
    //   console.log(JSON.stringify(character.free_choices));
    //   if (Object.entries(character.free_choices).length > 0 && character.free_choices[x.name] && character.free_choices[x.name].length > 0) {
    //     console.log(character.free_choices[x.name]);
    //     let chosen = character.free_choices[x.name];
    //     chosen.forEach(x => {
    //
    //       this._traits.get(x.type).push(x);
    //     });
    //   } else {
    //     this._traits.get('choice').push(x);
    //   }
    this.choices.emit(this._choices);
    this.traits.emit(this._traits.items());

    this.traititems = [...this._traits.items()]

  }
}
