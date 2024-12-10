const fs = require("fs");
const { printMap } = require("../../utils/print-map");

const prepareInput = () => {
  const map = [];

  const lines = fs.readFileSync("./input.txt").toString().split("\r\n");
  while ((line = lines.shift())) {
    const fields = line.split("");
    map.push(fields);
  }

  return { map };
};

const input = prepareInput();

function solvePartOne(input) {
  const { map } = input;

  const maxI = map.length - 1;
  const maxJ = map[0].length - 1;

  const antennaMap = setupAntennaMap(map);
  const locations = new Set();

  for (let [_, positions] of Object.entries(antennaMap)) {
    if (positions.length <= 1) continue;

    for (let i = 0; i < positions.length; ++i) {
      const posA = positions[i];
      for (let j = i + 1; j < positions.length; ++j) {
        const posB = positions[j];

        const firstAntinode = calculateAntinode(posA, posB);
        const secondAntinode = calculateAntinode(posB, posA);

        if (isAntinodeInRange(firstAntinode, maxI, maxJ)) {
          locations.add(firstAntinode.join("-"));
        }

        if (isAntinodeInRange(secondAntinode, maxI, maxJ)) {
          locations.add(secondAntinode.join("-"));
        }
      }
    }
  }

  return locations.size;
}

console.log(solvePartOne(input));

function solvePartTwo(input) {
  const { map } = input;

  const maxI = map.length - 1;
  const maxJ = map[0].length - 1;

  const antennaMap = setupAntennaMap(map);
  const locations = new Set();

  for (let [_, positions] of Object.entries(antennaMap)) {
    if (positions.length <= 1) continue;

    for (let i = 0; i < positions.length; ++i) {
      const posA = positions[i];
      locations.add(posA.join("-"));
      for (let j = i + 1; j < positions.length; ++j) {
        const posB = positions[j];
        let prev = posA;
        let antinode = posB;

        while (isAntinodeInRange(antinode, maxI, maxJ)) {
          locations.add(antinode.join("-"));
          const newAntinode = calculateAntinode(antinode, prev);
          prev = antinode;
          antinode = newAntinode;
        }

        prev = posB;
        antinode = posA;

        while (isAntinodeInRange(antinode, maxI, maxJ)) {
          locations.add(antinode.join("-"));
          const newAntinode = calculateAntinode(antinode, prev);
          prev = antinode;
          antinode = newAntinode;
        }
      }
    }
  }

  return locations.size;
}

console.log(solvePartTwo(input));

function setupAntennaMap(map) {
  const antennaMap = {};
  for (let i = 0; i < map.length; ++i) {
    for (let j = 0; j < map[i].length; ++j) {
      const field = map[i][j];
      if (field !== ".") {
        if (!antennaMap[field]) {
          antennaMap[field] = [];
        }

        antennaMap[field].push([i, j]);
      }
    }
  }

  return antennaMap;
}

function calculateAntinode(nodeOne, nodeTwo) {
  const [oneI, oneJ] = nodeOne;
  const [twoI, twoJ] = nodeTwo;
  return [oneI + oneI - twoI, oneJ + oneJ - twoJ];
}

function isAntinodeInRange(node, maxI, maxJ) {
  const [i, j] = node;
  if (i < 0 || j < 0) return false;
  if (i > maxI || j > maxJ) return false;

  return true;
}
