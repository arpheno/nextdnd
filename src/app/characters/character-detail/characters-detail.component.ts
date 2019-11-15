import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CharacterService} from '../character.service';
import {Character} from '../character.model';
import {Observable} from 'rxjs';
import {LevelService} from '../../level.service';
import {ArmorService} from '../../equipment/armor.service';
import {Armor, Weapon} from '../../equipment/equipment.models';
import {WeaponService} from '../../equipment/weapon.service';
import {DefaultDict} from 'pycollections';

@Component({
  selector: 'app-character-detail',
  templateUrl: './characters-detail.component.html',
  styleUrls: ['./characters-detail.component.scss']
})
export class CharactersDetailComponent implements OnInit {
  // @ts-ignore
  private character: Character = undefined;
  private character$: Observable<Character>;
  levels = [];
  public armor_choices: Armor[] = [];
  private weapon_choices: Weapon[];
  private traits: DefaultDict;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private characterService: CharacterService,
    private armorService: ArmorService,
    private weaponService: WeaponService,
    private levelService: LevelService,
  ) {
  }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    // @ts-ignore
    this.character$ = this.characterService.characterDetail(id);
    this.refresh();


  }

  private refresh() {
    this.character$.subscribe(next => {
      this.character = next;
      this.traits = new DefaultDict([].constructor);
      this.character.traits.forEach(x=>{
        this.traits.get(x.type).push(x);
      });
      this.getArmorChoices();
      this.getWeaponChoices();
      this.getLevelInformation();

    });
  }

  private getLevelInformation() {
    this.levelService.levelDetail(this.character.category, this.character.level).subscribe(levels => {
      this.levels = levels;
      console.log(levels);
    });
  }

  private getArmorChoices() {
    this.armorService.listArmors().subscribe(armors => {
      this.armor_choices = armors;
    });
  }

  private getWeaponChoices() {
    this.weaponService.listWeapons().subscribe(weapons => {
      this.weapon_choices = weapons;
    });
  }

  updateCharacter(character: Character) {
    this.characterService.characterUpdate(character).subscribe(next => {
      this.refresh();
    });

  }

  update_weapon(event, index = null) {
    if (!index) {
      this.character.weapon_set.push(event.value);
    } else {
      this.character.weapon_set[index] = event.value;
    }
    this.characterService.characterPartialUpdate(this.character, 'weapon_set').subscribe(next => {
      this.refresh();
    });
  }

  update_armor(event) {
    this.character.armor = event.value;
    this.characterService.characterPartialUpdate(this.character, 'armor').subscribe(next => {
      this.refresh();
    });
  }

  remove_weapon(index: number) {
    this.character.weapon_set.pop(index);
    this.characterService.characterPartialUpdate(this.character, 'weapon_set').subscribe(next => {
      this.refresh();
    });
  }
}
