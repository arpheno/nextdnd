import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

export class Spell {
  constructor(
    public id: number
  ) {
  }
}

@Injectable({
  providedIn: 'root'
})
export class spellService {

  API_URL = `http://${window.location.hostname}:8000/api/spells`;

  constructor(private  httpClient: HttpClient) {
  }


  detail(id: [number, string]): Observable<Spell> {
    return this.httpClient.get<Spell>(`${this.API_URL}/${id}/`).pipe(
      map(mon => {
          // @ts-ignore
          const m = Object.assign(new Spell, mon);
          return m;
        }
      ));
  }

  create(spell): Observable<Spell> {
    return this.httpClient.post<Spell>(`${this.API_URL}/`, spell);
  }

  list() {
    return this.httpClient.get<Spell[]>(`${this.API_URL}/`);
  }

  update(spell: Spell) {
    return this.httpClient.put(`${this.API_URL}/${spell.id}/`, spell);
  }
}

