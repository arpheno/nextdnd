import {Attributes} from './character.service';

export class Character {

  constructor(
    public id: number,
    public name: string,
    public scores: Attributes,
    public  hitpoints: number,
    public alignment: string,
    public size: string,
    public monster_type: string,
    public category: string,
    public race: string,
    public speed: number,
    public level: number,
    public description: string,
    public gold: number,
    public experience: number) {
  }
}
