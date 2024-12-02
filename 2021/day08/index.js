// Day 8: Seven Segment Search
const fs = require("fs");

const prepareInput = () =>
  fs.readFileSync("./input.txt").toString().split("\r\n").map(parseInputLine);

const parseInputLine = (line) => {
  const [rawPatterns, rawOutput] = line.split(" | ");

  return {
    patterns: rawPatterns.split(" "),
    output: rawOutput.split(" "),
  };
};

const input = prepareInput();

function solvePartOne(input) {
  let counter = 0;

  input.forEach(({ output }) => {
    counter += output.filter((o) => [2, 3, 4, 7].indexOf(o.length) !== -1)
      .length;
  });

  return counter;
}

console.log(solvePartOne(input));

const toDigit5 = (chars) => {
  if (chars.indexOf("a") !== -1 && chars.indexOf("b") !== -1) return 3;
  if (chars.indexOf("g") !== -1) {
    return 2;
  }
  if (chars.indexOf("e") !== -1) {
    return 5;
  }

  throw "noop";
};
const toDigit6 = (chars) => {
  if (chars.indexOf("f") === -1) {
    return 0;
  }

  if (chars.indexOf("a") === -1) {
    return 6;
  }

  if (chars.indexOf("g") === -1) {
    return 9;
  }

  console.log(chars);

  throw "noop";
};

const toDigit = (chars) => {
  if (chars.length === 2) return 1;
  if (chars.length === 3) return 7;
  if (chars.length === 4) return 4;
  if (chars.length === 5) return toDigit5(chars);
  if (chars.length === 6) return toDigit6(chars);
  if (chars.length === 7) return 8;

  throw "noop";
};

const getOutputValue = (output) => {
  const digits = output.map(toDigit);
  console.log(digits);
};

function solvePartTwo(input) {
  let total = 0;

  input.forEach(({ output }) => {
    total += getOutputValue(output);
  });

  return total;
}

console.log(solvePartTwo(input));
