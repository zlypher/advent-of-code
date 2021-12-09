// Day 4: Giant Squid
const fs = require("fs");

const parseBoards = (input) => {
  const boards = [];
  let board = [];
  input.forEach((val, idx) => {
    if (val === "") {
      boards.push({
        board,
        check: new Array(25).fill(false),
        won: false,
      });
      board = [];
      return;
    }
    const m = val.match(/\s?(\d*) \s?(\d*) \s?(\d*) \s?(\d*) \s?(\d*)/);
    board = [...board, ...m.slice(1, 6).map((n) => parseInt(n, 10))];
  });

  // Add last one
  boards.push({
    board,
    check: new Array(25).fill(false),
    won: false,
  });

  return boards;
};

const prepareInput = () => {
  const allLines = fs.readFileSync("./input.txt").toString().split("\r\n");

  return {
    numbers: allLines[0].split(",").map((n) => parseInt(n, 10)),
    boards: parseBoards(allLines.slice(2)),
  };
};

const checkRow = (check, row) =>
  check[row * 5] &&
  check[row * 5 + 1] &&
  check[row * 5 + 2] &&
  check[row * 5 + 3] &&
  check[row * 5 + 4];

const checkColumn = (check, col) =>
  check[col] &&
  check[col + 5] &&
  check[col + 10] &&
  check[col + 15] &&
  check[col + 20];

const checkRows = (check) =>
  checkRow(check, 0) ||
  checkRow(check, 1) ||
  checkRow(check, 2) ||
  checkRow(check, 3) ||
  checkRow(check, 4);

const checkColumns = (check) =>
  checkColumn(check, 0) ||
  checkColumn(check, 1) ||
  checkColumn(check, 2) ||
  checkColumn(check, 3) ||
  checkColumn(check, 4);

const isWinningBoard = (check) => {
  return checkRows(check) || checkColumns(check);
};

const input = prepareInput();

function solvePartOne(input) {
  const { numbers, boards } = input;
  for (let i = 0; i < numbers.length; ++i) {
    const number = numbers[i];

    for (let j = 0; j < boards.length; ++j) {
      const { board, check } = boards[j];

      // Check number
      const idx = board.findIndex((v) => v === number);
      if (idx !== -1) {
        check[idx] = true;
      } else {
        continue;
      }

      // Check if winning
      if (isWinningBoard(check)) {
        const sumUnmarked = board.reduce((prev, curr, idx) => {
          if (check[idx]) {
            return prev;
          } else {
            return prev + curr;
          }
        }, 0);

        return sumUnmarked * number;
      }
    }
  }
}

console.log(solvePartOne(input));

function solvePartTwo(input) {
  let { numbers, boards } = input;
  for (let i = 0; i < numbers.length; ++i) {
    const number = numbers[i];

    for (let j = 0; j < boards.length; ++j) {
      const { board, check } = boards[j];

      // Check number
      const idx = board.findIndex((v) => v === number);
      if (idx !== -1) {
        check[idx] = true;
      } else {
        continue;
      }

      // Check if winning
      if (isWinningBoard(check)) {
        boards[j].won = true;

        if (boards.length === 1) {
          const sumUnmarked = board.reduce((prev, curr, idx) => {
            if (check[idx]) {
              return prev;
            } else {
              return prev + curr;
            }
          }, 0);

          return sumUnmarked * number;
        }
      }
    }

    boards = boards.filter((b) => b.won === false);
  }
}

console.log(solvePartTwo(input));
