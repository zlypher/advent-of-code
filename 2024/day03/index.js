// Day 14: Extended Polymerization
const fs = require("fs");

const prepareInput = () => {
  return fs.readFileSync("./input.txt").toString();
};

const input = prepareInput();

function solvePartOne(input) {
  const memory = input;
  const extractRegex = /mul\((\d{1,3})\,(\d{1,3})\)/g;

  let result = 0;
  const matches = memory.matchAll(extractRegex);
  for (const match of matches) {
    const a = parseInt(match[1], 10);
    const b = parseInt(match[2], 10);

    result += a * b;
  }

  return result;
}

console.log(solvePartOne(input));

function solvePartTwo(input) {
  const memory = input;
  const extractRegex = /do\(\)|don\'t\(\)|mul\((\d{1,3})\,(\d{1,3})\)/g;

  let result = 0;
  let enabled = true;
  const matches = memory.matchAll(extractRegex);
  for (const match of matches) {
    const instr = match[0];
    if (instr.startsWith("don't")) {
      enabled = false;
    } else if (instr.startsWith("do")) {
      enabled = true;
    } else if (instr.startsWith("mul") && enabled) {
      const a = parseInt(match[1], 10);
      const b = parseInt(match[2], 10);

      result += a * b;
    }
  }

  return result;
}

console.log(solvePartTwo(input));
