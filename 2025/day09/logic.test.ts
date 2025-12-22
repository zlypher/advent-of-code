import * as fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { prepareInput, solvePartOne, solvePartTwo } from "./logic";

describe("Day 9", () => {
  describe("Part One", () => {
    it("should solve the example input", () => {
      const rawInput = `7,1
11,1
11,7
9,7
9,5
2,5
2,3
7,3`;
      const input = prepareInput(rawInput);
      const result = solvePartOne(input);

      expect(result).toBe(50);
    });

    it("should solve the actual input", () => {
      const rawInput = fs
        .readFileSync(path.resolve(import.meta.dirname, "input.txt"))
        .toString();
      const input = prepareInput(rawInput);
      const result = solvePartOne(input);

      expect(result).toBe(4782268188);
    });
  });
  describe("Part Two", () => {
    it.todo("should solve the example input", () => {
      const rawInput = `7,1
11,1
11,7
9,7
9,5
2,5
2,3
7,3`;
      const input = prepareInput(rawInput);
      const result = solvePartTwo(input);

      expect(result).toBe(24);
    });

    it.todo("should solve the actual input", () => {
      const rawInput = fs
        .readFileSync(path.resolve(import.meta.dirname, "input.txt"))
        .toString();
      const input = prepareInput(rawInput);
      const result = solvePartTwo(input);

      expect(result).toBe(-1);
    });
  });
});
