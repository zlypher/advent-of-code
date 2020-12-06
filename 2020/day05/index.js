// Day 5: Binary Boarding
const fs = require("fs");

const prepareInput = () => fs.readFileSync("./input.txt")
    .toString()
    .split("\r\n");

function solvePartOne(boardingPasses) {
    let maxId = 0;

    for (let i = 0; i < boardingPasses.length; ++i) {
        const id = convertToId(boardingPasses[i]);

        if (id > maxId) {
            maxId = id;
        }
    }

    return maxId;
}

function convertToId(boardingPass) {
    const [row, col] = convertToSeatPos(boardingPass);
    return row * 8 + col;
}

function convertToSeatPos(boardingPass) {
    const rowPart = boardingPass.substr(0, 7);
    const colPart = boardingPass.substr(7, 3);

    const row = convertToNum(rowPart, "B");
    const col = convertToNum(colPart, "R");

    return [row, col];
}

function convertToNum(input, upper) {
    let num = 0;
    const len = input.length;

    for (let i = 0; i < len; ++i) {
        const val = input[len - 1 - i] === upper ? 1 : 0;
        num = num ^ (val << i)
    }

    return num;
}

function solvePartTwo(boardingPasses) {
    const ids = boardingPasses
        .map(bp => convertToId(bp))
        .sort((a, b) => a - b);

    for (let i = 0; i < ids.length - 2; ++i) {
        if (ids[i + 1] - ids[i] !== 1) {
            return ids[i] + 1;
        }
    }

    return -1;
}

const input = prepareInput();
console.log(solvePartOne(input));
console.log(solvePartTwo(input));