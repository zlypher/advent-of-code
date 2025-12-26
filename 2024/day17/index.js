const fs = require("fs");

const prepareInput = () => {
  let registers = [0, 0, 0];
  let instructions = [];

  const lines = fs.readFileSync("./input.txt").toString().split("\r\n");

  registers[0] = parseInt(lines.shift().split(": ")[1], 10);
  registers[1] = parseInt(lines.shift().split(": ")[1], 10);
  registers[2] = parseInt(lines.shift().split(": ")[1], 10);

  lines.shift();
  instructions = lines
    .shift()
    .split(": ")[1]
    .split(",")
    .map((x) => parseInt(x, 10));

  return { registers, instructions };
};

const input = prepareInput();

function solvePartOne(input) {
  const { registers, instructions } = input;

  let output = [];
  let ptr = 0;
  while (ptr < instructions.length) {
    let opcode = instructions[ptr];
    let operand = instructions[ptr + 1];

    ptr += 2;

    switch (opcode) {
      case 0:
        registers[0] = parseInt(
          registers[0] / Math.pow(2, combo(operand, registers)),
          10
        );
        break;
      case 1:
        registers[1] = registers[1] ^ operand;
        break;
      case 2:
        registers[1] = combo(operand, registers) % 8;
        break;
      case 3:
        if (registers[0] === 0) break;
        ptr = operand;
        break;
      case 4:
        registers[1] = registers[1] ^ registers[2];
        break;
      case 5:
        output.push(combo(operand, registers) % 8);
        break;
      case 6:
        registers[1] = parseInt(
          registers[0] / Math.pow(2, combo(operand, registers)),
          10
        );
        break;
      case 7:
        registers[2] = parseInt(
          registers[0] / Math.pow(2, combo(operand, registers)),
          10
        );
        break;
    }
  }

  return output.join(",");
}

// console.log(solvePartOne(input));

function solvePartTwo(input) {
  const { _, instructions } = input;

  let registerA = 0o0000000000000000;
  let output = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  let idx = 15;

  while (idx >= 0) {
    registerA += 0o1 * 8 ** idx;
    output = runProgram([registerA, 0o0, 0o0], instructions);
    idx = compare(instructions, output);
  }

  return registerA;
}

console.log(solvePartTwo(input));

function compare(instructions, output) {
  if (instructions.length != output.length) return instructions.length - 1;

  for (let i = instructions.length - 1; i >= 0; --i) {
    if (instructions[i] != output[i]) return i;
  }

  return -1;
}

function runProgram(registers, instructions) {
  let output = [];
  let ptr = 0;
  while (ptr < instructions.length) {
    let opcode = instructions[ptr];
    let operand = instructions[ptr + 1];

    ptr += 2;

    switch (opcode) {
      case 0:
        registers[0] = parseInt(
          registers[0] / Math.pow(2, combo(operand, registers)),
          10
        );
        break;
      case 1:
        registers[1] = registers[1] ^ operand;
        break;
      case 2:
        registers[1] = mod(combo(operand, registers), 8);
        break;
      case 3:
        if (registers[0] === 0) break;
        ptr = operand;
        break;
      case 4:
        registers[1] = registers[1] ^ registers[2];
        break;
      case 5:
        output.push(mod(combo(operand, registers), 8));
        break;
      case 6:
        registers[1] = parseInt(
          registers[0] / Math.pow(2, combo(operand, registers)),
          10
        );
        break;
      case 7:
        registers[2] = parseInt(
          registers[0] / Math.pow(2, combo(operand, registers)),
          10
        );
        break;
    }
  }

  return output;
}

function mod(x, n) {
  return ((x % n) + n) % n;
}

function combo(operand, registers) {
  if (operand <= 3) {
    return operand;
  } else if (operand == 7) {
    throw "invalid operand";
  } else {
    return registers[operand - 4];
  }
}
