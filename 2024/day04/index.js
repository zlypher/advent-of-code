const fs = require("fs");

const prepareInput = () => {
  const map = [];

  const lines = fs.readFileSync("./input.txt").toString().split("\r\n");
  while ((line = lines.shift())) {
    const chars = line.split("");
    map.push(chars);
  }

  return map;
};

const input = prepareInput();

function solvePartOne(input) {
  let totalCount = 0;

  for (let i = 0; i < input.length; ++i) {
    for (let j = 0; j < input[i].length; ++j) {
      let char = input[i][j];
      if (char !== "X") continue;

      totalCount += checkDirection(input, i, j, 0, -1) ? 1 : 0;
      totalCount += checkDirection(input, i, j, 0, 1) ? 1 : 0;
      totalCount += checkDirection(input, i, j, -1, 0) ? 1 : 0;
      totalCount += checkDirection(input, i, j, 1, 0) ? 1 : 0;
      totalCount += checkDirection(input, i, j, -1, -1) ? 1 : 0;
      totalCount += checkDirection(input, i, j, -1, 1) ? 1 : 0;
      totalCount += checkDirection(input, i, j, 1, -1) ? 1 : 0;
      totalCount += checkDirection(input, i, j, 1, 1) ? 1 : 0;
    }
  }

  return totalCount;
}

console.log(solvePartOne(input));

function solvePartTwo(input) {
  let totalCount = 0;

  for (let i = 1; i < input.length - 1; ++i) {
    for (let j = 1; j < input[i].length - 1; ++j) {
      let char = input[i][j];
      if (char !== "A") continue;

      if (checkDirectionV2(input, i, j)) {
        totalCount++;
      }
    }
  }
  return totalCount;
}

console.log(solvePartTwo(input));

function checkDirection(map, posX, posY, dirX, dirY) {
  const path = ["X", "M", "A", "S"];

  if (!boundsCheck(map, posX, posY, dirX, dirY)) {
    return false;
  }

  for (let i = 0; i < path.length; ++i) {
    const target = path[i];
    const actual = map[posX + dirX * i][posY + dirY * i];

    if (target !== actual) {
      return false;
    }
  }
  return true;
}

function boundsCheck(map, posX, posY, dirX, dirY) {
  if (posX + dirX * 3 < 0) return false;
  if (posX + dirX * 3 >= map.length) return false;
  if (posY + dirY * 3 < 0) return false;
  if (posY + dirY * 3 >= map[posX].length) return false;

  return true;
}

function checkDirectionV2(map, posX, posY) {
  const leftToBottomRight =
    (map[posX - 1][posY - 1] === "M" && map[posX + 1][posY + 1] === "S") ||
    (map[posX - 1][posY - 1] === "S" && map[posX + 1][posY + 1] === "M");
  const leftToTopRight =
    (map[posX + 1][posY - 1] === "M" && map[posX - 1][posY + 1] === "S") ||
    (map[posX + 1][posY - 1] === "S" && map[posX - 1][posY + 1] === "M");
  return leftToBottomRight && leftToTopRight;
}
