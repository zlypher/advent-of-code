// Day 8: Handheld Halting
const fs = require("fs");

const OP_NOP = "nop";
const OP_ACC = "acc";
const OP_JMP = "jmp";

const parseInstruction = (instruction) => {
    const [fst, snd] = instruction.split(" ");
    return [fst, parseInt(snd, 10)];
}

const gameConsole = (instructions) => {
    const globals = {
        accumulator: 0,
        pointer: 0,
    }

    return {
        acc: () => globals.accumulator,
        ptr: () => globals.pointer,
        runNext: () => {
            const [op, arg] = parseInstruction(instructions[globals.pointer]);

            switch (op) {
                case OP_ACC:
                    globals.accumulator += arg;
                    globals.pointer += 1;
                    break;
                case OP_JMP:
                    globals.pointer += arg;
                    break;
                case OP_NOP:
                default:
                    globals.pointer += 1;
                    break;
            }
        }
    };
}

const prepareInput = () => fs.readFileSync("./input.txt")
    .toString()
    .split("\r\n");

function solvePartOne(instructions) {
    const hgc = gameConsole(instructions);

    const seenInstructions = {};
    let current = 0;
    let acc = 0;

    while (!seenInstructions.hasOwnProperty(current)) {
        hgc.runNext();

        seenInstructions[current] = true;
        current = hgc.ptr();
        acc = hgc.acc();
    }

    return acc;
}

const input = prepareInput();
console.log(solvePartOne(input));