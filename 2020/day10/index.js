// Day 9: Encoding Error
const fs = require("fs");

const prepareInput = () => fs.readFileSync("./input.txt")
    .toString()
    .split("\r\n")
    .map(str => parseInt(str, 10));

function solvePartOne(input) {
    input.push(0); // Add outlet
    const sorted = input.sort((a, b) => a - b);
    const diffMap = [
        0, // Not relevant
        0, // Diff of 1
        0, // Not relevant
        1, // Diff of 3 -> Always one to built-in adapter
    ];

    for (let i = 0; i < sorted.length - 1; ++i) {
        const fst = sorted[i];
        const snd = sorted[i + 1];

        const diff = snd - fst;
        diffMap[diff] += 1;
    }

    const [_0, diffOne, _2, diffThree] = diffMap;

    return diffOne * diffThree;
}

const input = prepareInput();
console.log(solvePartOne(input));