const fs = require("fs");

const prepareInput = () => {
  const robots = [];
  const lines = fs.readFileSync("./input.txt").toString().split("\r\n");

  const extractRobot = (conf, regex) => {
    const matches = [...conf.matchAll(regex)];
    return {
      pos: {
        x: parseInt(matches[0][1], 10),
        y: parseInt(matches[0][2], 10),
      },
      v: {
        x: parseInt(matches[0][3], 10),
        y: parseInt(matches[0][4], 10),
      },
    };
  };

  while (typeof (line = lines.shift()) !== "undefined") {
    const regex = /p=(-?\d*),(-?\d*) v=(-?\d*),(-?\d*)/g;

    robots.push(extractRobot(line, regex));
  }

  return { robots };
};

const input = prepareInput();

function solvePartOne(input) {
  const { robots } = input;

  const seconds = 100;
  const width = 101;
  const height = 103;
  const quadrants = [
    [0, 0],
    [0, 0],
  ];

  for (let robot of robots) {
    const endPosition = {
      x: (((robot.pos.x + robot.v.x * seconds) % width) + width) % width,
      y: (((robot.pos.y + robot.v.y * seconds) % height) + height) % height,
    };

    const heightMid = Math.floor(height / 2);
    const widthMid = Math.floor(width / 2);

    if (endPosition.y === heightMid || endPosition.x === widthMid) continue;

    let yIdx = endPosition.y < heightMid ? 0 : 1;
    let xIdx = endPosition.x < widthMid ? 0 : 1;

    quadrants[yIdx][xIdx] += 1;
  }

  return quadrants.reduce((prev, curr) => {
    return prev * curr.reduce((p, c) => p * c, 1);
  }, 1);
}

console.log(solvePartOne(input));

function solvePartTwo(input) {
  const { robots } = input;

  const width = 101;
  const height = 103;

  for (let i = 0; i < width * height; ++i) {
    let duplicate = false;
    let map = {};
    for (let robot of robots) {
      const x = (((robot.pos.x + robot.v.x * i) % width) + width) % width;
      const y = (((robot.pos.y + robot.v.y * i) % height) + height) % height;

      if (map[x + "-" + y]) {
        duplicate = true;
        break;
      }

      map[x + "-" + y] = true;
    }

    if (!duplicate) {
      return i;
    }
  }

  return 0;
}

console.log(solvePartTwo(input));
