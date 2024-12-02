// Day 18: Operation Order
const fs = require("fs");

const prepareInput = () => fs.readFileSync("./input.txt")
    .toString()
    .split("\r\n");

function solvePartOne(input) {
    let totalSum = 0;

    for (let i = 0; i < input.length; ++i) {
        const line = input[i].replace(/\s/g, "");
        const sum = evaluateExpression(line);
        totalSum += sum;
    }

    return totalSum;
}

function evaluateExpression(line) {
    const [val, ptr] = evaluateExpressionHelper(line, 0);
    return val;
}

function evaluateExpressionHelper(line, ptr) {
    const end = line.length;
    let val = 0;
    let op = "";

    while (ptr !== end) {
        const c = line[ptr];

        if (c === "(") {
            let [newVal, newPtr] = evaluateExpressionHelper(line, ptr + 1);
            if (op === "+") {
                val += newVal;
            } else if (op === "*") {
                val *= newVal;
            } else {
                val = newVal;
            }

            ptr = newPtr;
            continue;
        } else if (c === ")") {
            return [val, ptr + 1];
        } else if (c === "+") {
            op = "+";
        } else if (c === "*") {
            op = "*";
        } else {
            let newVal = parseInt(c, 10);
            if (op === "+") {
                val += newVal;
            } else if (op === "*") {
                val *= newVal;
            } else {
                val = newVal;
            }
        }

        ptr++;
    }

    return [val, ptr];
}

const input = prepareInput();
console.log(solvePartOne(input));
