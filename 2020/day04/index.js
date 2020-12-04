// Day 4: Passport Processing
const fs = require("fs");

const prepareInput = () => fs.readFileSync("./input.txt")
    .toString()
    .split("\r\n");

const fields = [ "byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"]; // , "cid"

function parsePassports(input) {
    const passports = [];

    let current = {};

    // console.log(input);

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


    return passports;
}

function solvePartOne(passports) {
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

const input = prepareInput();
const passports = parsePassports(input);
console.log(solvePartOne(passports));