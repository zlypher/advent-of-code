export type Input = {
  distances: { from: string; to: string; distance: number }[];
};

export const prepareInput = (rawInput: string): Input => {
  let line: string | undefined;
  let distances = [];
  const lines = rawInput.split("\n");
  while ((line = lines.shift())) {
    const [_, from, to, distance] = line.match(/(\w+) to (\w+) = (\d+)/)!;
    distances.push({ from, to, distance: Number(distance) });
  }

  return { distances };
};

function permutate<T>(list: T[]): T[][] {
  const results: T[][] = [];

  if (list.length === 0) return [];
  if (list.length === 1) return [list];

  for (let i = 0; i < list.length; i++) {
    const current = list[i];
    const remaining = [...list.slice(0, i), ...list.slice(i + 1)];
    const innerPermutations = permutate(remaining);

    for (const sub of innerPermutations) {
      results.push([current, ...sub]);
    }
  }

  return results;
}

function prepare(input: Input) {
  let cities: string[] = [];
  let distances: Record<string, number> = {};

  for (const { from, to, distance } of input.distances) {
    if (!cities.includes(from)) {
      cities.push(from);
    }
    if (!cities.includes(to)) {
      cities.push(to);
    }
    distances[`${from}-${to}`] = distance;
    distances[`${to}-${from}`] = distance;
  }
  return { cities, distances };
}

export function solvePartOne(input: Input): number {
  const { cities, distances } = prepare(input);

  let permutations = permutate(cities);
  let minDistance = Infinity;

  for (const route of permutations) {
    let totalDistance = 0;
    for (let i = 0; i < route.length - 1; i++) {
      const from = route[i];
      const to = route[i + 1];
      totalDistance += distances[`${from}-${to}`];
    }
    if (totalDistance < minDistance) {
      minDistance = totalDistance;
    }
  }

  return minDistance;
}

export function solvePartTwo(input: Input): number {
  const { cities, distances } = prepare(input);

  let permutations = permutate(cities);
  let maxDistance = -Infinity;

  for (const route of permutations) {
    let totalDistance = 0;
    for (let i = 0; i < route.length - 1; i++) {
      const from = route[i];
      const to = route[i + 1];
      totalDistance += distances[`${from}-${to}`];
    }
    if (totalDistance > maxDistance) {
      maxDistance = totalDistance;
    }
  }

  return maxDistance;
}
