const fs = require("fs");

const prepareInput = () => {
  const equations = [];

  const lines = fs.readFileSync("./input.txt").toString().split("\r\n");
  while ((line = lines.shift())) {
    const [resultStr, numbersList] = line.split(": ");
    equations.push({
      result: parseInt(resultStr, 10),
      numbers: numbersList.split(" ").map((x) => parseInt(x, 10)),
    });
  }

  return { equations };
};

const input = prepareInput();

function solvePartOne(input) {
  const { equations } = input;
  let totalCalibrationResult = 0;

  for (let equation of equations) {
    if (testEquation(equation)) {
      totalCalibrationResult += equation.result;
    }
  }

  return totalCalibrationResult;
}

console.log(solvePartOne(input));

function solvePartTwo(input) {
  const { equations } = input;
  let totalCalibrationResult = 0;

  for (let equation of equations) {
    if (testEquationV2(equation)) {
      totalCalibrationResult += equation.result;
    }
  }

  return totalCalibrationResult;
}

console.log(solvePartTwo(input));

function testEquation({ result, numbers }) {
  const newNumbers = [...numbers];
  const first = newNumbers.shift();
  return testEquationRecursive(result, first, newNumbers);
}

function testEquationRecursive(targetResult, currentValue, numbers) {
  if (numbers.length === 0) {
    return targetResult === currentValue;
  }

  const next = numbers.shift();
  return (
    testEquationRecursive(targetResult, currentValue + next, [...numbers]) ||
    testEquationRecursive(targetResult, currentValue * next, [...numbers])
  );
}

function testEquationV2({ result, numbers }) {
  const newNumbers = [...numbers];
  const first = newNumbers.shift();
  return testEquationRecursiveV2(result, first, newNumbers);
}

function testEquationRecursiveV2(targetResult, currentValue, numbers) {
  if (numbers.length === 0) {
    return targetResult === currentValue;
  }

  const next = numbers.shift();
  return (
    testEquationRecursiveV2(targetResult, currentValue + next, [...numbers]) ||
    testEquationRecursiveV2(targetResult, currentValue * next, [...numbers]) ||
    testEquationRecursiveV2(
      targetResult,
      parseInt(currentValue + "" + next, 10),
      [...numbers]
    )
  );
}
