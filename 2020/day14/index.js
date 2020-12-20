// Day 14: Docking Data
const fs = require("fs");

const prepareInput = () => fs.readFileSync("./input.txt")
    .toString()
    .split("\r\n");

function solvePartOne(input) {
    const memory = {};
    let mask = "";

    for (let i = 0; i < input.length; ++i) {
        const line = input[i];

        if (line.startsWith("mask")) {
            mask = updateMask(line);
        } else {
            writeToMemory(memory, line, mask);
        }
    }

    return sumMemoryValues(memory);
}

function updateMask(line) {
    const matches = line.match(/mask = ([\w\d]*)/);
    return matches[1];
}

function writeToMemory(memory, line, mask) {
    const matches = line.match(/mem\[(\d+)\] = (\d+)/);
    const address = parseInt(matches[1], 10);
    const value = BigInt(parseInt(matches[2], 10));

    memory[address] = updateValue(value, mask);
}

function updateValue(value, mask) {
    let updated = value;
    const maskLen = mask.length;
    for (let i = maskLen - 1; i >= 0; i--) {
        const idx = BigInt(maskLen - i - 1);
        if (mask[i] === "1") {
            updated = setBit(updated, idx);
        } else if (mask[i] === "0") {
            updated = unsetBit(updated, idx);
        }
    }
    return updated;
}

function setBit(val, bit) {
    return val | 1n << bit;
}

function unsetBit(val, bit) {
    return val & ~(1n << bit);
}

function sumMemoryValues(memory) {
    return Object.values(memory).reduce((prev, curr) => {
        return prev + BigInt(curr)
    }, BigInt(0));
}

const input = prepareInput();
console.log(solvePartOne(input));
