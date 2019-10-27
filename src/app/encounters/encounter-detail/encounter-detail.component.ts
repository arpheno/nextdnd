import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {APIService} from '../../api.service';
import {BoardServiceService} from '../../board-service.service';
import {Encounter, EncounterService} from '../../encounter.service';
import {AUTHOR_ID} from '../../utils';
import {ActivatedRoute, Router} from '@angular/router';
import {CharacterService} from '../../characters/character.service';
import {Character} from '../../characters/character.model';
import {forEach} from '@angular/router/src/utils/collection';

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
      console.log(msg);
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
  players: Character[];


  addmember(partyadd) {
    this.apiService.monsterDetail(partyadd).subscribe(next => {
      this.members.push(next);
    });
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.loadEncounter();
    this.loadPlayers();
  }


  serialize() {
    const serialized = JSON.stringify(this.canvas);
    console.log(serialized);
  }

  canvasChange(can: any) {
    this.canvas = can;
    this.updateEncounter();
  }

  memberChange(members: any) {
    this.members = members;
    this.updateEncounter();
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
    });
  }

  private loadPlayers() {
    this.players = [];
    this.characterService.listCharacters().subscribe(players => {
      let _players = [];// This is necessary to trigger the data binding...

      console.log(players);
      players.forEach(player => {
        _players.push({
          ac: [10, 1],// TODO: Implement from server side
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
        this.players = _players;
      });
    });

  }
}
