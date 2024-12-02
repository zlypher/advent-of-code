// Day 14: Extended Polymerization
const fs = require("fs");

const prepareInput = () => {
  const lines = fs.readFileSync("./input.txt").toString().split("\r\n");
  const template = lines.shift();
  lines.shift(); // Drop empty line
  let line = "";
  let rules = {};

  while ((line = lines.shift())) {
    const [pair, element] = line.split(" -> ");
    rules[pair] = element;
  }

  return { template, rules };
};

const input = prepareInput();

const calcDiff = (template) => {
  const countMap = {};
  for (let i = 0; i < template.length; ++i) {
    const c = template[i];
    if (!countMap[c]) {
      countMap[c] = 0;
    }

    countMap[c]++;
  }

  const max = Math.max(...Object.values(countMap));
  const min = Math.min(...Object.values(countMap));
  return max - min;
};

const expandTemplate = (currentTemplate, rules) => {
  let newTemplateArr = [];
  for (let i = 0; i < currentTemplate.length - 1; ++i) {
    const pair = currentTemplate.slice(i, i + 2);
    const insert = rules[pair];
    const [f, _] = pair.split("");
    newTemplateArr.push(f, insert);
  }
  // Add last element
  newTemplateArr.push(currentTemplate[currentTemplate.length - 1]);
  return newTemplateArr.join("");
};

function solvePartOne(input) {
  const rules = input.rules;
  let currentTemplate = input.template;

  for (let step = 0; step < 10; ++step) {
    currentTemplate = expandTemplate(currentTemplate, rules);
  }

  return calcDiff(currentTemplate);
}

console.log(solvePartOne(input));

function solvePartTwo(input) {
  const rules = input.rules;
  let currentTemplate = input.template;

  // TODO: Too slow
  for (let step = 0; step < 40; ++step) {
    console.log(step + 1);
    currentTemplate = expandTemplate(currentTemplate, rules);
  }

  return calcDiff(currentTemplate);
}

console.log(solvePartTwo(input));
