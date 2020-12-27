// Day 23: Crab Cups
const prepareInput = () => "586439172".split("").map(n => parseInt(n, 10));

function solvePartOne(input) {
    let cups = createCups(input);
    let cupMap = createCupMap(cups);
    let maxCup = Math.max(...input);
    let move = 1;
    let target = 100;

    let current = cups;

    while (move <= target) {
        // pickup cups
        const [pickupCups, lastPickupCup] = pickCups(current)

        // select destination cup
        const destination = pickDestinationCup(current, maxCup + 1);

        // place cups
        lastPickupCup.next = destination.next;
        destination.next = pickupCups;

        move++;
        current = current.next;
    }

    return getResult(current);
}

function getResult(node) {
    let root = node;
    while (root.data !== 1) {
        root = root.next;
    }

    let res = [];
    let curr = root.next;
    while (curr.data !== 1) {
        res.push(curr.data);
        curr = curr.next;
    }

    return res.join("");
}

function printNodes(node, max) {
    const list = [];
    let curr = node;
    for (let i = 0; i < max; ++i) {
        list.push(curr.data);
        curr = curr.next;
    }

    console.log(list.join(" "));
}

function createCupMap(cups) {
    const map = [];
    let node = cups;
    while (!map[node.data]) {
        map[node.data] = node;
        node = node.next;
    }

    return map;
}

function pickCups(root) {
    const start = root.next;
    let node = start;
    let counter = 1;
    while (counter < 3) {
        node = node.next;
        counter++;
    }

    root.next = node.next;
    node.next = null;

    return [start, node];
}

function createCups(input) {
    const rootNode = createLLNode(input[0]);
    let node = rootNode;

    for (let i = 1; i < input.length; ++i) {
        node = appendNode(node, input[i]);
    }

    node.next = rootNode;

    return rootNode;
}

function createLLNode(data) {
    return {
        data,
        next: null,
    };
}

function appendNode(node, data) {
    const newNode = {
        data,
        next: null
    };

    node.next = newNode;

    return newNode
}

function pickDestinationCup(current, max) {
    let target = current.data - 1;
    let node = current.next;

    while (true) {
        if (node.data === target) {
            return node;
        }

        if (node === current) {
            target = (target + max - 1) % max;
        }

        node = node.next;
    }
}

const input = prepareInput();
console.log(solvePartOne(input));
