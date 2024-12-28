const fs = require("fs");
const { loadCharMap } = require("../../utils/load-char-map");
const { printMap } = require("../../utils/print-map");
const { PriorityQueue } = require("../../utils/priority-queue");

const prepareInput = () => {
  const map = loadCharMap("./input.txt");

  return { map };
};

const input = prepareInput();

function solvePartOne(input) {
  const { map } = input;

  const [start, goal] = findStartAndGoal(map);
  console.log(start, goal);

  const { moveFrom, costsUntil } = findPath(
    map,
    map[0].length,
    map.length,
    [...start, "E"],
    goal
  );

  return Math.min(
    costsUntil[key([...goal, "N"])] || Number.MAX_SAFE_INTEGER,
    costsUntil[key([...goal, "S"])] || Number.MAX_SAFE_INTEGER,
    costsUntil[key([...goal, "W"])] || Number.MAX_SAFE_INTEGER,
    costsUntil[key([...goal, "E"])] || Number.MAX_SAFE_INTEGER
  );
}

// console.log(solvePartOne(input));

function solvePartTwo(input) {
  let { map } = input;

  const [start, goal] = findStartAndGoalV2(map);
  const result = findPathV2(
    map,
    map[0].length,
    map.length,
    [...start, "E"],
    goal
  );

  const { moveFrom, costsUntil } = result;

  const min = Math.min(
    costsUntil[key([...goal, "N"])] || Number.MAX_SAFE_INTEGER,
    costsUntil[key([...goal, "S"])] || Number.MAX_SAFE_INTEGER,
    costsUntil[key([...goal, "W"])] || Number.MAX_SAFE_INTEGER,
    costsUntil[key([...goal, "E"])] || Number.MAX_SAFE_INTEGER
  );
  let current = undefined;
  if (costsUntil[key([...goal, "N"])] === min) current = [...goal, "N"];
  else if (costsUntil[key([...goal, "S"])] === min) current = [...goal, "S"];
  else if (costsUntil[key([...goal, "E"])] === min) current = [...goal, "E"];
  else if (costsUntil[key([...goal, "W"])] === min) current = [...goal, "W"];

  let queue = [current];
  let seen = {};
  let seenFull = {};

  while (queue.length > 0) {
    const next = queue.shift();
    const striped = [next[0], next[1]];
    seen[key(striped)] = true;

    const move = moveFrom[key(next)];
    if (move) {
      for (let m of move) {
        if (!seenFull[m]) {
          queue.push(m);
          seenFull[key(m)] = true;
        }
      }
    } else {
      console.log("???");
    }
  }

  for (let key of Object.keys(seen)) {
    let [i, j] = key.split(",").map((n) => parseInt(n, 10));
    map[i][j] = "O";
  }

  printMap(map);

  return Object.keys(seen).length;
}

console.log(solvePartTwo(input));

function findStartAndGoalV2(map) {
  let start = null;
  let goal = null;

  for (let i = 0; i < map.length; ++i) {
    for (let j = 0; j < map[i].length; ++j) {
      if (map[i][j] === "S") {
        start = [i, j];
      } else if (map[i][j] === "E") {
        goal = [i, j];
      }
    }

    if (start && goal) {
      break;
    }
  }

  return [start, goal];
}

function findPathV2(map, width, height, start, goal) {
  const frontier = new PriorityQueue();
  frontier.enqueue(start, 0);
  const moveFrom = {};
  moveFrom[key(start)] = undefined;
  const costsUntil = {};
  costsUntil[key(start)] = 0;

  let foundPath = false;

  while (frontier.size() > 0) {
    let { node: current } = frontier.dequeue();

    if (compare(current, goal)) {
      foundPath = true;
    }

    const neighbors = getNeighborsV2(current, width, height, map);
    for (let { cell: neighbor, cost } of neighbors) {
      const neighborCost = costsUntil[key(current)] + cost;
      const neighborKey = key(neighbor);
      if (!costsUntil[neighborKey] || neighborCost <= costsUntil[neighborKey]) {
        if (
          !costsUntil[neighborKey] ||
          neighborCost < costsUntil[neighborKey]
        ) {
          moveFrom[neighborKey] = [current];
        } else if (neighborCost == costsUntil[neighborKey]) {
          if (!moveFrom[neighborKey]) moveFrom[neighborKey] = [];
          moveFrom[neighborKey].push(current);
        } else {
          console.log("wtf");
        }

        costsUntil[neighborKey] = neighborCost;
        const priority = neighborCost;
        frontier.enqueue(neighbor, priority);
      }
    }
  }

  if (foundPath) {
    return { moveFrom, costsUntil };
  }
  return null;
}

