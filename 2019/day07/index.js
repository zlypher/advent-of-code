// Day 7: Amplification Circuit
const { runProgram } = require("../_shared/int-code-computer");
const fs = require("fs");

let program = fs.readFileSync("./input.txt").toString().split(",").map(inp => parseInt(inp, 10));

// https://stackoverflow.com/a/43260158/733368
function permutate(xs) {
    let ret = [];

    for (let i = 0; i < xs.length; i = i + 1) {
        let rest = permutate(xs.slice(0, i).concat(xs.slice(i + 1)));

        if (!rest.length) {
            ret.push([xs[i]])
        } else {
            for(let j = 0; j < rest.length; j = j + 1) {
            ret.push([xs[i]].concat(rest[j]))
            }
        }
    }

    return ret;
}

const testWithPhaseSetting = (program, phaseSetting) => {
    let output = 0;

    for (let i = 0; i < phaseSetting.length; ++i) {
        const setting = phaseSetting[i];
        output = runProgram([...program], [setting, output]);
    }

    return output;
}

const amplifierTester = (program) => {
    let highestSignal = 0;

    // Get all permutations of phase settings
    const phaseSettingPermutations = permutate([0, 1, 2, 3, 4]);

    // For each permutation, run simulation
    for (let i = 0; i < phaseSettingPermutations.length; ++i) {
        const signal = testWithPhaseSetting([...program], phaseSettingPermutations[i]);
        if (signal > highestSignal) {
            console.log("Found higher signal", signal, "with", phaseSettingPermutations[i]);
            highestSignal = signal;
        }
    }

    return highestSignal;
}

const result = amplifierTester(program);
console.log("Result (Part 1):", result);