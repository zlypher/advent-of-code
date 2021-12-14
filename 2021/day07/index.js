// Day 7: The Treachery of Whales
const fs = require("fs");

const prepareInput = () =>
  fs
    .readFileSync("./input.txt")
    .toString()
    .split(",")
    .map((n) => parseInt(n, 10));

const input = prepareInput();

function solvePartOne(input) {
  const sorted = [...input];
  sorted.sort((a, b) => a - b);

  const median = sorted[sorted.length / 2];
  let totalFuel = 0;

  sorted.forEach((val) => {
    totalFuel += Math.abs(median - val);
  });

  return totalFuel;
}

console.log(solvePartOne(input));

const costForSteps = (steps) => {
  if (steps <= 1) {
    return steps;
  }
  return costForSteps(steps - 1) + steps;
};

function solvePartTwo(input) {
  const sorted = [...input];
  sorted.sort((a, b) => a - b);

  let values = [];
  for (let i = Math.min(...sorted); i <= Math.max(...sorted); ++i) {
    values.push(sorted.reduce((p, c) => p + costForSteps(Math.abs(i - c)), 0));
  }

  return Math.min(...values);
}

console.log(solvePartTwo(input));
