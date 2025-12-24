type Problem = {
  numbers: number[];
  numbersRaw: string[];
  operation: string;
};

export type Input = {
  problems: Problem[];
};

export const prepareInput = (rawInput: string): Input => {
  let problems: Problem[] = [];
  const lines = rawInput.split("\n");

  let opLine = lines[lines.length - 1];
  let operations = opLine.matchAll(/([\+\*]+\s*)/gm);
  const operationsArr = [...operations].map((o) => o[0]);
  for (let j = 0; j < operationsArr.length; j++) {
    problems.push({ numbers: [], numbersRaw: [], operation: operationsArr[j] });
  }

  for (let i = 0; i < lines.length - 1; i++) {
    let line = lines[i];
    let currIdx = 0;
    for (let j = 0; j < problems.length; j++) {
      let currLen = problems[j].operation.length;
      let adaptedLen = j === problems.length - 1 ? currLen : currLen - 1;
      let numRaw = line.slice(currIdx, currIdx + adaptedLen);
      problems[j].numbersRaw.push(numRaw);
      problems[j].numbers.push(Number(numRaw));
      currIdx += currLen;
    }
  }

  return { problems };
};

export function solvePartOne(input: Input): number {
  let grandTotal = 0;

  for (const problem of input.problems) {
    let total = problem.numbers[0];
    for (let i = 1; i < problem.numbers.length; i++) {
      const num = problem.numbers[i];
      const op = problem.operation.trim();
      if (op === "+") {
        total += num;
      } else if (op === "*") {
        total *= num;
      }
    }

    grandTotal += total;
  }

  return grandTotal;
}

export function solvePartTwo(input: Input): number {
  let grandTotal = 0;

  for (const problem of input.problems) {
    const numbers = convertNumbers(problem.numbersRaw);

    let total = numbers[0];
    for (let i = 1; i < numbers.length; i++) {
      const num = numbers[i];
      const op = problem.operation.trim();

      if (op === "+") {
        total += num;
      } else if (op === "*") {
        total *= num;
      }
    }

    grandTotal += total;
  }

  return grandTotal;
}

function convertNumbers(numbersRaw: string[]): number[] {
  const len = numbersRaw[0].length;
  const numbers: number[] = [];
  for (let i = 0; i < len; i++) {
    let numStr = "";
    for (let j = 0; j < numbersRaw.length; j++) {
      numStr += numbersRaw[j][i];
    }
    numbers.push(Number(numStr.trim()));
  }

  return numbers;
}
