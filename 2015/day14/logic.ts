export type Input = {
  descriptions: {
    reindeer: string;
    speed: number;
    duration: number;
    rest: number;
  }[];
};

export const prepareInput = (rawInput: string): Input => {
  let line: string | undefined;
  let descriptions = [];
  const lines = rawInput.split(/\r\n|\r|\n/);
  while ((line = lines.shift())) {
    const [_, reindeer, speed, duration, rest] = line.match(
      /^(\w+) can fly (\d+) km\/s for (\d+) seconds, but then must rest for (\d+) seconds\.$/
    )!;
    descriptions.push({
      reindeer,
      speed: Number(speed),
      duration: Number(duration),
      rest: Number(rest),
    });
  }

  return { descriptions };
};

function getDistance(
  speed: number,
  duration: number,
  rest: number,
  time: number
): number {
  const cycleTime = duration + rest;
  const numCycles = Math.floor(time / cycleTime);
  const remainingTime = time % cycleTime;

  const totalDistance =
    speed * duration * numCycles + Math.min(remainingTime, duration) * speed;
  return totalDistance;
}

export function solvePartOne(input: Input, endTime: number = 2503): number {
  let maxDistance = 0;

  for (const { speed, duration, rest } of input.descriptions) {
    const totalDistance = getDistance(speed, duration, rest, endTime);
    if (totalDistance > maxDistance) {
      maxDistance = totalDistance;
    }
  }

  return maxDistance;
}

export function solvePartTwo(input: Input, endTime: number = 2503): number {
  const points: Record<string, number> = {};

  for (const { reindeer } of input.descriptions) {
    points[reindeer] = 0;
  }

  for (let t = 1; t <= endTime; t++) {
    let distances: Record<string, number> = {};
    for (const { reindeer, speed, duration, rest } of input.descriptions) {
      distances[reindeer] = getDistance(speed, duration, rest, t);
    }
    const maxDistance = Math.max(...Object.values(distances));

    for (const [reindeer, distance] of Object.entries(distances)) {
      if (distance === maxDistance) {
        points[reindeer]++;
      }
    }
  }

  return Math.max(...Object.values(points));
}
