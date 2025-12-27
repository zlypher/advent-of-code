import * as crypto from "node:crypto";

export type Input = {
  input: string;
};

export const prepareInput = (rawInput: string): Input => {
  return { input: rawInput };
};

export function solvePartOne(input: Input): number {
  for (let i = 0; ; i++) {
    const data = input.input + i;
    const hash = crypto.createHash("md5").update(data).digest();

    if (hash[0] === 0 && hash[1] === 0 && (hash[2] & 0xf0) === 0) {
      return i;
    }

    if (i >= 10000000) {
      break;
    }
  }

  return -1;
}

export function solvePartTwo(input: Input): number {
  for (let i = 0; ; i++) {
    const data = input.input + i;
    const hash = crypto.createHash("md5").update(data).digest();

    if (hash[0] === 0 && hash[1] === 0 && hash[2] === 0) {
      return i;
    }

    if (i >= 10000000) {
      break;
    }
  }

  return -1;
}
