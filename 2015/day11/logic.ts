export type Input = {
  password: string;
};

export const prepareInput = (rawInput: string): Input => {
  return { password: rawInput.trim() };
};

const CHAR_CODE_A = "a".charCodeAt(0);
const CHAR_CODE_Z = "z".charCodeAt(0);
const CHAR_CODE_INVALID = [
  "i".charCodeAt(0),
  "o".charCodeAt(0),
  "l".charCodeAt(0),
];

export function solvePartOne(input: Input): string {
  const pw = input.password.split("").map((char) => char.charCodeAt(0));
  let safeCounter = 0;

  for (let i = 0; i < pw.length; i++) {
    // if invalid letter -> reset others
    if (CHAR_CODE_INVALID.includes(pw[i])) {
      pw[i]++;
      for (let j = i + 1; j < pw.length; j++) {
        pw[j] = CHAR_CODE_A;
      }
      break;
    }
  }

  while (true) {
    // Increment password
    for (let i = pw.length - 1; i >= 0; i--) {
      if (pw[i] === CHAR_CODE_Z) {
        pw[i] = CHAR_CODE_A;
        continue;
      }

      pw[i]++;

      // if invalid letter -> reset others
      while (CHAR_CODE_INVALID.includes(pw[i])) {
        pw[i]++;
        for (let j = i + 1; j < pw.length; j++) {
          pw[j] = CHAR_CODE_A;
        }
      }

      break;
    }

    // Check validity
    let hasStraight = false;
    let pairsCount = 0;

    for (let i = 0; i < pw.length; i++) {
      if (pw[i] === pw[i + 1]) {
        pairsCount++;
        i++; // skip next char to avoid overlapping pairs
      }
    }

    for (let i = 0; i < pw.length - 2; i++) {
      if (pw[i] + 1 === pw[i + 1] && pw[i] + 2 === pw[i + 2]) {
        hasStraight = true;
        break;
      }
    }

    const isValid = hasStraight && pairsCount >= 2;

    if (isValid) {
      return pw
        .map((code) => String.fromCharCode(code))
        .join("")
        .toString();
    }

    safeCounter++;
    if (safeCounter > 1_000_000) {
      break;
    }
  }

  return "invalid";
}

export function solvePartTwo(input: Input): string {
  return solvePartOne({ password: solvePartOne(input) });
}
