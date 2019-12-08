const OP_ADD = 1;
const OP_MUL = 2;
const OP_INP = 3;
const OP_OUT = 4;
const OP_JIT = 5;
const OP_JIF = 6;
const OP_LET = 7;
const OP_EQU = 8;
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

const runProgram = (program, input = []) => {
    let running = true;
    let ptr = 0;
    let inputPtr = 0;
    let output = 0;

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
            // console.log("Output", res);
            output = res;
            ptr += 2;
        } else if (operation === OP_JIT) {
            const arg0 = readValue(ptr + 1, paramModes[0]);
            const res = readValue(ptr + 2, paramModes[1]);
            if (arg0 !== 0) {
                ptr = res;
            } else {
                ptr += 3;
            }
        } else if (operation === OP_JIF) {
            const arg0 = readValue(ptr + 1, paramModes[0]);
            const res = readValue(ptr + 2, paramModes[1]);
            if (arg0 === 0) {
                ptr = res;
            } else {
                ptr += 3;
            }
        } else if (operation === OP_LET) {
            const arg0 = readValue(ptr + 1, paramModes[0]);
            const arg1 = readValue(ptr + 2, paramModes[1]);
            const resPtr = readValue(ptr + 3, PM_IMM);

            program[resPtr] = arg0 < arg1 ? 1 : 0;
            ptr += 4;
        } else if (operation === OP_EQU) {
            const arg0 = readValue(ptr + 1, paramModes[0]);
            const arg1 = readValue(ptr + 2, paramModes[1]);
            const resPtr = readValue(ptr + 3, PM_IMM);

            program[resPtr] = arg0 === arg1 ? 1 : 0;
            ptr += 4;
        } else if (operation === OP_EXT) {
            running = false;
        } else {
            console.log("INVALID OP_CODE", operation, "at position", ptr);
            running = false;
        }

    } while (running);

    return output;
};

module.exports = {
    runProgram
};