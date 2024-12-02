// Day 18: Snailfish
const fs = require("fs");

const prepareInput = () =>
  fs
    .readFileSync("./input.txt")
    .toString()
    .split("\r\n")
    .map(parseSnailfishNumber);

const parseSnailfishNumber = (line) => {
  return JSON.parse(line);
};

const input = prepareInput();

const addNumbers = (numA, numB) => {
  return [numA, numB];
};

const tryExplode = (
  number,
  depth = 0,
  opts = { left: null, right: null, status: "searching", done: false }
) => {
  if (opts...) // TODO...
    
    
  if (Number.isInteger(number)) {
    return { done: false };
  }

  const [left, right] = number;
  if (depth === 4) {
    return {
      left,
      right,
      status: "exploding",
      done: true,
    };
  }

  let res = tryExplode(left, depth + 1);
  if (res.done) {
    number[0] = 0;
    if (res.status === "done") return res;

    if (res.right != null && Number.isInteger(right)) {
      number[1] = right + res.right;
      res.right = null;
      return res;
    }
  }

  res = tryExplode(right, depth + 1);
  if (res.done) {
    number[1] = 0;
    if (res.status === "done") return res;

    if (res.left != null && Number.isInteger(left)) {
      number[0] = left + res.left;
      res.left = null;
      return res;
    }
  }

  return {
    done: false,
  };
};

const trySplit = (number) => {
  const [left, right] = number;

  if (Number.isInteger(left)) {
    if (left >= 10) {
      number[0] = [Math.floor(left / 2), Math.ceil(left / 2)];
      return {
        done: true,
      };
    }
  } else {
    const res = trySplit(left);
    if (res.done) return res;
  }

  if (Number.isInteger(right)) {
    if (right >= 10) {
      number[1] = [Math.floor(right / 2), Math.ceil(right / 2)];
      return {
        done: true,
      };
    }
  } else {
    const res = trySplit(right);
    if (res.done) return res;
  }

  return {
    done: false,
  };
};

const reduceNumber = (number) => {
  while (true) {
    let res = tryExplode(number);
    if (res.done) continue;

    res = trySplit(number);
    if (res.done) continue;

    break;
  }

  return number;
};

const calculateMagnitude = (number) => {
  if (Number.isInteger(number)) {
    return number;
  }

  const [left, right] = number;

  return 3 * calculateMagnitude(left) + 2 * calculateMagnitude(right);
};

function solvePartOne(input) {
  let current = input.shift();

  while (input.length > 0) {
    const next = input.shift();

    const added = addNumbers(current, next);
    const reduced = reduceNumber(added);

    current = reduced;
  }

  console.log(JSON.stringify(current));
  return calculateMagnitude(current);
}

console.log(solvePartOne(input));

// function solvePartTwo(input) {}

// console.log(solvePartTwo(input));
