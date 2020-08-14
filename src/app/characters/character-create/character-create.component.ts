import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {CharacterService} from '../character.service';
import {Howl} from 'howler';


import {MatDialog, MatRadioChange, MatSelectChange} from '@angular/material';
import {GreeterComponent} from '../greeter/greeter.component';
import {alignments} from '../../../assets/raws/alignments';
import {backgrounds} from '../../../assets/raws/backgrounds';
import {races} from '../../../assets/raws/5e-SRD-Races';
import {classes} from '../../../assets/raws/5e-SRD-Classes';

const ScoreValidator: ValidatorFn = (fg: FormGroup) => {
  const current_scores = new Set(['str', 'dex', 'con', 'int', 'wis', 'cha'].map(x => fg.get(x).value));
  const should_have = new Set([15, 14, 13, 12, 10, 8]);
  const compareSet = new Set([...current_scores, ...should_have]);
  const isSetEqual = compareSet.size === current_scores.size && compareSet.size === current_scores.size;
  return isSetEqual ? null : {range: true};
};

@Component({
  selector: 'app-character-create',
  templateUrl: './character-create.component.html',
  styleUrls: ['./character-create.component.scss']
})
export class CharacterCreateComponent implements OnInit {
  private firstFormGroup: FormGroup;
  private race_choices: any;
  background_choices: any;
  private alignment_choices: any;
  private class_choices: any;
  private free_choices: [];
  private traits: [{ type: string, name: string }];
  private alignment: { name, description };
  private category: {
    hit_die: number;
    name, description
  };
  private background: { name, description, characteristics };
  private race: {
    speed: string;
    name; description: { main; chapters }, ability_bonuses };

  constructor(private _formBuilder: FormBuilder,
              private characterService: CharacterService,
              public dialog: MatDialog
  ) {
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
      personality_trait: ['', Validators.required],
      flaw: ['', Validators.required],
      ideal: ['', Validators.required],
      bond: ['', Validators.required],
      alignment: ['', Validators.required],
      category: ['', Validators.required],
      scores: this._formBuilder.group({ // make a nested group
        str: [10, [Validators.required]],
        dex: [10, [Validators.required]],
        con: [10, [Validators.required]],
        int: [10, [Validators.required]],
        wis: [10, [Validators.required]],
        cha: [10, [Validators.required]],
      }, {validator: ScoreValidator}),
      free_choices: this._formBuilder.group([])

    });
    this.openDialog();
  }

  getRaceChoices() {
    this.race_choices = races;
  }

  getBackgroundChoices() {
    this.background_choices = backgrounds;
  }

  getClassChoices() {
    // @ts-ignore
    this.class_choices = classes;
  }

  getAlignmentChoices() {
    this.alignment_choices = alignments;
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
    let stat_to_modifier = [ -5, -5, -4, -4, -3, -3, -2, -2, -1, -1, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 10, 10, ]

    let scores = {...this.firstFormGroup.controls.scores.value};
    for (const [key, value] of Object.entries(this.race.ability_bonuses)) {
      scores[key] = scores[key] + value;
    }
    console.log(this.firstFormGroup);
    const derived = {
      scores: scores,
      traits: [...this.traits.flatMap(x => { return x[1]; }),...Object.values(this.firstFormGroup.value.free_choices).flat()],
      max_hitpoints: this.category.hit_die + stat_to_modifier[scores.con],
      speed:this.race.speed
    };
    const submission = {...this.firstFormGroup.value, ...derived};
    console.log(submission)
    this.characterService.characterCreate(submission).subscribe();
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(GreeterComponent, {
      width: '350px',
    });

    dialogRef.afterClosed().subscribe(result => {
      var list = [
        'assets/character_create.mp3',
        'assets/character_create2.mp3',
        'assets/character_create3.mp3',
        'assets/character_create4.mp3',
      ];

      function autoplay(i, list) {
        var sound = new Howl({
          src: [list[i]],
          preload: true,
          onend: function() {
            if ((i + 1) == list.length) {
              autoplay(0, list);
            } else {
              autoplay(i + 1, list);
            }
          }
        });
        sound.play();
      }

      autoplay(0, list);
    });
  }

  onTraits(traits) {
    console.log(traits);
    this.traits = traits;
  }

  onAlignnmentChange(event: MatRadioChange) {
    this.alignment = this.alignment_choices.find(obj => {
      return obj.name == this.firstFormGroup.controls.alignment.value;
    });

  }

  onClassChange(event: MatRadioChange) {
    this.category = this.class_choices.find(obj => {
      return obj.name == this.firstFormGroup.controls.category.value;
    });
  }

  onBackgroundChange(event: MatRadioChange) {
    this.background = this.background_choices.find(obj => {
      return obj.name == this.firstFormGroup.controls.background.value;
    });
  }

  onRaceChange(event: MatRadioChange) {
    this.race = this.race_choices.find(obj => {
      return obj.name == this.firstFormGroup.controls.race.value;
    });

  }

  random_assign(characteristic: any, charac: string) {
    var item = characteristic[Math.floor(Math.random() * characteristic.length)];

    this.firstFormGroup.controls[charac].setValue(item);
  }
}
