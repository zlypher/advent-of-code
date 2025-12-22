export type Input = {
  edges: Record<string, string[]>;
};

export const prepareInput = (rawInput: string): Input => {
  let line: string | undefined;
  let edges: Record<string, string[]> = {};
  const lines = rawInput.split("\n");
  while ((line = lines.shift())) {
    const [out, ins] = line.split(":");
    edges[out] = ins
      .trim()
      .split(" ")
      .filter((s) => s.length > 0);
  }

  return { edges };
};

export function solvePartOne(input: Input): number {
  return solve(input.edges, "you");
}

function solve(edges: Record<string, string[]>, node: string): number {
  if (node === "out") {
    return 1;
  }

  let total = 0;
  for (const neighbor of edges[node]) {
    total += solve(edges, neighbor);
  }
  return total;
}

// TODO: Too slow, add cache
export function solvePartTwo(input: Input): number {
  // return solveV2(input.edges, "svr", { fft: false, dac: false }, {});

  // Still to slow
  const svrToFft = solveV2(input.edges, "svr", "fft", {});
  const svrToDac = solveV2(input.edges, "svr", "dac", {});
  const fftToOut = solveV2(input.edges, "fft", "out", {});
  const dacToOut = solveV2(input.edges, "dac", "out", {});
  const fftToDac = solveV2(input.edges, "fft", "dac", {});
  const dacToFft = solveV2(input.edges, "dac", "fft", {});

  console.log({ svrToFft, svrToDac, fftToOut, dacToOut, fftToDac, dacToFft });

  return svrToFft * fftToDac * dacToOut + svrToDac * dacToFft * fftToOut;
}

function solveV2(
  edges: Record<string, string[]>,
  node: string,
  target: string,
  visited: Record<string, number>
): number {
  if (visited[node]) {
    return visited[node];
  }

  if (node === target) {
    return 1;
  }

  if (!edges.hasOwnProperty(node)) {
    return 0;
  }

  let total = 0;
  for (const neighbor of edges[node]) {
    total += solveV2(edges, neighbor, target, visited);
  }
  visited[node] = total;
  return total;
}
