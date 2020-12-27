// Day 24: Lobby Layout
const fs = require("fs");

const prepareInput = () => fs.readFileSync("./input.txt")
    .toString()
    .split("\r\n");


function solvePartOne(input) {
    const map = {};

    for (let i = 0; i < input.length; ++i) {
        const line = input[i];
        const instructions = parseLine(line);
        const tile = applyInstructions(map, instructions);
        map[tile] = !map[tile];
    }

    return Object.values(map).filter(val => !!val).reduce((prev) => { return prev + 1; }, 0);
}

function parseLine(line) {
    let instructions = [];
    let i = 0;

    while (i < line.length) {
        const token = line[i];
        let peekToken = "";

        switch (token) {
            case "w":
            case "e":
                instructions.push(token);
                i = i + 1;
                break;
            case "n":
            case "s":
                peekToken = line[i + 1];
                instructions.push(token + peekToken);
                i = i + 2;
                break;
            default:
                i = i + 1;
                break;
        }
    }

    return instructions;
}

function applyInstructions(map, instructions) {
    let tile = [0, 0];
    for (let i = 0; i < instructions.length; ++i) {
        tile = applyInstruction(tile, instructions[i]);
    }

    return tile;
}

function applyInstruction(tile, instruction) {
    const [x, y] = tile;
    const isEven = y % 2 == 0;

    switch (instruction) {
        case "e":
            return [x + 1, y];
        case "w":
            return [x - 1, y];
        case "ne":
            return [x + (isEven ? 0 : 1), y - 1];
        case "nw":
            return [x - (isEven ? 1 : 0), y - 1];
        case "se":
            return [x + (isEven ? 0 : 1), y + 1];
        case "sw":
            return [x - (isEven ? 1 : 0), y + 1];
    }

    return tile;
}

const input = prepareInput();
console.log(solvePartOne(input));
