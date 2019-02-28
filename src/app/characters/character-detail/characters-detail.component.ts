import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CharacterService} from '../character.service';
import {Character} from '../character.model';
import {Observable} from 'rxjs';
import {LevelService} from '../../level.service';

@Component({
  selector: 'app-character-detail',
  templateUrl: './characters-detail.component.html',
  styleUrls: ['./characters-detail.component.scss']
})
export class CharactersDetailComponent implements OnInit {
  private character: Character;
  private character$: Observable<Character>;
  levels: any;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private characterService: CharacterService,
    private levelService: LevelService,
  ) {
  }

  ngOnInit() {
    this.character = {};
    this.levels = [];
    let id = this.route.snapshot.paramMap.get('id');
    this.character$ = this.characterService.characterDetail(id);
    this.character$.subscribe(next => {
      console.log(next);
      this.character = next;
      this.levelService.levelDetail(this.character.category, this.character.level).subscribe(levels => {
        this.levels = levels;
        console.log(levels);
      });

    });


  }

  updateCharacter(character: Character) {

    this.characterService.characterUpdate(character).subscribe();

  }
}
