import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Spell} from '../characters/character-create/spellcasting.service';

@Injectable({
  providedIn: 'root'
})
export class SpellService {
  API_URL = `http://${window.location.hostname}:8000/api/spells`;
  spellDetail(id: string): Observable<Spell> {
    return this.httpClient.get<Spell>(`${this.API_URL}/${id}/`).pipe(
      map(mon => {
          // @ts-ignore
          const m = Object.assign(new Spell, mon);
          return m;
        }
      ));
  }

  spellCreate(spell): Observable<Spell> {
    return this.httpClient.post<Spell>(`${this.API_URL}/`, spell);
  }

  listSpells() {
    return this.httpClient.get<Spell[]>(`${this.API_URL}/`);
  }

  spellUpdate(spell: Spell) {
    return this.httpClient.put(`${this.API_URL}/${spell.id}/`, spell);
  }

  constructor(private  httpClient: HttpClient) {
  }
}
