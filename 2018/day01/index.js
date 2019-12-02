// // 2018 day 01 part 01

// const fs = require("fs");
// let frequencyChanges = fs.readFileSync("./input.txt").toString().split("\r\n").map(inp => parseInt(inp, 10));
// const totalChange = frequencyChanges.reduce((prev, curr) => curr + prev, 0);
// console.log(totalChange);


// 2018 day 01 part 02

const fs = require("fs");
let frequencyChanges = fs.readFileSync("./input.txt").toString().split("\r\n").map(inp => parseInt(inp, 10));


const findFirstRepeated = (changes) => {
    let frequency = 0;
    let seenFrequencies = [true];

    do {
        for (let i = 0; i < changes.length; ++i) {
            const curr = changes[i];
            frequency += curr;

            if (seenFrequencies[frequency] === true) {
                return frequency;
            } else {
                seenFrequencies[frequency] = true;
            }
        }
    } while (true);
}

console.log(findFirstRepeated(frequencyChanges));