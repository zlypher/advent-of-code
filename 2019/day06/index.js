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