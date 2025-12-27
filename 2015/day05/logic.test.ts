import * as fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { prepareInput, solvePartOne, solvePartTwo } from "./logic";

describe("Day 5", () => {
  describe("Part One", () => {
    it.each([
      ["ugknbfddgicrmopn", 1],
      ["aaa", 1],
      ["jchzalrnumimnmhp", 0],
      ["haegwjzuvuyypxyu", 0],
      ["dvszwmarrgswjxmb", 0],
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

      expect(result).toBe(255);
    });
  });
  describe("Part Two", () => {
    it.each([
      ["qjhvhtzxzqqjkmpb", 1],
      ["xxyxx", 1],
      ["uurcxstgmygtbstg", 0],
      ["ieodomkazucvgmuy", 0],
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

      expect(result).toBe(55);
    });
  });
});
