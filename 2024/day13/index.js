const fs = require("fs");

const prepareInput = () => {
  const challenges = [];
  const lines = fs.readFileSync("./input.txt").toString().split("\r\n");

  const extractButton = (conf, regex) => {
    const matches = [...conf.matchAll(regex)];
    return [parseInt(matches[0][1], 10), parseInt(matches[0][2], 10)];
  };

  const extractPrize = (conf, regex) => {
    const matches = [...conf.matchAll(regex)];
    return [parseInt(matches[0][1], 10), parseInt(matches[0][2], 10)];
  };

  while (typeof (line = lines.shift()) !== "undefined") {
    if (line === "") continue;

    const buttonAConf = line;
    const buttonBConf = lines.shift();
    const prizeConf = lines.shift();

    const buttonRE = /X\+(\d*), Y\+(\d*)/g;
    const prizeRE = /X\=(\d*), Y\=(\d*)/g;

    challenges.push({
      buttonA: extractButton(buttonAConf, buttonRE),
      buttonB: extractButton(buttonBConf, buttonRE),
      prize: extractPrize(prizeConf, prizeRE),
    });
  }

  return { challenges };
};

const input = prepareInput();

function solvePartOne(input) {
  const { challenges } = input;

  let tokens = 0;
  for (let challenge of challenges) {
    tokens += testChallenge(challenge);
  }

  return tokens;
}

console.log(solvePartOne(input));

function solvePartTwo(input) {
  const { challenges } = input;

  let tokens = 0;
  for (let challenge of challenges) {
    tokens += testChallenge(challenge, 10000000000000);
  }

  return tokens;
}

console.log(solvePartTwo(input));

function testChallenge({ buttonA, buttonB, prize }, modifier = 0) {
  prize[0] = prize[0] + modifier;
  prize[1] = prize[1] + modifier;

  const det = buttonA[0] * buttonB[1] - buttonA[1] * buttonB[0];
  if (det === 0) {
    return 0;
  }

  const x = (prize[0] * buttonB[1] - prize[1] * buttonB[0]) / det;
  const y = (buttonA[0] * prize[1] - buttonA[1] * prize[0]) / det;

  if (x !== Math.trunc(x) || y !== Math.trunc(y)) return 0;

  return x * 3 + y * 1;
}
