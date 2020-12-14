// Day 11: Seating System
const fs = require("fs");

const FLOOR = ".";
const EMPTY = "L";
const OCCUPIED = "#";

const prepareInput = () => fs.readFileSync("./input.txt")
    .toString()
    .split("\r\n");

function solvePartOneOrTwo(board, nextStepFn) {
    let mainBoard = board.map(l => [...l]);
    let tmpBoard = board.map(l => [...l]);
    let hasChanged = true;
    let gen = 1;

    while (hasChanged) {
        hasChanged = false;

        for (let i = 0; i < mainBoard.length; ++i) {
            for (let j = 0; j < mainBoard[i].length; ++j) {
                let current = mainBoard[i][j];
                let next = nextStepFn(mainBoard, i, j);
                tmpBoard[i][j] = next;

                if (current !== next) {
                    hasChanged = true;
                }
            }
        }

        gen++;

        // swap boards
        const tmp = mainBoard;
        mainBoard = tmpBoard;
        tmpBoard = tmp;

        // console.log(mainBoard.map(l => l.join("")).join("\r\n"));
    }

    return countOccupiedSeats(mainBoard);
}

function nextStepOne(board, i, j) {
    const iLen = board.length - 1;
    const jLen = board[0].length - 1;

    let current = board[i][j];
    if (current === FLOOR) {
        return FLOOR;
    }

    let countNeighbors = 0;

    if (i === 0 && j === 0) {
        // top left corner
        countNeighbors += board[i][j + 1] === OCCUPIED ? 1 : 0;
        countNeighbors += board[i + 1][j + 1] === OCCUPIED ? 1 : 0;
        countNeighbors += board[i + 1][j] === OCCUPIED ? 1 : 0;
    } else if (i === 0 && j === jLen) {
        // top right corner
        countNeighbors += board[i][j - 1] === OCCUPIED ? 1 : 0;
        countNeighbors += board[i + 1][j - 1] === OCCUPIED ? 1 : 0;
        countNeighbors += board[i + 1][j] === OCCUPIED ? 1 : 0;
    } else if (i === iLen && j === 0) {
        // bottom left corner
        countNeighbors += board[i][j + 1] === OCCUPIED ? 1 : 0;
        countNeighbors += board[i - 1][j + 1] === OCCUPIED ? 1 : 0;
        countNeighbors += board[i - 1][j] === OCCUPIED ? 1 : 0;
    } else if (i === iLen && j === jLen) {
        // bottom right corner
        countNeighbors += board[i][j - 1] === OCCUPIED ? 1 : 0;
        countNeighbors += board[i - 1][j - 1] === OCCUPIED ? 1 : 0;
        countNeighbors += board[i - 1][j] === OCCUPIED ? 1 : 0;
    } else if (i === 0 && j > 0 && j < jLen) {
        // top row
        countNeighbors += board[i][j - 1] === OCCUPIED ? 1 : 0;
        countNeighbors += board[i][j + 1] === OCCUPIED ? 1 : 0;
        countNeighbors += board[i + 1][j - 1] === OCCUPIED ? 1 : 0;
        countNeighbors += board[i + 1][j] === OCCUPIED ? 1 : 0;
        countNeighbors += board[i + 1][j + 1] === OCCUPIED ? 1 : 0;
    } else if (i === iLen && j > 0 && j < jLen) {
        // bottom row
        countNeighbors += board[iLen][j - 1] === OCCUPIED ? 1 : 0;
        countNeighbors += board[iLen][j + 1] === OCCUPIED ? 1 : 0;
        countNeighbors += board[iLen - 1][j - 1] === OCCUPIED ? 1 : 0;
        countNeighbors += board[iLen - 1][j] === OCCUPIED ? 1 : 0;
        countNeighbors += board[iLen - 1][j + 1] === OCCUPIED ? 1 : 0;
    } else if (i > 0 && i < iLen && j === 0) {
        // first column
        countNeighbors += board[i - 1][j] === OCCUPIED ? 1 : 0;
        countNeighbors += board[i - 1][j + 1] === OCCUPIED ? 1 : 0;
        countNeighbors += board[i][j + 1] === OCCUPIED ? 1 : 0;
        countNeighbors += board[i + 1][j] === OCCUPIED ? 1 : 0;
        countNeighbors += board[i + 1][j + 1] === OCCUPIED ? 1 : 0;
    } else if (i > 0 && i < iLen && j === jLen) {
        // last column
        countNeighbors += board[i - 1][j] === OCCUPIED ? 1 : 0;
        countNeighbors += board[i - 1][j - 1] === OCCUPIED ? 1 : 0;
        countNeighbors += board[i][j - 1] === OCCUPIED ? 1 : 0;
        countNeighbors += board[i + 1][j] === OCCUPIED ? 1 : 0;
        countNeighbors += board[i + 1][j - 1] === OCCUPIED ? 1 : 0;
    } else {
        countNeighbors += board[i - 1][j - 1] === OCCUPIED ? 1 : 0;
        countNeighbors += board[i - 1][j] === OCCUPIED ? 1 : 0;
        countNeighbors += board[i - 1][j + 1] === OCCUPIED ? 1 : 0;
        countNeighbors += board[i][j - 1] === OCCUPIED ? 1 : 0;
        countNeighbors += board[i][j + 1] === OCCUPIED ? 1 : 0;
        countNeighbors += board[i + 1][j - 1] === OCCUPIED ? 1 : 0;
        countNeighbors += board[i + 1][j] === OCCUPIED ? 1 : 0;
        countNeighbors += board[i + 1][j + 1] === OCCUPIED ? 1 : 0;
    }

    if (current === EMPTY && countNeighbors === 0) {
        return OCCUPIED;
    }

    if (current === OCCUPIED && countNeighbors >= 4) {
        return EMPTY;
    }

    return current;
}

