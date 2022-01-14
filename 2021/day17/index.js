// Day 17: Trick Shot
const fs = require("fs");

const prepareInput = () => fs.readFileSync("./input.txt").toString();

const input = prepareInput();

const findTarget = (input) => {
  const re = /target area: x=(-?\d*)..(-?\d*), y=(-?\d*)..(-?\d*)/;
  const matches = input.match(re);
  return [
    parseInt(matches[1], 10),
    parseInt(matches[2], 10),
    parseInt(matches[3], 10),
    parseInt(matches[4], 10),
  ];
};

const simulate = (x, y, target) => {
  let currX = 0;
  let currY = 0;
  let velX = x;
  let velY = y;
  let [tMinX, tMaxX, tMinY, tMaxY] = target;
  let maxY = 0;

  while (currX < tMaxX && currY > tMinY) {
    currX += velX;
    currY += velY;
    velX = Math.max(0, velX - 1);
    velY -= 1;

    maxY = Math.max(maxY, currY);

    // check hit
    if (tMinX <= currX && currX <= tMaxX && tMinY <= currY && currY <= tMaxY) {
      return [true, maxY];
    }
  }

  return [false, -1];
};

function solvePartOne(input) {
  const target = findTarget(input);
  let maxY = 0;

  for (let x = 0; x < 1000; ++x) {
    for (let y = 0; y < 1000; ++y) {
      const [didHit, currMaxY] = simulate(x, y, target);
      if (didHit) {
        maxY = Math.max(maxY, currMaxY);
      }
    }
  }

  return maxY;
}

console.log(solvePartOne(input));

const simulatePartTwo = (x, y, target) => {
  let currX = 0;
  let currY = 0;
  let velX = x;
  let velY = y;
  let [tMinX, tMaxX, tMinY, tMaxY] = target;

  while (currX < tMaxX && currY > tMinY) {
    currX += velX;
    currY += velY;
    velX = Math.max(0, velX - 1);
    velY -= 1;

    if (tMinX <= currX && currX <= tMaxX && tMinY <= currY && currY <= tMaxY) {
      return true;
    }
  }

  return false;
};

function solvePartTwo(input) {
  const target = findTarget(input);
  const hitVelocities = [];

  for (let x = 0; x < 1000; ++x) {
    for (let y = -1000; y < 1000; ++y) {
      const didHit = simulatePartTwo(x, y, target);
      if (didHit) {
        hitVelocities.push([x, y]);
      }
    }
  }

  return hitVelocities.length;
}

console.log(solvePartTwo(input));
