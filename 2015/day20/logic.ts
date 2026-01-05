export type Input = {
  target: number;
};

export const prepareInput = (rawInput: string): Input => {
  let target = Number(rawInput.trim());

  return { target };
};

export function solvePartOne(input: Input): number {
  let houses = new Int32Array(input.target / 10);

  for (let elf = 1; elf < houses.length; elf++) {
    for (let house = elf; house < houses.length; house += elf) {
      houses[house] += elf * 10;
    }

    if (houses[elf] >= input.target) {
      return elf;
    }
  }

  return -1;
}

export function solvePartTwo(input: Input): number {
  let houses = new Int32Array(input.target / 10);

  for (let elf = 1; elf < houses.length; elf++) {
    for (
      let house = elf, visits = 0;
      house < houses.length && visits < 50;
      house += elf, visits++
    ) {
      houses[house] += elf * 11;
    }

    if (houses[elf] >= input.target) {
      return elf;
    }
  }

  return -1;
}
