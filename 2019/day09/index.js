// Day 9: Sensor Boost
const {
    createProgram,
    EXT_HALT
} = require("../_shared/int-code-computer-v2");
const fs = require("fs");

let programCode = fs.readFileSync("./input.txt").toString().split(",").map(inp => parseInt(inp, 10));

const getBoostCode = (programCode, input) => {
    const program = createProgram([...programCode]);

    let isRunning = true;
    let output = 0;
    let args = [input];
    do {
        let newOutput = program.run(args)
        args = [];

        if (newOutput === EXT_HALT) {
            isRunning = false;
        } else {
            output = newOutput;
            console.log(output);
        }
    } while (isRunning);

    return output;
}

const result = getBoostCode(programCode, 1);
console.log("Result (Part 1):", result);

const resultV2 = getBoostCode(programCode, 2);
console.log("Result (Part 1):", resultV2);