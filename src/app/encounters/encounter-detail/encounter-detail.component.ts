import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {APIService, Monster} from '../../api.service';
import {BoardServiceService} from '../../board-service.service';
import {EncounterService} from '../encounter.service';
import {AUTHOR_ID} from '../../utils';
import {ActivatedRoute, Router} from '@angular/router';
import {CharacterService} from '../../characters/character.service';

@Component({
  selector: 'app-encounter',
  templateUrl: './encounter-detail.component.html',
  styleUrls: ['./encounter-detail.component.scss']
})
export class EncounterDetailComponent implements OnInit {
  public canvas = '';
  private id: any;

  constructor(private snackBar: MatSnackBar,
              private encounterService: EncounterService,
              private characterService: CharacterService,
              private  apiService: APIService,
              private route: ActivatedRoute,
              private router: Router,
              private boardService: BoardServiceService) {

    this.boardService.messages.subscribe(msg => {
      if (msg.author !== AUTHOR_ID && msg.encounterID === this.id) {
        console.log('REACTING');
        this.members = msg.members;
        this.players = msg.players;
        this.canvas = msg.map;
      }
    });
  }

  public members = [];
  partyadd: any;
  players: Monster[];


  addmember(partyadd) {
    this.apiService.monsterDetail(partyadd).subscribe(next => {
      this.members.push(next);
    });
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.loadEncounter();
    console.log(this.players);
  }


  serialize() {
    const serialized = JSON.stringify(this.canvas);
    console.log(serialized);
  }

  canvasChange(can: any) {
    this.canvas = can;
    this.updateEncounter();
  }

  memberChange(members: Monster[]) {
    this.members = members;
    this.updateEncounter();
    const all_enemies_dead = this.members.every(x => {
      return x.hp <= 0;
    });
    if (all_enemies_dead) {
      alert('victory!');
      this.award_experience();

    }
  }

  playerChange(players: any) {
    this.players = players;
    this.updateEncounter();
  }

  updateEncounter() {
    this.encounterService.updateEncounter(this.id, this.members, this.canvas, this.players).subscribe();
    this.boardService.messages.next({
      encounterID: this.id,
      members: this.members,
      author: AUTHOR_ID,
      map: this.canvas,
      players: this.players
    });
  }

  loadEncounter() {
    this.encounterService.getEncounter(this.id).subscribe(encounter => {
      this.members = encounter.members;
      this.canvas = encounter.map;
      this.players = encounter.players;
      if (this.players.length == 0) {
        this.loadPlayers();
      }
    });
  }

  private loadPlayers() {
    this.players = [];
    this.characterService.listCharacters().subscribe(players => {
      let _players = [];// This is necessary to trigger the data binding...
      console.log(players);
      players.forEach(player => {
        _players.push({
          ac: player.ac,
          size: 'Medium',// TODO: Implement from server side
          type: 'Humanoid',
          id: player.id,
          name: player.name,
          hp: player.hitpoints,
          attacks: [// TODO: Implement from server side
            {
              ability: 2,
              damage: [1, 4, 'bludgeoning'],
              description: '',
              name: 'Sling',
              range: 'Ranged (30/120 ft)',
              to_hit: 4
            }
          ]
        });
        console.log(_players);
        this.players = _players;
      });
    });

  }

  private award_experience() {
    const total_xp: number = this.members.reduce((a, b) => {
      return a + b.xp;
    }, 0);
    const xp_per_player = Math.round(total_xp / this.players.length);
    this.players.forEach(player => {
        // @ts-ignore
        this.characterService.characterDetail(player.id).subscribe(next => {
          next.experience += xp_per_player;
          console.log(xp_per_player);
          this.characterService.characterUpdate(next).subscribe();
        });
      }
    );
  }
}
