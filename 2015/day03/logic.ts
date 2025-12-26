export type Input = {
  moves: string[];
};

export const prepareInput = (rawInput: string): Input => {
  let moves = rawInput.split("");

  return { moves };
};

export function solvePartOne(input: Input): number {
  let pos = [0, 0];
  let visited = new Set<string>();
  visited.add(pos.toString());

  for (const move of input.moves) {
    switch (move) {
      case "^":
        pos[1] += 1;
        break;
      case "v":
        pos[1] -= 1;
        break;
      case ">":
        pos[0] += 1;
        break;
      case "<":
        pos[0] -= 1;
        break;
    }
    visited.add(pos.toString());
  }
  return visited.size;
}

export function solvePartTwo(input: Input): number {
  let pos = [0, 0];
  let otherPos = [0, 0];
  let visited = new Set<string>();
  visited.add(pos.toString());

  for (const move of input.moves) {
    switch (move) {
      case "^":
        pos[1] += 1;
        break;
      case "v":
        pos[1] -= 1;
        break;
      case ">":
        pos[0] += 1;
        break;
      case "<":
        pos[0] -= 1;
        break;
    }
    visited.add(pos.toString());

    let tmp = pos;
    pos = otherPos;
    otherPos = tmp;
  }

  return visited.size;
}
