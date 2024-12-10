const fs = require("fs");

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

  while (currentStep < LIMIT_STEPS) {
    let move = getMove(guard.dir);
    if (outOfBounds(guard, move, maxX, maxY)) {
      break;
    }

    while (!guardCanMove(guard, move, map)) {
      guard.dir = rotateGuard(guard);
      move = getMove(guard.dir);
    }

    // Experiment with new obstruction
    possiblySpots += simulateObstruction(guard, move, map, maxX, maxY) ? 1 : 0;

    const nextPos = updatePosition(guard, move);
    markPosition(nextPos, map, mark(guard.dir));

    currentStep++;
  }

  return possiblySpots;
}

function simulateObstruction(guard, move, map, maxX, maxY) {
  const obstruction = {
    x: guard.x + move.x,
    y: guard.y + move.y,
  };

  const field = map[obstruction.y][obstruction.x];
  if (field === "^" || field === "<" || field === ">" || field === "v") {
    return false;
  }

  let simulatedGuard = { ...guard };
  simulatedGuard.dir = rotateGuard(simulatedGuard);
  let simulatedMove = move;

  let currentStep = 0;
  const LIMIT_STEPS = 5000;

  while (currentStep < LIMIT_STEPS) {
    simulatedMove = getMove(simulatedGuard.dir);
    if (outOfBounds(simulatedGuard, simulatedMove, maxX, maxY)) {
      break;
    }

    while (!guardCanMove(simulatedGuard, simulatedMove, map)) {
      simulatedGuard.dir = rotateGuard(simulatedGuard);
      simulatedMove = getMove(simulatedGuard.dir);
    }

    updatePosition(simulatedGuard, simulatedMove);

    if (
      map[simulatedGuard.y][simulatedGuard.x] === mark(simulatedGuard.dir) ||
      (guard.x === obstruction.x && guard.y === obstruction.y)
    ) {
      console.log(obstruction);
      return true;
    }

    currentStep++;
  }

  return false;
}

console.log(solvePartTwo(input));
