export type Input = {
  instr: string[];
};

export const prepareInput = (rawInput: string): Input => {
  const instr = rawInput.split("");

  return { instr };
};

export function solvePartOne(input: Input): number {
  let floor = 0;

  for (const char of input.instr) {
    if (char === "(") {
      floor += 1;
    } else if (char === ")") {
      floor -= 1;
    }
  }

  return floor;
}

export function solvePartTwo(input: Input): number {
  let floor = 0;
  let idx = 1;

  for (const char of input.instr) {
    if (char === "(") {
      floor += 1;
    } else if (char === ")") {
      floor -= 1;
    }

    if (floor === -1) break;

    idx++;
  }

  return idx;
}
