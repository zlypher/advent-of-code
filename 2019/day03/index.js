// Day 3: Crossed Wires

const [
    firstPath,
    secondPath
] = [
        ["R75", "D30", "R83", "U83", "L12", "D49", "R71", "U7", "L72"],
        ["U62", "R66", "U55", "R34", "D71", "R55", "D58", "R83"]
    ];

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

const findDistanceToClosestIntersection = (first, second) => {
    const firstVectors = splitIntoVectors(first);
    const secondVectors = splitIntoVectors(second);

    console.log(firstVectors);
    console.log(secondVectors);

    return 0;
}

const result = findDistanceToClosestIntersection(firstPath, secondPath);
console.log("Result (Part 1):", result);