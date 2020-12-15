// Day 15: Rambunctious Recitation
const fs = require("fs");

const prepareInput = () => fs.readFileSync("./input.txt")
    .toString()
    .split("\r\n")[0]
    .split(",")
    .map(l => parseInt(l, 10));

function solvePartOneOrTwo(input, target) {
    let seen = {};

    for (let i = 0; i < input.length - 1; ++i) {
        seen[input[i]] = i + 1;
    }

    let next = input[input.length - 1]
    for (let i = input.length; i < target; ++i) {
        const last = seen[next];
        const prev = last ? last : -1;
        seen[next] = i;
        next = prev === -1 ? 0 : i - prev;
    }

    return next;
}

const input = prepareInput();
console.log(solvePartOneOrTwo(input, 2020));
console.log(solvePartOneOrTwo(input, 30000000));
