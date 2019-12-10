// Day 2: Inventory Management System
const fs = require("fs");
let boxIds = fs.readFileSync("./input.txt").toString().split("\r\n");

console.log(boxIds);

const findChecksum = (boxIds) => {
    return 0;
};

const checksum = findChecksum(boxIds);
console.log("Result (Part 1):", checksum);