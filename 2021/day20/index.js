// Day 20: Trench Map
const fs = require("fs");

const prepareInput = () =>
  fs.readFileSync("./input.txt").toString().split("\r\n");

const input = prepareInput();

const parseInput = (input) => {
  const inp = [...input];
  const algorithm = inp.shift();
  inp.shift(); // drop line
  let image = [];

  inp.forEach((line) => {
    image.push(line.split(""));
  });

  return [algorithm, image];
};

const print = (image) => {
  image.forEach((dots) => console.log(dots.join("")));
};

const pad = (image, fill) => {
  const filler = new Array(image[0].length + 6).fill(fill);
  return [
    [...filler],
    [...filler],
    [...filler],
    ...image.map((dots) => {
      return [fill, fill, fill, ...dots, fill, fill, fill];
    }),
    [...filler],
    [...filler],
    [...filler],
  ];
};

const getLookup = (image, i, j) => {
  return [
    ...image[i - 1].slice(j - 1, j + 2),
    ...image[i].slice(j - 1, j + 2),
    ...image[i + 1].slice(j - 1, j + 2),
  ];
};

const enhance = (image, algorithm) => {
  let newImage = [];

  for (let i = 2; i < image.length - 2; ++i) {
    let current = [];
    for (let j = 2; j < image[i].length - 2; ++j) {
      const lookup = getLookup(image, i, j);
      const bitLookup = parseInt(
        lookup.map((x) => (x === "#" ? "1" : "0")).join(""),
        2
      );
      const outputPixel = algorithm[bitLookup];
      current.push(outputPixel);
    }
    newImage.push(current);
  }

  return newImage;
};

const solve = (input, numEnhancements) => {
  const [algorithm, image] = parseInput(input);
  const fill = [".", "#"];
  let fillPtr = 0;

  let current = image;
  for (let i = 0; i < numEnhancements; ++i) {
    const padded = pad(current, fill[fillPtr]);
    current = enhance(padded, algorithm);
    fillPtr = (fillPtr + 1) % 2;
  }

  const highlighted = current
    .flatMap((x) => x)
    .reduce((prev, curr) => {
      return curr === "#" ? prev + 1 : prev;
    }, 0);
  return highlighted;
};

function solvePartOne(input) {
  return solve(input, 2);
}

console.log(solvePartOne(input));

function solvePartTwo(input) {
  return solve(input, 50);
}

console.log(solvePartTwo(input));
