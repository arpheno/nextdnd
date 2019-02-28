export function roll(x, d) {
  let s = 0;
  for (let i = 0; i < x; i++) {
    s += Math.floor(Math.random() * d) + 1;
  }
  return s;
}

export function execute_attack(target, attack, advantage = 0, cover = 0) {
  console.log(target);
  console.log(attack);
  const attack_rolls = [roll(1, 20) + attack.to_hit, roll(1, 20) + attack.to_hit];
  console.log(`${advantage}`);
  let attack_roll;
  if (advantage === -1) {
    attack_roll = Math.min(...attack_rolls);
  }
  if (advantage === 1) {
    attack_roll = Math.max(...attack_rolls);
  }
  if (advantage === 0) {
    attack_roll = attack_rolls[0];
  }
  let message = [];
  if (attack_roll >= target.ac[0]) {

    let damage = roll((attack.damage[0] * attack_roll == 20) + attack.damage[0], attack.damage[1]);
    let attack_type = attack.damage[2];
    message.push(`${attack.name} hits ${target.name} for ${damage} ${attack_type}`);
    if (target.damage_resistances && target.damage_resistances.includes(attack_type)) {
      message.push(`${target.name} is resistant to ${attack_type}`);
      damage = Math.floor(damage / 2);
    }
    if (target.damage_vulnerabilities && target.damage_vulnerabilities.includes(attack_type)) {
      message.push(`${target.name} is vulnerable to ${attack_type}`);
      damage = Math.floor(damage * 2);
    }
    if (target.damage_immunities && target.damage_immunities.includes(attack_type)) {
      message.push(`${target.name} is immune to ${attack_type}`);
      damage = 0;
    }
    message.push(`${target.name} takes ${damage} damage`);
    target.hp -= damage;
  } else {
    message.push(`${attack.name} misses.`);
  }
  return message.join('\n');
}

export const AUTHOR_ID = Math.random().toString();
