export type Input = {
  commands: { dir: string; amount: number }[];
};

export const prepareInput = (rawInput: string): Input => {
  let line: string | undefined;
  let commands = [];
  const lines = rawInput.split(/\r\n|\r|\n/);
  while ((line = lines.shift())) {
    commands.push({ dir: line[0], amount: Number(line.slice(1)) });
  }

  return { commands };
};

export function solvePartOne(input: Input): number {
  return -1;
}

export function solvePartTwo(input: Input): number {
  return -1;
}
