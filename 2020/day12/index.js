// Day 12: Rain Risk
const fs = require("fs");

const prepareInput = () => fs.readFileSync("./input.txt")
    .toString()
    .split("\r\n");

function solvePartOne(input) {
    const dirs = ["N", "E", "S", "W"];
    let currDir = 1;
    const moveMap = {
        "N": 0,
        "E": 0,
        "S": 0,
        "W": 0,
    };

    for (let i = 0; i < input.length; ++i) {
        const line = input[i];
        const cmd = line[0];
        const val = parseInt(line.substr(1, line.length - 1), 10);

        switch (cmd) {
            case "F":
                moveMap[dirs[currDir]] += val;
                break;
            case "N":
            case "S":
            case "E":
            case "W":
                moveMap[cmd] += val;
                break;
            case "L":
                currDir = (currDir - (val / 90) + 4) % 4;
                break;
            case "R":
                currDir = (currDir + (val / 90) + 4) % 4;
                break;
            default:
                console.log("INVALID");
                break;
        }
    }

    return Math.abs(moveMap["N"] - moveMap["S"]) + Math.abs(moveMap["E"] - moveMap["W"]);
}

const input = prepareInput();
console.log(solvePartOne(input));