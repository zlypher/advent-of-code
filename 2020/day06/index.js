// Day 6: Custom Customs
const fs = require("fs");

const prepareInput = () => fs.readFileSync("./input.txt")
    .toString()
    .split("\r\n");



function parseGroups(input) {
    const groups = [];

    let current = [];

    for (let i = 0; i < input.length; ++i) {
        const line = input[i];
        if (line === "") {
            groups.push(current);
            current = [];
            continue;
        }

        current.push(line);
    }

    // Push the last one
    groups.push(current);

    return groups;
}

function solvePartOneOrTwo(groups, getAnswerCount) {
    return groups.reduce((prev, curr) => {
        return prev + getAnswerCount(curr);
    }, 0);
}

function getAnswerCountPartOne(answers) {
    const common = new Set();
    for (let i = 0; i < answers.length; ++i) {
        for (let j = 0; j < answers[i].length; ++j) {
            common.add(answers[i][j]);
        }
    }

    return common.size;
}

function getAnswerCountPartTwo(answers) {
    const total = {};
    const numPersons = answers.length;

    for (let i = 0; i < answers.length; ++i) {
        for (let j = 0; j < answers[i].length; ++j) {
            const answer = answers[i][j];

            if (!total[answer]) {
                total[answer] = 1;
            } else {
                total[answer] = total[answer] + 1;
            }
        }
    }

    return Object.values(total)
        .reduce((prev, curr) => {
            return prev + (curr === numPersons ? 1 : 0);
        }, 0);
}

const input = prepareInput();
const groups = parseGroups(input);
console.log(solvePartOneOrTwo(groups, getAnswerCountPartOne));
console.log(solvePartOneOrTwo(groups, getAnswerCountPartTwo));