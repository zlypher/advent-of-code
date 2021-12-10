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

function solvePartTwo(input) {}

console.log(solvePartTwo(input));
