export type Input = {
  commands: { dir: string; amount: number }[];
};

export const prepareInput = (rawInput: string): Input => {
  let line: string | undefined;
  let commands = [];

  const lines = rawInput.split("\n");
  while ((line = lines.shift())) {
    commands.push({ dir: line[0], amount: Number(line.slice(1)) });
  }

  return { commands };
};

export function solvePartOne(input: Input): number {
  let countZeros = 0;
  let dial = 50;

  for (let command of input.commands) {
    let change = command.dir === "L" ? -command.amount : command.amount;
    dial = (dial + change + 100) % 100;

    if (dial === 0) {
      countZeros++;
    }
  }
  return countZeros;
}

export function solvePartTwo(input: Input): number {
  let countZeros = 0;
  let dial = 50;

  for (let command of input.commands) {
    const fullRounds = Math.floor(command.amount / 100);
    countZeros += fullRounds;

    const remaining = command.amount % 100;
    const prevDial = dial;
    if (command.dir === "L") {
      if (dial === 0) {
        dial += 100;
      }
      dial = dial - remaining;
      if (dial <= 0) {
        countZeros++;
      }
    } else if (command.dir === "R") {
      dial = dial + remaining;
      if (dial >= 100) {
        countZeros++;
      }
    }
    dial = (dial + 100) % 100;
  }
  return countZeros;
}
