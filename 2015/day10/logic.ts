export type Input = {
  numbers: number[];
};

export const prepareInput = (rawInput: string): Input => {
  return { numbers: rawInput.trim().split("").map(Number) };
};

function solve(input: Input, iterations: number): number[] {
  let nums = input.numbers.slice();

  for (let iter = 0; iter < iterations; iter++) {
    const newNums: number[] = [];
    let count = 0;

    for (let i = 0; i < nums.length; i++) {
      count++;

      let curr = nums[i];

      if (i + 1 >= nums.length || nums[i + 1] !== curr) {
        newNums.push(count);
        newNums.push(curr);
        count = 0;
      }
    }

    nums = newNums;
  }

  return nums;
}

export function solvePartOne(input: Input, iterations: number = 40): number {
  let nums = solve(input, iterations);
  return nums.length;
}

export function solvePartTwo(input: Input): number {
  let nums = solve(input, 50);
  return nums.length;
}
