export type Input = {
  boxes: { x: number; y: number; z: number }[];
};

export const prepareInput = (rawInput: string): Input => {
  let line: string | undefined;
  let boxes = [];
  const lines = rawInput.split("\n");
  while ((line = lines.shift())) {
    const [x, y, z] = line.split(",").map(Number);
    boxes.push({ x, y, z });
  }

  return { boxes };
};

export function solvePartOne(
  input: Input,
  numConnections: number = 1000
): number {
  // Find closest boxes
  let closest = [];
  for (let i = 0; i < input.boxes.length; i++) {
    const boxA = input.boxes[i];
    for (let j = i + 1; j < input.boxes.length; j++) {
      const boxB = input.boxes[j];
      const distance =
        Math.pow(boxA.x - boxB.x, 2) +
        Math.pow(boxA.y - boxB.y, 2) +
        Math.pow(boxA.z - boxB.z, 2);
      closest.push({ boxA: i, boxB: j, distance });
    }
  }

  closest.sort((a, b) => a.distance - b.distance);

  // Disjoint Set Union (DSU)

  const parent = new Array(input.boxes.length).fill(0).map((_, i) => i);
  const sizes = new Array(input.boxes.length).fill(1);

  for (let i = 0; i < numConnections; i++) {
    const { boxA, boxB } = closest[i];
    union(parent, sizes, boxA, boxB);
  }

  return Object.values(sizes)
    .toSorted((a, b) => b - a)
    .slice(0, 3)
    .reduce((acc, val) => acc * val, 1);
}

function find(parent: number[], a: number): number {
  const currParent = parent[a];
  if (currParent === a) {
    return a;
  }

  const newParent = find(parent, currParent);
  parent[a] = newParent;
  return newParent;
}

function union(parent: number[], sizes: number[], a: number, b: number) {
  let rootA = find(parent, a);
  let rootB = find(parent, b);

  if (rootA === rootB) {
    return false;
  }

  if (sizes[rootA] < sizes[rootB]) {
    [rootA, rootB] = [rootB, rootA];
  }

  parent[rootB] = rootA;
  sizes[rootA] += sizes[rootB];
  return true;
}

export function solvePartTwo(input: Input): number {
  // Find closest boxes
  let closest = [];
  for (let i = 0; i < input.boxes.length; i++) {
    const boxA = input.boxes[i];
    for (let j = i + 1; j < input.boxes.length; j++) {
      const boxB = input.boxes[j];
      const distance =
        Math.pow(boxA.x - boxB.x, 2) +
        Math.pow(boxA.y - boxB.y, 2) +
        Math.pow(boxA.z - boxB.z, 2);
      closest.push({ boxA: i, boxB: j, distance });
    }
  }

  closest.sort((a, b) => a.distance - b.distance);

  // Disjoint Set Union (DSU)

  const parent = new Array(input.boxes.length).fill(0).map((_, i) => i);
  const sizes = new Array(input.boxes.length).fill(1);

  const lastConnection = [-1, -1];

  for (let i = 0; i < closest.length; i++) {
    const { boxA, boxB } = closest[i];
    if (union(parent, sizes, boxA, boxB)) {
      lastConnection[0] = boxA;
      lastConnection[1] = boxB;
    }
  }

  return input.boxes[lastConnection[0]].x * input.boxes[lastConnection[1]].x;
}
