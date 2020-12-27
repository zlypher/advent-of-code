// Day 22: Crab Combat
const fs = require("fs");

const prepareInput = () => fs.readFileSync("./input.txt")
    .toString()
    .split("\r\n");

function solvePartOne(data) {
    const first = parsePlayerDeck(input, 0);
    const second = parsePlayerDeck(input, first.length + 2);

    while (first.length > 0 && second.length > 0) {
        // Pick card
        const fst = first.shift();
        const snd = second.shift();

        // Add to winner
        if (fst > snd) {
            first.push(fst, snd);
        } else {
            second.push(snd, fst);
        }
    }

    return calculateScore(first) + calculateScore(second);
}

function parsePlayerDeck(input, startPos) {
    const deck = [];
    let pos = startPos + 1;

    while (pos < input.length) {
        const line = input[pos];
        if (line === "") {
            break;
        }

        deck.push(parseInt(line, 10));
        pos++;
    }

    return deck;
}

function calculateScore(deck) {
    if (deck.length === 0) {
        return 0;
    }

    const len = deck.length;

    return deck.reduceRight((prev, curr, idx) => {
        return prev + curr * (len - idx);
    }, 0);
}

const input = prepareInput();
console.log(solvePartOne(input));
