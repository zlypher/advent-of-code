// Day 13: Shuttle Search
const fs = require("fs");

const prepareInput = () => fs.readFileSync("./input.txt")
    .toString()
    .split("\r\n");

function solvePartOne(input) {
    const [fst, snd] = input;
    const earliest = parseInt(fst, 10);
    const timestamps = snd.split(",")
        .filter(ts => ts !== "x")
        .map(ts => parseInt(ts, 10));

    const [id, time] = timestamps.reduce((prev, curr) => {
        const [_, prevWait] = prev;
        const timeToWait = curr - (earliest % curr);

        if (timeToWait < prevWait) {
            return [curr, timeToWait];
        }

        return prev;
    }, [0, Number.MAX_VALUE]);

    return id * time;
}

const input = prepareInput();
console.log(solvePartOne(input));
