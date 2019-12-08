// Day 6: Universal Orbit Map
const fs = require("fs");

let orbitData = fs.readFileSync("./input.txt").toString().split("\r\n");

const setupGraph = (orbitData) => {
    let graph = orbitData.reduce((prev, curr) => {
        let [from, to] = curr.split(")");

        if (!prev.hasOwnProperty(from)) {
            prev[from] = {
                children: []
            };
        }

        prev[from].children.push(to);

        return prev;
    }, {});

    return graph;
}

const countOrbits = (graph, nodes, depth = 1) => {
    const childOrbits = nodes.reduce((prev, curr) => {
        if (!graph[curr]) {
            return prev + depth;
        }

        return prev + countOrbits(graph, graph[curr].children, depth + 1);
    }, 0);

    return depth - 1 + childOrbits;
}

const findTotalOrbits = (orbitData) => {
    const graph = setupGraph(orbitData);
    return countOrbits(graph, graph["COM"].children);
};

const totalOrbits = findTotalOrbits(orbitData);
console.log("Result (Part 1):", totalOrbits);

// Part Two

const setupDualGraph = (orbitData) => {
    let reverseGraph = {};

    let graph = orbitData.reduce((prev, curr) => {
        let [from, to] = curr.split(")");

        if (!prev.hasOwnProperty(from)) {
            prev[from] = {
                children: []
            };
        }

        prev[from].children.push(to);
        reverseGraph[to] = from;

        return prev;
    }, {});

    return [
        graph,
        reverseGraph
    ];
}

const findPath = (graph, target) => {
    let node = target;
    let path = [];

    do {
        path.push(node);
        node = graph[node];
    } while (!!node);

    return path;
}

const findOrbitTransfers = (orbitData, start, end) => {
    const [_, reverseGraph] = setupDualGraph(orbitData);
    const pathStart = findPath(reverseGraph, start).reverse();
    const pathEnd = findPath(reverseGraph, end).reverse();
    let lastSharedIndex = 0;

    while (pathStart[lastSharedIndex + 1] === pathEnd[lastSharedIndex + 1] && lastSharedIndex < pathStart.length - 1) {
        lastSharedIndex++;
    }

    const startSteps = pathStart.length - lastSharedIndex - 2;
    const endSteps = pathEnd.length - lastSharedIndex - 2;
    return startSteps + endSteps;
}

const orbitTransfers = findOrbitTransfers(orbitData, "YOU", "SAN");
console.log("Result (Part 2):", orbitTransfers);