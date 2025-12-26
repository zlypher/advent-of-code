export type Input = {
  batteries: string[];
};

export const prepareInput = (rawInput: string): Input => {
  let line: string | undefined;
  let batteries = [];
  const lines = rawInput.split("\n");
  while ((line = lines.shift())) {
    batteries.push(line.replace("\r", "").replace("\n", ""));
  }

  return { batteries };
};

export function solvePartOne(input: Input): number {
  let totalJoltage = 0;

  for (const battery of input.batteries) {
    totalJoltage += getBestJoltage(battery, 2);
  }

  return totalJoltage;
}

export function solvePartTwo(input: Input): number {
  let totalJoltage = 0;

  for (const battery of input.batteries) {
    totalJoltage += getBestJoltage(battery, 12);
  }

  return totalJoltage;
}

function getBestJoltage(battery: string, size: number): number {
  const current = new Array<number>(size).fill(0);

  for (let i = 0; i <= battery.length - 1; i++) {
    const digit = parseInt(battery[i], 10);

    // Phase 1: Shift Left
    for (let i = 1; i < current.length; ++i) {
      const prev = current[i - 1];
      const curr = current[i];

      if (curr > prev) {
        current[i - 1] = curr;
        current.splice(i, 1);
        break;
      }
    }

    // Phase 2: Insert New Digit
    if (current.length < size) {
      current.push(digit);
    } else if (digit > current[current.length - 1]) {
      current[current.length - 1] = digit;
    }
  }

  return Number(current.join(""));
}
