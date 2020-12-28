// Day 25: Combo Breaker
const fs = require("fs");

const prepareInput = () => fs.readFileSync("./input.txt")
    .toString()
    .split("\r\n")
    .map(n => parseInt(n, 10));


function solvePartOne(input) {
    const map = {};
    const [cardPubKey, doorPubKey] = input;
    const cardLoopSize = findLoopSize(cardPubKey);
    const doorLoopSize = findLoopSize(doorPubKey);

    const targetKey = transformKey(doorPubKey, cardLoopSize);
    const compareKey = transformKey(cardPubKey, doorLoopSize);

    console.log({ cardLoopSize, doorLoopSize })
    console.log({ targetKey, compareKey })

    return targetKey;
}

function findLoopSize(key) {
    let value = 1;
    let loopSize = 0;
    const subjectNumber = 7;
    const secretKey = 20201227;

    while (true) {
        loopSize++;

        value = value * subjectNumber;
        value = value % secretKey;

        if (value === key) {
            return loopSize;
        }
    }

    return loopSize;
}

function transformKey(subjectNumber, loopSize) {
    let value = 1;
    const secretKey = 20201227;

    for (let i = 0; i < loopSize; ++i) {
        value = value * subjectNumber;
        value = value % secretKey;
    }

    return value;
}

const input = prepareInput();
console.log(solvePartOne(input));
