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

function solvePartTwo(input) {
    const [_, snd] = input;
    const timestamps = snd.split(",")
        .map(ts => ts === "x" ? -1 : parseInt(ts, 10));
    
    let numTimestamps = timestamps.length;
    let max = Math.max(...timestamps);
    let maxIdx = timestamps.findIndex(x => x === max);
    let increment = max;
    let timestamp = 0;
    let running = true;

    while (running) {
        running = false;
        timestamp += increment;
        console.log("trying", timestamp);

        for (let i = 0; i < numTimestamps; ++i) {
            if (timestamps[i] === -1) {
                // skip
                continue;
            }

            const calcIdx = i - maxIdx;
            let current = timestamps[i];
            if ((timestamp + calcIdx) % current !== 0) {
                running = true;
                break;
            }
        }
    }

    return timestamp;
}

// https://stackoverflow.com/a/34955386/733368
function gcd2(a, b) {
    // Greatest common divisor of 2 integers
    if(!b) return b===0 ? a : NaN;
    return gcd2(b, a%b);
}

// https://stackoverflow.com/a/34955386/733368
function lcm2(a, b) {
    // Least common multiple of 2 integers
    return a*b / gcd2(a, b);
}

// https://stackoverflow.com/a/34955386/733368
function lcm(array) {
    // Least common multiple of a list of integers
    var n = 1;
    for(var i=0; i<array.length; ++i)
        n = lcm2(array[i], n);
    return n;
}

const input = prepareInput();
// console.log(solvePartOne(input));
console.log(solvePartTwo(input));
