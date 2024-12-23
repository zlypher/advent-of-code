const fs = require("fs");

const prepareInput = () => {
  let map = [];

  const lines = fs.readFileSync("./input.txt").toString().split("\r\n");

  while (typeof (line = lines.shift()) !== "undefined") {
    // TODO
  }

  return { map };
};

const input = prepareInput();

function solvePartOne(input) {
  const { map } = input;
}

console.log(solvePartOne(input));

function solvePartTwo(input) {
  const { map } = input;
}

console.log(solvePartTwo(input));
