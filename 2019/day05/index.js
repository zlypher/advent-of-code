// Day 5: Sunny with a Chance of Asteroids
const fs = require("fs");

// let program = fs.readFileSync("./input.txt").toString().split(",").map(inp => parseInt(inp, 10));
let program = [3, 225, 1, 225, 6, 6, 1100, 1, 238, 225, 104, 0, 1101, 40, 71, 224, 1001, 224, -111, 224, 4, 224, 1002, 223, 8, 223, 101, 7, 224, 224, 1, 224, 223, 223, 1102, 66, 6, 225, 1102, 22, 54, 225, 1, 65, 35, 224, 1001, 224, -86, 224, 4, 224, 102, 8, 223, 223, 101, 6, 224, 224, 1, 224, 223, 223, 1102, 20, 80, 225, 101, 92, 148, 224, 101, -162, 224, 224, 4, 224, 1002, 223, 8, 223, 101, 5, 224, 224, 1, 224, 223, 223, 1102, 63, 60, 225, 1101, 32, 48, 225, 2, 173, 95, 224, 1001, 224, -448, 224, 4, 224, 102, 8, 223, 223, 1001, 224, 4, 224, 1, 224, 223, 223, 1001, 91, 16, 224, 101, -79, 224, 224, 4, 224, 1002, 223, 8, 223, 101, 3, 224, 224, 1, 224, 223, 223, 1101, 13, 29, 225, 1101, 71, 70, 225, 1002, 39, 56, 224, 1001, 224, -1232, 224, 4, 224, 102, 8, 223, 223, 101, 4, 224, 224, 1, 223, 224, 223, 1101, 14, 59, 225, 102, 38, 143, 224, 1001, 224, -494, 224, 4, 224, 102, 8, 223, 223, 101, 3, 224, 224, 1, 224, 223, 223, 1102, 30, 28, 224, 1001, 224, -840, 224, 4, 224, 1002, 223, 8, 223, 101, 4, 224, 224, 1, 223, 224, 223, 4, 223, 99, 0, 0, 0, 677, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1105, 0, 99999, 1105, 227, 247, 1105, 1, 99999, 1005, 227, 99999, 1005, 0, 256, 1105, 1, 99999, 1106, 227, 99999, 1106, 0, 265, 1105, 1, 99999, 1006, 0, 99999, 1006, 227, 274, 1105, 1, 99999, 1105, 1, 280, 1105, 1, 99999, 1, 225, 225, 225, 1101, 294, 0, 0, 105, 1, 0, 1105, 1, 99999, 1106, 0, 300, 1105, 1, 99999, 1, 225, 225, 225, 1101, 314, 0, 0, 106, 0, 0, 1105, 1, 99999, 107, 677, 226, 224, 1002, 223, 2, 223, 1005, 224, 329, 1001, 223, 1, 223, 8, 226, 226, 224, 102, 2, 223, 223, 1006, 224, 344, 101, 1, 223, 223, 7, 226, 677, 224, 1002, 223, 2, 223, 1005, 224, 359, 101, 1, 223, 223, 1007, 677, 226, 224, 1002, 223, 2, 223, 1005, 224, 374, 1001, 223, 1, 223, 1007, 677, 677, 224, 1002, 223, 2, 223, 1006, 224, 389, 101, 1, 223, 223, 1008, 226, 226, 224, 1002, 223, 2, 223, 1005, 224, 404, 1001, 223, 1, 223, 108, 677, 226, 224, 1002, 223, 2, 223, 1006, 224, 419, 1001, 223, 1, 223, 1108, 677, 226, 224, 102, 2, 223, 223, 1006, 224, 434, 1001, 223, 1, 223, 108, 226, 226, 224, 1002, 223, 2, 223, 1005, 224, 449, 101, 1, 223, 223, 7, 677, 677, 224, 1002, 223, 2, 223, 1006, 224, 464, 1001, 223, 1, 223, 8, 226, 677, 224, 1002, 223, 2, 223, 1005, 224, 479, 1001, 223, 1, 223, 107, 226, 226, 224, 102, 2, 223, 223, 1006, 224, 494, 101, 1, 223, 223, 1007, 226, 226, 224, 1002, 223, 2, 223, 1005, 224, 509, 1001, 223, 1, 223, 1107, 226, 677, 224, 102, 2, 223, 223, 1005, 224, 524, 1001, 223, 1, 223, 108, 677, 677, 224, 1002, 223, 2, 223, 1005, 224, 539, 101, 1, 223, 223, 1107, 677, 226, 224, 102, 2, 223, 223, 1005, 224, 554, 1001, 223, 1, 223, 107, 677, 677, 224, 1002, 223, 2, 223, 1005, 224, 569, 101, 1, 223, 223, 8, 677, 226, 224, 102, 2, 223, 223, 1005, 224, 584, 1001, 223, 1, 223, 7, 677, 226, 224, 102, 2, 223, 223, 1006, 224, 599, 101, 1, 223, 223, 1008, 677, 677, 224, 1002, 223, 2, 223, 1005, 224, 614, 101, 1, 223, 223, 1008, 677, 226, 224, 102, 2, 223, 223, 1006, 224, 629, 1001, 223, 1, 223, 1108, 677, 677, 224, 102, 2, 223, 223, 1006, 224, 644, 101, 1, 223, 223, 1108, 226, 677, 224, 1002, 223, 2, 223, 1005, 224, 659, 1001, 223, 1, 223, 1107, 226, 226, 224, 102, 2, 223, 223, 1006, 224, 674, 1001, 223, 1, 223, 4, 223, 99, 226];
// program = [
//     3, 225,
//     1, 225, 6, 6,
//     1100, 1, 238, 225,
//     104, 0,
//     99, -1]

