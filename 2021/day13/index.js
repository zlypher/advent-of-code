// Day 13: Transparent Origami
const fs = require("fs");

const prepareInput = () => {
  const lines = fs.readFileSync("./input.txt").toString().split("\r\n");
  let line = "";
  let coords = [];
  let folds = [];

  while ((line = lines.shift()) !== "") {
    const [x, y] = line.split(",").map((n) => parseInt(n, 10));
    coords.push({ x, y });
  }

  while ((line = lines.shift())) {
    const [coord, valStr] = line.replace("fold along ", "").split("=");
    folds.push({
      coord,
      val: parseInt(valStr, 10),
    });
  }

  return { coords, folds };
};

const input = prepareInput();

const createEmptyPaper = (coords) => {
  const paper = [];
  const maxRows = Math.max(...coords.map((c) => c.y)) + 1;
  let maxCols = Math.max(...coords.map((c) => c.x)) + 1;
  if (maxCols % 2 == 0) maxCols++; // Has to be uneven

  for (let i = 0; i < maxRows; ++i) {
    paper[i] = new Array(maxCols).fill(false);
  }
  return paper;
};

const fillPaper = (coords) => {
  const paper = createEmptyPaper(coords);
  coords.forEach(({ x, y }) => {
    paper[y][x] = true;
  });

  return paper;
};

const foldHorizontal = (paper, val) => {
  let folded = [];
  const len = paper.length - 1;
  for (let i = 0; i < val; ++i) {
    if (i === val || len - i === val) {
      debugger;
      console.log("errHor");
    }
    folded[i] = new Array(val).fill(false);
    for (let j = 0; j < paper[i].length; ++j) {
      folded[i][j] = paper[i][j] || paper[len - i][j];
    }
  }

  return folded;
};

const foldVertical = (paper, val) => {
  let folded = [];
  for (let i = 0; i < paper.length; ++i) {
    folded[i] = new Array(val).fill(false);
    const len = paper[i].length;
    for (let j = 0; j < val; ++j) {
      if (j === val || len - j - 1 === val) {
        debugger;
        console.log("errVert");
      }
      folded[i][j] = paper[i][j] || paper[i][len - j - 1];
    }
  }

  return folded;
};

const fold = (paper, { coord, val }) => {
  if (coord === "y") return foldHorizontal(paper, val);
  else return foldVertical(paper, val);
};

const print = (paper) => {
  for (let i = 0; i < paper.length; ++i) {
    const chars = [];
    for (let j = 0; j < paper[i].length; ++j) {
      chars[j] = paper[i][j] ? "#" : " ";
    }

    console.log(chars.join(""));
  }

  return paper;
};

const countDots = (paper) => {
  let counter = 0;
  for (let i = 0; i < paper.length; ++i) {
    for (let j = 0; j < paper[i].length; ++j) {
      counter += paper[i][j] ? 1 : 0;
    }
  }
  return counter;
};

function solvePartOne(input) {
  const paper = fillPaper(input.coords);
  // const final = input.folds.reduce((prev, curr) => fold(prev, curr), paper);
  const folded = fold(paper, input.folds[0]);
  // print(folded);

  return countDots(folded);
}

console.log(solvePartOne(input));

function solvePartTwo(input) {
  const paper = fillPaper(input.coords);
  const final = input.folds.reduce((prev, curr) => {
    // console.log("---");
    // print(prev);
    const f = fold(prev, curr);
    return f;
  }, paper);

  console.log("---");
  print(final);
  return;
}

console.log(solvePartTwo(input));
