// Day 22: Reactor Reboot
const fs = require("fs");

const prepareInput = () =>
  fs.readFileSync("./input.txt").toString().split("\r\n").map(parseInstruction);

const parseInstruction = (line) => {
  const re = /^(on|off) x=(-?\d+)..(-?\d+),y=(-?\d+)..(-?\d+),z=(-?\d+)..(-?\d+)/;
  const matches = line.match(re);
  return [
    matches[1] === "on",
    parseInt(matches[2], 10),
    parseInt(matches[3], 10),
    parseInt(matches[4], 10),
    parseInt(matches[5], 10),
    parseInt(matches[6], 10),
    parseInt(matches[7], 10),
  ];
};

const input = prepareInput();

function solvePartOne(input) {
  const partOneInput = input.slice(0, 20);
  let map = [];
  partOneInput.forEach((data) => {
    const [toggle, x1, x2, y1, y2, z1, z2] = data;
    for (let x = x1; x <= x2; ++x) {
      if (!map[x]) map[x] = [];
      for (let y = y1; y <= y2; ++y) {
        if (!map[x][y]) map[x][y] = [];
        for (let z = z1; z <= z2; ++z) {
          map[x][y][z] = toggle;
        }
      }
    }
  });

  console.log(Object.values(map));
}

console.log(solvePartOne(input));

function solvePartTwo(input) {}

console.log(solvePartTwo(input));
