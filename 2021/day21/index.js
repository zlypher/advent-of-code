// Day 21: Dirac Dice
const fs = require("fs");

const prepareInput = () =>
  fs.readFileSync("./input.txt").toString().split("\r\n").map(parseStartingPos);

const parseStartingPos = (line) => {
  const re = /^Player \d starting position: (\d)/;
  const matches = line.match(re);
  return parseInt(matches[1], 10);
};

const input = prepareInput();

function solvePartOne(input) {
  let scores = [0, 0];
  let pos = [...input];
  let dice = 1;
  let rolls = 0;
  let turn = 0;

  while (Math.max(...scores) < 1000) {
    // ...
    pos[turn] = ((pos[turn] + 3 * dice + 3 - 1) % 10) + 1;
    scores[turn] += pos[turn];
    dice += 3;
    rolls += 3;
    turn = (turn + 1) % 2;
  }

  return rolls * Math.min(...scores);
}

console.log(solvePartOne(input));

const rolls = [
  [3, 1],
  [4, 3],
  [5, 6],
  [6, 7],
  [7, 6],
  [8, 3],
  [9, 1],
];

const playQuantum = (scores, pos, turn) => {
  // if winning score, return
  if (Math.max(...scores) >= 21) {
    if (scores[0] >= 21) {
      return [1, 0];
    } else {
      return [0, 1];
    }
  }

  let playerScore = [0, 0];
  const newTurn = (turn + 1) % 2;

  rolls.forEach(([roll, freq]) => {
    const newPlayerPos = ((pos[turn] + roll - 1) % 10) + 1;
    const newScores = [...scores];
    newScores[turn] += newPlayerPos;

    const newPos = [...pos];
    newPos[turn] = newPlayerPos;

    const [p1Score, p2Score] = playQuantum(newScores, newPos, newTurn);
    playerScore = [
      playerScore[0] + freq * p1Score,
      playerScore[1] + freq * p2Score,
    ];
  });

  return playerScore;
};

function solvePartTwo(input) {
  const [p1Wins, p2Wins] = playQuantum([0, 0], [...input], 0);
  return Math.max(p1Wins, p2Wins);
}

console.log(solvePartTwo(input));
