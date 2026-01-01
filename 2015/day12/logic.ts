export type Input = {
  blob: any;
};

export const prepareInput = (rawInput: string): Input => {
  return { blob: JSON.parse(rawInput) };
};

function handle(data: any): number {
  if (typeof data === "number") {
    return data;
  }

  if (Array.isArray(data)) {
    let sum = 0;
    for (const item of data) {
      sum += handle(item);
    }
    return sum;
  }

  if (typeof data === "object" && data !== null) {
    let sum = 0;
    for (const key in data) {
      sum += handle(data[key]);
    }
    return sum;
  }

  return 0;
}

export function solvePartOne(input: Input): number {
  console.log(input.blob);
  return handle(input.blob);
}

function handleV2(data: any): number {
  if (typeof data === "number") {
    return data;
  }

  if (Array.isArray(data)) {
    let sum = 0;
    for (const item of data) {
      sum += handleV2(item);
    }
    return sum;
  }

  if (typeof data === "object" && data !== null) {
    if (Object.values(data).includes("red")) {
      return 0;
    }

    let sum = 0;
    for (const key in data) {
      sum += handleV2(data[key]);
    }
    return sum;
  }

  return 0;
}

export function solvePartTwo(input: Input): number {
  return handleV2(input.blob);
}
