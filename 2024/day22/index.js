const fs = require("fs");

const cache = {};

const prepareInput = () => {
  let numbers = [];

  const lines = fs.readFileSync("./input.txt").toString().split("\r\n");

  while (typeof (line = lines.shift()) !== "undefined") {
    numbers.push(parseInt(line, 10));
  }

  return { numbers };
};

const input = prepareInput();

function solvePartOne(input) {
  const { numbers } = input;

  let sum = 0;

  for (let num of numbers) {
    const result = calculateSecretNumber(num, 2000);
    sum += result;
  }

  return sum;
}

// console.log(solvePartOne(input));

function solvePartTwo(input) {
  const { numbers } = input;

  let sequence = {};
  for (let num of numbers) {
    const numberSeq = calculateSecretNumberV2(num, 2000);
    for (let [key, val] of Object.entries(numberSeq)) {
      if (typeof sequence[key] === "undefined") {
        sequence[key] = 0;
      }

      sequence[key] += val;
    }
  }

  return Math.max(...Object.values(sequence));
}

console.log(solvePartTwo(input));

function calculateSecretNumber(initial, count) {
  let result = initial;

  while (count > 0) {
    result = calculateNumber(result);
    count--;
  }

  return result;
}

function calculateSecretNumberV2(initial, count) {
  let result = initial;
  let value = result % 10;
  let prevValue = value;
  let seqMap = {};
  let sequence = [];
  while (sequence.length < 3) {
    result = calculateNumber(result);
    value = result % 10;
    sequence.push(value - prevValue);
    prevValue = value;
    count--;
  }

  while (count > 0) {
    result = calculateNumber(result);
    value = result % 10;
    sequence.push(value - prevValue);
    prevValue = value;

    let key = sequence.join("-");

    if (typeof seqMap[key] === "undefined") {
      seqMap[key] = value;
    }

    sequence.shift();
    count--;
  }

  return seqMap;
}

function calculateNumber(num) {
  if (typeof cache[num] !== "undefined") {
    return cache[num];
  }

  let secret = num;

  secret = (((secret ^ (secret * 64)) % 16777216) + 16777216) % 16777216;
  secret =
    (((secret ^ Math.floor(secret / 32)) % 16777216) + 16777216) % 16777216;
  secret = (((secret ^ (secret * 2048)) % 16777216) + 16777216) % 16777216;

  cache[num] = secret;
  return secret;
}
