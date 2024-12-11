const fs = require("fs");

const prepareInput = () => {
  const numbers = fs
    .readFileSync("./input.txt")
    .toString()
    .split(" ")
    .map((str) => parseInt(str, 10));

  return { numbers };
};

const input = prepareInput();

function solvePartOne(input) {
  const { numbers } = input;
  return solve(numbers, 25);
}

console.log(solvePartOne(input));

function solvePartTwo(input) {
  const { numbers } = input;
  return solve(numbers, 75);
}

console.log(solvePartTwo(input));

function solve(numbers, iterations) {
  let map = {};

  for (let num of numbers) {
    if (!map[num]) {
      map[num] = 0;
    }

    map[num]++;
  }

  for (let i = 0; i < iterations; ++i) {
    let newMap = {};

    for (let [num, count] of Object.entries(map)) {
      if (num === "0") {
        add(newMap, 1, count);
      } else if (num.length % 2 === 0) {
        add(newMap, parseInt(num.substring(0, num.length / 2), 10), count);
        add(newMap, parseInt(num.substring(num.length / 2), 10), count);
      } else {
        add(newMap, parseInt(num, 10) * 2024, count);
      }
    }

    map = newMap;
  }

  return Object.values(map).reduce((prev, curr) => prev + curr);
}

function add(map, num, count = 1) {
  if (!map[num]) {
    map[num] = 0;
  }

  map[num] += count;
}
