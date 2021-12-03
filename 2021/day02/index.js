// Day 1: Sonar Sweep
const fs = require("fs");

const prepareInput = () =>
  fs
    .readFileSync("./input.txt")
    .toString()
    .split("\r\n")
    .map((inp) => {
      const [dir, valStr] = inp.split(" ");
      return {
        dir,
        val: parseInt(valStr, 10),
      };
    });

const input = prepareInput();

function solvePartOne(input) {
  const { horizontal, depth } = input.reduce(
    (prev, curr) => {
      const { dir, val } = curr;

      if (dir === "forward") {
        return {
          ...prev,
          horizontal: prev.horizontal + val,
        };
      } else if (dir === "up") {
        return {
          ...prev,
          depth: prev.depth - val,
        };
      } else if (dir === "down") {
        return {
          ...prev,
          depth: prev.depth + val,
        };
      }

      // NOOP
      return prev;
    },
    { horizontal: 0, depth: 0 }
  );

  return horizontal * depth;
}

console.log(solvePartOne(input));

function solvePartTwo(input) {
  const { horizontal, depth } = input.reduce(
    (prev, curr) => {
      const { dir, val } = curr;

      if (dir === "forward") {
        return {
          ...prev,
          horizontal: prev.horizontal + val,
          depth: prev.depth + prev.aim * val,
        };
      } else if (dir === "up") {
        return {
          ...prev,
          aim: prev.aim - val,
        };
      } else if (dir === "down") {
        return {
          ...prev,
          aim: prev.aim + val,
        };
      }

      // NOOP
      return prev;
    },
    { horizontal: 0, depth: 0, aim: 0 }
  );

  return horizontal * depth;
}

console.log(solvePartTwo(input));
