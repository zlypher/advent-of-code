// Day 1: The Tyranny of the Rocket Equation
const fs = require("fs");

const calculateFuel = (mass) => Math.floor(mass / 3) - 2;
const prepareInput = () => fs.readFileSync("./input.txt")
    .toString()
    .split("\r\n")
    .map(inp => parseInt(inp, 10));

const calculateRequiredFuel = (input, calcFuelFn) => input.map(calcFuelFn).reduce((prev, curr) => prev + curr, 0);

const input = prepareInput();
const requiredFuel = calculateRequiredFuel(input, calculateFuel);
console.log("Result (Part 1):", requiredFuel);

// Part Two
const calculateFuelV2 = (mass) => {
    const fuel = Math.floor(mass / 3) - 2;

    if (fuel <= 0) {
        return 0;
    }

    return fuel + calculateFuelV2(fuel);
}

const requiredFuelV2 = calculateRequiredFuel(input, calculateFuelV2);
console.log("Result (Part 2):", requiredFuelV2);