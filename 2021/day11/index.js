// Day 11: Dumbo Octopus
const fs = require("fs");

const prepareInput = () =>
  fs
    .readFileSync("./input.txt")
    .toString()
    .split("\r\n")
    .map((l) => l.split("").map((n) => parseInt(n, 10)));

const input = prepareInput();

const wrapInBigger = (arr) => {
  return [
    new Array(12).fill(-Infinity),
    ...arr.map((l) => [-Infinity, ...l, -Infinity]),
    new Array(12).fill(-Infinity),
  ];
};

const createNodes = (arr) => {
  const grid = new Array(12);

  // Fill initially
  for (let i = 0; i < arr.length; ++i) {
    grid[i] = new Array(12);
    for (let j = 0; j < arr[i].length; ++j) {
      const node = {
        value: arr[i][j],
        flashed: false,
        neighbors: [],
      };

      grid[i][j] = node;
    }
  }

  // Add neighbors
  for (let i = 1; i < arr.length - 1; ++i) {
    for (let j = 1; j < arr[i].length - 1; ++j) {
      const node = grid[i][j];
      node.neighbors = getNeighbors(grid, i, j);
    }
  }

  return [...grid.map((g) => g.filter((n) => isFinite(n.value)))].filter(
    (v) => v.length > 0
  );
};

const getNeighbors = (grid, i, j) => {
  return [
    grid[i - 1][j - 1],
    grid[i - 1][j],
    grid[i - 1][j + 1],
    grid[i][j - 1],
    // grid[i][j],
    grid[i][j + 1],
    grid[i + 1][j - 1],
    grid[i + 1][j],
    grid[i + 1][j + 1],
  ].filter((n) => isFinite(n.value));
};

const increaseLevel = (node) => {
  if (node.flashed) {
    return;
  }

  node.value++;
  if (node.value > 9) {
    node.flashed = true;
    node.neighbors.forEach(increaseLevel);
  }
};

function solvePartOne(input) {
  const nodes = createNodes(wrapInBigger(input));
  let counter = 0;

  for (let step = 0; step < 100; ++step) {
    // Increase
    for (let i = 0; i < nodes.length; ++i) {
      for (let j = 0; j < nodes[i].length; ++j) {
        increaseLevel(nodes[i][j]);
      }
    }

    // Count and Reset
    for (let i = 0; i < nodes.length; ++i) {
      for (let j = 0; j < nodes[i].length; ++j) {
        const node = nodes[i][j];
        if (node.flashed) {
          counter++;

          node.flashed = false;
          node.value = 0;
        }
      }
    }
  }

  return counter;
}

console.log(solvePartOne(input));

function solvePartTwo(input) {
  const nodes = createNodes(wrapInBigger(input));
  let step = 1;
  while (true) {
    // Increase
    for (let i = 0; i < nodes.length; ++i) {
      for (let j = 0; j < nodes[i].length; ++j) {
        increaseLevel(nodes[i][j]);
      }
    }

    // Count and Reset
    let intermediateCounter = 0;
    for (let i = 0; i < nodes.length; ++i) {
      for (let j = 0; j < nodes[i].length; ++j) {
        const node = nodes[i][j];
        if (node.flashed) {
          intermediateCounter++;

          node.flashed = false;
          node.value = 0;
        }
      }
    }

    if (intermediateCounter === 100) {
      return step;
    }

    step++;
  }
}

console.log(solvePartTwo(input));
