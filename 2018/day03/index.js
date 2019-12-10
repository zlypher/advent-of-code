// Day 2: Inventory Management System
const fs = require("fs");
let claims = fs.readFileSync("./input.txt").toString().split("\r\n");

const findMultipleClaimed = (claims) => {
    return 0;
};

const multipleClaimed = findMultipleClaimed(claims);
console.log("Result (Part 1):", multipleClaimed);
