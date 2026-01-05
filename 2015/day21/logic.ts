export type Input = {
  boss: { hp: number; damage: number; armor: number };
};

export const prepareInput = (rawInput: string): Input => {
  const [_, hp, damage, armor] = rawInput.match(
    /Hit Points: (\d+)\r\nDamage: (\d+)\r\nArmor: (\d+)/
  )!;

  return {
    boss: { hp: Number(hp), damage: Number(damage), armor: Number(armor) },
  };
};

function prepare() {
  const weapons = [
    { name: "Dagger", cost: 8, damage: 4, armor: 0 },
    { name: "Shortsword", cost: 10, damage: 5, armor: 0 },
    { name: "Warhammer", cost: 25, damage: 6, armor: 0 },
    { name: "Longsword", cost: 40, damage: 7, armor: 0 },
    { name: "Greataxe", cost: 74, damage: 8, armor: 0 },
  ];

  const armor = [
    { name: "No armor", cost: 0, damage: 0, armor: 0 },
    { name: "Leather", cost: 13, damage: 0, armor: 1 },
    { name: "Chainmail", cost: 31, damage: 0, armor: 2 },
    { name: "Splintmail", cost: 53, damage: 0, armor: 3 },
    { name: "Bandedmail", cost: 75, damage: 0, armor: 4 },
    { name: "Platemail", cost: 102, damage: 0, armor: 5 },
  ];

  const rings = [
    { name: "Damage +1", cost: 25, damage: 1, armor: 0 },
    { name: "Damage +2", cost: 50, damage: 2, armor: 0 },
    { name: "Damage +3", cost: 100, damage: 3, armor: 0 },
    { name: "Defense +1", cost: 20, damage: 0, armor: 1 },
    { name: "Defense +2", cost: 40, damage: 0, armor: 2 },
    { name: "Defense +3", cost: 80, damage: 0, armor: 3 },
  ];

  const ringCombinations = [
    { name: "No rings", cost: 0, damage: 0, armor: 0 },
    ...rings,
    ...rings.flatMap((first, i) =>
      rings.slice(i + 1).map((second) => ({
        name: `${first.name}, ${second.name}`,
        cost: first.cost + second.cost,
        damage: first.damage + second.damage,
        armor: first.armor + second.armor,
      }))
    ),
  ];

  return { weapons, armor, ringCombinations };
}

export function solvePartOne(input: Input): number {
  const { weapons, armor, ringCombinations } = prepare();
  const playerHp = 100;
  let minCost = Infinity;
  for (const weapon of weapons) {
    for (const arm of armor) {
      for (const ringCombo of ringCombinations) {
        const totalCost = weapon.cost + arm.cost + ringCombo.cost;
        const totalDamage = weapon.damage + arm.damage + ringCombo.damage;
        const totalArmor = weapon.armor + arm.armor + ringCombo.armor;

        const playerRounds = Math.ceil(
          input.boss.hp / Math.max(1, totalDamage - input.boss.armor)
        );
        const bossRounds = Math.ceil(
          playerHp / Math.max(1, input.boss.damage - totalArmor)
        );

        if (playerRounds <= bossRounds) {
          minCost = Math.min(minCost, totalCost);
        }
      }
    }
  }

  return minCost;
}

export function solvePartTwo(input: Input): number {
  const { weapons, armor, ringCombinations } = prepare();
  const playerHp = 100;
  let maxCost = -Infinity;
  for (const weapon of weapons) {
    for (const arm of armor) {
      for (const ringCombo of ringCombinations) {
        const totalCost = weapon.cost + arm.cost + ringCombo.cost;
        const totalDamage = weapon.damage + arm.damage + ringCombo.damage;
        const totalArmor = weapon.armor + arm.armor + ringCombo.armor;

        const playerRounds = Math.ceil(
          input.boss.hp / Math.max(1, totalDamage - input.boss.armor)
        );
        const bossRounds = Math.ceil(
          playerHp / Math.max(1, input.boss.damage - totalArmor)
        );

        if (playerRounds > bossRounds) {
          maxCost = Math.max(maxCost, totalCost);
        }
      }
    }
  }

  return maxCost;
}
