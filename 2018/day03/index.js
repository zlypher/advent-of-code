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

const markFabric = (fabric, claim, overlapMap) => {
    let hasOverlap = false;
    overlapMap[claim.id] = false;
    for (let i = claim.x; i < claim.x + claim.w; ++i) {
        for (let j = claim.y; j < claim.y + claim.h; ++j) {
            const currentMark = fabric[i][j];
            if (currentMark > 0) {
                hasOverlap = true;

                overlapMap[claim.id] = true;
                overlapMap[currentMark] = true;
            }

            fabric[i][j] = claim.id;
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

    const claims = parseClaims(rawClaims);
    const overlapMap = {};
    for (let i = 0; i < claims.length; ++i) {
        !markFabric(fabric, claims[i], overlapMap);
    }

    let overlapCount = 0;
    for (let i = 0; i < fabricSize; ++i) {
        for (let j = 0; j < fabricSize; ++j) {
            if (fabric[i][j] > 1) {
                overlapCount++;
            }
        }
    }

    return [overlapCount, Object.entries(overlapMap).filter((val) => val[1] === false)[0][0]];
};

const [multipleClaimed, claimId] = findClaims(rawClaims);
console.log("Result (Part 1):", multipleClaimed);

// Part 2
console.log("Result (Part 2):", claimId);