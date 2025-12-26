import * as fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { prepareInput, solvePartOne, solvePartTwo } from "./logic";

describe("Day X", () => {
  describe("Part One", () => {
    it.each([
      ["(())", 0],
      ["()()", 0],
      ["(((", 3],
      ["(()(()(", 3],
      ["))(((((", 3],
      ["())", -1],
      ["))(", -1],
      [")))", -3],
      [")())())", -3],
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

      expect(result).toBe(232);
    });
  });
  describe("Part Two", () => {
    it.each([
      [")", 1],
      ["()())", 5],
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

      expect(result).toBe(1783);
    });
  });
});
