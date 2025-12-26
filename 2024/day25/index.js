import fs from "fs";

const prepareInput = () => {
  let locks = [];
  let keys = [];

  let line;
  const lines = fs.readFileSync("./input.txt").toString().split("\r\n");

  let inputs = [];
  let current = [];
  while (typeof (line = lines.shift()) !== "undefined") {
    if (line === "") {
      inputs.push(current);
      current = [];
      continue;
    }

    current.push(line.split(""));
  }

  inputs.push(current);

  for (let input of inputs) {
    let indicator = input[0][0];
    let vals = [-1, -1, -1, -1, -1];

    for (let i = 0; i < input.length; ++i) {
      for (let j = 0; j < input[i].length; ++j) {
        let c = input[i][j];

        if (c === "#") {
          vals[j]++;
        }
      }
    }

    if (indicator === "#") {
      locks.push(vals);
    } else {
      keys.push(vals);
    }
  }

  return { locks, keys };
};

const input = prepareInput();

function solvePartOne(input) {
  const { locks, keys } = input;
}

console.log(solvePartOne(input));

function solvePartTwo(input) {
  const { locks, keys } = input;

  let matches = [];

  for (let lock of locks) {
    for (let key of keys) {
      if (check(lock, key)) {
        matches.push([lock, key]);
      }
    }
  }

  return matches.length;
}

console.log(solvePartTwo(input));

function check(lock, key) {
  for (let i = 0; i < lock.length; ++i) {
    if (lock[i] + key[i] > 5) return false;
  }

  return true;
}
