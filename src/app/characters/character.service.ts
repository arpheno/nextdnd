import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Character} from './character.model';

export class Attributes {
  constructor(
    str: number,
    dex: number,
    con: number,
    int: number,
    wis: number,
    cha: number
  ) {
  }
}

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  API_URL = `http://${window.location.hostname}:8000/api/characters`;

  constructor(private  httpClient: HttpClient) {
  }


  characterDetail(id: number): Observable<Character> {
    return this.httpClient.get<Character>(`${this.API_URL}/${id}/`).pipe(
      map(mon => {
          // @ts-ignore
          let m = Object.assign(new Character, mon);
          return m;
        }
      ));
  }

  characterCreate(monster): Observable<Character> {
    return this.httpClient.post<Character>(`${this.API_URL}/`, monster);
  }

  listCharacters() {
    return this.httpClient.get<Character[]>(`${this.API_URL}/`);
  }

  characterUpdate(character: Character) {
    return this.httpClient.put(`${this.API_URL}/${character.id}/`, character);
  }
}
