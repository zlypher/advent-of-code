const fs = require("fs");

const prepareInput = () => {
  let pairs = [];

  const lines = fs.readFileSync("./input.txt").toString().split("\r\n");

  while (typeof (line = lines.shift()) !== "undefined") {
    pairs.push(line.split("-"));
  }

  return { pairs };
};

const input = prepareInput();

function solvePartOne(input) {
  const { pairs } = input;
}

console.log(solvePartOne(input));

function solvePartTwo(input) {
  const { pairs } = input;
}

console.log(solvePartTwo(input));
