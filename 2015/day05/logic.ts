export type Input = {
  strings: string[];
};

export const prepareInput = (rawInput: string): Input => {
  const strings = rawInput.split("\r\n");

  return { strings };
};

export function solvePartOne(input: Input): number {
  let countNiceStrings = 0;

  for (const str of input.strings) {
    const hasThreeVowels = (str.match(/[aeiou]/g) || []).length >= 3;
    const hasDoubleLetter = /(.)\1/.test(str);
    const hasNoForbiddenSubstrings = !/(ab|cd|pq|xy)/.test(str);

    if (hasThreeVowels && hasDoubleLetter && hasNoForbiddenSubstrings) {
      countNiceStrings++;
    }
  }

  return countNiceStrings;
}

export function solvePartTwo(input: Input): number {
  let countNiceStrings = 0;

  for (const str of input.strings) {
    const hasPairThatAppearsTwice = /(..).*\1/.test(str);
    const hasLetterRepeatingWithOneBetween = /(.).\1/.test(str);

    if (hasPairThatAppearsTwice && hasLetterRepeatingWithOneBetween) {
      countNiceStrings++;
    }
  }

  return countNiceStrings;
}
