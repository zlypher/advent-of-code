const fs = require("fs");

const prepareInput = () => {
  let patterns = [];
  const designs = [];

  const lines = fs.readFileSync("./input.txt").toString().split("\r\n");

  patterns = lines.shift().split(", ");
  lines.shift();
  while (typeof (line = lines.shift()) !== "undefined") {
    designs.push(line);
  }

  return { patterns, designs };
};

const input = prepareInput();

function solvePartOne(input) {
  const { patterns, designs } = input;

  let count = 0;

  for (let design of designs) {
    if (checkDesign(design, patterns)) {
      count++;
    }
  }

  return count;
}

console.log(solvePartOne(input));

function solvePartTwo(input) {
  const { patterns, designs } = input;

  let count = 0;
  const memo = {};

  for (let design of designs) {
    console.log("check design", design);
    count += checkDesignV2(design, patterns, memo);
  }

  return count;
}

console.log(solvePartTwo(input));

function checkDesign(design, patterns) {
  if (design.length === 0) return true;

  let match = false;

  for (let pattern of patterns) {
    if (design.startsWith(pattern)) {
      match = match || checkDesign(design.substring(pattern.length), patterns);
    }
  }

  return match;
}

function checkDesignV2(design, patterns, memo) {
  if (design.length === 0) return 1;
  if (memo[design] !== undefined) return memo[design];

  let count = 0;

  for (let pattern of patterns) {
    if (design.startsWith(pattern)) {
      count += checkDesignV2(design.substring(pattern.length), patterns, memo);
    }
  }

  memo[design] = count;
  return count;
}
