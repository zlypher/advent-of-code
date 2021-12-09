// Day 5: Hydrothermal Venture
const fs = require("fs");

const prepareInput = () =>
  fs
    .readFileSync("./input.txt")
    .toString()
    .split("\r\n")
    .map((line) => {
      const match = line.match(/(\d*),(\d*) -> (\d*),(\d*)/);
      return {
        x0: parseInt(match[1], 10),
        y0: parseInt(match[2], 10),
        x1: parseInt(match[3], 10),
        y1: parseInt(match[4], 10),
      };
    });

const input = prepareInput();

const generateMap = (input) => {
  const map = [];

  input.forEach((coords) => {
    const { x0, y0, x1, y1 } = coords;

    if (x0 != x1 && y0 != y1) {
      return;
    }

    let currX = Math.min(x0, x1);
    let currY = Math.min(y0, y1);

    let tarX = Math.max(x0, x1);
    let tarY = Math.max(y0, y1);

    while (currX < tarX) {
      if (!map[currY]) {
        map[currY] = [];
      }

      map[currY][currX] = map[currY][currX] ? map[currY][currX] + 1 : 1;

      currX += 1;
    }

    while (currY <= tarY) {
      if (!map[currY]) {
        map[currY] = [];
      }

      map[currY][tarX] = map[currY][tarX] ? map[currY][tarX] + 1 : 1;

      currY += 1;
    }
  });

  return map;
};

const countDangerousSpots = (map) => {
  let counter = 0;
  map.forEach((row) => {
    row.forEach((val) => {
      if (val > 1) {
        counter++;
      }
    });
  });

  return counter;
};

function solvePartOne(input) {
  const map = generateMap(input);
  return countDangerousSpots(map);
}

console.log(solvePartOne(input));

const generateMapPartTwo = (input) => {
  const map = [];

  input.forEach((coords) => {
    const { x0, y0, x1, y1 } = coords;

    let currX = x0;
    let currY = y0;

    while (true) {
      if (!map[currY]) {
        map[currY] = [];
      }

      map[currY][currX] = map[currY][currX] ? map[currY][currX] + 1 : 1;

      if (currX == x1 && currY == y1) {
        return;
      }

      const xDiff = Math.max(-1, Math.min(1, x1 - x0));
      const yDiff = Math.max(-1, Math.min(1, y1 - y0));
      currX += xDiff;
      currY += yDiff;
    }
  });

  return map;
};

function solvePartTwo(input) {
  const map = generateMapPartTwo(input);
  return countDangerousSpots(map);
}

console.log(solvePartTwo(input));
