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


function solvePartOneOrTwo(input, checkPassword) {
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

function checkPasswordPartOne(password, letter, min, max) {
    const map = {};

    for (let i = 0; i < password.length; ++i) {
        const c = password[i];
        map[c] = map[c] ? map[c] + 1 : 1;
    }

    return map[letter] >= min && map[letter] <= max;
}

function checkPasswordPartTwo(password, letter, fstIndex, sndIndex) {
    const fstChar = password[fstIndex - 1];
    const sndChar = password[sndIndex - 1];

    const fstMatch = fstChar === letter;
    const sndMatch = sndChar === letter;

    return fstMatch != sndMatch;
}

const input = prepareInput();
console.log(solvePartOneOrTwo(input, checkPasswordPartOne));
console.log(solvePartOneOrTwo(input, checkPasswordPartTwo));