function getNeighborsV2(cell, width, height, map) {
  const otherDirs = ["N", "E", "W", "S"]
    .filter((dir) => dir !== cell[2])
    .map((dir) => {
      return { cell: [cell[0], cell[1], dir], cost: 1000 };
    });
  const possibleNeighbors = [...otherDirs, getNext(cell)];
  return possibleNeighbors.filter(
    ({ cell }) =>
      cell[0] >= 0 &&
      cell[1] >= 0 &&
      cell[0] <= height - 1 &&
      cell[1] <= width - 1 &&
      map[cell[0]][cell[1]] !== "#"
  );
}

// ----------------------------

function findStartAndGoal(map) {
  let start = null;
  let goal = null;

  for (let i = 0; i < map.length; ++i) {
    for (let j = 0; j < map[i].length; ++j) {
      if (map[i][j] === "S") {
        start = [j, i];
      } else if (map[i][j] === "E") {
        goal = [j, i];
      }
    }

    if (start && goal) {
      break;
    }
  }

  return [start, goal];
}

function findPath(map, width, height, start, goal) {
  const dirCost = {
    N: { N: 0, S: 2000, E: 1000, W: 1000 },
    S: { N: 2000, S: 0, E: 1000, W: 1000 },
    E: { N: 1000, S: 1000, E: 0, W: 2000 },
    W: { N: 1000, S: 1000, E: 2000, W: 0 },
  };
  const frontier = new PriorityQueue();
  frontier.enqueue(start, 0);
  const moveFrom = {};
  moveFrom[key(start)] = undefined;
  const costsUntil = {};
  costsUntil[key(start)] = 0;

  while (frontier.size() > 0) {
    let { node: current } = frontier.dequeue();

    if (compare(current, goal)) {
      return { moveFrom, costsUntil };
    }

    const neighbors = getNeighbors(current, width, height, map);
    for (let neighbor of neighbors) {
      const neighborCost =
        costsUntil[key(current)] + 1 + dirCost[current[2]][neighbor[2]];
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

function heuristic(goal, cell) {
  return Math.abs(goal[0] - cell[0]) + Math.abs(goal[1] - cell[1]);
}

function key(c) {
  return c.join(",");
}

function compare(cellA, cellB) {
  return cellA[0] === cellB[0] && cellA[1] === cellB[1];
}

function getNeighbors(cell, width, height, map) {
  return [
    [cell[0] - 1, cell[1], "W"],
    [cell[0] + 1, cell[1], "E"],
    [cell[0], cell[1] - 1, "N"],
    [cell[0], cell[1] + 1, "S"],
  ].filter(
    (cell) =>
      cell[0] >= 0 &&
      cell[1] >= 0 &&
      cell[0] <= width - 1 &&
      cell[1] <= height - 1 &&
      map[cell[1]][cell[0]] !== "#"
  );
}

function getNext(current) {
  return [
    { cell: [current[0] - 1, current[1], "N"], cost: 1 },
    { cell: [current[0] + 1, current[1], "S"], cost: 1 },
    { cell: [current[0], current[1] - 1, "W"], cost: 1 },
    { cell: [current[0], current[1] + 1, "E"], cost: 1 },
  ].filter(({ cell: c }) => c[2] === current[2])[0];
}
