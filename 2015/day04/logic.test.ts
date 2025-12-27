import * as fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { prepareInput, solvePartOne, solvePartTwo } from "./logic";

describe("Day 4", () => {
  describe("Part One", () => {
    it.each([
      ["abcdef", 609043],
      ["pqrstuv", 1048970],
    ])("should solve the example input (slow)", (rawInput, expected) => {
      const input = prepareInput(rawInput);
      const result = solvePartOne(input);

      expect(result).toBe(expected);
    });

    it.skip("should solve the actual input (slow)", () => {
      const rawInput = fs
        .readFileSync(path.resolve(import.meta.dirname, "input.txt"))
        .toString();
      const input = prepareInput(rawInput);
      const result = solvePartOne(input);

      expect(result).toBe(282749);
    });
  });
  describe("Part Two", () => {
    it.skip("should solve the actual input (slow)", () => {
      const rawInput = fs
        .readFileSync(path.resolve(import.meta.dirname, "input.txt"))
        .toString();
      const input = prepareInput(rawInput);
      const result = solvePartTwo(input);

      expect(result).toBe(9962624);
    });
  });
});
