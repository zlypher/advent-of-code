const fs = require("fs");
const { printMap } = require("../../utils/print-map");

const prepareInput = () => {
  const diskMap = fs
    .readFileSync("./input.txt")
    .toString()
    .split("")
    .map((x) => parseInt(x, 10));

  return { diskMap };
};

const input = prepareInput();

function solvePartOne(input) {
  const { diskMap } = input;

  let checksum = 0;
  let leftIdx = 0;
  let rightIdx = diskMap.length - 1;
  let position = 0;

  let leftId = 0;
  let rightId = Math.floor(diskMap.length / 2);

  let type = "DATA";

  while (leftIdx <= rightIdx) {
    let leftVal = diskMap[leftIdx];
    let rightVal = diskMap[rightIdx];

    if (type === "DATA") {
      while (leftVal > 0) {
        leftVal--;
        diskMap[leftIdx]--;

        checksum += position * leftId;
        position++;
      }

      leftId++;
      leftIdx++;
      type = "EMPTY";
    } else if (type === "EMPTY") {
      while (leftVal > 0 && rightVal > 0) {
        leftVal--;
        diskMap[leftIdx]--;
        rightVal--;
        diskMap[rightIdx]--;

        checksum += position * rightId;
        position++;
      }

      if (leftVal === 0) {
        leftIdx++;
        type = "DATA";
      }
      if (rightVal === 0) {
        rightIdx -= 2;
        rightId--;
      }
    }
  }

  return checksum;
}

// console.log(solvePartOne(input));

function solvePartTwo(input) {
  const { diskMap } = input;

  const [chunkHead, chunkTail] = setupChunkList(diskMap);

  // Reorder chunks
  let currentChunk = chunkTail;
  while (currentChunk !== null) {
    if (currentChunk.isData) {
      // Find a slot to fill in
      const emptyChunk = findEmpty(chunkHead, currentChunk);
      if (emptyChunk) {
        // If there is a chunk, move the data chunk and reduce empty chunk
        if (emptyChunk.size > currentChunk.size) {
          let prevChunk = emptyChunk.prev;
          let oldChunk = currentChunk;
          let newChunk = { ...currentChunk, next: emptyChunk, prev: prevChunk };
          emptyChunk.prev = newChunk;
          prevChunk.next = newChunk;

          emptyChunk.size -= newChunk.size;
          oldChunk.isData = false;
          // Insert currentChunk before
        } else if (emptyChunk.size === currentChunk.size) {
          // Replace emptyChunk with currentChunk
          emptyChunk.isData = true;
          currentChunk.isData = false;
          emptyChunk.id = currentChunk.id;
        }
      }
    }

    currentChunk = currentChunk.prev;
  }

  // Calculate checksum
  let checksum = 0;
  let flatten = flattenNodes(chunkHead);

  for (let i = 0; i < flatten.length; ++i) {
    let val = flatten[i];
    if (val !== ".") {
      checksum += val * i;
    }
  }
  return checksum;
}

console.log(solvePartTwo(input));

function setupChunkList(diskMap) {
  let isData = true;
  let head = { next: null };
  let curr = head;

  for (let i = 0; i < diskMap.length; ++i) {
    const size = diskMap[i];
    const node = {
      size,
      id: Math.floor(i / 2),
      isData,
      next: null,
      prev: null,
    };

    curr.next = node;
    node.prev = curr;
    curr = node;

    isData = !isData;
  }

  head.next.prev = null;
  return [head.next, curr];
}

function findEmpty(head, chunk) {
  let current = head;
  while (current !== chunk && current !== null) {
    if (current.size >= chunk.size && !current.isData) {
      return current;
    }

    current = current.next;
  }

  return null;
}

function printNodes(head) {
  let flatten = flattenNodes(head);
  console.log(flatten.join(""));
}

function flattenNodes(head) {
  let current = head;
  let output = [];
  while (current != null) {
    output.push(
      ...new Array(current.size).fill(current.isData ? current.id : ".")
    );
    current = current.next;
  }
  return output;
}
