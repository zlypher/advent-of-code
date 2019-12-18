// Day 7: Amplification Circuit
const { createProgram, EXT_HALT } = require("../_shared/int-code-computer-v2");
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

const amplifierTester = (program, phaseSettings, testerFn) => {
    let highestSignal = 0;

    // Get all permutations of phase settings
    const phaseSettingPermutations = permutate(phaseSettings);

    // For each permutation, run simulation
    for (let i = 0; i < phaseSettingPermutations.length; ++i) {
        const signal = testerFn([...program], phaseSettingPermutations[i]);
        if (signal > highestSignal) {
            console.log("Found higher signal", signal, "with", phaseSettingPermutations[i]);
            highestSignal = signal;
        }
    }

    return highestSignal;
}

// const result = amplifierTester(program, [0, 1, 2, 3, 4], testWithPhaseSetting);
// console.log("Result (Part 1):", result);

// Part 2

const testWithPhaseSettingV2 = (program, phaseSetting) => {
    let programs = [];
    let inputs = [];
    for (let i = 0; i < phaseSetting.length; ++i) {
        programs.push(createProgram([...program]));
        inputs.push([
            phaseSetting[i]
        ]);
    }

    let output = 0;
    let pIdx = 0;
    let running = true;
    do {
        const prog = programs[pIdx];
        const input = [
            ...inputs[pIdx],
            output
        ];

        inputs[pIdx] = [];
        const newOutput = prog.run(input);
        if (newOutput === EXT_HALT) {
            running = false;
        } else {
            output = newOutput;
        }

        pIdx = (pIdx + 1) % programs.length;
    } while (running);

    return output;
}

const resultV2 = amplifierTester(program, [5, 6, 7, 8, 9], testWithPhaseSettingV2);
console.log("Result (Part 2):", resultV2);
