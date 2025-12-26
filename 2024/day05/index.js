const fs = require("fs");

const prepareInput = () => {
  const rules = [];
  const updates = [];

  const lines = fs.readFileSync("./input.txt").toString().split("\r\n");
  while ((line = lines.shift())) {
    if (line === "") break;

    const pages = line.split("|").map((str) => parseInt(str, 10));
    rules.push(pages);
  }

  while ((line = lines.shift())) {
    const pages = line.split(",").map((str) => parseInt(str, 10));
    updates.push(pages);
  }

  return { rules, updates };
};

const input = prepareInput();

function solvePartOne({ rules, updates }) {
  const ruleSet = prepareRules(rules);
  let totalResult = 0;

  for (let update of updates) {
    if (isRightOrder(update, ruleSet)) {
      totalResult += update[Math.floor(update.length / 2)];
    }
  }

  return totalResult;
}

console.log(solvePartOne(input));

function solvePartTwo({ rules, updates }) {
  const ruleSet = prepareRules(rules);
  const incorrectUpdates = updates.filter((u) => !isRightOrder(u, ruleSet));
  let totalResult = 0;

  for (let update of incorrectUpdates) {
    const fixedUpdate = getFixedUpdate(update, ruleSet);
    totalResult += fixedUpdate[Math.floor(fixedUpdate.length / 2)];
  }

  return totalResult;
}

console.log(solvePartTwo(input));

function prepareRules(rules) {
  const ruleSet = {};

  for (let [before, after] of rules) {
    if (ruleSet[after]) {
      ruleSet[after].push(before);
    } else {
      ruleSet[after] = [before];
    }
  }

  return ruleSet;
}

function isRightOrder(update, ruleSet) {
  for (let i = 1; i < update.length; ++i) {
    const val = update[i];
    const shouldBeBefore = ruleSet[val] ?? [];

    for (let j = 0; j < i; ++j) {
      // Check
      const checkVal = update[j];
      if (shouldBeBefore.indexOf(checkVal) === -1) {
        return false;
      }
    }
  }

  return true;
}

function getFixedUpdate(update, ruleSet) {
  let fixed = [update[0]];

  for (let i = 1; i < update.length; ++i) {
    const valToInsert = update[i];
    const insertRules = ruleSet[valToInsert] ?? [];

    let inserted = false;
    for (let j = 0; j < fixed.length; ++j) {
      const checkAgainst = fixed[j];
      if (insertRules.indexOf(checkAgainst) === -1) {
        fixed.splice(j, 0, valToInsert);
        inserted = true;
        break;
      }
    }

    if (!inserted) {
      fixed.push(valToInsert);
    }
  }

  return fixed;
}
