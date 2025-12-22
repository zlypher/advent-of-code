export type Input = {
  tiles: { x: number; y: number }[];
};

export const prepareInput = (rawInput: string): Input => {
  let line: string | undefined;
  let tiles = [];
  const lines = rawInput.split("\n");
  while ((line = lines.shift())) {
    const [x, y] = line.split(",").map(Number);
    tiles.push({ x, y });
  }

  return { tiles };
};

export function solvePartOne(input: Input): number {
  let maxArea = 0;
  for (let tile of input.tiles) {
    for (let otherTile of input.tiles) {
      if (tile.x === otherTile.x && tile.y === otherTile.y) {
        continue;
      }

      maxArea = Math.max(
        maxArea,
        (Math.abs(tile.x - otherTile.x) + 1) *
          (Math.abs(tile.y - otherTile.y) + 1)
      );
    }
  }
  return maxArea;
}

export function solvePartTwo(input: Input): number {
  return -1;
}
