import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {EncounterService} from '../../encounter.service';

@Component({
  selector: 'app-encounter-list',
  templateUrl: './encounter-list.component.html',
  styleUrls: ['./encounter-list.component.scss']
})
export class EncounterListComponent implements OnInit {
  private encounters: any;

  constructor(private router: Router, private encounterService: EncounterService) {
  }

  ngOnInit() {
    this.encounterService.getEncounters().subscribe(next => {
      this.encounters = next;
      console.log(this.encounters);
    });
  }

  gotoEncounter(encounter: any) {
    this.router.navigate(['/encounters', encounter.id]);
  }

  newEncounter() {
    this.encounterService.saveEncounter([], '').subscribe(
      next => {
        this.encounters.push('');
      }
    );
  }
}
