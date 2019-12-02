// Day 2: 1202 Program Alarm
const fs = require("fs");

let program = fs.readFileSync("./input.txt").toString().split(",").map(inp => parseInt(inp, 10));

const OP_ADD = 1;
const OP_MUL = 2;
const OP_EXT = 99;

const executeProgram = (program) => {
    let running = true;
    let ptr = 0;

    program[1] = 12;
    program[2] = 2;

    do {
        const operation = program[ptr];

        if (operation === OP_ADD) {
            const arg0Ptr = program[ptr + 1];
            const arg1Ptr = program[ptr + 2];
            const resPtr = program[ptr + 3];

            const result = program[arg0Ptr] + program[arg1Ptr];
            program[resPtr] = result;
            ptr += 4;
        } else if (operation === OP_MUL) {
            const arg0Ptr = program[ptr + 1];
            const arg1Ptr = program[ptr + 2];
            const resPtr = program[ptr + 3];

            const result = program[arg0Ptr] * program[arg1Ptr];
            program[resPtr] = result;
            ptr += 4;

        } else if (operation === OP_EXT) {
            running = false;
        }

    } while (running);

    return program[0];
};

const result = executeProgram([...program]);
console.log("Result (Part 1):", result);

// Part Two

const expectedOutput = 19690720;

const executeProgramV2 = (program, noun, verb) => {
    let running = true;
    let ptr = 0;

    program[1] = noun;
    program[2] = verb;

    do {
        const operation = program[ptr];
        if (operation === OP_ADD) {
            const arg0Ptr = program[ptr + 1];
            const arg1Ptr = program[ptr + 2];
            const resPtr = program[ptr + 3];

            const result = program[arg0Ptr] + program[arg1Ptr];
            program[resPtr] = result;
            ptr += 4;
        } else if (operation === OP_MUL) {
            const arg0Ptr = program[ptr + 1];
            const arg1Ptr = program[ptr + 2];
            const resPtr = program[ptr + 3];

            const result = program[arg0Ptr] * program[arg1Ptr];
            program[resPtr] = result;
            ptr += 4;

        } else if (operation === OP_EXT) {
            running = false;
        }

    } while (running);

    return program[0];
};

const gravityAssist = (program, expectedOutput) => {
    for (let i = 0; i <= 99; i++) {
        for (let j = 0; j <= 99; j++) {
            const result = executeProgramV2([...program], i, j);
            if (result === expectedOutput) {
                return 100 * i + j;
            }
        }
    }

    return "No result found -> bug :(";
}

const resultV2 = gravityAssist(program, expectedOutput);

// Part Two
console.log("Result (Part 2):", resultV2);