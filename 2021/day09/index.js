// Day 9: Smoke Basin
const fs = require("fs");

const prepareInput = () =>
  fs
    .readFileSync("./input.txt")
    .toString()
    .split("\r\n")
    .map((line) => line.split("").map((n) => parseInt(n, 10)));

const input = prepareInput();

const getNeighbors = (arr, i, j) => {
  const neighbors = [];

  if (i > 0) {
    neighbors.push([i - 1, j, arr[i - 1][j]]);
  }

  if (j > 0) {
    neighbors.push([i, j - 1, arr[i][j - 1]]);
  }

  if (i < arr.length - 1) {
    neighbors.push([i + 1, j, arr[i + 1][j]]);
  }

  if (j < arr[i].length - 1) {
    neighbors.push([i, j + 1, arr[i][j + 1]]);
  }

  return neighbors;
};

const findLowPoints = (arr) => {
  const lowPoints = [];

  for (let i = 0; i < input.length; ++i) {
    for (let j = 0; j < input[i].length; ++j) {
      const val = input[i][j];

      const neighbors = getNeighbors(input, i, j);

      const isLowest = neighbors.filter(([i, j, n]) => n <= val).length === 0;
      if (isLowest) {
        lowPoints.push([i, j, val]);
      }
    }
  }

  return lowPoints;
};

function solvePartOne(input) {
  const lowPoints = findLowPoints(input);
  const lowPointValues = lowPoints.map(([i, j, val]) => val);
  const sum = lowPointValues.reduce((prev, val) => prev + val + 1, 0);
  return sum;
}

console.log(solvePartOne(input));

const findSingleCaveSizeImpl = (arr, point, visited) => {
  const [i, j] = point;
  const val = arr[i][j];

  if (val === 9) {
    return 0;
  }

  const key = `${i}-${j}`;
  if (visited[key]) {
    return 0;
  }

  visited[key] = true;
  return (
    1 +
    getNeighbors(arr, i, j).reduce(
      (prev, [i, j, val]) =>
        prev + findSingleCaveSizeImpl(arr, [i, j], visited),
      0
    )
  );
};

const findSingleCaveSize = (arr, point) => {
  return findSingleCaveSizeImpl(arr, point, {});
};

const findCaveSizes = (arr, points) => {
  return points.map((p) => findSingleCaveSize(arr, p));
};

function solvePartTwo(input) {
  const lowPoints = findLowPoints(input);
  const caveSizes = findCaveSizes(input, lowPoints);
  caveSizes.sort((a, b) => b - a);
  const [a, b, c, ...rest] = caveSizes;
  return a * b * c;
}

console.log(solvePartTwo(input));
