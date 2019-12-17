// Day 16: Flawed Frequency Transmission
const fs = require("fs");

let inputSignal = fs.readFileSync("./input.txt").toString().split("").map(x => parseInt(x, 10));
let basePattern = [0, 1, 0, -1];

const patternCache = {}

const createPattern = (pattern, count) => {
    if (patternCache[count]) {
        return patternCache[count]
    }

    const newPattern = pattern.flatMap(elem => new Array(count + 1).fill(elem));
    newPattern.shift();
    newPattern.push(0);
    patternCache[count] = newPattern;
    return newPattern;
}

const cleanupSignal = (signal, phaseCount) => {
    let currentSignal = [...signal];

    for (let i = 0; i < phaseCount; ++i) {
        let modifiedSignal = [];

        for (let j = 0; j < currentSignal.length; ++j) {
            const pattern = createPattern(basePattern, j);
            let output = 0;
            for (let k = 0; k < currentSignal.length; ++k) {
                const patternIdx = k % pattern.length;
                const sig = currentSignal[k];
                const mod = pattern[patternIdx];
                output = output + sig * mod;
            }

            modifiedSignal[j] = Math.abs(output) % 10;
        }

        currentSignal = modifiedSignal;
    }

    return currentSignal.slice(0, 8).join("");
}

const result = cleanupSignal(inputSignal, 100);
console.log("Result (Part 1):", result);