function nextStepTwo(board, i, j) {
    const iLen = board.length - 1;
    const jLen = board[0].length - 1;

    let current = board[i][j];
    if (current === FLOOR) {
        return FLOOR;
    }

    let countNeighbors = 0;

    if (i === 0 && j === 0) {
        // top left corner
        countNeighbors += seatsInDirection(board, i, j, 0, 1);
        countNeighbors += seatsInDirection(board, i, j, 1, 1);
        countNeighbors += seatsInDirection(board, i, j, 1, 0);
    } else if (i === 0 && j === jLen) {
        // top right corner
        countNeighbors += seatsInDirection(board, i, j, 0, -1);
        countNeighbors += seatsInDirection(board, i, j, 1, -1);
        countNeighbors += seatsInDirection(board, i, j, 1, 0);
    } else if (i === iLen && j === 0) {
        // bottom left corner
        countNeighbors += seatsInDirection(board, i, j, 0, 1);
        countNeighbors += seatsInDirection(board, i, j, -1, 1);
        countNeighbors += seatsInDirection(board, i, j, -1, 0);
    } else if (i === iLen && j === jLen) {
        // bottom right corner
        countNeighbors += seatsInDirection(board, i, j, 0, -1);
        countNeighbors += seatsInDirection(board, i, j, -1, -1);
        countNeighbors += seatsInDirection(board, i, j, -1, 0);
    } else if (i === 0 && j > 0 && j < jLen) {
        // top row
        countNeighbors += seatsInDirection(board, i, j, 0, -1);
        countNeighbors += seatsInDirection(board, i, j, 0, 1);
        countNeighbors += seatsInDirection(board, i, j, 1, -1);
        countNeighbors += seatsInDirection(board, i, j, 1, 0);
        countNeighbors += seatsInDirection(board, i, j, 1, 1);
    } else if (i === iLen && j > 0 && j < jLen) {
        // bottom row
        countNeighbors += seatsInDirection(board, i, j, 0, -1);
        countNeighbors += seatsInDirection(board, i, j, 0, 1);
        countNeighbors += seatsInDirection(board, i, j, -1, -1);
        countNeighbors += seatsInDirection(board, i, j, -1, 0);
        countNeighbors += seatsInDirection(board, i, j, -1, 1);
    } else if (i > 0 && i < iLen && j === 0) {
        // first column
        countNeighbors += seatsInDirection(board, i, j, -1, 0);
        countNeighbors += seatsInDirection(board, i, j, -1, 1);
        countNeighbors += seatsInDirection(board, i, j, 0, 1);
        countNeighbors += seatsInDirection(board, i, j, 1, 0);
        countNeighbors += seatsInDirection(board, i, j, 1, 1);
    } else if (i > 0 && i < iLen && j === jLen) {
        // last column
        countNeighbors += seatsInDirection(board, i, j, -1, 0);
        countNeighbors += seatsInDirection(board, i, j, -1, -1);
        countNeighbors += seatsInDirection(board, i, j, 0, -1);
        countNeighbors += seatsInDirection(board, i, j, 1, 0);
        countNeighbors += seatsInDirection(board, i, j, 1, -1);
    } else {
        countNeighbors += seatsInDirection(board, i, j, -1, -1);
        countNeighbors += seatsInDirection(board, i, j, -1, 0);
        countNeighbors += seatsInDirection(board, i, j, -1, 1);
        countNeighbors += seatsInDirection(board, i, j, 0, -1);
        countNeighbors += seatsInDirection(board, i, j, 0, 1);
        countNeighbors += seatsInDirection(board, i, j, 1, -1);
        countNeighbors += seatsInDirection(board, i, j, 1, 0);
        countNeighbors += seatsInDirection(board, i, j, 1, 1);
    }

    if (current === EMPTY && countNeighbors === 0) {
        return OCCUPIED;
    }

    if (current === OCCUPIED && countNeighbors >= 5) {
        return EMPTY;
    }

    return current;
}

function seatsInDirection(board, i, j, iDiff, jDiff) {
    const iLen = board.length - 1;
    const jLen = board[0].length - 1;

    let currI = i + iDiff;
    let currJ = j + jDiff;

    while (currI >= 0 && currI <= iLen && currJ >= 0 && currJ <= jLen) {
        if (board[currI][currJ] !== FLOOR) {
            return board[currI][currJ] === OCCUPIED ? 1 : 0;
        }

        currI = currI + iDiff;
        currJ = currJ + jDiff;
    }

    return 0;
}

function countOccupiedSeats(board) {
    let seatCount = 0;

    for (let i = 0; i < board.length; ++i) {
        for (let j = 0; j < board[i].length; ++j) {
            if (board[i][j] === OCCUPIED) {
                seatCount++;
            }
        }
    }

    return seatCount;
}

function setupBoard(input) {
    return input.map(l => l.split(""));
}

const input = prepareInput();
const board = setupBoard(input);
// console.log(solvePartOneOrTwo(board, nextStepOne));
console.log(solvePartOneOrTwo(board, nextStepTwo));
