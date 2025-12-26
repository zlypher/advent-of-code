import * as fs from "node:fs";
import path from "node:path";
import { prepareInput, solvePartOne, solvePartTwo } from "./logic.ts";

const rawInput = fs
  .readFileSync(path.resolve(import.meta.dirname, "input.txt"))
  .toString();

const input = prepareInput(rawInput);
console.log(solvePartOne(input));
console.log(solvePartTwo(input));
