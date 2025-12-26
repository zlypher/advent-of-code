export type Input = {
  boxes: { l: number; w: number; h: number }[];
};

export const prepareInput = (rawInput: string): Input => {
  let line: string | undefined;
  let boxes = [];
  const lines = rawInput.split("\n");
  while ((line = lines.shift())) {
    const [l, w, h] = line.split("x").map(Number);
    boxes.push({ l, w, h });
  }
  return { boxes };
};
export function solvePartOne(input: Input): number {
  let requiredPaper = 0;

  for (const box of input.boxes) {
    const side1 = box.l * box.w;
    const side2 = box.w * box.h;
    const side3 = box.h * box.l;

    requiredPaper +=
      2 * side1 + 2 * side2 + 2 * side3 + Math.min(side1, side2, side3);
  }

  return requiredPaper;
}

export function solvePartTwo(input: Input): number {
  let requiredPaper = 0;

  for (const box of input.boxes) {
    const maxSide = Math.max(box.l, box.w, box.h);

    requiredPaper +=
      2 * box.l + 2 * box.w + 2 * box.h - 2 * maxSide + box.l * box.w * box.h;
  }

  return requiredPaper;
}
