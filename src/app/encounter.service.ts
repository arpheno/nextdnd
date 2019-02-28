import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {APIService} from './api.service';

export class Encounter {
  constructor(public members: string[]) {
  }
}

@Injectable({
  providedIn: 'root'
})
export class EncounterService {

  API_URL = 'http://localhost:8000';

  constructor(private  httpClient: HttpClient, private  apiService: APIService) {
  }


  random_encounter(biome, difficulty): Observable<Encounter> {
    return this.httpClient.get<string[]>(`${this.API_URL}/random_encounter/${biome}/${difficulty}`).pipe(
      map(next => {
        console.log(next);
        const enc = new Encounter(next);
        // $scope.sum_xp = encounter.map(x => x['xp']).reduce((a, b) => a + b, 0);
        return enc;
      }));
  }

}