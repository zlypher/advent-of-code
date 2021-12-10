// Day 10: Syntax Scoring
const fs = require("fs");

const prepareInput = () =>
  fs.readFileSync("./input.txt").toString().split("\r\n");

const input = prepareInput();

const isOpening = (char) => ["(", "[", "{", "<"].indexOf(char) !== -1;

const getScore = (char) => {
  switch (char) {
    case ")":
      return 3;
    case "]":
      return 57;
    case "}":
      return 1197;
    case ">":
      return 25137;
  }

  throw "noop";
};

const isMatching = (open, close) => {
  return (
    (open === "(" && close === ")") ||
    (open === "[" && close === "]") ||
    (open === "{" && close === "}") ||
    (open === "<" && close === ">")
  );
};

const parseLine = (line) => {
  const stack = [];

  for (let i = 0; i < line.length; ++i) {
    const char = line[i];
    if (isOpening(char)) {
      stack.push(char);
    } else {
      const last = stack[stack.length - 1];
      if (isMatching(last, char)) {
        stack.pop();
      } else {
        return getScore(char);
      }
    }
  }

  return 0;
};

function solvePartOne(input) {
  let total = 0;

  input.forEach((line) => {
    const score = parseLine(line);
    total += score;
  });
  return total;
}

console.log(solvePartOne(input));

const filterIncomplete = (line) => {
  const stack = [];

  for (let i = 0; i < line.length; ++i) {
    const char = line[i];
    if (isOpening(char)) {
      stack.push(char);
    } else {
      const last = stack[stack.length - 1];
      if (isMatching(last, char)) {
        stack.pop();
      } else {
        return false;
      }
    }
  }

  return stack;
};

const getClosing = (char) => {
  switch (char) {
    case "(":
      return ")";
    case "[":
      return "]";
    case "{":
      return "}";
    case "<":
      return ">";
  }

  throw "noop";
};

const getScoreTwo = (char) => {
  switch (char) {
    case ")":
      return 1;
    case "]":
      return 2;
    case "}":
      return 3;
    case ">":
      return 4;
  }

  throw "noop";
};
function solvePartTwo(input) {
  let scores = [];
  let incomplete = input.map(filterIncomplete).filter((r) => !!r);
  incomplete.forEach((remainingChars) => {
    let score = 0;

    remainingChars.reverse();

    remainingChars.forEach((c) => {
      score = score * 5 + getScoreTwo(getClosing(c));
    });

    scores.push(score);
  });

  scores.sort((a, b) => a - b);
  return scores[(scores.length - 1) / 2];
}

console.log(solvePartTwo(input));
