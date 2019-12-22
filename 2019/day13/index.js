// Day 9: Sensor Boost
const {
    createProgram,
    EXT_HALT,
    EXT_WAIT_IN
} = require("../_shared/int-code-computer-v2");
const fs = require("fs");

let programCode = fs.readFileSync("./input.txt").toString().split(",").map(inp => parseInt(inp, 10));

const TILE_EMPTY = 0;
const TILE_WALL = 1;
const TILE_BLOCK = 2;
const TILE_HPADDLE = 3;
const TILE_BALL = 4;

const findNumberOfBlockTiles = (programCode) => {
    const program = createProgram([...programCode]);
    let isRunning = true;
    let output = [];

    do {
        let newOutput = program.run();
        if (newOutput === EXT_HALT) {
            isRunning = false;
            continue;
        } else {
            output.push(newOutput);
        }
    } while (isRunning);

    let result = output
        .filter((_, idx) => idx !== 0 && (idx + 1) % 3 === 0)
        .filter(val => val === TILE_BLOCK)
        .length;

    return result;
}

const result = findNumberOfBlockTiles(programCode);
console.log("Result (Part 1):", result);
