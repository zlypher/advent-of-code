// Day 9: Encoding Error
const fs = require("fs");

const prepareInput = () => fs.readFileSync("./input.txt")
    .toString()
    .split("\r\n")
    .map(str => parseInt(str, 10));

function solvePartOne(input, preambleSize) {
    let arr = input.slice(0, preambleSize);

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

function solvePartTwo(input, preambleSize) {
    const target = solvePartOne(input, preambleSize);

    for (let i = 0; i < input.length; ++i) {
        let current = [];
        for (let j = i; j < input.length; ++j) {
            current.push(input[j]);
            const currentSum = current.reduce((prev, curr) => { return prev + curr; }, 0);
            if (currentSum === target) {
                const min = Math.min(...current);
                const max = Math.max(...current);
                return min + max;
            } else if (currentSum > target) {
                break;
            }
        }
    }

    return -1;
}

const input = prepareInput();
console.log(solvePartOne(input, 25));
console.log(solvePartTwo(input, 25));