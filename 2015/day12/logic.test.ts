import * as fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { prepareInput, solvePartOne, solvePartTwo } from "./logic";

describe("Day 12", () => {
  describe("Part One", () => {
    it.each([
      ["[1,2,3]", 6],
      ['{"a":2,"b":4}', 6],
      ["[[[3]]]", 3],
      ['{"a":{"b":4},"c":-1}', 3],
      ['{"a":[-1,1]}', 0],
      ['[-1,{"a":1}]', 0],
      ["[]", 0],
      ["{}", 0],
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

      expect(result).toBe(191164);
    });
  });
  describe("Part Two", () => {
    it.each([
      ["[1,2,3]", 6],
      ['[1,{"c":"red","b":2},3]', 4],
      ['{"d":"red","e":[1,2,3,4],"f":5}', 0],
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

      expect(result).toBe(87842);
    });
  });
});
