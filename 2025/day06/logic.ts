export type Input = {
  problems: { numbers: number[]; operation: string }[];
};

export const prepareInput = (rawInput: string): Input => {
  let problems = [];
  const lines = rawInput.split("\n");

  for (let i = 0; i < lines.length - 1; i++) {
    let line = lines[i];
    const numbers = line.matchAll(/([0-9]+)/gm);
    const numbersArr = [...numbers].map((n) => Number(n[0]));
    if (i === 0) {
      for (let j = 0; j < numbersArr.length; j++) {
        problems.push({
          numbers: [numbersArr[j]],
          operation: "",
        });
      }
    } else {
      for (let j = 0; j < numbersArr.length; j++) {
        problems[j].numbers.push(numbersArr[j]);
      }
    }
  }

  console.log(problems);

  let line = lines[lines.length - 1];
  let operations = line.matchAll(/([\+\*]+)/gm);
  const operationsArr = [...operations].map((o) => o[0]);
  for (let j = 0; j < operationsArr.length; j++) {
    problems[j].operation = operationsArr[j];
  }

  return { problems };
};

export function solvePartOne(input: Input): number {
  let grandTotal = 0;

  for (const problem of input.problems) {
    let total = problem.numbers[0];
    for (let i = 1; i < problem.numbers.length; i++) {
      const num = problem.numbers[i];

      if (problem.operation === "+") {
        total += num;
      } else if (problem.operation === "*") {
        total *= num;
      }
    }

    grandTotal += total;
  }

  return grandTotal;
}

export function solvePartTwo(input: Input): number {
  console.log(input);
  let grandTotal = 0;

  for (const problem of input.problems) {
    const numbers = convertNumbers(problem.numbers);

    let total = numbers[0];
    for (let i = 1; i < numbers.length; i++) {
      const num = numbers[i];

      if (problem.operation === "+") {
        total += num;
      } else if (problem.operation === "*") {
        total *= num;
      }
    }

    grandTotal += total;
  }

  return grandTotal;
}

function convertNumbers(numbers: number[]): number[] {
  return numbers.map((n) => {
    let str = n.toString();
    let converted = "";
    for (let char of str) {
      let digit = Number(char);
      converted += (9 - digit).toString();
    }
    return Number(converted);
  });
}
