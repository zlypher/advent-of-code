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
        len: instructions.length,
    }

    return {
        acc: () => globals.accumulator,
        ptr: () => globals.pointer,
        running: () => globals.pointer < globals.len,
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

function findInstructionToPatch(instructions, startPatchPtr) {
    return instructions.findIndex((ins, idx) => {
        return idx >= startPatchPtr && (ins.startsWith(OP_NOP) || ins.startsWith(OP_JMP));
    });
}

function swapInstruction(instructions, ptr, firstOp, secondOp) {
    const instruction = instructions[ptr];
    const op = instruction.substr(0, 3);
    const arg = instruction.substr(3);
    const newOp = op === firstOp ? secondOp : firstOp;
    instructions[ptr] = newOp + arg;
}

function patchInstructions(instructions, startPatchPtr) {
    const newInstructions = [...instructions];
    let patchPtr = findInstructionToPatch(newInstructions, startPatchPtr);

    swapInstruction(newInstructions, patchPtr, OP_NOP, OP_JMP);

    return [newInstructions, patchPtr];
}

function debugProgram(instructions) {
    const hgc = gameConsole(instructions);

    const seenInstructions = {};
    let current = 0;
    let loopDetected = false;
    let running = true;

    while (!loopDetected && running) {
        hgc.runNext();

        seenInstructions[current] = true;
        current = hgc.ptr();

        loopDetected = seenInstructions.hasOwnProperty(current);
        running = hgc.running();
    }

    const result = loopDetected ? -1 : 0;

    return [result, hgc.acc()];
}

function solvePartTwo(instructions) {
    const lenInstructions = instructions.length;
    let patchPtr = 0;

    while (patchPtr < lenInstructions) {
        const [patchedInstructions, foundPatchPtr] = patchInstructions(instructions, patchPtr);
        patchPtr = foundPatchPtr + 1;

        const [result, acc] = debugProgram(patchedInstructions);
        if (result === 0) {
            return acc;
        }
    }
}

const input = prepareInput();
// console.log(solvePartOne(input));
console.log(solvePartTwo(input));