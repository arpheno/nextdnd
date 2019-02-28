import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {APIService} from '../api.service';
import {BoardServiceService} from '../board-service.service';
import {Encounter, EncounterService} from '../encounter.service';
import {AUTHOR_ID} from '../utils';

@Component({
  selector: 'app-encounter',
  templateUrl: './encounter.component.html',
  styleUrls: ['./encounter.component.scss']
})
export class EncounterComponent implements OnInit {
  private encounters: Encounter[];

  constructor(private snackBar: MatSnackBar, private encounterService: EncounterService, private  apiService: APIService, private boardService: BoardServiceService) {

    this.boardService.messages.subscribe(msg => {
      console.log(msg);
      if (msg.author !== AUTHOR_ID) {
        this.members = msg.members;
      }
    });
  }

  public members = [];

  build_random_encounter(biome, difficulty) {
    this.encounterService.random_encounter(biome, difficulty).subscribe(next => {
      this.encounters.push(next);
      console.log(this.encounters);
    });
  }

  selectEncounter(encounter: Encounter) {
    this.members = [];
    encounter.members.forEach(x => {
      this.addmember(x);
    });
  }

  addmember(partyadd) {
    this.apiService.monsterDetail(partyadd).subscribe(next => {
      this.members.push(next);
    });
  }

  ngOnInit() {
    this.addmember('Goblin');
    this.addmember('Lich');
    this.addmember('Owlbear');
    this.encounters = [];
  }

  sendMsg() {
    console.log('new message from client to websocket: ', this.members);
    this.boardService.messages.next({members: this.members, author: AUTHOR_ID});
  }


}
