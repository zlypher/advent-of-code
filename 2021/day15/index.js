// Day 15: Chiton
const fs = require("fs");

const prepareInput = () =>
  fs
    .readFileSync("./input.txt")
    .toString()
    .split("\r\n")
    .map((line) => line.split("").map((n) => parseInt(n, 10)));

const input = prepareInput();

const getNeighbors = ({ x, y, ...rest }, mapSize) => {
  let neighbors = [];

  if (y > 0) neighbors.push({ x, y: y - 1 });
  if (y < mapSize) neighbors.push({ x, y: y + 1 });
  if (x > 0) neighbors.push({ x: x - 1, y });
  if (x < mapSize) neighbors.push({ x: x + 1, y });

  return neighbors;
};

const isGoal = ({ x, y, ...rest }, mapSize) => {
  return x === mapSize && y === mapSize;
};

const getKey = ({ x, y, ...rest }) => {
  return `${x}_${y}`;
};

const getHeuristic = ({ x, y, ...rest }, mapSize) => {
  return Math.abs(mapSize - x + (mapSize - y));
};

const calculateMapCost = (originalCost, tileX, tileY) => {
  return ((originalCost - 1 + tileX + tileY) % 9) + 1;
};

const findPath = (map, mapSize, mapTileSize) => {
  let frontier = [{ x: 0, y: 0, tileX: 0, tileY: 0, priority: 0 }];
  let visited = {};
  visited["0_0"] = null;
  let pathCost = {};
  pathCost["0_0"] = 0;
  let current;

  while ((current = frontier.shift())) {
    if (isGoal(current, mapSize)) {
      break;
    }

    const key = getKey(current);
    const neighbors = getNeighbors(current, mapSize);
    for (let i = 0; i < neighbors.length; ++i) {
      const next = neighbors[i];
      const { x: originalX, y: originalY } = next;

      const x = originalX % mapTileSize;
      const y = originalY % mapTileSize;
      const tileX = Math.floor(originalX / mapTileSize);
      const tileY = Math.floor(originalY / mapTileSize);

      const originalMapCost = map[y][x];
      const mapCost = calculateMapCost(originalMapCost, tileX, tileY);
      const nextKey = getKey(next);
      const newCost = pathCost[key] + mapCost;
      if (
        (!pathCost[nextKey] && pathCost[nextKey] !== 0) ||
        newCost < pathCost[nextKey]
      ) {
        pathCost[nextKey] = newCost;
        frontier.push({
          ...next,
          tileX,
          tileY,
          priority: newCost + getHeuristic(next, mapSize),
        });
        frontier.sort((a, b) => a.priority - b.priority); // Since we don't have a real PriorityQueue, just sort
        visited[nextKey] = current;
      }
    }
  }

  return pathCost[`${mapSize}_${mapSize}`];
};

function solvePartOne(input) {
  return findPath(input, 99, 100);
}

console.log(solvePartOne(input));

function solvePartTwo(input) {
  return findPath(input, 100 * 5 - 1, 100);
}

console.log(solvePartTwo(input));
