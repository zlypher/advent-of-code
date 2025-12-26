export type Input = {
  ranges: { start: number; end: number }[];
  ingredients: number[];
};

export const prepareInput = (rawInput: string): Input => {
  let line: string | undefined;
  let ranges = [];
  let ingredients = [];

  const lines = rawInput.split("\n");
  while ((line = lines.shift())) {
    const [start, end] = line
      .split("-")
      .map((x) => Number(x.replace("\r", "").replace("\n", "")));

    if (!isNaN(start) && !isNaN(end)) {
      ranges.push({ start, end });
    }

    if (line.trim() === "") {
      break;
    }
  }

  while ((line = lines.shift())) {
    const ingredient = Number(line);
    ingredients.push(ingredient);
  }

  return { ranges, ingredients };
};

export function solvePartOne(input: Input): number {
  let countFresh = 0;

  for (const ingredient of input.ingredients) {
    if (isFresh(ingredient, input.ranges)) {
      countFresh++;
    }
  }

  return countFresh;
}

function isFresh(ingredient: number, ranges: { start: number; end: number }[]) {
  for (const range of ranges) {
    if (ingredient >= range.start && ingredient <= range.end) {
      return true;
    }
  }
  return false;
}

export function solvePartTwo(input: Input): number {
  let totalCountFresh = 0;

  const sortedRanges = input.ranges.sort((a, b) => a.start - b.start);

  const mergedRanges: { start: number; end: number }[] = [];
  for (const range of sortedRanges) {
    if (
      mergedRanges.length === 0 ||
      mergedRanges[mergedRanges.length - 1].end < range.start
    ) {
      mergedRanges.push({ ...range });
    } else {
      mergedRanges[mergedRanges.length - 1].end = Math.max(
        mergedRanges[mergedRanges.length - 1].end,
        range.end
      );
    }
  }

  for (const range of mergedRanges) {
    totalCountFresh += range.end - range.start + 1;
  }

  return totalCountFresh;
}
