export type Input = {
  map: string[][];
  start: { x: number; y: number };
};

export const prepareInput = (rawInput: string): Input => {
  let line: string | undefined;
  let map: string[][] = [];
  let start = { x: -1, y: -1 };

  const lines = rawInput.split("\n");
  while ((line = lines.shift())) {
    const startIdx = line.indexOf("S");
    if (startIdx !== -1) {
      start.x = startIdx;
      start.y = map.length;
    }

    map.push(line.split(""));
  }

  return { map, start };
};

export function solvePartOne(input: Input): number {
  let numberOfSplits = 0;
  let rays = [input.start.x];

  for (let y = input.start.y; y < input.map.length - 1; y++) {
    let nextRays = [];
    let seen: Record<string, boolean> = {};
    for (let r = 0; r < rays.length; r++) {
      const ray = rays[r];
      const below = input.map[y + 1][ray];
      if (below === "^") {
        if (!seen[`${ray - 1}`]) {
          nextRays.push(ray - 1);
          seen[`${ray - 1}`] = true;
        }

        if (!seen[`${ray + 1}`]) {
          nextRays.push(ray + 1);
          seen[`${ray + 1}`] = true;
        }
        numberOfSplits++;
      } else {
        if (!seen[`${ray}`]) {
          nextRays.push(ray);
          seen[`${ray}`] = true;
        }
      }
    }
    rays = nextRays;
  }

  return numberOfSplits;
}

export function solvePartTwo(input: Input): number {
  return solveTwo(input.map, input.start.x, input.start.y, {});
}

function solveTwo(
  map: string[][],
  x: number,
  y: number,
  memo: Record<string, number>
): number {
  if (y === map.length - 1) {
    return 1;
  }

  if (memo[`${x},${y}`] !== undefined) {
    return memo[`${x},${y}`];
  }

  const below = map[y + 1][x];
  if (below === "^") {
    let result =
      solveTwo(map, x - 1, y + 1, memo) + solveTwo(map, x + 1, y + 1, memo);
    memo[`${x},${y}`] = result;
    return result;
  } else {
    let result = solveTwo(map, x, y + 1, memo);
    memo[`${x},${y}`] = result;
    return result;
  }
}
