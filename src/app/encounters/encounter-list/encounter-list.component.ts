import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {EncounterService} from '../encounter.service';
import {Encounter} from '../encounter.models';

@Component({
  selector: 'app-encounter-list',
  templateUrl: './encounter-list.component.html',
  styleUrls: ['./encounter-list.component.scss']
})
export class EncounterListComponent implements OnInit {
  private encounters: Encounter[];

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

  build_random_encounter(biome, difficulty) {
    this.encounterService.random_encounter(biome, difficulty).subscribe(next => {

      this.encounters.push(next);
      console.log(this.encounters);
    });
  }


  newEnconter() {
    this.encounterService.saveEncounter([], '').subscribe(
      next => {
        this.encounters.push(new Encounter([], '', next.id, []));
      }
    );
  }
}
