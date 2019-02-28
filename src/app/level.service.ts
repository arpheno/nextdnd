import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {forkJoin, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

class Spellcasting {
  spells_known: number;
  spell_slots_level_1: number;
  spell_slots_level_2: number;
  spell_slots_level_3: number;
  spell_slots_level_4: number;
  spell_slots_level_5: number;
}

class FeatureChoice {
  url: string;
  name: string;
}

class LevelResponse {
  _id: string;
  level: number;
  ability_score_bonuses: number;
  prof_bonus: number;
  feature_choices: FeatureChoice[];
  features: FeatureChoice[];
  spellcasting: Spellcasting;
  class_specific: any;
  class: FeatureChoice;
}

function apiReplace(url: string) {
  return url.replace('www.dnd5eapi.co', `${window.location.hostname}:8000`);
}

@Injectable({
  providedIn: 'root'
})
export class LevelService {


  API_URL = `http://${window.location.hostname}:8000/api/classes`;

  constructor(private  httpClient: HttpClient) {
  }


  levelDetail(category, level): Observable<LevelResponse[]> {
    let requests = [];
    for (let i = 1; i < level + 1; i++) {
      requests.push(this.httpClient.get<LevelResponse>(`${this.API_URL}/${category}/level/${i}`));
    }
    return forkJoin<LevelResponse>(requests).pipe(map(x => {
        x.forEach(y => {
          console.log(y.feature_choices);
          this.expandUrls(y, 'features');
          this.expandUrls(y, 'feature_choices');
        });
        return x;
      }
    ));
  }

  private expandUrls(y: any, attr: string) {
    let requests = [];
    y[attr].forEach(z => {
      requests.push(this.httpClient.get(apiReplace(z.url)));
    });
    forkJoin(requests).subscribe(next => {
      y[attr] = next;
    });
  }
}
