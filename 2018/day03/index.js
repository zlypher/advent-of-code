// Day 2: Inventory Management System
const fs = require("fs");
let rawClaims = fs.readFileSync("./input.txt").toString().split("\r\n");

const claimRegex = /#(\d*) @ (\d*),(\d*): (\d*)x(\d*)/;

const parseClaims = (rawClaims) => {
    return rawClaims.map(claim => {
        const matches = claim.match(claimRegex);
        return {
            id: parseInt(matches[1], 10),
            x: parseInt(matches[2], 10),
            y: parseInt(matches[3], 10),
            w: parseInt(matches[4], 10),
            h: parseInt(matches[5], 10),
        }
    });
}

const markFabric = (fabric, claim) => {
    let hasOverlap = false;
    for (let i = claim.x; i < claim.x + claim.w; ++i) {
        for (let j = claim.y; j < claim.y + claim.h; ++j) {
            if (fabric[i][j] > 0) {
                hasOverlap = true;
            }

            fabric[i][j] += 1;
        }
    }
    return hasOverlap;
};

const findClaims = (rawClaims) => {
    const fabricSize = 1000;
    const fabric = new Array(fabricSize);
    for (let i = 0; i < fabricSize; ++i) {
        fabric[i] = new Array(fabricSize).fill(0);
    }

    let overlapCount = 0;
    const claims = parseClaims(rawClaims);
    for (let i = 0; i < claims.length; ++i) {
        !markFabric(fabric, claims[i]);
    }

    for (let i = 0; i < fabricSize; ++i) {
        for (let j = 0; j < fabricSize; ++j) {
            if (fabric[i][j] > 1) {
                overlapCount++;
            }
        }
    }

    return overlapCount;
};

const multipleClaimed = findClaims(rawClaims);
console.log("Result (Part 1):", multipleClaimed);