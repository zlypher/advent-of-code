// Day 9: Encoding Error
const fs = require("fs");

const prepareInput = () => fs.readFileSync("./input.txt")
    .toString()
    .split("\r\n")
    .map(str => parseInt(str, 10));

function solvePartOne(input, preambleSize) {
    let arr = input.slice(0, preambleSize);

    console.log(arr);

    for (let i = preambleSize; i < input.length; ++i) {
        let current = input[i];
        let found = findSum(arr, current);
        if (!found) {
            return current;
        }

        arr.push(current);
        arr.shift();
    }

    return -1;
}

function findSum(numbers, target) {
    // brute force :(

    for (let i = 0; i < numbers.length; ++i) {
        if (numbers[i] > target) {
            continue;
        }

        for (let j = 0; j < numbers.length; ++j) {
            if (numbers[i] + numbers[j] === target) {
                return true;
            }
        }
    }

    return false;
}

const input = prepareInput();
console.log(solvePartOne(input, 25));