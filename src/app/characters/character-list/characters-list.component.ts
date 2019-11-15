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
    this.router.navigate(['/characters/new']);
  }
}

