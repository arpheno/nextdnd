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
      if (msg.author !== AUTHOR_ID && msg.encounterID === this.id) {
        console.log('REACTING');
        this.members = msg.members;
        this.canvas = msg.map;
      }
    });
  }

  public members = [];
  partyadd: any;


  addmember(partyadd) {
    this.apiService.monsterDetail(partyadd).subscribe(next => {
      this.members.push(next);
    });
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.loadEncounter();
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

  updateEncounter() {
    this.encounterService.updateEncounter(this.id, this.members, this.canvas).subscribe();
    this.boardService.messages.next({encounterID: this.id, members: this.members, author: AUTHOR_ID, map: this.canvas});
  }

  loadEncounter() {

    this.encounterService.getEncounter(this.id).subscribe(encounter => {
        this.members = encounter.members;
        this.canvas = encounter.map;
    });
  }
}
