// Day 8: Space Image Format
const fs = require("fs");

const locationRegex = /<x=(-?\d*), y=(-?\d*), z=(-?\d*)>/;

const parseMoonLocation = (str) => {
    const matches = str.match(locationRegex);

    return {
        pos: {
            x: parseInt(matches[1], 10),
            y: parseInt(matches[2], 10),
            z: parseInt(matches[3], 10),
        },
        velocity: {
            x: 0,
            y: 0,
            z: 0
        }
    }
}

let moons = fs.readFileSync("./input.txt").toString().split("\r\n").map(m => parseMoonLocation(m));

const trackMoons = (moons, numSteps) => {
    const pairs = makePairs(moons);

    for (let i = 0; i < numSteps; ++i) {
        updateStep(moons, pairs);

        // console.log("---");
        // moons.forEach(printMoon);
    }

    return moons.reduce((prev, curr) => {
        return prev + calcEnergy(curr);
    }, 0);
}

const printMoon = (moon) => {
    console.log(`pos=<x=${moon.pos.x.toString().padStart(2, " ")}, y=${moon.pos.y.toString().padStart(2, " ")}, z=${moon.pos.z.toString().padStart(2, " ")}>, vel=<x=${moon.velocity.x.toString().padStart(2, " ")}, y=${moon.velocity.y.toString().padStart(2, " ")}, z=${moon.velocity.z.toString().padStart(2, " ")}>`);
}

const calcEnergy = (moon) => {
    const pot = Math.abs(moon.pos.x) + Math.abs(moon.pos.y) + Math.abs(moon.pos.z);
    const kin = Math.abs(moon.velocity.x) + Math.abs(moon.velocity.y) + Math.abs(moon.velocity.z);

    return pot * kin;
}

const applyGravityOnAxis = (fst, snd, axis) => {
    if (fst.pos[axis] === snd.pos[axis]) {
        return;
    }

    if (fst.pos[axis] > snd.pos[axis]) {
        fst.velocity[axis] -= 1;
        snd.velocity[axis] += 1;
    } else {
        fst.velocity[axis] += 1;
        snd.velocity[axis] -= 1;
    }
}

const updateStep = (moons, pairs) => {
    // update velocity by applying gravity
    pairs.forEach(([fst, snd]) => {
        applyGravityOnAxis(fst, snd, "x");
        applyGravityOnAxis(fst, snd, "y");
        applyGravityOnAxis(fst, snd, "z");
    })

    // apply velocity to position
    moons.forEach(m => {
        m.pos.x += m.velocity.x;
        m.pos.y += m.velocity.y;
        m.pos.z += m.velocity.z;
    });
}

const makePairs = (moons) => {
    const pairs = [];

    for (let i = 0; i < moons.length; ++i) {
        for (let j = i + 1; j < moons.length; ++j) {
            pairs.push([
                moons[i],
                moons[j]
            ]);
        }
    }

    return pairs;
}

// const result = trackMoons(moons, 1000);
// console.log("Result (Part 1):", result);

// Part 2

const extractAxis = (moon, axis) => {
    return {
        pos: moon.pos[axis],
        velocity: moon.velocity[axis]
    };
}

const makeState = (moons) => {
    return moons.reduce((prev, curr) => {
        return prev + "|" + curr.pos + "_" + curr.velocity;
    }, "");
}

const applyGravityOnSingleAxis = (fst, snd) => {
    if (fst.pos === snd.pos) {
        return;
    }

    if (fst.pos > snd.pos) {
        fst.velocity -= 1;
        snd.velocity += 1;
    } else {
        fst.velocity += 1;
        snd.velocity -= 1;
    }
}

const updateStepOnSingleAxis = (moons, pairs) => {
    pairs.forEach(([fst, snd]) => {
        applyGravityOnSingleAxis(fst, snd);
    })

    // apply velocity to position
    moons.forEach(m => {
        m.pos += m.velocity;
    });
}

const findFirstRepeat = (fullMoons, axis) => {
    const moonsOnAxis = fullMoons.map((m) => extractAxis(m, axis));
    const pairs = makePairs(moonsOnAxis);
    const stateToFind = makeState(moonsOnAxis);

    let counter = 0;
    do {
        updateStepOnSingleAxis(moonsOnAxis, pairs);
        counter++;
    } while (stateToFind !== makeState(moonsOnAxis));

    return counter;
}

// https://stackoverflow.com/a/31302607/733368
function leastCommonMultiple(...input) {
    function gcd(a, b) {
        return !b ? a : gcd(b, a % b);
    }

    function lcm(a, b) {
        return (a * b) / gcd(a, b);
    }

    var multiple = 1;
    input.forEach(function(n) {
        multiple = lcm(multiple, n);
    });

    return multiple;
}

const findStepsUntilRepeat = (moons) => {
    const repeatX = findFirstRepeat(moons, "x");
    const repeatY = findFirstRepeat(moons, "y");
    const repeatZ = findFirstRepeat(moons, "z");

    return leastCommonMultiple(repeatX, repeatY, repeatZ);
}

const result = findStepsUntilRepeat(moons);
console.log("Result (Part 2):", result);
