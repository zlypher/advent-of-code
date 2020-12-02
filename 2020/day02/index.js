// Day 2: Password Philosophy
const fs = require("fs");

const prepareInput = () => fs.readFileSync("./input.txt")
    .toString()
    .split("\r\n")
    .map(parseInputLine);

const parseInputLine = (line) => {
    const matches = line.match(/(\d+)-(\d+) (\w): (\w*)/);
    return {
        min: parseInt(matches[1], 10),
        max: parseInt(matches[2], 10),
        letter: matches[3],
        password: matches[4],
    }
}


function solvePartOne(input) {
    let numValidPasswords = 0;
    for (let i = 0; i < input.length; ++i) {
        const {
            password,
            letter,
            min, max
        } = input[i];
        if (checkPassword(password, letter, min, max)) {
            numValidPasswords++;
        }
    }

    return numValidPasswords;
}

function checkPassword(password, letter, min, max) {
    const map = {};

    for (let i = 0; i < password.length; ++i) {
        const c = password[i];
        map[c] = map[c] ? map[c] + 1 : 1;
    }

    return map[letter] >= min && map[letter] <= max;
}

const input = prepareInput();
console.log(solvePartOne(input));