import * as fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { prepareInput, solvePartOne, solvePartTwo } from "./logic";

describe("Day 5", () => {
  describe("Part One", () => {
    it("should solve the example input", () => {
      const rawInput = `3-5
10-14
16-20
12-18

1
5
8
11
17
32`;
      const input = prepareInput(rawInput);
      const result = solvePartOne(input);

      expect(result).toBe(3);
    });

    it("should solve the actual input", () => {
      const rawInput = fs
        .readFileSync(path.resolve(import.meta.dirname, "input.txt"))
        .toString();
      const input = prepareInput(rawInput);
      const result = solvePartOne(input);

      expect(result).toBe(712);
    });
  });
  describe("Part Two", () => {
    it("should solve the example input", () => {
      const rawInput = `3-5
10-14
16-20
12-18

1
5
8
11
17
32`;
      const input = prepareInput(rawInput);
      const result = solvePartTwo(input);

      expect(result).toBe(14);
    });

    it("should solve the actual input", () => {
      const rawInput = fs
        .readFileSync(path.resolve(import.meta.dirname, "input.txt"))
        .toString();
      const input = prepareInput(rawInput);
      const result = solvePartTwo(input);

      expect(result).toBe(332998283036769);
    });
  });
});
