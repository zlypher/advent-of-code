const fs = require("fs");
const { printMap } = require("../../utils/print-map");
const { PriorityQueue } = require("../../utils/priority-queue");

const prepareInput = () => {
  const bytes = [];

  const lines = fs.readFileSync("./input.txt").toString().split("\r\n");

  let row = 0;
  while (typeof (line = lines.shift()) !== "undefined") {
    const fields = line.split(",");
    bytes.push([parseInt(fields[0], 10), parseInt(fields[1], 10)]);
  }

  return { bytes };
};

const input = prepareInput();

function solvePartOne(input) {
  const { bytes } = input;
  const width = 71;
  const height = 71;
  const num = 1024;

  const filteredBytes = bytes.slice(0, num);
  const map = createMap(width, height, filteredBytes);
  const goal = [width - 1, height - 1];

  const moveFrom = findPath(map, width, height, goal);
  const path = extractPath(moveFrom, goal);

  return path.length;
}

console.log(solvePartOne(input));

function solvePartTwo(input) {
  const { bytes } = input;
  const width = 71;
  const height = 71;
  let num = 1024;

  const filteredBytes = bytes.slice(0, num);
  const map = createMap(width, height, filteredBytes);
  const goal = [width - 1, height - 1];

  let moveFrom = findPath(map, width, height, goal);
  let pathMap = extractPathMap(moveFrom, goal);
  let failsafe = 5000;

  while (true && failsafe-- > 0) {
    num++;
    const nextByte = bytes[num];
    map[nextByte[1]][nextByte[0]] = "#";

    if (pathMap[key(nextByte)]) {
      moveFrom = findPath(map, width, height, goal);

      if (!moveFrom) {
        return nextByte.join(",");
      }

      pathMap = extractPathMap(moveFrom, goal);
    }
  }

  return -1;
}

console.log(solvePartTwo(input));

function createMap(width, height, bytes) {
  let map = [];

  for (let i = 0; i < height; ++i) {
    let row = [];
    for (let j = 0; j < width; ++j) {
      row.push(".");
    }

    map.push(row);
  }

  for (let [x, y] of bytes) {
    map[y][x] = "#";
  }

  return map;
}

function key(cell) {
  return cell.join(",");
}

function compare(cellA, cellB) {
  return cellA[0] === cellB[0] && cellA[1] === cellB[1];
}

function getNeighbors(cell, width, height, map) {
  return [
    [cell[0] - 1, cell[1]],
    [cell[0] + 1, cell[1]],
    [cell[0], cell[1] - 1],
    [cell[0], cell[1] + 1],
  ].filter(
    (cell) =>
      cell[0] >= 0 &&
      cell[1] >= 0 &&
      cell[0] <= width - 1 &&
      cell[1] <= height - 1 &&
      map[cell[1]][cell[0]] !== "#"
  );
}

function heuristic(goal, cell) {
  return Math.abs(goal[0] - cell[0]) + Math.abs(goal[1] - cell[1]);
}

function extractPath(moveFrom, goal) {
  let current = goal;
  let path = [];
  while (!compare(current, [0, 0])) {
    path.push(current);
    current = moveFrom[key(current)];
  }

  return path;
}

function extractPathMap(moveFrom, goal) {
  let current = goal;
  let path = {};
  while (!compare(current, [0, 0])) {
    path[key(current)] = true;
    current = moveFrom[key(current)];
  }

  return path;
}

function findPath(map, width, height, goal) {
  const frontier = new PriorityQueue();
  frontier.enqueue([0, 0], 0);
  const moveFrom = {};
  moveFrom[key([0, 0])] = undefined;
  const costsUntil = {};
  costsUntil[key([0, 0])] = 0;

  while (frontier.size() > 0) {
    let { node: current } = frontier.dequeue();

    if (compare(current, goal)) {
      return moveFrom;
    }

    const neighbors = getNeighbors(current, width, height, map);
    for (let neighbor of neighbors) {
      const neighborCost = costsUntil[key(current)] + 1;
      const neighborKey = key(neighbor);
      if (!costsUntil[neighborKey] || neighborCost < costsUntil[neighborKey]) {
        costsUntil[neighborKey] = neighborCost;
        const priority = neighborCost + heuristic(goal, neighbor);
        frontier.enqueue(neighbor, priority);
        moveFrom[neighborKey] = current;
      }
    }
  }

  return null;
}
