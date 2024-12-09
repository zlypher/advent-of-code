// Day 14: Extended Polymerization
const fs = require("fs");

const prepareInput = () => {
  const reports = [];

  const lines = fs.readFileSync("./input.txt").toString().split("\r\n");
  while ((line = lines.shift())) {
    const levels = line.split(" ").map((str) => parseInt(str, 10));
    reports.push(levels);
  }

  return { reports };
};

const input = prepareInput();

function solvePartOne(input) {
  const { reports } = input;
  let numSafeReports = 0;

  for (let levels of reports) {
    if (isReportSafe(levels)) {
      numSafeReports++;
    }
  }

  return numSafeReports;
}

console.log(solvePartOne(input));

function solvePartTwo(input) {
  const { reports } = input;
  let numSafeReports = 0;

  for (let levels of reports) {
    if (isReportSafeV2(levels, false)) {
      numSafeReports++;
    }
  }

  return numSafeReports;
}

console.log(solvePartTwo(input));

function isReportSafe(levels) {
  const isAscending = levels[1] - levels[0] > 0;

  for (let i = 1; i < levels.length; ++i) {
    const a = levels[i - 1];
    const b = levels[i];
    const diff = b - a;
    const absDiff = Math.abs(diff);
    const isAsc = diff > 0;

    if (isAscending != isAsc) {
      return false;
    }
    if (absDiff < 1 || absDiff > 3) {
      return false;
    }
  }
  return true;
}

function isReportSafeV2(levels, dampenerActive = false) {
  const isAscending = levels[1] - levels[0] > 0;
  let isSafe = true;

  for (let i = 1; i < levels.length; ++i) {
    const a = levels[i - 1];
    const b = levels[i];
    const diff = b - a;
    const absDiff = Math.abs(diff);
    const isAsc = diff > 0;

    if (isAscending != isAsc || absDiff < 1 || absDiff > 3) {
      isSafe = false;
    }
  }

  if (!isSafe && !dampenerActive) {
    for (let i = 0; i < levels.length; ++i) {
      const dampenedLevels = [...levels];
      dampenedLevels.splice(i, 1);
      if (isReportSafeV2(dampenedLevels, true)) {
        return true;
      }
    }
  }

  return isSafe;
}
