export type Input = {
  ranges: { start: number; end: number }[];
};

export const prepareInput = (rawInput: string): Input => {
  let line: string | undefined;
  let ranges = [];
  const lines = rawInput.split(",");
  while ((line = lines.shift())) {
    const [start, end] = line.split("-").map(Number);
    ranges.push({ start, end });
  }

  return { ranges };
};

export function solvePartOne(input: Input): number {
  let sumInvalidIds = 0;

  for (let range in input.ranges) {
    const { start, end } = input.ranges[range];
    for (let curr = start; curr <= end; curr++) {
      if (isInvalid(curr)) {
        sumInvalidIds += curr;
      }
    }
  }

  return sumInvalidIds;
}

function isInvalid(id: number): boolean {
  const strId = id.toString();
  if (strId.length % 2 === 1) {
    return false;
  }

  return strId.slice(0, strId.length / 2) === strId.slice(strId.length / 2);
}

export function solvePartTwo(input: Input): number {
  let sumInvalidIds = 0;

  for (let range in input.ranges) {
    const { start, end } = input.ranges[range];
    for (let curr = start; curr <= end; curr++) {
      if (isInvalidV2(curr)) {
        sumInvalidIds += curr;
      }
    }
  }

  return sumInvalidIds;
}

function isInvalidV2(id: number): boolean {
  const strId = id.toString();

  for (let chunkSize = 1; chunkSize <= strId.length / 2; chunkSize++) {
    if (strId.length % chunkSize !== 0) {
      continue;
    }

    let isInvalid = true;

    for (let idx = 0; idx < strId.length - chunkSize; idx += chunkSize) {
      const chunk = strId.slice(idx, idx + chunkSize);
      const nextChunk = strId.slice(idx + chunkSize, idx + 2 * chunkSize);
      if (chunk !== nextChunk) {
        isInvalid = false;
        break;
      }
    }

    if (isInvalid) {
      return true;
    }
  }

  return false;
}
