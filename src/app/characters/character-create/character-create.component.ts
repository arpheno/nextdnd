import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {CharacterService} from '../character.service';
import {Howl} from 'howler';

// @ts-ignore
import * as classes from '../../../assets/raws/5e-SRD-Classes.json';
// @ts-ignore
import * as races from '../../../assets/raws/5e-SRD-Races.json';
// @ts-ignore
import * as alignments from '../../../assets/raws/alignments.json';
// @ts-ignore
import * as background_choices from '../../../assets/raws/backgrounds.json';
import {connectableObservableDescriptor} from 'rxjs/internal/observable/ConnectableObservable';
import {MatDialog, MatRadioChange, MatSelectChange} from '@angular/material';
import {GreeterComponent} from '../greeter/greeter.component';

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
  private race_choices: {};
  background_choices: [{name,description,choices,traits}];
  private alignment_choices: [{ name, description }];
  private class_choices: {
    string: {
      name: string,
      description: {
        main: string,
        chapters: string[]
      }
    }
  };
  private background_descriptions: {};
  private free_choices: [];
  private traits: [{ type: string, name: string }];
  private sound: Howl;
  private alignment: { name, description };
  private category: { name, description };
  private background: { name, description };

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
    // this.race_choices = ['human', 'dwarf', 'elf', 'half orc', 'half elf', 'gnome', 'halfling', 'tiefling', 'dragonborn'];
    this.race_choices = races.default;
    console.log(this.race_choices);
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
    // @ts-ignore
    this.class_choices = {};
    classes.default.forEach(x => {
      this.class_choices[x.name] = x;
    });

  }

  getAlignmentChoices() {
    this.alignment_choices = alignments.default;
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
      // @ts-ignore
      traits: this.traits.flatMap(x => {
        return x[1];
      })
    };
    const submission = {...this.firstFormGroup.value, ...derived};
    this.characterService.characterCreate(submission).subscribe();
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(GreeterComponent, {
      width: '250px',
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

    this.traits = traits;
  }

  onAlignnmentChange(event: MatRadioChange) {
    this.alignment = this.alignment_choices.find(obj => {
      return (obj.name == event.value);
    });

  }
  onClassChange(event: MatRadioChange) {

    this.category = this.class_choices[event.value];
  }

  onBackgroundChange(event: MatRadioChange) {
    this.background = this.background_choices.find(obj=>{return obj.name==event.value});
  }
}
