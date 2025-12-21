export type Input = {
  map: string[][];
};

export const prepareInput = (rawInput: string): Input => {
  let line: string | undefined;
  let map = [];
  const lines = rawInput.split("\n");
  while ((line = lines.shift())) {
    let row = line.replace("\r", "").replace("\n", "").split("");
    map.push(row);
  }

  return { map };
};

export function solvePartOne(input: Input): number {
  let countAccessible = 0;

  for (let y = 0; y < input.map.length; y++) {
    for (let x = 0; x < input.map[y].length; x++) {
      const cell = input.map[y][x];

      if (cell !== "@") {
        continue;
      }

      if (isRollAccessible(input.map, x, y)) {
        countAccessible++;
      }
    }
  }

  return countAccessible;
}

function isRollAccessible(map: string[][], x: number, y: number): boolean {
  const directions = [
    { dx: -1, dy: -1 },
    { dx: -1, dy: 0 },
    { dx: -1, dy: 1 },
    { dx: 0, dy: -1 },
    { dx: 0, dy: 1 },
    { dx: 1, dy: -1 },
    { dx: 1, dy: 0 },
    { dx: 1, dy: 1 },
  ];

  let countRolls = 0;

  for (const { dx, dy } of directions) {
    const nx = x + dx;
    const ny = y + dy;
    if (ny < 0 || ny >= map.length || nx < 0 || nx >= map[0].length) {
      continue;
    }

    if (map[ny][nx] === "@") {
      countRolls++;
    }
  }

  return countRolls < 4;
}

export function solvePartTwo(input: Input): number {
  let totalRemoved = 0;

  while (true) {
    let countAccessible = 0;
    let toRemove = [];
    // Find
    for (let y = 0; y < input.map.length; y++) {
      for (let x = 0; x < input.map[y].length; x++) {
        const cell = input.map[y][x];

        if (cell !== "@") {
          continue;
        }

        if (isRollAccessible(input.map, x, y)) {
          countAccessible++;
          toRemove.push({ x, y });
        }
      }
    }

    // Remove
    for (const { x, y } of toRemove) {
      input.map[y][x] = ".";
    }

    totalRemoved += countAccessible;
    if (countAccessible === 0) {
      break;
    }
  }

  return totalRemoved;
}
