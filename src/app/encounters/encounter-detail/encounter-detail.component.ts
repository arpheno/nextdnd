import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {APIService} from '../../api.service';
import {BoardServiceService} from '../../board-service.service';
import {Encounter, EncounterService} from '../../encounter.service';
import {AUTHOR_ID} from '../../utils';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-encounter',
  templateUrl: './encounter-detail.component.html',
  styleUrls: ['./encounter-detail.component.scss']
})
export class EncounterDetailComponent implements OnInit {
  private encounters: Encounter[];
  public canvas = '';
  private id: any;

  constructor(private snackBar: MatSnackBar,
              private encounterService: EncounterService,
              private  apiService: APIService,
              private route: ActivatedRoute,
              private router: Router,
              private boardService: BoardServiceService) {

    this.boardService.messages.subscribe(msg => {
      console.log(msg);
      if (msg.author !== AUTHOR_ID) {
        this.members = msg.members;
      }
    });
  }

  public members = [];
  partyadd: any;

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
    this.encounters = [];
    this.id = this.route.snapshot.paramMap.get('id');


  }

  sendMsg() {
    console.log('new message from client to websocket: ', this.members);
    this.boardService.messages.next({members: this.members, author: AUTHOR_ID});
  }

  serialize() {
    const serialized = JSON.stringify(this.canvas);
    console.log(serialized);
  }

  canvasChange(event: any) {
    const serialized = JSON.stringify(event);
    console.log(serialized);
    this.encounterService.updateEncounter(this.id, this.members, serialized).subscribe();
  }

  loadEncounter() {

    String.prototype.replaceAll = function(search, replacement) {
      var target = this;
      return target.replace(new RegExp(search, 'g'), replacement);
    };
    this.encounterService.getEncounter(this.id).subscribe(encounter => {
      console.log(encounter.members.replaceAll('\'', '"'));
      if (encounter.map!='') {
        this.members = JSON.parse(encounter.members.replaceAll('\'', '"'));
        console.log(this.canvas);
        this.canvas = JSON.parse(encounter.map);
      } else {
        this.addmember('Goblin');
        this.addmember('Lich');
        this.addmember('Owlbear');
      }
    });
  }
}
