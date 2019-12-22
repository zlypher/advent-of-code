// Day 9: Sensor Boost
const {
    createProgram,
    EXT_HALT,
    EXT_WAIT_IN
} = require("../_shared/int-code-computer-v2");
const fs = require("fs");

let programCode = fs.readFileSync("./input.txt").toString().split(",").map(inp => parseInt(inp, 10));

const id = (vec) => {
    return `${vec.x}_${vec.y}`;
}

const turnRobot = (dir, turnDir) => {
    const rad = turnDir === 0 ? -Math.PI / 2 : Math.PI / 2;
    return {
        x: Math.round(Math.cos(rad) * dir.x - Math.sin(rad) * dir.y),
        y: Math.round(Math.sin(rad) * dir.x + Math.cos(rad) * dir.y)
    };
}

const moveRobot = (pos, dir) => {
    return { x: pos.x + dir.x, y: pos.y + dir.y };
}

const findNumberOfPanels = (programCode) => {
    const program = createProgram([...programCode]);
    let isRunning = true;
    let dir = { x: 0, y: 1 };
    let pos = { x: 0, y: 0 };
    let coloredPanels = {}
    coloredPanels[id(pos)] = 0;

    do {
        let args = coloredPanels[id(pos)] || 0;
        let newColor = program.run(args);
        if (newColor === EXT_HALT) {
            isRunning = false;
            continue;
        } if (newColor === EXT_WAIT_IN) {
            console.log("Waiting for input");
            // read and provide
        }
        if (newColor != 0 && newColor != 1) {
            console.log("invalid color");
            return -1;
        }
        coloredPanels[id(pos)] = newColor;

        let turnDir = program.run();
        if (turnDir === EXT_HALT) {
            isRunning = false;
            continue;
        } if (turnDir === EXT_WAIT_IN) {
            console.log("Waiting for input");
            // read and provide
        }

        dir = turnRobot(dir, turnDir);
        pos = moveRobot(pos, dir);
    } while (isRunning);

    return Object.keys(coloredPanels).length;
}

const result = findNumberOfPanels(programCode);
console.log("Result (Part 1):", result);