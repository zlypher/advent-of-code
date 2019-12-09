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

// Part 2

const PIX_BLACK = 0;
const PIX_WHITE = 1;
const PIX_TRANS = 2;

const prepareImage = (data, w, h) => {
    const finalImage = new Array(w * h).fill(PIX_TRANS);
    const layers = prepareLayers(data, w, h);

    for (let i = 0; i < layers.length; ++i) {
        for (let j = 0; j < layers[i].length; ++j) {
            if (finalImage[j] === PIX_TRANS) {
                finalImage[j] = layers[i][j];
            }
        }
    }

    return finalImage;
};

const drawResult = (result, w) => {
    for (let i = 0; i < result.length; ++i) {
        if (i !== 0 && i % w === 0) {
            process.stdout.write("\n");
        }

        switch (result[i]) {
            case PIX_BLACK: process.stdout.write("0"); break;
            case PIX_WHITE: process.stdout.write("1"); break;
            case PIX_TRANS: process.stdout.write(" "); break;
            default: break;
        }
    }
};

const resultV2 = prepareImage(imageData, width, height);
console.log("Result (Part 2):");
drawResult(resultV2, width);
