export type Input = {
  replacements: Record<string, string[]>;
  molecule: string;
};

export const prepareInput = (rawInput: string): Input => {
  let line: string | undefined;
  let replacements: Record<string, string[]> = {};

  const lines = rawInput.split(/\r\n|\r|\n/);
  while ((line = lines.shift())) {
    if (line === "") {
      break;
    }
    const [from, to] = line.split(" => ");

    if (!replacements[from]) {
      replacements[from] = [];
    }

    replacements[from].push(to);
  }

  const molecule = lines.shift() || "";

  return { replacements, molecule };
};

function solve(
  replacements: Record<string, string[]>,
  molecule: string
): number {
  let variations = new Set<string>();

  for (const from in replacements) {
    const tos = replacements[from];
    let startIndex = 0;

    while (startIndex < molecule.length) {
      const index = molecule.indexOf(from, startIndex);
      if (index === -1) {
        break;
      }

      for (const to of tos) {
        const newMolecule =
          molecule.slice(0, index) + to + molecule.slice(index + from.length);
        variations.add(newMolecule);
      }

      startIndex = index + 1;
    }
  }

  return variations.size;
}

export function solvePartOne(input: Input): number {
  let subParts = input.molecule.split("n");

  return subParts.reduce((acc, curr) => {
    return acc + solve(input.replacements, curr);
  }, 0);
}

export function solvePartTwo(input: Input): number {
  let replacements = [];
  for (const from in input.replacements) {
    for (const to of input.replacements[from]) {
      replacements.push([from, to]);
    }
  }

  replacements.sort((a, b) => b[1].length - a[1].length);

  let steps = 0;
  let target = input.molecule;

  while (target !== "e") {
    let changed = false;
    for (const [from, to] of replacements) {
      const index = target.indexOf(to);
      if (index !== -1) {
        target = target.replace(to, from);
        steps++;
        changed = true;
        break;
      }
    }

    if (!changed) {
      target = input.molecule;
      steps = 0;
      replacements.sort(() => Math.random() - 0.5);
    }
  }

  return steps;
}
