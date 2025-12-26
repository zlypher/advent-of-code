const fs = require("fs");
const { printMap } = require("../../utils/print-map");

const prepareInput = () => {
  const map = [];
  let guard = null;
  let row = 0;

  const lines = fs.readFileSync("./input.txt").toString().split("\r\n");
  while ((line = lines.shift())) {
    const fields = line.split("");

    if (!guard) {
      guard = findGuard(fields, row);
    }

    map.push(fields);
    row++;
  }

  return { map, guard };
};

function findGuard(fields, row) {
  let idx = fields.indexOf("^");
  if (idx !== -1) {
    return { x: idx, y: row, dir: "UP" };
  }

  idx = fields.indexOf("v");
  if (idx !== -1) {
    return { x: idx, y: row, dir: "DOWN" };
  }

  idx = fields.indexOf("<");
  if (idx !== -1) {
    return { x: idx, y: row, dir: "LEFT" };
  }

  idx = fields.indexOf(">");
  if (idx !== -1) {
    return { x: idx, y: row, dir: "RIGHT" };
  }

  return null;
}

const input = prepareInput();

function solvePartOne(input) {
  const { map, guard } = input;

  const maxY = map.length - 1;
  const maxX = map[0].length - 1;

  let distinctCount = 1;
  let currentStep = 0;
  const LIMIT_STEPS = 10000;

  markPosition(guard, map);

  while (currentStep < LIMIT_STEPS) {
    let move = getMove(guard.dir);
    if (outOfBounds(guard, move, maxX, maxY)) {
      break;
    }

    while (!guardCanMove(guard, move, map)) {
      guard.dir = rotateGuard(guard);
      move = getMove(guard.dir);
    }

    const nextPos = updatePosition(guard, move);
    distinctCount += markPosition(nextPos, map);

    currentStep++;
  }

  return distinctCount;
}

function outOfBounds(guard, move, maxX, maxY) {
  if (guard.x + move.x < 0) return true;
  if (guard.y + move.y < 0) return true;
  if (guard.x + move.x > maxX) return true;
  if (guard.y + move.y > maxY) return true;

  return false;
}

function getMove(dir) {
  switch (dir) {
    case "UP":
      return { x: 0, y: -1 };
    case "DOWN":
      return { x: 0, y: 1 };
    case "LEFT":
      return { x: -1, y: 0 };
    case "RIGHT":
      return { x: 1, y: 0 };
  }
}

function guardCanMove(guard, move, map) {
  const nextPosX = guard.x + move.x;
  const nextPosY = guard.y + move.y;

  return map[nextPosY][nextPosX] !== "#";
}

function guardCanMoveV2(guard, move, map, obstruction) {
  const nextPosX = guard.x + move.x;
  const nextPosY = guard.y + move.y;

  return map[nextPosY][nextPosX] !== "#" && map[nextPosY][nextPosX] !== "O";
}

function rotateGuard(guard) {
  switch (guard.dir) {
    case "UP":
      return "RIGHT";
    case "DOWN":
      return "LEFT";
    case "LEFT":
      return "UP";
    case "RIGHT":
      return "DOWN";
  }
}

function mark(dir) {
  switch (dir) {
    case "UP":
      return "^";
    case "DOWN":
      return "v";
    case "LEFT":
      return "<";
    case "RIGHT":
      return ">";
  }
}

function updatePosition(guard, move) {
  guard.x += move.x;
  guard.y += move.y;

  return guard;
}

function markPosition(guard, map, mark = "X") {
  if (map[guard.y][guard.x] === mark) return 0;
  else {
    map[guard.y][guard.x] = mark;
    return 1;
  }
}

// console.log(solvePartOne(input));

function solvePartTwo(input) {
  const { map, guard } = input;

  const maxY = map.length - 1;
  const maxX = map[0].length - 1;

  let possiblySpots = 0;
  let currentStep = 0;
  const LIMIT_STEPS = 100000;

  let found = [];
  let visited = {};

  while (currentStep < LIMIT_STEPS) {
    visited[keySimple(guard)] = true;
    let move = getMove(guard.dir);
    if (outOfBounds(guard, move, maxX, maxY)) {
      break;
    }

    if (!guardCanMove(guard, move, map)) {
      guard.dir = rotateGuard(guard);
      continue;
    }

    // Experiment with new obstruction
    const obstr = {
      x: guard.x + move.x,
      y: guard.y + move.y,
    };
    if (!visited[keySimple(obstr)]) {
      if (simulateObstruction(guard, move, map, maxX, maxY, obstr)) {
        possiblySpots++;
        found.push(obstr);
      }
    }

    const nextPos = updatePosition(guard, move);
    markPosition(nextPos, map, mark(guard.dir));

    currentStep++;
  }

  return possiblySpots;
}

function keySimple(obj) {
  return obj.x + "-" + obj.y;
}

function key(guard) {
  return guard.x + "-" + guard.y + "-" + guard.dir;
}

function simulateObstruction(guard, move, map, maxX, maxY, obstruction) {
  let simulatedGuard = { ...guard };
  let simulatedMove = move;

  let currentStep = 0;
  const LIMIT_STEPS = 10000;
  const visited = {};

  const prevField = map[obstruction.y][obstruction.x];
  map[obstruction.y][obstruction.x] = "O";

  while (currentStep < LIMIT_STEPS) {
    simulatedMove = getMove(simulatedGuard.dir);
    if (outOfBounds(simulatedGuard, simulatedMove, maxX, maxY)) {
      break;
    }

    if (!guardCanMoveV2(simulatedGuard, simulatedMove, map, obstruction)) {
      simulatedGuard.dir = rotateGuard(simulatedGuard);
      continue;
    }

    updatePosition(simulatedGuard, simulatedMove);

    if (visited[key(simulatedGuard)]) {
      map[obstruction.y][obstruction.x] = prevField;
      return obstruction;
    } else {
      visited[key(simulatedGuard)] = true;
    }

    currentStep++;
  }

  map[obstruction.y][obstruction.x] = prevField;
  return null;
}

console.log(solvePartTwo(input));
