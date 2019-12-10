// Day 2: Inventory Management System
const fs = require("fs");
let boxIds = fs.readFileSync("./input.txt").toString().split("\r\n");

const getCounts = (id) => {
    let counts = id.split("")
        .reduce((prev, curr) => {
            if (!prev[curr]) {
                prev[curr] = 0;
            }

            prev[curr] += 1;
            return prev;
        }, {});

    return {
        hasTwos: Object.values(counts).indexOf(2) !== -1,
        hasThrees: Object.values(counts).indexOf(3) !== -1
    };
};

const findChecksum = (boxIds) => {
    let numTwos = 0;
    let numThrees = 0;

    for (let i = 0; i < boxIds.length; ++i) {
        const res = getCounts(boxIds[i]);

        numTwos = numTwos + (res.hasTwos ? 1 : 0);
        numThrees = numThrees + (res.hasThrees ? 1 : 0);
    }

    return numTwos * numThrees;
};

const checksum = findChecksum(boxIds);
console.log("Result (Part 1):", checksum);

// Part 2

const findCommonPart = (boxIds) => {
    for (let i = 0; i < boxIds.length; ++i) {
        const firstId = boxIds[i];
        for (let j = 0; j < boxIds.length; ++j) {
            if (i === j) {
                continue;
            }

            const secondId = boxIds[j];
            let numDiff = 0;
            let diffIndex = -1;
            for (let k = 0; k < secondId.length; ++k) {
                if (firstId[k] !== secondId[k]) {
                    numDiff++;
                    diffIndex = k;
                    if (numDiff > 1) {
                        break;
                    }
                }
            }

            if (numDiff === 1) {
                return firstId.substr(0, diffIndex) + firstId.substr(diffIndex + 1);
            }
        }
    }

    return false;
};

const commonIdPart = findCommonPart(boxIds);
console.log("Result (Part 2):", commonIdPart);