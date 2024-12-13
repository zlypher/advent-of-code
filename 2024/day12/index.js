const { loadCharMap } = require("../../utils/load-char-map");

const prepareInput = () => {
  const map = loadCharMap("./input.txt");
  return { map };
};

const input = prepareInput();

function solvePartOne(input) {
  const { map } = input;
  const plots = [];
  const seen = {};
  for (let i = 0; i < map.length; ++i) {
    for (let j = 0; j < map[i].length; ++j) {
      fillPlot(map, i, j, seen, plots);
    }
  }

  let totalPrice = 0;
  for (const element of plots) {
    totalPrice += element.perimeter * element.fields.length;
  }
  return totalPrice;
}

console.log(solvePartOne(input));

function solvePartTwo(input) {
  const { map } = input;

  const plots = [];
  const seen = {};
  for (let i = 0; i < map.length; ++i) {
    for (let j = 0; j < map[i].length; ++j) {
      fillPlot(map, i, j, seen, plots);
    }
  }

  let totalPrice = 0;
  for (const element of plots) {
    const sides = determineSides(element.potentialSides);
    totalPrice += sides * element.fields.length;
  }
  return totalPrice;
}

console.log(solvePartTwo(input));

function fillPlot(map, i, j, seen, plots) {
  if (seen[i + "-" + j]) {
    return;
  }

  const field = map[i][j];
  const plot = {
    perimeter: 0,
    fields: [],
    potentialSides: { horizontal: [], vertical: [] },
  };

  fillPlotRecursive(map, i, j, seen, field, plot);

  plots.push(plot);
}

function fillPlotRecursive(map, i, j, seen, original, plot) {
  if (i < 0 || j < 0 || i >= map.length || j > map[i].length) {
    return;
  }

  const field = map[i][j];
  if (field !== original) {
    return false;
  }

  if (seen[i + "-" + j]) return true;

  seen[i + "-" + j] = true;
  plot.fields.push([i, j]);

  let perimeter = 4;

  // UP
  if (fillPlotRecursive(map, i - 1, j, seen, field, plot)) {
    perimeter--;
  } else {
    plot.potentialSides.vertical.push([i - 1, j, "UP"]);
  }
  // DOWN
  if (fillPlotRecursive(map, i + 1, j, seen, field, plot)) {
    perimeter--;
  } else {
    plot.potentialSides.vertical.push([i, j, "DOWN"]);
  }
  // LEFT
  if (fillPlotRecursive(map, i, j - 1, seen, field, plot)) {
    perimeter--;
  } else {
    plot.potentialSides.horizontal.push([i, j - 1, "LEFT"]);
  }
  // RIGHT
  if (fillPlotRecursive(map, i, j + 1, seen, field, plot)) {
    perimeter--;
  } else {
    plot.potentialSides.horizontal.push([i, j, "RIGHT"]);
  }

  plot.perimeter += perimeter;

  return true;
}

function determineSides(potentialSides) {
  const { horizontal, vertical } = potentialSides;
  let totalSides = 0;

  // horizontal
  const horizontalMap = prepareSideMap(horizontal, 1);
  for (let sides of Object.values(horizontalMap)) {
    totalSides++;
    if (sides.length === 1) {
      continue;
    }
    sides.sort((a, b) => a[0] - b[0]);

    for (let i = 1; i < sides.length; ++i) {
      let curr = sides[i][0];
      let prev = sides[i - 1][0];
      if (curr - prev > 1) {
        totalSides++;
      }
    }
  }

  // vertical
  const verticalMap = prepareSideMap(vertical, 0);
  for (let sides of Object.values(verticalMap)) {
    totalSides++;
    if (sides.length === 1) {
      continue;
    }
    sides.sort((a, b) => a[1] - b[1]);

    for (let i = 1; i < sides.length; ++i) {
      let curr = sides[i][1];
      let prev = sides[i - 1][1];
      if (curr - prev > 1) {
        totalSides++;
      }
    }
  }

  return totalSides;
}

function prepareSideMap(sides, idx) {
  const map = {};

  for (const side of sides) {
    let key = side[idx] + side[2];
    if (!map[key]) {
      map[key] = [];
    }

    map[key].push(side);
  }

  return map;
}
