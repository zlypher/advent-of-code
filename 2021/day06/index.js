// Day 6: Lanternfish
const fs = require("fs");

const prepareInput = () =>
  fs
    .readFileSync("./input.txt")
    .toString()
    .split(",")
    .map((n) => parseInt(n, 10));

const input = prepareInput();

const simulateFish = (input, days) => {
  let fish = [...input];
  const RESET_TIMER = 6;
  const NEW_TIMER = 8;

  for (let day = 0; day < days; ++day) {
    let newFish = [];

    for (let i = 0; i < fish.length; ++i) {
      // If 0, spawn new fish and reset
      if (fish[i] === 0) {
        newFish.push(NEW_TIMER);
        fish[i] = RESET_TIMER;
      } else {
        fish[i] -= 1;
      }
    }

    fish = [...fish, ...newFish];
  }

  return fish;
};

function solvePartOne(input) {
  const fish = simulateFish(input, 80);
  return fish.length;
}

console.log(solvePartOne(input));

const simulateFishPartTwo = (input, days) => {
  let fishStore = new Array(9).fill(0);
  input.forEach((f) => {
    fishStore[f] = fishStore[f] + 1;
  });

  for (let day = 0; day < days; ++day) {
    let nextFishStore = new Array(9).fill(0);

    nextFishStore[0] = fishStore[1];
    nextFishStore[1] = fishStore[2];
    nextFishStore[2] = fishStore[3];
    nextFishStore[3] = fishStore[4];
    nextFishStore[4] = fishStore[5];
    nextFishStore[5] = fishStore[6];
    nextFishStore[6] = fishStore[7] + fishStore[0];
    nextFishStore[7] = fishStore[8];
    nextFishStore[8] = fishStore[0];

    fishStore = [...nextFishStore];
  }

  return fishStore.reduce((prev, curr) => prev + curr, 0);
};

function solvePartTwo(input) {
  const numFishes = simulateFishPartTwo(input, 256);
  return numFishes;
}

console.log(solvePartTwo(input));
