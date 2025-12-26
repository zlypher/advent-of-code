// Day 14: Extended Polymerization
const fs = require("fs");

const prepareInput = () => {
  const listA = [];
  const listB = [];

  const lines = fs.readFileSync("./input.txt").toString().split("\r\n");
  while ((line = lines.shift())) {
    const [first, second] = line.split("   ");
    listA.push(parseInt(first, 10));
    listB.push(parseInt(second, 10));
  }

  return { listA, listB };
};

const input = prepareInput();

function solvePartOne(input) {
  const { listA, listB } = input;
  let totalDistance = 0;

  listA.sort((a, b) => a - b);
  listB.sort((a, b) => a - b);

  for (let i = 0; i < listA.length; ++i) {
    totalDistance += Math.abs(listB[i] - listA[i]);
  }

  return Math.abs(totalDistance);
}

console.log(solvePartOne(input));

function solvePartTwo(input) {
  const { listA, listB } = input;
  const listBCountMap = listB.reduce((prev, curr) => {
    if (typeof prev[curr] === "undefined") {
      prev[curr] = 1;
    } else {
      prev[curr] += 1;
    }

    return prev;
  }, []);

  let totalSimilarity = 0;
  for (let val of listA) {
    totalSimilarity += val * (listBCountMap[val] ?? 0);
  }

  return totalSimilarity;
}

console.log(solvePartTwo(input));
