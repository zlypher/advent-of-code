// Day 6: Universal Orbit Map
const fs = require("fs");

let orbitData = fs.readFileSync("./input.txt").toString().split("\r\n");
console.log(orbitData);

const findTotalOrbits = (orbitData) => {
    return 0;
};

const totalOrbits = findTotalOrbits(orbitData);
console.log("Result (Part 1):", totalOrbits);