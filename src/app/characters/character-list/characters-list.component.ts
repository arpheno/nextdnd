import {Component, OnInit} from '@angular/core';
import {CharacterService} from '../character.service';
import {Character} from '../character.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-character',
  templateUrl: './characters-list.component.html',
  styleUrls: ['./characters-list.component.scss']
})
export class CharactersListComponent implements OnInit {
  characters: Character[];

  constructor(private characterService: CharacterService,
              private router: Router,
  ) {
  }

  ngOnInit() {

    this.characterService.listCharacters().subscribe(
      next => {
        this.characters = next;
      }
    );
  }

  gotoCharacter(character: Character) {
    this.router.navigate(['/characters', character.id]);
  }

  newCharacter() {
    let m = {
      name: 'alfred',
      scores: {str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10},
      hitpoints: 10,
      alignment: 'neutral neutral',
      size: 'Medium',
      monster_type: 'Humanoid',
      experience: 0,
      gold: 0,
      speed: 30,
      level: 1,
      description: 'description',
      category: 'Wizard',
      race: 'Human',
    };
    this.characterService.characterCreate(m).subscribe(
      next => {
        this.characters.push(m);
      }
    );
  }
}

