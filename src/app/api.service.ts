import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {roll} from './utils';

const attribute_to_ability = {'str': 0, 'dex': 1, 'con': 2, 'int': 3, 'wis': 4, 'cha': 5};

export class Monster {
  public damage_resistances = '';

  constructor(
    public roll: number,
    public modifiers: {
      str: number,
      dex: number,
      con: number,
      int: number,
      wis: number,
      cha: number,
    },
    public name: string,
    public source: string,
    public size: string,
    public type: string,
    public alignment: string,
    public ac: number,
    public hp: number,
    public hd: any,
    public speed: string,
    public scores: any,
    public saves: boolean[],
    public skills: any,
    damage_resistances: string,
    public damage_immunities: string,
    public condition_immunities: string,
    public senses: any,
    public passive_perception: any,
    public languages: any,
    public challenge_rating: any,
    public attacks: any,
    public traits: any,
    public legendary_actions: any,
    public spells: any,
    public proficiency_bonus: any,
    public xp: number,
    public style: any
  ) {
    this.damage_resistances = damage_resistances;
  }

  roll_save(attribute) {
    let save = roll(1, 20);
    save += this.modifiers[attribute];
    console.log(save);
    if (this.saves[attribute_to_ability[attribute]]) {
      save += this.proficiency_bonus;
    }
    this.roll = save;
    return save;
  }
}

@Injectable({
  providedIn: 'root'
})
export class APIService {
  API_URL = `http://${window.location.hostname}:8000`;

  constructor(private  httpClient: HttpClient) {
  }

  monsterDetail(monster): Observable<Monster> {
    return this.httpClient.get<Monster>(`${this.API_URL}/monster/${monster}/`).pipe(
      map(mon => {
          let m = Object.assign(new Monster, mon);
          m.hp = roll(m.hd[0], m.hd[1]) + m.modifiers.con * m.hd[0];
          console.log(m);
          return m;
        }
      ));
  }

}
