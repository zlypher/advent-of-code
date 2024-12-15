const fs = require("fs");
const { printMap } = require("../../utils/print-map");

const prepareInput = () => {
  const map = [];
  const sequence = [];
  const robot = { row: -1, col: -1 };

  const lines = fs.readFileSync("./input.txt").toString().split("\r\n");

  let row = 0;
  while (typeof (line = lines.shift()) !== "undefined") {
    if (line === "") break;

    const fields = line.split("");
    map.push(fields);

    const robotIdx = fields.indexOf("@");
    if (robotIdx !== -1) {
      robot.col = robotIdx;
      robot.row = row;
    }

    row++;
  }

  while (typeof (line = lines.shift()) !== "undefined") {
    sequence.push(...line.split(""));
  }

  return { map, robot, sequence };
};

const input = prepareInput();

function solvePartOne(input) {
  const { map, robot, sequence } = input;

  for (let move of sequence) {
    moveRobot(map, robot, move);
  }

  let sumCoords = 0;
  for (let i = 0; i < map.length; ++i) {
    for (let j = 0; j < map[i].length; ++j) {
      let item = map[i][j];
      if (item === "O") {
        sumCoords += i * 100 + j;
      }
    }
  }

  return sumCoords;
}

console.log(solvePartOne(input));

function solvePartTwo(input) {}

console.log(solvePartTwo(input));

function moveRobot(map, robot, move) {
  if (move === "<") {
    moveStep(map, robot, [0, -1]);
  } else if (move === ">") {
    moveStep(map, robot, [0, 1]);
  } else if (move === "v") {
    moveStep(map, robot, [1, 0]);
  } else if (move === "^") {
    moveStep(map, robot, [-1, 0]);
  }
}

function moveStep(map, robot, moveVec) {
  let found = false;
  let rowIdx = robot.row + moveVec[0];
  let colIdx = robot.col + moveVec[1];

  while (rowIdx > 0 && colIdx > 0) {
    if (map[rowIdx][colIdx] === "#") break;
    if (map[rowIdx][colIdx] === ".") {
      found = true;
      break;
    }

    rowIdx += moveVec[0];
    colIdx += moveVec[1];
  }

  if (found) {
    while (!(rowIdx === robot.row && colIdx === robot.col)) {
      map[rowIdx][colIdx] =
        map[rowIdx + moveVec[0] * -1][colIdx + moveVec[1] * -1];
      rowIdx += moveVec[0] * -1;
      colIdx += moveVec[1] * -1;
    }

    map[robot.row][robot.col] = ".";
    robot.row = robot.row + moveVec[0];
    robot.col = robot.col + moveVec[1];
  }
}
