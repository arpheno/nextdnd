import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CharacterService} from '../character.service';
import {Character} from '../character.model';
import {Observable} from 'rxjs';
import {LevelService} from '../../level.service';
import {ArmorService} from '../../equipment/armor.service';
import {Armor, Weapon} from '../../equipment/equipment.models';
import {WeaponService} from '../../equipment/weapon.service';

@Component({
  selector: 'app-character-detail',
  templateUrl: './characters-detail.component.html',
  styleUrls: ['./characters-detail.component.scss']
})
export class CharactersDetailComponent implements OnInit {
  // @ts-ignore
  private character: Character = {};
  private character$: Observable<Character>;
  levels = [];
  public armor_choices: Armor[] = [];
  private weapon_choices: Weapon[];

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
      console.log(next);
      this.character = next;
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
    this.characterService.characterUpdate(character).subscribe(next=>{
      this.refresh();
    });

  }

  update_weapon(event) {
    //this.character.weapon=event.value
  }

  update_armor(event) {
    this.character.armor = event.value;
    this.updateCharacter(this.character);

  }
}
