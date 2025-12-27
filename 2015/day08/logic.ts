export type Input = {
  strings: string[];
};

export const prepareInput = (rawInput: string): Input => {
  const strings = rawInput.split("\r\n").map((line) => String.raw`${line}`);

  return { strings };
};

export function solvePartOne(input: Input): number {
  let total = 0;

  for (const str of input.strings) {
    let codeChars = str.length;
    let memoryChars = 0;

    for (let i = 1; i < str.length - 1; i++) {
      if (str[i] === "\\") {
        if (str[i + 1] === "\\" || str[i + 1] === '"') {
          memoryChars += 1;
          i += 1;
        } else if (str[i + 1] === "x") {
          memoryChars += 1;
          i += 3;
        }
      } else {
        memoryChars += 1;
      }
    }

    total += codeChars - memoryChars;
  }

  return total;
}

export function solvePartTwo(input: Input): number {
  let total = 0;

  for (const str of input.strings) {
    let codeChars = str.length;
    let encodedChars = 6;

    for (let i = 1; i < str.length - 1; i++) {
      if (str[i] === "\\" || str[i] === '"') {
        encodedChars += 2;
      } else {
        encodedChars += 1;
      }
    }

    total += encodedChars - codeChars;
  }

  return total;
}
