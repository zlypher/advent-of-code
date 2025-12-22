export type Input = {
  boxes: { x: number; y: number; z: number }[];
};

export const prepareInput = (rawInput: string): Input => {
  let line: string | undefined;
  let boxes = [];
  const lines = rawInput.split("\n");
  while ((line = lines.shift())) {
    const [x, y, z] = line.split(",").map(Number);
    boxes.push({ x, y, z });
  }

  return { boxes };
};

export function solvePartOne(input: Input): number {
  console.log(input);
  return -1;
}

export function solvePartTwo(input: Input): number {
  return -1;
}
