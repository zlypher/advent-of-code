// Day 12: Passage Pathing
const fs = require("fs");

const prepareInput = () =>
  fs
    .readFileSync("./input.txt")
    .toString()
    .split("\r\n")
    .map((l) => l.split("-"));

const input = prepareInput();

const isSmall = (toCheck) => toCheck.toLowerCase() == toCheck;

const prepareGraph = (mapping) => {
  let nodeMap = {};

  mapping.forEach(([from, to]) => {
    const fromNode = nodeMap[from] || {
      value: from,
      isSmall: isSmall(from),
      nodes: [],
    };
    const toNode = nodeMap[to] || {
      value: to,
      isSmall: isSmall(to),
      nodes: [],
    };

    fromNode.nodes.push(toNode);
    if (from !== "start" && to !== "end") {
      toNode.nodes.push(fromNode);
    }

    nodeMap[from] = fromNode;
    nodeMap[to] = toNode;
  });
  return nodeMap;
};

const findPaths = (node, visited) => {
  if (node.isSmall && visited.indexOf(node.value) !== -1) {
    return [];
  }

  const newVisited = [...visited, node.value];

  if (node.value === "end") {
    return [newVisited];
  }

  return node.nodes
    .flatMap((n) => findPaths(n, newVisited))
    .filter((a) => !!a && a.length > 0);
};

function solvePartOne(input) {
  const node = prepareGraph(input);
  const paths = findPaths(node["start"], []);

  return paths.length;
}

console.log(solvePartOne(input));

const findPathsTwo = (node, { visited, smallVisitedTwice }) => {
  const alreadyVisited = node.isSmall && visited.indexOf(node.value) !== -1;
  if (
    node.value !== "start" &&
    node.value !== "end" &&
    node.isSmall &&
    smallVisitedTwice &&
    alreadyVisited
  ) {
    return [];
  }

  const newVisited = [...visited, node.value];
  const newSmallVisitedTwice = smallVisitedTwice || alreadyVisited;

  if (node.value === "end") {
    return [newVisited];
  }

  return node.nodes
    .flatMap((n) =>
      findPathsTwo(n, {
        visited: newVisited,
        smallVisitedTwice: newSmallVisitedTwice,
      })
    )
    .filter((a) => !!a && a.length > 0);
};

function solvePartTwo(input) {
  const node = prepareGraph(input);
  const paths = findPathsTwo(node["start"], {
    visited: [],
    smallVisitedTwice: false,
  });

  return paths.length;
}

console.log(solvePartTwo(input));
