type Identifier = string;
type Command =
  | {
      type: "SIGNAL";
      value: Identifier | number;
      target: Identifier;
    }
  | {
      type: "AND" | "OR";
      left: Identifier | number;
      right: Identifier | number;
      target: Identifier;
    }
  | {
      type: "LSHIFT" | "RSHIFT";
      source: Identifier;
      amount: number;
      target: Identifier;
    }
  | {
      type: "NOT";
      source: Identifier;
      target: Identifier;
    };

export type Input = {
  commands: Command[];
};

export const prepareInput = (rawInput: string): Input => {
  let line: string | undefined;
  let commands: Command[] = [];
  const lines = rawInput.split("\r\n");
  while ((line = lines.shift())) {
    let match = line.match(/^(\w+|\d+) -> (\w+)$/);
    if (match) {
      const [, value, target] = match;
      commands.push({
        type: "SIGNAL",
        value: isNaN(Number(value)) ? value : Number(value),
        target,
      });
      continue;
    }

    match = line.match(/^(\w+|\d+) (AND|OR) (\w+|\d+) -> (\w+)$/);
    if (match) {
      const [, left, type, right, target] = match;
      commands.push({
        type: type as "AND" | "OR",
        left: isNaN(Number(left)) ? left : Number(left),
        right: isNaN(Number(right)) ? right : Number(right),
        target,
      });
      continue;
    }

    match = line.match(/^(\w+) (LSHIFT|RSHIFT) (\d+) -> (\w+)$/);
    if (match) {
      const [, source, type, amount, target] = match;
      commands.push({
        type: type as "LSHIFT" | "RSHIFT",
        source,
        amount: Number(amount),
        target,
      });
      continue;
    }

    match = line.match(/^NOT (\w+) -> (\w+)$/);
    if (match) {
      const [, source, target] = match;
      commands.push({
        type: "NOT",
        source,
        target,
      });
      continue;
    }

    throw new Error(`Could not parse line: ${line}`);
  }

  return { commands };
};

export function solvePartOne(input: Input): number {
  const map: Record<Identifier, number> = {};
  const nodes = setupNodes(input.commands);
  return evaluateNode("a", map, nodes) ?? -1;
}

function setupNodes(commands: Command[]) {
  const nodes: Record<Identifier, any> = {};

  for (const command of commands) {
    const { type, target } = command;
    if (type === "SIGNAL") {
      nodes[target] = { source: command.value, op: "=" };
    } else if (type === "AND") {
      nodes[target] = { left: command.left, right: command.right, op: "&" };
    } else if (type === "OR") {
      nodes[target] = { left: command.left, right: command.right, op: "|" };
    } else if (type === "LSHIFT") {
      nodes[target] = {
        source: command.source,
        amount: command.amount,
        op: "<<",
      };
    } else if (type === "RSHIFT") {
      nodes[target] = {
        source: command.source,
        amount: command.amount,
        op: ">>",
      };
    } else if (type === "NOT") {
      nodes[target] = { source: command.source, op: "~" };
    }
  }
  return nodes;
}

function evaluateNode(
  id: Identifier,
  map: Record<Identifier, number>,
  nodes: Record<Identifier, any>
): number {
  if (map[id] !== undefined) {
    return map[id];
  }

  const node = nodes[id];

  if (node.op === "=") {
    const result =
      typeof node.source === "number"
        ? node.source
        : evaluateNode(node.source, map, nodes);
    map[id] = result;
    return result;
  } else if (node.op === "&") {
    const left =
      typeof node.left === "number"
        ? node.left
        : evaluateNode(node.left, map, nodes);
    const right =
      typeof node.right === "number"
        ? node.right
        : evaluateNode(node.right, map, nodes);
    const result = left & right;
    map[id] = result;
    return result;
  } else if (node.op === "|") {
    const left =
      typeof node.left === "number"
        ? node.left
        : evaluateNode(node.left, map, nodes);
    const right =
      typeof node.right === "number"
        ? node.right
        : evaluateNode(node.right, map, nodes);
    const result = left | right;
    map[id] = result;
    return result;
  } else if (node.op === "<<") {
    const source = evaluateNode(node.source, map, nodes);
    const result = source << node.amount;
    map[id] = result;
    return result;
  } else if (node.op === ">>") {
    const source = evaluateNode(node.source, map, nodes);
    const result = source >> node.amount;
    map[id] = result;
    return result;
  } else if (node.op === "~") {
    const source = evaluateNode(node.source, map, nodes);
    const result = ~source & 0xffff;
    map[id] = result;
    return result;
  }

  return -1;
}

export function solvePartTwo(input: Input): number {
  let map: Record<Identifier, number> = {};
  const nodes = setupNodes(input.commands);
  const firstRunA = evaluateNode("a", map, nodes) ?? -1;

  // Reset map
  map = {
    b: firstRunA,
  };

  return evaluateNode("a", map, nodes) ?? -1;
}
