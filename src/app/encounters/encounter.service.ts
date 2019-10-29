import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import {forkJoin, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {APIService} from '../api.service';
import {Encounter, TransportEncounter} from './encounter.models';

@Injectable({
  providedIn: 'root'
})
export class EncounterService {

  API_URL = 'http://localhost:8000';

  constructor(private  httpClient: HttpClient, private  apiService: APIService) {
  }


  random_encounter(biome, difficulty): Observable<Encounter> {
    let res = this.httpClient.get<string[]>(`${this.API_URL}/random_encounter/${biome}/${difficulty}`).pipe(
      map(next => {
        console.log('!');
        console.log(next);
        let observables = [];
        next.forEach(monster => {
          observables.push(this.apiService.monsterDetail(monster));
        });
        let enc = new Encounter([], '', 99, []);
        let obs = forkJoin(observables).subscribe(members => {
          console.log('setting members');
          console.log(members);
          this.saveEncounter(members, '', []).subscribe(next => {
            enc.members = next.members;
            enc.id = next.id;
            enc.map = next.map;

          });
        });
        return enc;
      }));
    return res;
  }

  saveEncounter(members, mapp, players): Observable<Encounter> {
    return this.httpClient.post<TransportEncounter>(`${this.API_URL}/api/encounters/`, {members, map: mapp, players}).pipe(map(next => {
      const enc = new Encounter(JSON.parse(next.members), JSON.parse(next.map), next.id, JSON.parse(next.players));
      console.log(enc);
      return enc;
    }));
  }

  updateEncounter(id, members, map, players): Observable<Encounter> {
    const mapp = JSON.stringify(map);
    return this.httpClient.put<Encounter>(`${this.API_URL}/api/encounters/${id}/`, {members, map: mapp, players});
  }

  getEncounters() {
    return this.httpClient.get<Encounter[]>(`${this.API_URL}/api/encounters/`);
  }

  getEncounter(id) {
    return this.httpClient.get<Encounter>(`${this.API_URL}/api/encounters/${id}/`).pipe(map(next => {
      console.log(next);
      // @ts-ignore
      const enc = new Encounter(JSON.parse(next.members), JSON.parse(next.map), next.id, JSON.parse(next.players));
      console.log(enc);
      return enc;
    }));

  }
}
