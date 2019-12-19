const OP_ADD = 1;
const OP_MUL = 2;
const OP_INP = 3;
const OP_OUT = 4;
const OP_JIT = 5;
const OP_JIF = 6;
const OP_LET = 7;
const OP_EQU = 8;
const OP_ARB = 9; // Adjust Relative Base
const OP_EXT = 99; // Exit

const PM_POS = 0; // Parameter Mode: Position
const PM_IMM = 1; // Parameter Mode: Immediate
const PM_REL = 2; // Parameter Mode: Relative
const PM_DEF = PM_POS; // Parameter Mode (Default)

const EXT_HALT = 0; // Exit: Halt
const EXT_WAIT_IN = -1; // Exit: Waiting for Input
const EXT_ERR = -99; // Exit: Error

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

const createProgram = (program) => {
    let running = true;
    let ptr = 0;
    let input = [];
    let relativeBase = 0;

    const readValue = (pos, mode = PM_DEF) => {
        let param = program[pos] || 0;
        if (mode === PM_IMM) {
            return param;
        } else if (mode === PM_POS) {
            return program[param] || 0;
        } else if (mode === PM_REL) {
            return program[relativeBase + param] || 0;
        } else {
            console.log("Invalid Position Mode");
            return -1;
        }
    }

    return {
        run: (newInput) => {
            input = [
                ...input,
                ...newInput
            ];

            do {
                const {
                    operation,
                    paramModes
                } = readCode(program[ptr]);

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
                    if (input.length === 0) {
                        return EXT_WAIT_IN;
                    }

                    const argInput = input.shift();
                    const resPtr = program[ptr + 1];

                    program[resPtr] = argInput;
                    ptr += 2;
                } else if (operation === OP_OUT) {
                    const res = readValue(ptr + 1, paramModes[0]);
                    ptr += 2;

                    return res;
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
                } else if (operation === OP_ARB) {
                    const arg0 = readValue(ptr + 1, paramModes[0]);
                    relativeBase += arg0;
                    ptr += 2;
                } else if (operation === OP_EXT) {
                    running = false;
                    return EXT_HALT;
                } else {
                    console.log("INVALID OP_CODE", operation, "at position", ptr);
                    running = false;
                    return EXT_ERR;
                }

            } while (running);

            return EXT_ERR;
        }
    }
}

module.exports = {
    createProgram,
    EXT_HALT
};