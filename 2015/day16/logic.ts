type Ticker = {
  children: number;
  cats: number;
  samoyeds: number;
  pomeranians: number;
  akitas: number;
  vizslas: number;
  goldfish: number;
  trees: number;
  cars: number;
  perfumes: number;
};

export type Input = {
  sues: Partial<Ticker>[];
};

export const prepareInput = (rawInput: string): Input => {
  let line: string | undefined;
  let sues = [];
  const lines = rawInput.split(/\r\n|\r|\n/);
  while ((line = lines.shift())) {
    const [_, _sueNo, rest] = line.match(/^Sue (\d+): (.+)$/)!;
    const parts = rest.replace(/, /g, " ").split(" ");
    const sue: any = {};
    for (let i = 0; i < parts.length; i += 2) {
      sue[parts[i].replace(":", "")] = Number(parts[i + 1]);
    }

    sues.push(sue);
  }

  return { sues };
};

export function solvePartOne(input: Input): number {
  const tickerTape: Ticker = {
    children: 3,
    cats: 7,
    samoyeds: 2,
    pomeranians: 3,
    akitas: 0,
    vizslas: 0,
    goldfish: 5,
    trees: 3,
    cars: 2,
    perfumes: 1,
  };

  for (let i = 0; i < input.sues.length; i++) {
    const sue = input.sues[i];
    let allMatch = true;
    for (const k in sue) {
      const key = k as keyof Ticker;

      if (sue[key] !== tickerTape[key]) {
        allMatch = false;
        break;
      }
    }

    if (allMatch) {
      return i + 1;
    }
  }

  return -1;
}

export function solvePartTwo(input: Input): number {
  const tickerTape: Ticker = {
    children: 3,
    cats: 7,
    samoyeds: 2,
    pomeranians: 3,
    akitas: 0,
    vizslas: 0,
    goldfish: 5,
    trees: 3,
    cars: 2,
    perfumes: 1,
  };

  const greaterThanKeys: (keyof Ticker)[] = ["cats", "trees"];
  const lessThanKeys: (keyof Ticker)[] = ["pomeranians", "goldfish"];

  for (let i = 0; i < input.sues.length; i++) {
    const sue = input.sues[i];
    let allMatch = true;
    for (const k in sue) {
      const key = k as keyof Ticker;

      if (greaterThanKeys.includes(key)) {
        if (!(sue[key]! > tickerTape[key])) {
          allMatch = false;
          break;
        }
      } else if (lessThanKeys.includes(key)) {
        if (!(sue[key]! < tickerTape[key])) {
          allMatch = false;
          break;
        }
      } else if (sue[key] !== tickerTape[key]) {
        allMatch = false;
        break;
      }
    }

    if (allMatch) {
      return i + 1;
    }
  }

  return -1;
}
