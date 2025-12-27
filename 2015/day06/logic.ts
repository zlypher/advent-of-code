type Instruction = {
  command: string;
  from: { x: number; y: number };
  to: { x: number; y: number };
};

export type Input = {
  instructions: Instruction[];
};

export const prepareInput = (rawInput: string): Input => {
  let line: string | undefined;
  let instructions = [];
  const lines = rawInput.split("\n");
  const regex = /(turn on|turn off|toggle) (\d+),(\d+) through (\d+),(\d+)/;
  while ((line = lines.shift())) {
    const match = line.match(regex);
    if (match) {
      const [, command, x1, y1, x2, y2] = match;
      instructions.push({
        command,
        from: { x: Number(x1), y: Number(y1) },
        to: { x: Number(x2), y: Number(y2) },
      });
    }
  }

  return { instructions };
};

export function solvePartOne(input: Input): number {
  const { grid, xMap, yMap, uniqueX, uniqueY } = prepare(input.instructions);

  for (const instruction of input.instructions) {
    const { command, from, to } = instruction;
    const xStart = xMap[from.x];
    const xEnd = xMap[to.x + 1];
    const yStart = yMap[from.y];
    const yEnd = yMap[to.y + 1];

    for (let y = yStart; y < yEnd; y++) {
      for (let x = xStart; x < xEnd; x++) {
        if (command === "turn on") {
          grid[y][x] = 1;
        } else if (command === "turn off") {
          grid[y][x] = 0;
        } else if (command === "toggle") {
          grid[y][x] = grid[y][x] === 1 ? 0 : 1;
        }
      }
    }
  }

  let countLights = 0;

  for (let y = 0; y < grid.length; y++) {
    const height = uniqueY[y + 1] - uniqueY[y];
    for (let x = 0; x < grid[0].length; x++) {
      const lightState = grid[y][x];

      if (lightState === 1) {
        const width = uniqueX[x + 1] - uniqueX[x];
        countLights += width * height;
      }
    }
  }

  return countLights;
}

export function solvePartTwo(input: Input): number {
  const { grid, xMap, yMap, uniqueX, uniqueY } = prepare(input.instructions);

  for (const instruction of input.instructions) {
    const { command, from, to } = instruction;
    const xStart = xMap[from.x];
    const xEnd = xMap[to.x + 1];
    const yStart = yMap[from.y];
    const yEnd = yMap[to.y + 1];

    for (let y = yStart; y < yEnd; y++) {
      for (let x = xStart; x < xEnd; x++) {
        if (command === "turn on") {
          grid[y][x] += 1;
        } else if (command === "turn off") {
          grid[y][x] = Math.max(0, grid[y][x] - 1);
        } else if (command === "toggle") {
          grid[y][x] += 2;
        }
      }
    }
  }

  let totalBrightness = 0;

  for (let y = 0; y < grid.length; y++) {
    const height = uniqueY[y + 1] - uniqueY[y];
    for (let x = 0; x < grid[0].length; x++) {
      const lightState = grid[y][x];

      const width = uniqueX[x + 1] - uniqueX[x];
      totalBrightness += lightState * width * height;
    }
  }

  return totalBrightness;
}

function prepare(instructions: Instruction[]) {
  let xCoords = [];
  let yCoords = [];

  // Prepare Grid
  for (const instruction of instructions) {
    const { from, to } = instruction;
    xCoords.push(from.x, to.x + 1);
    yCoords.push(from.y, to.y + 1);
  }

  const uniqueX = Array.from(new Set(xCoords)).sort((a, b) => a - b);
  const uniqueY = Array.from(new Set(yCoords)).sort((a, b) => a - b);

  const grid: number[][] = Array.from({ length: uniqueY.length - 1 }, () =>
    Array.from({ length: uniqueX.length - 1 }, () => 0)
  );

  const xMap = uniqueX.reduce((acc, val, idx) => {
    acc[val] = idx;
    return acc;
  }, {} as Record<number, number>);
  const yMap = uniqueY.reduce((acc, val, idx) => {
    acc[val] = idx;
    return acc;
  }, {} as Record<number, number>);

  return { grid, xMap, yMap, uniqueX, uniqueY };
}
