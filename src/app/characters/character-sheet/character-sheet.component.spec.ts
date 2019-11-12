import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterSheetComponent } from './character-sheet.component';
import {MatChip, MatChipList} from '@angular/material';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {races} from '../../../assets/raws/5e-SRD-Races';
import {classes} from '../../../assets/raws/5e-SRD-Classes';
import {backgrounds} from '../../../assets/raws/backgrounds';

function try_the_api(traits) {
  const Http = new XMLHttpRequest();
  const url = 'http://localhost:8000/api/characters/';
  const character = {
    name: 'testchar',
    race: 'Elf',
    scores: {str: 10, dex: 11, con: 12, int: 13, wis: 14, cha: 15},
    alignment: 'chaotic neutral',
    category: 'wizard',
    traits: traits.items().flatMap(x => {
      return x[1];
    })
  };
  Http.open('POST', url);

  function sleep(delay) {
    var start = new Date().getTime();
    while (new Date().getTime() < start + delay) {
      ;
    }
  }

  Http.setRequestHeader('Content-Type', 'application/json');
  const data = JSON.stringify(character);
  console.log('sent request');
  Http.send(data);
  sleep(2000);

  Http.onreadystatechange = (e) => {
    console.log(Http.responseText);
  };
}

describe('CharacterSheetComponent', () => {
  let component: CharacterSheetComponent;
  let fixture: ComponentFixture<CharacterSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharacterSheetComponent,MatChip,MatChipList ],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('calculates traits for races', () => {
    races.forEach(x=>{
      component.race=undefined;
      fixture.detectChanges();
      expect(component._traits.items().length).toBeFalsy();
      component.race=x;
      fixture.detectChanges();
      expect(component._traits.items().length).toBeTruthy();
      try_the_api(component._traits);
    })
  });

  it('calculates traits for classes', () => {
    classes.forEach(x=>{
      component.klass=undefined;
      fixture.detectChanges();
      expect(component._traits.items().length).toBeFalsy();
      component.klass=x;
      fixture.detectChanges();
      expect(component._traits.items().length).toBeTruthy();
      try_the_api(component._traits);
    })
  });
  it('calculates traits for backgrounds', () => {
    backgrounds.forEach(x=>{
      component.bkg=undefined;
      fixture.detectChanges();
      expect(component._traits.items().length).toBeFalsy();
      component.bkg=x;
      fixture.detectChanges();
      expect(component._traits.items().length).toBeTruthy();
      try_the_api(component._traits);
    })
  });
});
