// Day 22: Crab Combat
const fs = require("fs");

const prepareInput = () => fs.readFileSync("./input.txt")
    .toString()
    .split("\r\n");

function solvePartOne(input) {
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

function solvePartTwo(input) {
    const first = parsePlayerDeck(input, 0);
    const second = parsePlayerDeck(input, first.length + 2);

    const [playerOneWon, deckOne, deckTwo] = playGamePartTwo(first, second);

    return playerOneWon
        ? calculateScore(deckOne)
        : calculateScore(deckTwo);
}

function toKey(arr1, arr2) {
    return [
        arr1.join(","),
        arr2.join(","),
    ].join("-");
}

function playGamePartTwo(first, second) {
    const alreadyPlayed = {};

    const deckOne = [...first];
    const deckTwo = [...second];

    let round = 1;

    while (deckOne.length > 0 && deckTwo.length > 0) {
        // Check prev state
        const playedKey = toKey(deckOne, deckTwo);
        const res = alreadyPlayed[playedKey];

        if (res) {
            return [true, deckOne, deckTwo];
        }

        // Pick card
        const fst = deckOne.shift();
        const snd = deckTwo.shift();

        // console.log({ round, fst, snd, deckOne, deckTwo})

        let playSubGame = fst <= deckOne.length && snd <= deckTwo.length;
        let [playerOneWon, ...rest] = playSubGame
            ? playGamePartTwo(deckOne.slice(0, fst), deckTwo.slice(0, snd))
            : [fst > snd, deckOne, deckTwo];

        alreadyPlayed[playedKey] = true;

        // Add to winner
        if (playerOneWon) {
            deckOne.push(fst, snd);
        } else {
            deckTwo.push(snd, fst);
        }

        round++;
    }

    return [deckOne.length > 0, deckOne, deckTwo];
}

const input = prepareInput();
// console.log(solvePartOne(input));
console.log(solvePartTwo(input));
