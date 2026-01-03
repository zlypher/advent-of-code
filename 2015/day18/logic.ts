export type Input = {
  lights: number[][];
};

export const prepareInput = (rawInput: string): Input => {
  let line: string | undefined;
  let lights = [];
  const lines = rawInput.split(/\r\n|\r|\n/);
  while ((line = lines.shift())) {
    lights.push(line.split("").map((char) => (char === "#" ? 1 : 0)));
  }

  return { lights };
};

export function solvePartOne(input: Input, steps: number = 100): number {
  let lights = [
    new Array(input.lights.length + 2).fill(0),
    ...input.lights.map((row) => [0, ...row, 0]),
    new Array(input.lights.length + 2).fill(0),
  ];

  for (let step = 0; step < steps; step++) {
    const newLights = lights.map((row) => [...row]);

    for (let i = 1; i < lights.length - 1; i++) {
      for (let j = 1; j < lights[i].length - 1; j++) {
        const neighbors =
          lights[i - 1][j - 1] +
          lights[i - 1][j] +
          lights[i - 1][j + 1] +
          lights[i][j - 1] +
          lights[i][j + 1] +
          lights[i + 1][j - 1] +
          lights[i + 1][j] +
          lights[i + 1][j + 1];

        if (lights[i][j] === 1) {
          if (neighbors !== 2 && neighbors !== 3) {
            newLights[i][j] = 0;
          }
        } else {
          if (neighbors === 3) {
            newLights[i][j] = 1;
          }
        }
      }
    }

    lights = newLights;
  }

  return lights.flat().reduce((a, b) => a + b, 0);
}

export function solvePartTwo(input: Input, steps: number = 100): number {
  let lights = [
    new Array(input.lights.length + 2).fill(0),
    ...input.lights.map((row) => [0, ...row, 0]),
    new Array(input.lights.length + 2).fill(0),
  ];

  for (let step = 0; step < steps; step++) {
    const newLights = lights.map((row) => [...row]);

    for (let i = 1; i < lights.length - 1; i++) {
      for (let j = 1; j < lights[i].length - 1; j++) {
        const neighbors =
          lights[i - 1][j - 1] +
          lights[i - 1][j] +
          lights[i - 1][j + 1] +
          lights[i][j - 1] +
          lights[i][j + 1] +
          lights[i + 1][j - 1] +
          lights[i + 1][j] +
          lights[i + 1][j + 1];

        if (lights[i][j] === 1) {
          if (neighbors !== 2 && neighbors !== 3) {
            newLights[i][j] = 0;
          }
        } else {
          if (neighbors === 3) {
            newLights[i][j] = 1;
          }
        }
      }
    }

    newLights[1][1] = 1;
    newLights[1][newLights.length - 2] = 1;
    newLights[newLights.length - 2][1] = 1;
    newLights[newLights.length - 2][newLights.length - 2] = 1;

    lights = newLights;
  }

  return lights.flat().reduce((a, b) => a + b, 0);
}
