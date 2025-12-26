import * as fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { prepareInput, solvePartOne, solvePartTwo } from "./logic";

describe("Day 3", () => {
  describe("Part One", () => {
    it.each([
      [">", 2],
      ["^>v<", 4],
      ["^v^v^v^v^v", 2],
    ])("should solve the example input", (rawInput, expected) => {
      const input = prepareInput(rawInput);
      const result = solvePartOne(input);

      expect(result).toBe(expected);
    });

    it("should solve the actual input", () => {
      const rawInput = fs
        .readFileSync(path.resolve(import.meta.dirname, "input.txt"))
        .toString();
      const input = prepareInput(rawInput);
      const result = solvePartOne(input);

      expect(result).toBe(2565);
    });
  });
  describe("Part Two", () => {
    it.each([
      ["^v", 3],
      ["^>v<", 3],
      ["^v^v^v^v^v", 11],
    ])("should solve the example input", (rawInput, expected) => {
      const input = prepareInput(rawInput);
      const result = solvePartTwo(input);

      expect(result).toBe(expected);
    });

    it("should solve the actual input", () => {
      const rawInput = fs
        .readFileSync(path.resolve(import.meta.dirname, "input.txt"))
        .toString();
      const input = prepareInput(rawInput);
      const result = solvePartTwo(input);

      expect(result).toBe(2639);
    });
  });
});
