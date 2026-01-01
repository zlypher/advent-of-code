export type Input = {
  relations: { from: string; to: string; happiness: number }[];
};

export const prepareInput = (rawInput: string): Input => {
  let line: string | undefined;
  let relations = [];
  const lines = rawInput.split(/\r\n|\r|\n/);
  while ((line = lines.shift())) {
    const [_, from, gainLose, amount, to] = line.match(
      /^(\w+) would (gain|lose) (\d+) happiness units by sitting next to (\w+).$/
    )!;
    relations.push({
      from,
      to,
      happiness: (gainLose === "gain" ? 1 : -1) * Number(amount),
    });
  }

  return { relations };
};

function permute<T>(arr: T[]): T[][] {
  if (arr.length === 0) return [[]];
  if (arr.length === 1) return [arr];

  let results: T[][] = [];
  for (let i = 0; i < arr.length; i++) {
    const current = arr[i];
    const remaining = [...arr.slice(0, i), ...arr.slice(i + 1)];
    for (const p of permute(remaining)) {
      results.push([current, ...p]);
    }
  }

  return results;
}

function prepare(input: Input) {
  const relationMap: Record<string, Record<string, number>> = {};
  const people: string[] = [];

  for (const relation of input.relations) {
    if (!people.includes(relation.from)) {
      people.push(relation.from);
    }
    if (!people.includes(relation.to)) {
      people.push(relation.to);
    }

    if (!relationMap[relation.from]) {
      relationMap[relation.from] = {};
    }

    relationMap[relation.from][relation.to] = relation.happiness;
  }
  return { relationMap, people };
}

export function solvePartOne(input: Input): number {
  const { relationMap, people } = prepare(input);

  let maxHappiness = -Infinity;
  for (const arrangement of permute(people)) {
    let totalHappiness = 0;
    for (let i = 0; i < arrangement.length; i++) {
      const leftNeighbor =
        arrangement[(i - 1 + arrangement.length) % arrangement.length];
      const rightNeighbor = arrangement[(i + 1) % arrangement.length];
      const person = arrangement[i];
      totalHappiness +=
        relationMap[person][leftNeighbor] + relationMap[person][rightNeighbor];
    }

    if (totalHappiness > maxHappiness) {
      maxHappiness = totalHappiness;
    }
  }

  return maxHappiness;
}

export function solvePartTwo(input: Input): number {
  const { relationMap, people } = prepare(input);
  people.push("Me");
  relationMap["Me"] = {};
  for (const person of people) {
    relationMap["Me"][person] = 0;
    relationMap[person]["Me"] = 0;
  }

  let maxHappiness = -Infinity;
  for (const arrangement of permute(people)) {
    let totalHappiness = 0;
    for (let i = 0; i < arrangement.length; i++) {
      const leftNeighbor =
        arrangement[(i - 1 + arrangement.length) % arrangement.length];
      const rightNeighbor = arrangement[(i + 1) % arrangement.length];
      const person = arrangement[i];
      totalHappiness +=
        relationMap[person][leftNeighbor] + relationMap[person][rightNeighbor];
    }

    if (totalHappiness > maxHappiness) {
      maxHappiness = totalHappiness;
    }
  }

  return maxHappiness;
}
