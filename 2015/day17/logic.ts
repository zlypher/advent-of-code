export type Input = {
  containers: number[];
};

export const prepareInput = (rawInput: string): Input => {
  let line: string | undefined;
  let containers: number[] = [];
  const lines = rawInput.split(/\r\n|\r|\n/);
  while ((line = lines.shift())) {
    containers.push(Number(line));
  }

  return { containers };
};

function solve(containers: number[], target: number): number {
  if (containers.length === 0 || target <= 0) {
    return 0;
  }

  let count = 0;
  const first = containers[0];
  const rest = containers.slice(1);
  if (first === target) {
    count += 1;
  }
  count += solve(rest, target);
  if (first < target) {
    count += solve(rest, target - first);
  }
  return count;
}

export function solvePartOne(input: Input, target: number = 150): number {
  return solve(input.containers.toSorted(), target);
}

function solveV2(containers: number[], target: number, used: number): number[] {
  if (containers.length === 0 || target <= 0) {
    return [];
  }

  let results = [];
  const first = containers[0];
  const rest = containers.slice(1);
  if (first === target) {
    results.push(used + 1);
  }
  results = results.concat(solveV2(rest, target, used));
  if (first < target) {
    results = results.concat(solveV2(rest, target - first, used + 1));
  }
  return results;
}

export function solvePartTwo(input: Input, target: number = 150): number {
  let results = solveV2(input.containers.toSorted(), target, 0);

  const min = Math.min(...results);
  const filtered = results.filter((r) => r === min);

  return filtered.length;
}
