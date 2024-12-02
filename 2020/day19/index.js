// Day 19: Monster Messages
const fs = require("fs");

const prepareInput = () => fs.readFileSync("./input.txt")
    .toString()
    .split("\r\n");

function solvePartOne(data) {
    let validMessages = 0;
    const { rules, messages } = data;

    for (let i = 0; i < messages.length; ++i) {
        const message = messages[i];

        if (doesMessageMatch(message, rules)) {
            validMessages += 1;
        }
    }

    return validMessages;
}

function doesMessageMatch(message, rules) {
    console.log({ message, rules })
    return doesMessageMatchHelper(message, rules, [...rule[0].parts].reverse());
}

function doesMessageMatchHelper(message, rules, ruleStack) {
    if (ruleStack.length > message.length) {
        return false;
    }

    if (ruleStack.length === 0 || message.length === 0) {
        // Only success if both are empty
        return ruleStack.length === message.length;
    }

    const next = ruleStack.pop();
}

function prepareData(input) {
    const [rules, ptr] = parseRules(input);
    const messages = parseMessages(input, ptr);

    return {
        rules,
        messages,
    };
}

function parseRules(input) {
    const rules = [];

    for (let i = 0; i < input.length; ++i) {
        const line = input[i];
        if (line === "") {
            return [rules, i + 1];
        }

        const [num, ruleDef] = line.split(": ");
        rules[parseInt(num, 10)] = parseSingleRule(ruleDef);
    }

    return [rules, -1];
}

function parseSingleRule(ruleDef) {
    const rule = {
        parts: [],
        literal: null,
    };

    if (ruleDef.startsWith("\"")) {
        rule.literal = ruleDef[1];
    } else {
        const parts = ruleDef.split(" | ");
        rule.parts = parts.map((p) => {
            return p.split(" ").map(n => parseInt(n, 10));
        })
    }

    return rule;
}

function parseMessages(input, ptr) {
    return input.slice(ptr);
}

const input = prepareInput();
const data = prepareData(input);
console.log(solvePartOne(data));
