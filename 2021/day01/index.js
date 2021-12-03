// Day 1: Sonar Sweep
const fs = require("fs");

const prepareInput = () =>
  fs
    .readFileSync("./input.txt")
    .toString()
    .split("\r\n")
    .map((inp) => parseInt(inp, 10));

const input = prepareInput();

function solvePartOne(input) {
  return input.filter((val, idx, arr) => idx > 0 && arr[idx - 1] < val).length;
}

console.log(solvePartOne(input));

function getSlidingMeasurements(input, size) {
  return input
    .map((val, idx, arr) => {
      if (idx < size - 1) {
        return false;
      }

      return arr.slice(idx - (size - 1), idx + 1);
    })
    .filter(Boolean);
}

function sum(...values) {
  return values.reduce((prev, curr) => prev + curr, 0);
}

function solvePartTwo(input) {
  const slidingMeasurements = getSlidingMeasurements(input, 3);
  return slidingMeasurements.filter(
    (vals, idx, arr) => idx > 0 && sum(...arr[idx - 1]) < sum(...vals)
  ).length;
}

console.log(solvePartTwo(input));
