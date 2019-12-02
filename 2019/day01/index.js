const fs = require("fs");

const content = fs.readFileSync("./input.txt");
console.log(typeof content);