// Day 23: Crab Cups
// const prepareInput = () => "586439172".split("").map(n => parseInt(n, 10));
const prepareInput = () => "389125467".split("").map(n => parseInt(n, 10));

function solvePartOne(input, target) {
    let cups = createCups(input);
    let cupMap = createCupMap(cups);
    let maxCup = Math.max(...input);
    let move = 1;

    let current = cups;

    while (move <= target) {
        // pickup cups
        const [pickupCups, lastPickupCup] = pickCups(current)

        // select destination cup
        const destination = pickDestinationCup(current, pickupCups, cupMap, maxCup + 1);

        // place cups
        lastPickupCup.next = destination.next;
        destination.next = pickupCups;

        move++;
        current = current.next;
    }

    return getResult(current);
}

function solvePartTwo(input, target) {
    let cups = createCupsV2(input, 1_000_000);
    let cupMap = createCupMap(cups);
    let maxCup = Math.max(...input);
    let move = 1;

    let targetCup = findCup(cups, 1);

    let current = cups;

    while (move <= target) {
        // pickup cups
        const [pickupCups, lastPickupCup] = pickCups(current)

        // select destination cup
        const destination = pickDestinationCup(current, pickupCups, cupMap, maxCup + 1);

        // place cups
        lastPickupCup.next = destination.next;
        destination.next = pickupCups;

        move++;
        current = current.next;
    }


    return targetCup.next.data * targetCup.next.next.data;
}

function findCup(root, target) {
    let node = root;
    while (node.data != target) {
        node = node.next;
    }

    return node;
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

function createCupsV2(input, num) {
    const rootNode = createLLNode(input[0]);
    let node = rootNode;
    let i = 1;
    for (; i < input.length; ++i) {
        node = appendNode(node, input[i]);
    }

    i = i + 1;

    for (; i <= num; ++i) {
        node = appendNode(node, i);
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

function checkPickups(pickups, target) {
    let node = pickups;
    while (node != null) {
        if (node.data === target) {
            return node;
        }

        node = node.next;
    }

    return null;
}

function fixIdx(idx, max) {
    return idx < 1 ? max : idx;
}

function pickDestinationCup(current, pickups, map, max) {
    let target = fixIdx(current.data - 1, max - 1);
    let targetNode = checkPickups(pickups, target);

    // find next outside of pickups
    while (targetNode != null) {
        target = fixIdx(target - 1, max - 1);
        targetNode = checkPickups(pickups, target);
    }

    return map[target];
}

const input = prepareInput();
console.log(solvePartOne(input, 100));
console.log(solvePartTwo(input, 10_000_000));
