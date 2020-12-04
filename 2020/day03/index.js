// Day 2: Password Philosophy
const fs = require("fs");

const prepareInput = () => fs.readFileSync("./input.txt")
    .toString()
    .split("\r\n")
    .map(line => line.split(""));

const FIELD_TREE = '#'

function solvePartOne(input) {
    const sizeHorizontal = input[0].length;
    const sizeVertical = input.length;

    console.log({ sizeHorizontal, sizeVertical });
    const stepRight = 3;
    const stepDown = 1;
    let countTrees = 0;
    let posHorizontal = 0;
    let posVertical = 0;

    console.log(input[posVertical][posHorizontal]);

    while (posVertical < sizeVertical) {
        const field = input[posVertical][posHorizontal];
        // console.log(field);

        if (field === FIELD_TREE) {
            countTrees += 1;
        }

        posHorizontal = (posHorizontal + stepRight) % sizeHorizontal;
        posVertical = posVertical + stepDown;
    }

    return countTrees;
}

const input = prepareInput();
console.log(solvePartOne(input));