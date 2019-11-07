import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
// @ts-ignore
import * as background_choices from '../../../assets/raws/backgrounds.json';
import {DefaultDict} from 'pycollections';
// @ts-ignore
import * as races from '../../../assets/raws/5e-SRD-Races.json';
// @ts-ignore
import * as classes from '../../../assets/raws/5e-SRD-Classes.json';

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
  public races: object;
  private backgrounds: [{name}];
  private _character: CharacterParams;
  private _traits: DefaultDict;
  private race: any;
  private _choices: any[];
  private classes: {};
  private klass: any;
  private ability_bonuses: {};
  private bkg: any;

  constructor() {
  }

  @Output() choices = new EventEmitter<object>();
  @Output() traits = new EventEmitter<[{ type, name }]>();

  @Input()
  set character(character: CharacterParams) {
    this._choices = [];
    this._traits = new DefaultDict([].constructor);
    this.ability_bonuses = {};
    if (character.race) {
      this.race = this.races[(this.transform_race(character.race))];
      this.ability_bonuses = this.race.ability_bonuses;
      this.race.traits.forEach(x => {
        this._traits.get(x.type).push(x);
      });
      this.race.choices.forEach(x => {
        this._choices.push(x);
      });
    }
    if (character.category) {
      this.klass = this.classes[(this.transform_race(character.category))];
      this.klass.traits.forEach(x => {
        this._traits.get(x.type).push(x);
      });
      this.klass.choices.forEach(x => {
        this._choices.push(x);
      });

    }
    if (character.background) {
      this.bkg = this.backgrounds.find(obj=>{return obj.name==character.background});
      this.bkg.traits.forEach(x => {
        this._traits.get(x.type).push(x);
      });
      this.bkg.choices.forEach(x => {
        this._choices.push(x);
      });
    }
    this._choices.forEach(x => {
      console.log(JSON.stringify(character.free_choices));
      if (Object.entries(character.free_choices).length > 0 && character.free_choices[x.name] && character.free_choices[x.name].length > 0) {
        console.log(character.free_choices[x.name]);
        let chosen = character.free_choices[x.name];
        chosen.forEach(x => {

          this._traits.get(x.type).push(x);
        });
      } else {
        this._traits.get('choice').push(x);
      }
    });
    this.choices.emit(this._choices);
    this.traits.emit(this._traits.items());
    this._character = character;

  }

  private transform_race(race: string) {
    return race.toLowerCase().replace(' ', '_');
  }

  get character(): CharacterParams {
    return this._character;
  }


  ngOnInit() {
    this.races = races.default;
    this.classes = {};
    classes.default.forEach(x => {
      this.classes[x.name] = x;
    });

    this.backgrounds = background_choices.default
  }

}
