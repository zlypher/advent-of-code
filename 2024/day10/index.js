const fs = require("fs");
const { printMap } = require("../../utils/print-map");

const prepareInput = () => {
  const map = [];
  const lines = fs.readFileSync("./input.txt").toString().split("\r\n");
  while ((line = lines.shift())) {
    const fields = line.split("").map((str) => parseInt(str, 10));
    map.push(fields);
  }

  return { map };
};

const input = prepareInput();

function solvePartOne(input) {
  const { map } = input;
  const trailheads = findTrailheads(map);
  let totalScore = 0;

  for (let trailhead of trailheads) {
    totalScore += scoreTrailhead(map, trailhead);
  }
  return totalScore;
}

console.log(solvePartOne(input));

function solvePartTwo(input) {
  const { map } = input;
  const trailheads = findTrailheads(map);
  let totalScore = 0;

  for (let trailhead of trailheads) {
    totalScore += rateTrailhead(map, trailhead);
  }
  return totalScore;
}

console.log(solvePartTwo(input));

function findTrailheads(map) {
  const trailheads = [];

  for (let i = 0; i < map.length; ++i) {
    for (let j = 0; j < map[i].length; ++j) {
      if (map[i][j] === 0) {
        trailheads.push([i, j]);
      }
    }
  }

  return trailheads;
}

function scoreTrailhead(map, trailhead) {
  const [i, j] = trailhead;
  let allPaths = findTrail(map, -1, i, j);
  return new Set(allPaths.map((x) => x.join("-"))).size;
}

function rateTrailhead(map, trailhead) {
  const [i, j] = trailhead;
  let allPaths = findTrail(map, -1, i, j);
  return allPaths.length;
}

function findTrail(map, prev, i, j) {
  if (i < 0 || j < 0 || i >= map.length || j >= map[i].length) {
    return [];
  }

  const curr = map[i][j];
  if (curr - prev !== 1) return [];
  if (curr === 9) {
    return [[i, j]];
  }

  return [
    ...findTrail(map, curr, i - 1, j),
    ...findTrail(map, curr, i + 1, j),
    ...findTrail(map, curr, i, j - 1),
    ...findTrail(map, curr, i, j + 1),
  ];
}
