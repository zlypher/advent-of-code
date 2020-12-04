// Day 4: Passport Processing
const fs = require("fs");

const prepareInput = () => fs.readFileSync("./input.txt")
    .toString()
    .split("\r\n");

const fields = [ "byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"]; // , "cid"

const validEyeColors = [ "amb", "blu", "brn", "gry", "grn", "hzl", "oth" ];
const validateYear = (min, max) => (val) => {
    const numYear = parseInt(val, 10);
    return val.length === 4 && min <= numYear && numYear <= max;
}
const validateHeight = (val) => {
    const num = val.substr(0, val.length - 2);
    const sys = val.substr(-2);
    if (sys !== "cm" && sys !== "in") {
        return false;
    }

    return sys === "cm"
        ? 150 <= num && num <= 193
        : 59 <= num && num <= 76
}

const validators = {
    "byr": validateYear(1920, 2002),
    "iyr": validateYear(2010, 2020),
    "eyr": validateYear(2020, 2030),
    "hgt": validateHeight,
    "hcl": (val) => /^#[0-9a-f]{6}$/.test(val),
    "ecl": (val) => validEyeColors.find(col => col === val),
    "pid": (val) => /^\d{9}$/.test(val),
}

function parsePassports(input) {
    const passports = [];

    let current = {};

    for (let i = 0; i < input.length; ++i) {
        const line = input[i];
        if (line === "") {
            passports.push(current);
            current = {};
            continue;
        }

        line
            .split(" ")
            .map(field => field.split(":"))
            .forEach(([name, val]) => current[name] = val);
    }

    // Push the last one
    passports.push(current);


    return passports;
}

function solvePartOneOrTwo(passports, checkPassport) {
    let countValidPassports = 0;

    for (let i = 0; i < passports.length; ++i) {
        if (checkPassport(passports[i])) {
            countValidPassports += 1;
        }
    }

    return countValidPassports;
}

function checkPassport(passport) {
    return fields.every(field => passport.hasOwnProperty(field));
}

function checkPassportStrict(passport) {
    return fields.every(field => passport.hasOwnProperty(field) && validators[field](passport[field]));
}

const input = prepareInput();
const passports = parsePassports(input);
console.log(solvePartOneOrTwo(passports, checkPassport));
console.log(solvePartOneOrTwo(passports, checkPassportStrict));