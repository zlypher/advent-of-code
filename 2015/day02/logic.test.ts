import * as fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { prepareInput, solvePartOne, solvePartTwo } from "./logic";

describe("Day X", () => {
  describe("Part One", () => {
    it.each([
      ["2x3x4", 58],
      ["1x1x10", 43],
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

      expect(result).toBe(1598415);
    });
  });
  describe("Part Two", () => {
    it.each([
      ["2x3x4", 34],
      ["1x1x10", 14],
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

      expect(result).toBe(3812909);
    });
  });
});
