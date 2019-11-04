import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CharacterService} from '../character.service';
// @ts-ignore
import * as background_choices from '../../../assets/raws/backgrounds.json';
import {connectableObservableDescriptor} from 'rxjs/internal/observable/ConnectableObservable';
import {MatSelectChange} from '@angular/material';

@Component({
  selector: 'app-character-create',
  templateUrl: './character-create.component.html',
  styleUrls: ['./character-create.component.scss']
})
export class CharacterCreateComponent implements OnInit {
  private firstFormGroup: FormGroup;
  private race_choices: string[];
  background_choices: object[];
  private alignment_choices: string[];
  private class_choices: string[];
  private background_descriptions: {};
  private free_choices: [];
  private traits: [{ name, type }];

  constructor(private _formBuilder: FormBuilder,
              private characterService: CharacterService) {
  }

  ngOnInit() {
    this.getRaceChoices();
    this.getBackgroundChoices();
    this.getAlignmentChoices();
    this.getClassChoices();
    this.firstFormGroup = this._formBuilder.group({
      name: ['', Validators.required],
      race: ['', Validators.required],
      background: ['', Validators.required],
      alignment: ['', Validators.required],
      category: ['', Validators.required],
      scores: this._formBuilder.group({ // make a nested group
        str: ['', [Validators.required]],
        dex: ['', [Validators.required]],
        con: ['', [Validators.required]],
        int: ['', [Validators.required]],
        wis: ['', [Validators.required]],
        cha: ['', [Validators.required]],
      }),
      free_choices: this._formBuilder.group([])

    });
  }

  getRaceChoices() {
    this.race_choices = ['human', 'dwarf', 'elf', 'half orc', 'half elf', 'gnome', 'halfling', 'tiefling', 'dragonborn'];
  }

  getBackgroundChoices() {
    this.background_choices = background_choices.default;
    this.background_descriptions = {};
    this.background_choices.forEach(x => {
      // @ts-ignore
      this.background_descriptions[x.name] = x.description;
    });
    console.log(this.background_descriptions);
  }

  getClassChoices() {
    this.class_choices = [
      'Bard',
      'Cleric',
      'Rogue',
      'Barbarian', 'Fighter', 'Paladin',
      'Ranger', 'Wizard', 'Sorcerer',
      'Warlock', 'Druid', 'Monk'

    ];

  }

  getAlignmentChoices() {
    this.alignment_choices = [
      'Lawful good',
      'Neutral good',
      'Chaotic good',
      'Lawful neutral',
      'Neutral Neutral',
      'Chaotic neutral',
      'Lawful evil',
      'Neutral evil',
      'Chaotic evil'
    ];

  }

  onTraits(traits) {
    this.traits = traits;
  }

  onFreeChoices(choices) {
    let carray = this._formBuilder.group([]);
    let so_far = this.firstFormGroup.get('free_choices');
    this.firstFormGroup.setControl('free_choices', carray);
    choices.forEach(x => {
      let control = so_far.get(x.name) || new FormControl([], [Validators.required, Validators.maxLength(x.choose)]);
      carray.addControl(x.name, control);
    });
    this.free_choices = choices;
  }

  onSubmit() {
    const derived = {
      traits: this.traits.items().flatMap(x => {
        return x[1];
      })
    };
    const submission = {...this.firstFormGroup.value, ...derived};
    this.characterService.characterCreate(submission).subscribe();
  }

  onFreechoiceselection(selected, settings) {

  }
}
