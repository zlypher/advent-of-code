const fs = require("fs");
const { printMap } = require("../../utils/print-map");

const prepareInput = () => {
  const diskMap = fs
    .readFileSync("./input.txt")
    .toString()
    .split("")
    .map((x) => parseInt(x, 10));

  return { diskMap };
};

const input = prepareInput();

function solvePartOne(input) {
  const { diskMap } = input;

  let checksum = 0;
  let leftIdx = 0;
  let rightIdx = diskMap.length - 1;
  let position = 0;

  let leftId = 0;
  let rightId = Math.floor(diskMap.length / 2);

  let type = "DATA";

  while (leftIdx <= rightIdx) {
    let leftVal = diskMap[leftIdx];
    let rightVal = diskMap[rightIdx];

    if (type === "DATA") {
      while (leftVal > 0) {
        leftVal--;
        diskMap[leftIdx]--;

        checksum += position * leftId;
        position++;
      }

      leftId++;
      leftIdx++;
      type = "EMPTY";
    } else if (type === "EMPTY") {
      while (leftVal > 0 && rightVal > 0) {
        leftVal--;
        diskMap[leftIdx]--;
        rightVal--;
        diskMap[rightIdx]--;

        checksum += position * rightId;
        position++;
      }

      if (leftVal === 0) {
        leftIdx++;
        type = "DATA";
      }
      if (rightVal === 0) {
        rightIdx -= 2;
        rightId--;
      }
    }
  }

  return checksum;
}

// console.log(solvePartOne(input));

function solvePartTwo(input) {
  const { diskMap } = input;

  // TODO
}

console.log(solvePartTwo(input));
