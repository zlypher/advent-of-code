type Machine = {
  indicators: number[];
  buttons: number[][];
  joltage: number[];
};

export type Input = {
  machines: Machine[];
};

export const prepareInput = (rawInput: string): Input => {
  let line: string | undefined;
  let machines = [];
  const lines = rawInput.split("\n");
  while ((line = lines.shift())) {
    const parts = line.split(" ");
    const indicators = parts[0];
    const buttons = parts.slice(1, parts.length - 1);
    const joltage = parts[parts.length - 1];

    machines.push({
      indicators: indicators
        .split("")
        .slice(1, indicators.length - 1)
        .map((char) => (char === "#" ? 1 : 0)),
      buttons: buttons.map((button) =>
        button
          .slice(1, button.length - 1)
          .split(",")
          .map(Number)
      ),
      joltage: joltage
        .slice(1, joltage.length - 1)
        .split(",")
        .map(Number),
    });
  }

  return { machines };
};

export function solvePartOne(input: Input): number {
  let totalPresses = 0;

  for (const machine of input.machines) {
    totalPresses += calculatePresses(machine);
  }

  return totalPresses;
}

function calculatePresses(machine: Machine): number {
  let visited: Record<number, boolean> = {};
  let target = machine.indicators.reduce(
    (acc, val, idx) => (acc ^= val << idx),
    0
  );
  let queue = [0];
  let steps = 0;

  const buttons: number[] = machine.buttons.map((button) => {
    let val = 0;

    for (let index of button) {
      val ^= 1 << index;
    }

    return val;
  });

  while (true) {
    let nextQueue: number[] = [];

    while (queue.length > 0) {
      const currentState = queue.shift()!;
      visited[currentState] = true;

      if (currentState === target) {
        return steps;
      }

      for (let button of buttons) {
        let newState = currentState ^ button;

        if (!visited[newState]) {
          nextQueue.push(newState);
        }
      }
    }

    queue = nextQueue;
    steps++;
  }
}

export function solvePartTwo(input: Input): number {
  let totalPresses = 0;

  for (const machine of input.machines) {
    totalPresses += calculatePressesV2(machine);
  }

  return totalPresses;
}

function calculatePressesV2(machine: Machine): number {
  let visited: Record<number, boolean> = {};
  let target = machine.indicators.reduce(
    (acc, val, idx) => (acc ^= val << idx),
    0
  );
  let queue = [0];
  let steps = 0;

  const buttons: number[] = machine.buttons.map((button) => {
    let val = 0;

    for (let index of button) {
      val ^= 1 << index;
    }

    return val;
  });

  while (true) {
    let nextQueue: number[] = [];

    while (queue.length > 0) {
      const currentState = queue.shift()!;
      visited[currentState] = true;

      if (currentState === target) {
        return steps;
      }

      for (let button of buttons) {
        let newState = currentState ^ button;

        if (!visited[newState]) {
          nextQueue.push(newState);
        }
      }
    }

    queue = nextQueue;
    steps++;
  }
}
