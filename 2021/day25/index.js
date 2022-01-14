// Day 25: Sea Cucumber
const fs = require("fs");

const prepareInput = () =>
  fs
    .readFileSync("./input.txt")
    .toString()
    .split("\r\n")
    .map((line) => line.split(""));

const input = prepareInput();

const moveRight = (map) => {
  const mapClone = JSON.parse(JSON.stringify(map));
  let didChange = false;
  for (let i = 0; i < map.length; ++i) {
    const len = map[i].length;
    for (let j = 0; j < len - 1; ++j) {
      if (mapClone[i][j] === ">" && mapClone[i][j + 1] === ".") {
        map[i][j] = ".";
        map[i][j + 1] = ">";
        didChange = true;
      }
    }

    if (mapClone[i][len - 1] === ">" && mapClone[i][0] === ".") {
      map[i][len - 1] = ".";
      map[i][0] = ">";
      didChange = true;
    }
  }
  return didChange;
};

const moveDown = (map) => {
  const mapClone = JSON.parse(JSON.stringify(map));
  let didChange = false;
  const len = map.length;
  for (let i = 0; i < map.length - 1; ++i) {
    for (let j = 0; j < map[i].length; ++j) {
      if (mapClone[i][j] === "v" && mapClone[i + 1][j] === ".") {
        map[i][j] = ".";
        map[i + 1][j] = "v";
        didChange = true;
      }
    }
  }

  for (let j = 0; j < map[len - 1].length; ++j) {
    if (mapClone[len - 1][j] === "v" && mapClone[0][j] === ".") {
      map[len - 1][j] = ".";
      map[0][j] = "v";
      didChange = true;
    }
  }

  return didChange;
};

function solvePartOne(input) {
  console.log(input);
  let didChange = true;
  let steps = 0;

  while (didChange) {
    const movedRight = moveRight(input);
    const movedDown = moveDown(input);
    didChange = movedRight || movedDown;
    steps++;
  }

  return steps;
}

console.log(solvePartOne(input));

function solvePartTwo(input) {}

console.log(solvePartTwo(input));
