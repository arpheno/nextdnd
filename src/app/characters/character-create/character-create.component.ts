import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
// @ts-ignore
import * as background_choices from '../../../assets/raws/backgrounds.json';

@Component({
  selector: 'app-character-create',
  templateUrl: './character-create.component.html',
  styleUrls: ['./character-create.component.scss']
})
export class CharacterCreateComponent implements OnInit {
  private firstFormGroup: FormGroup;
  private race_choices: string[];
  background_choices: any;
  private alignment_choices: string[];

  constructor(private _formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.getRaceChoices();
    this.getBackgroundChoices();
    this.getAlignmentChoices();
    this.firstFormGroup = this._formBuilder.group({
      name: ['', Validators.required],
      race: ['', Validators.required],
      background: ['', Validators.required],
      alignment: ['', Validators.required],
      class: ['', Validators.required]
    });
  }

  getRaceChoices() {
    this.race_choices = ['human', 'dwarf', 'elf', 'half orc', 'half elf', 'gnome', 'halfling', 'tiefling', 'dragonborn'];
  }

  getBackgroundChoices() {
    this.background_choices = background_choices.default;
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

  onSubmit() {
    console.warn(this.firstFormGroup.value);
  }
}
