import fs from "fs";

const prepareInput = () => {
  let wires = [];
  let gates = [];

  let line;
  const lines = fs.readFileSync("./input.txt").toString().split("\r\n");

  while (typeof (line = lines.shift()) !== "undefined") {
    if (line === "") break;

    const [wire, valStr] = line.split(": ");
    wires.push([wire, parseInt(valStr, 10)]);
  }

  while (typeof (line = lines.shift()) !== "undefined") {
    // x44 XOR y44 -> drc
    const [wireOne, op, wireTwo, _, wireRes] = line.split(" ");
    gates.push([wireOne, op, wireTwo, wireRes]);
  }

  return { wires, gates };
};

const input = prepareInput();

function solvePartOne(input) {
  const { wires, gates } = input;
  const wireMap = {};

  for (let [wire, val] of wires) {
    wireMap[wire] = val;
  }

  let remaining = [...gates];

  while (remaining.length > 0) {
    let next = [];

    for (let gate of remaining) {
      const [wireA, op, wireB, wireRes] = gate;

      const valA = wireMap[wireA];
      const valB = wireMap[wireB];

      if (typeof valA === "undefined" || typeof valB === "undefined") {
        next.push(gate);
        continue;
      }

      switch (op) {
        case "AND":
          wireMap[wireRes] = valA & valB;
          break;
        case "OR":
          wireMap[wireRes] = valA | valB;
          break;
        case "XOR":
          wireMap[wireRes] = valA ^ valB;
          break;
      }
    }

    remaining = next;
  }

  const zEntries = Object.entries(wireMap).filter(([key]) =>
    key.startsWith("z")
  );
  let result = 0;

  for (let [key, val] of zEntries) {
    let bit = parseInt(key.substring(1), 10);
    result += val * 2 ** bit;
  }

  return result;
}

console.log(solvePartOne(input));

function solvePartTwo(input) {
  const { pairs } = input;
}

console.log(solvePartTwo(input));
