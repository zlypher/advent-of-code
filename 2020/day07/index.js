// Day 7: Handy Haversacks
const { match } = require("assert");
const fs = require("fs");

const prepareInput = () => fs.readFileSync("./input.txt")
    .toString()
    .split("\r\n");

function solvePartOne(parentBagDef, target) {
    const totalParents = new Set();
    const todo = [ target ];
    while (todo.length > 0) {
        const current = todo.pop();
        const containedIn = parentBagDef[current];

        if (!!containedIn) {
            containedIn.forEach((elem) => {
                if (!totalParents.has(elem)) {
                    todo.push(elem);
                    totalParents.add(elem);
                }
            })
        }
    }

    return totalParents.size;
}

function parseParentBags(input) {
    const parentBags = {};

    for (let i = 0; i < input.length; ++i) {
        const [base, contains] = parseBagDefinition(input[i]);
        for (let j = 0; j < contains.length; ++j) {
            const [num, type] = contains[j];

            if (!parentBags.hasOwnProperty(type)) {
                parentBags[type] = [];
            }

            parentBags[type].push(base);
        }
    }

    return parentBags;
}

function parseBagDefinition(definition) {
    const [thisBag, containsBags] = definition.split(" contain ");
    const baseBag = parseSingleThis(thisBag);
    const insideBags = parseSingleContains(containsBags);

    return [baseBag, insideBags];
}

function parseSingleThis(line) {
    const regex = /([\w ]*) bags?/;
    const matches = line.match(regex);
    return matches[1];
}

function parseSingleContains(line) {
    if (line === "no other bags.") {
        return [];
    }

    const bags = [];
    const bagsDef = line.substr(0, line.length - 1).split(", ");
    const regex = /(\d+) ([\w ]+) bags?/;
    for (let i = 0; i < bagsDef.length; ++i) {
        const matches = bagsDef[i].match(regex);
        bags.push([parseInt(matches[1], 10), matches[2]]);
    }
    return bags;
}

function solvePartTwo(bagDef, target) {
    return calculateTotalBags(bagDef, target);
}

function calculateTotalBags(bagDef, target) {
    const contains = bagDef[target];
    if (contains.length === 0) {
        return 0;
    }

    let total = 0;

    for (let i = 0; i < contains.length; ++i) {
        const [num, type] = contains[i];
        const calc = calculateTotalBags(bagDef, type);
        total = total + num * (calc + 1);
    }

    return total;
}

function parseBags(input) {
    const bags = {};

    for (let i = 0; i < input.length; ++i) {
        const [base, contains] = parseBagDefinition(input[i]);
        bags[base] = contains;
    }

    return bags;
}

const input = prepareInput();
const parentBags = parseParentBags(input);
// console.log(solvePartOne(parentBags, "shiny gold"));
const bags = parseBags(input);
console.log(solvePartTwo(bags, "shiny gold"));