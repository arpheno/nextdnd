export class Armor {
  constructor(
    public id: number,
    public  name: string,
    public  description: string,
    public  category: string,
    public  base_ac: number,
    public  cost: number,
    public  stealth_disadvantage: boolean,
    public  str_minimum: number,
    public  weight: number,
    public  magical_bonus: number,
  ) {
  }

}

export class Weapon {
  constructor(
    public    id: number,
    public    name: string,
    public    description: string,
    public    category: string,
    public    base_ac: number,
    public    cost: number,
    public    stealth_disadvantage: boolean,
    public    str_minimum: number,
    public    weight: number,
    public    magical_bonus: number,
  ) {
  }
}

export class AdventuringGear {
}
