import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Weapon} from './equipment.models';

@Injectable({
  providedIn: 'root'
})
export class WeaponService {
  API_URL = `http://${window.location.hostname}:8000/api/weapons`;

  weaponDetail(id: number): Observable<Weapon> {
    return this.httpClient.get<Weapon>(`${this.API_URL}/${id}/`).pipe(
      map(mon => {
          // @ts-ignore
          const m = Object.assign(new Weapon, mon);
          return m;
        }
      ));
  }

  weaponCreate(weapon): Observable<Weapon> {
    return this.httpClient.post<Weapon>(`${this.API_URL}/`, weapon);
  }

  listWeapons() {
    return this.httpClient.get<Weapon[]>(`${this.API_URL}/`);
  }

  weaponUpdate(weapon: Weapon) {
    return this.httpClient.put(`${this.API_URL}/${weapon.id}/`, weapon);
  }

  constructor(private  httpClient: HttpClient) {
  }
}
