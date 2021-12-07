// Day 1: Binary Diagnostic
const fs = require("fs");

const prepareInput = () =>
  fs.readFileSync("./input.txt").toString().split("\r\n");

const input = prepareInput();

function getMostCommonBits(input) {
  let total = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  input.forEach((val) => {
    [...val].forEach((digit, idx) => {
      total[idx] += (parseInt(digit, 10) - 0.5) * 2;
    });
  });

  return parseInt(
    total.map((val) => Math.max(Math.min(1, val), 0)).join(""),
    2
  );
}

function solvePartOne(input) {
  const gammaRate = getMostCommonBits(input);
  const epsilonRate = gammaRate ^ 0b111111111111;
  return gammaRate * epsilonRate;
}

console.log(solvePartOne(input));

function findRatingImpl(input, idx, pickHigh) {
  if (idx < 0) {
    console.log("noop", { input, idx });
    return;
  }

  if (input.length === 1) {
    return input[0];
  }

  const hi = [];
  const lo = [];
  const mask = 1 << idx;

  input.forEach((val) => {
    const digit = val & mask;
    if (digit > 0) {
      hi.push(val);
    } else {
      lo.push(val);
    }
  });

  if (hi.length == lo.length) {
    return findRatingImpl(pickHigh ? hi : lo, idx - 1, pickHigh);
  } else if (hi.length > lo.length) {
    return findRatingImpl(pickHigh ? hi : lo, idx - 1, pickHigh);
  } else {
    return findRatingImpl(pickHigh ? lo : hi, idx - 1, pickHigh);
  }
}

function solvePartTwo(input) {
  input = input.map((i) => parseInt(i, 2));
  const generatorRating = findRatingImpl(input, 11, true);
  const scrubberRating = findRatingImpl(input, 11, false);
  console.log({ generatorRating, scrubberRating });
  return generatorRating * scrubberRating;
}

console.log(solvePartTwo(input));
