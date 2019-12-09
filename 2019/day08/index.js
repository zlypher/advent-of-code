// Day 8: Space Image Format
const fs = require("fs");

let imageData = fs.readFileSync("./input.txt").toString().split("").map(x => parseInt(x, 10));

const width = 25;
const height = 6;

const prepareLayers = (data, w, h) => {
    const layers = [];
    const imageSize = w * h;

    for (let i = 0; i < data.length; i += imageSize) {
        layers.push(data.slice(i, i + imageSize));
    }

    return layers;
};

const countDigits = (layer) => {
    const digits = [0, 0, 0];

    for (let i = 0; i < layer.length; ++i) {
        digits[layer[i]] += 1;
    }

    return digits;
}

const doSomething = (data, w, h) => {
    let numZeros = Infinity;
    let result = 0;
    const layers = prepareLayers(data, w, h);

    for (let i = 0; i < layers.length; ++i) {
        const [zeros, ones, twos] = countDigits(layers[i]);
        if (zeros < numZeros) {
            numZeros = zeros;
            result = ones * twos;
        }
    }

    return result;
};

const result = doSomething(imageData, width, height);
console.log("Result (Part 1):", result);