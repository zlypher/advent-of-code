// Day 1: Report Repair
const fs = require("fs");

const prepareInput = () => fs.readFileSync("./input.txt")
    .toString()
    .split("\r\n")
    .map(inp => parseInt(inp, 10));

const input = prepareInput();

function solvePartOne(input) {
    const [first, second] = findMatchingEntries(input);
    return first * second;
}

function findMatchingEntries(input) {
    for (let i = 0; i < input.length; ++i) {
        const first = input[i];

        for (let j = i + 1; j < input.length; ++j) {
            const second = input[j];

            if (first + second === 2020) {
                return [first, second];
            }
        }
    }
}

console.log(solvePartOne(input));

function solvePartTwo(input) {
    const [first, second, third] = findThreeMatchingEntries(input);
    return first * second * third;
}

function findThreeMatchingEntries(input) {
    for (let i = 0; i < input.length; ++i) {
        const first = input[i];

        for (let j = i + 1; j < input.length; ++j) {
            const second = input[j];

            if (first + second >= 2020) {
                continue;
            }

            for (let k = j + 1; k < input.length; ++k) {
                const third = input[k];

                if (first + second + third === 2020) {
                    console.log("found")
                    return [first, second, third];
                }
            }
        }
    }

    console.log("no found")
}

console.log(solvePartTwo(input));