const OP_ADD = 1;
const OP_MUL = 2;
const OP_INP = 3;
const OP_OUT = 4;
const OP_EXT = 99;

const PM_POS = 0; // Parameter Mode: Position
const PM_IMM = 1; // Parameter Mode: Immediate
const PM_DEF = PM_POS; // Parameter Mode (Default)

const readCode = (code) => {
    let operation = code % 100;
    let paramModes = parseInt(code / 100, 10)
        .toString()
        .split("")
        .map(x => parseInt(x, 10))
        .reverse();

    const len = paramModes.length;
    paramModes.length = 3;
    paramModes = paramModes.fill(PM_DEF, len, 3);

    return {
        operation,
        paramModes
    };
}

const runDiagnostic = (program, input = []) => {
    let running = true;
    let ptr = 0;
    let inputPtr = 0;
    let result = 0;

    const readValue = (pos, mode = PM_DEF) => {
        let param = program[pos];
        if (mode === PM_IMM) {
            return param;
        } else if (mode === PM_POS) {
            return program[param];
        } else {
            console.log("Invalid Position Mode");
            return -1;
        }
    }

    do {
        const { operation, paramModes } = readCode(program[ptr]);

        if (operation === OP_ADD) {
            const arg0 = readValue(ptr + 1, paramModes[0]);
            const arg1 = readValue(ptr + 2, paramModes[1]);
            const resPtr = readValue(ptr + 3, PM_IMM);

            program[resPtr] = arg0 + arg1;
            ptr += 4;
        } else if (operation === OP_MUL) {
            const arg0 = readValue(ptr + 1, paramModes[0]);
            const arg1 = readValue(ptr + 2, paramModes[1]);
            const resPtr = readValue(ptr + 3, PM_IMM);

            program[resPtr] = arg0 * arg1;
            ptr += 4;
        } else if (operation === OP_INP) {
            const argInput = input[inputPtr];
            const resPtr = program[ptr + 1];

            program[resPtr] = argInput;
            inputPtr++;
            ptr += 2;
        } else if (operation === OP_OUT) {
            const res = readValue(ptr + 1, paramModes[0]);
            console.log("Output", res);
            ptr += 2;
        } else if (operation === OP_EXT) {
            running = false;
        } else {
            console.log("INVALID OP_CODE", operation, "at position", ptr);
            running = false;
        }

    } while (running);

    return result;
};

const diagnosticCode = runDiagnostic(program, [1]);
console.log("Result (Part 1):", diagnosticCode);