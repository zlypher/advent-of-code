// Day 3: Crossed Wires
const fs = require("fs");

let paths = fs.readFileSync("./input.txt").toString().split("\r\n").map(inp => inp.split(","));

const [
    firstPath,
    secondPath
] = paths;

const splitIntoVectors = (path) => {
    let current = { x: 0, y: 0 };
    const vectors = [  {...current }];

    for (let i = 0; i < path.length; ++i) {
        const [dir, ...numParts] = path[i];
        const num = parseInt(numParts.join(""), 10);
        const next = { ...current };

        switch (dir) {
            case "R": next.x += num; break;
            case "L": next.x -= num; break;
            case "U": next.y += num; break;
            case "D": next.y -= num; break;
            default: throw "Unknown direction";
        }

        vectors.push(next);
        current = { ...next };
    }

    return vectors;
}

const intersects = (firstA, firstB, secondA, secondB) => {
    const firstMinX = Math.min(firstA.x, firstB.x);
    const firstMaxX = Math.max(firstA.x, firstB.x);
    const firstMinY = Math.min(firstA.y, firstB.y);
    const firstMaxY = Math.max(firstA.y, firstB.y);
    const secondMinX = Math.min(secondA.x, secondB.x);
    const secondMaxX = Math.max(secondA.x, secondB.x);
    const secondMinY = Math.min(secondA.y, secondB.y);
    const secondMaxY = Math.max(secondA.y, secondB.y);

    if (firstMinX >= secondMinX && firstMinX <= secondMaxX &&
        secondMinY >= firstMinY && secondMinY <= firstMaxY) {
        return { x: firstMinX, y: secondMinY };
    } else if (secondMinX >= firstMinX && secondMinX <= firstMaxX &&
        firstMinY >= secondMinY && firstMinY <= secondMaxY) {
        return { x: secondMinX, y: firstMinY };
    }

    return null;
}

const findDistanceToClosestIntersection = (first, second) => {
    const firstVectors = splitIntoVectors(first);
    const secondVectors = splitIntoVectors(second);

    let shortestDistance = Infinity;
    for (let i = 0; i < firstVectors.length - 1; ++i) {
        for (let j = 0; j < secondVectors.length - 1; ++j) {
            const intersection = intersects(
                firstVectors[i],
                firstVectors[i + 1],
                secondVectors[j],
                secondVectors[j + 1]
            );

            if (intersection) {
                const distance = Math.abs(intersection.x) + Math.abs(intersection.y);
                if (distance != 0 && distance < shortestDistance) {
                    shortestDistance = distance;
                }
            }
        }
    }

    return shortestDistance;
}

const result = findDistanceToClosestIntersection(firstPath, secondPath);
console.log("Result (Part 1):", result);