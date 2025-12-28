import * as fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { prepareInput, solvePartOne, solvePartTwo } from "./logic";

describe("Day 10", () => {
  describe("Part One", () => {
    it("should solve the example input", () => {
      const rawInput = `1`;
      const input = prepareInput(rawInput);
      const result = solvePartOne(input, 5);

      expect(result).toBe(6);
    });

    it("should solve the actual input", () => {
      const rawInput = fs
        .readFileSync(path.resolve(import.meta.dirname, "input.txt"))
        .toString();
      const input = prepareInput(rawInput);
      const result = solvePartOne(input);

      expect(result).toBe(252594);
    });
  });
  describe("Part Two", () => {
    it("should solve the actual input", () => {
      const rawInput = fs
        .readFileSync(path.resolve(import.meta.dirname, "input.txt"))
        .toString();
      const input = prepareInput(rawInput);
      const result = solvePartTwo(input);

      expect(result).toBe(3579328);
    });
  });
});
