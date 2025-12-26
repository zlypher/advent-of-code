const fs = require("fs");

const numericKeypadMap = {
  A: {
    A: "A",
    0: "<A",
    1: "^<<A",
    2: "<^A",
    3: "^A",
    4: "^^<<A",
    5: "<^^A",
    6: "^^A",
    7: "^^^<<A",
    8: "<^^^A",
    9: "^^^A",
  },
  0: {
    A: ">A",
    0: "A",
    1: "^<A",
    2: "^A",
    3: "^>A",
    4: "^^<A",
    5: "^^A",
    6: "^^>A",
    7: "^^^<A",
    8: "^^^A",
    9: "^^^>A",
  },
  1: {
    A: ">>vA",
    0: ">vA",
    1: "A",
    2: ">A",
    3: ">>A",
    4: "^A",
    5: "^>A",
    6: "^>>A",
    7: "^^A",
    8: "^^>A",
    9: "^^>>A",
  },
  2: {
    A: "v>A",
    0: "vA",
    1: "<A",
    2: "A",
    3: ">A",
    4: "<^A",
    5: "^A",
    6: "^>A",
    7: "<^^A",
    8: "^^A",
    9: "^^>A",
  },
  3: {
    A: "vA",
    0: "<vA",
    1: "<<A",
    2: "<A",
    3: "A",
    4: "<<^A",
    5: "<^A",
    6: "^A",
    7: "<<^^A",
    8: "<^^A",
    9: "^^A",
  },
  4: {
    A: ">>vvA",
    0: ">vvA",
    1: "vA",
    2: "v>A",
    3: "v>>A",
    4: "A",
    5: ">A",
    6: ">>A",
    7: "^A",
    8: "^>A",
    9: "^>>A",
  },
  5: {
    A: "vv>A",
    0: "vvA",
    1: "<vA",
    2: "vA",
    3: "v>A",
    4: "<A",
    5: "A",
    6: ">A",
    7: "<^A",
    8: "^A",
    9: "^>A",
  },
  6: {
    A: "vvA",
    0: "<vvA",
    1: "<<vA",
    2: "<vA",
    3: "vA",
    4: "<<A",
    5: "<A",
    6: "A",
    7: "<<^A",
    8: "<^A",
    9: "^A",
  },
  7: {
    A: ">>vvvA",
    0: ">vvvA",
    1: "vvA",
    2: "vv>A",
    3: "vv>>A",
    4: "vA",
    5: "v>A",
    6: "v>>A",
    7: "A",
    8: ">A",
    9: ">>A",
  },
  8: {
    A: "vvv>A",
    0: "vvvA",
    1: "<vvA",
    2: "vvA",
    3: "vv>A",
    4: "<vA",
    5: "vA",
    6: "v>A",
    7: "<A",
    8: "A",
    9: ">A",
  },
  9: {
    A: "vvvA",
    0: "<vvvA",
    1: "<<vvA",
    2: "<vvA",
    3: "vvA",
    4: "<<vA",
    5: "<vA",
    6: "vA",
    7: "<<A",
    8: "<A",
    9: "A",
  },
};

const directionalKeypadMap = {
  A: {
    A: "A",
    ">": "vA",
    v: "<vA",
    "<": "v<<A",
    "^": "<A",
  },
  ">": {
    A: "^A",
    ">": "A",
    v: "<A",
    "<": "<<A",
    "^": "<^A",
  },
  v: {
    A: "^>A",
    ">": ">A",
    v: "A",
    "<": "<A",
    "^": "^A",
  },
  "<": {
    A: ">>^A",
    ">": ">>A",
    v: ">A",
    "<": "A",
    "^": ">^A",
  },
  "^": {
    A: ">A",
    ">": "v>A",
    v: "vA",
    "<": "v<A",
    "^": "A",
  },
};

const prepareInput = () => {
  let codes = [];

  const lines = fs.readFileSync("./input.txt").toString().split("\r\n");

  while (typeof (line = lines.shift()) !== "undefined") {
    codes.push(line);
  }

  return { codes };
};

const input = prepareInput();

function solvePartOne(input) {
  const { codes } = input;

  let sum = 0;

  for (let code of codes) {
    const result = calculateComplexity(code);
    sum += result;
  }

  return sum;
}

console.log(solvePartOne(input));

function solvePartTwo(input) {
  const { codes } = input;

  let sum = 0;

  for (let code of codes) {
    const result = calculateComplexityV2(code);
    sum += result;
  }

  return sum;
}

console.log(solvePartTwo(input));

function calculateComplexity(code) {
  const seq = calculate(
    directionalKeypadMap,
    calculate(directionalKeypadMap, calculate(numericKeypadMap, code))
  );

  const len = seq.length;
  const val = parseInt(code, 10);

  console.log(code, ":", len, "*", val, "=", len * val);

  return len * val;
}

function calculateComplexityV2(code) {
  let seq = calculate(numericKeypadMap, code);
  let count = 25;
  // Runs into error
  // while (count > 0) {
  //   seq = calculate(directionalKeypadMap, seq);
  //   count--;
  // }

  const len = seq.length;
  const val = parseInt(code, 10);

  console.log(code, ":", len, "*", val);

  return len * val;
}

function calculate(map, code) {
  let completeSequence = [];
  let current = "A";

  for (let char of code) {
    const sequence = enter(map, char, current);
    current = char;
    completeSequence.push(sequence);
  }
  return completeSequence.join("");
}

function enter(map, target, current) {
  return map[current][target];
}
