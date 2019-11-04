import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Armor} from './equipment.models';

@Injectable({
  providedIn: 'root'
})
export class ArmorService {
  API_URL = `http://${window.location.hostname}:8000/api/armors`;
  armorDetail(id: number): Observable<Armor> {
    return this.httpClient.get<Armor>(`${this.API_URL}/${id}/`).pipe(
      map(mon => {
          // @ts-ignore
          const m = Object.assign(new Armor, mon);
          return m;
        }
      ));
  }

  armorCreate(armor): Observable<Armor> {
    return this.httpClient.post<Armor>(`${this.API_URL}/`, armor);
  }

  listArmors() {
    return this.httpClient.get<Armor[]>(`${this.API_URL}/`);
  }

  armorUpdate(armor: Armor) {
    return this.httpClient.put(`${this.API_URL}/${armor.id}/`, armor);
  }

  constructor(private  httpClient: HttpClient) {
  }
}
