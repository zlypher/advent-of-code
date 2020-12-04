// Day 3: Toboggan Trajectory
const fs = require("fs");

const prepareInput = () => fs.readFileSync("./input.txt")
    .toString()
    .split("\r\n")
    .map(line => line.split(""));

const FIELD_TREE = '#'

function solvePartOne(input) {
    const sizeHorizontal = input[0].length;
    const sizeVertical = input.length;

    return findTreesForSlope(input, sizeHorizontal, sizeVertical, 3, 1);
}

const findTreesForSlope = (input, sizeH, sizeV, stepR, stepD) => {
    let countTrees = 0;
    let posHorizontal = 0;
    let posVertical = 0;

    while (posVertical < sizeV) {
        const field = input[posVertical][posHorizontal];

        if (field === FIELD_TREE) {
            countTrees += 1;
        }

        posHorizontal = (posHorizontal + stepR) % sizeH;
        posVertical = posVertical + stepD;
    }

    return countTrees;
}

function solvePartTwo(input) {
    const sizeHorizontal = input[0].length;
    const sizeVertical = input.length;
    const slopes = [
        [1, 1],
        [3, 1],
        [5, 1],
        [7, 1],
        [1, 2]
    ];

    return slopes
        .map(([r, d]) => findTreesForSlope(input, sizeHorizontal, sizeVertical, r, d))
        .reduce((prev, curr) => { return prev * curr; }, 1);
}

const input = prepareInput();
console.log(solvePartOne(input));
console.log(solvePartTwo(input));