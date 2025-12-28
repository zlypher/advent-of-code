import * as fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { prepareInput, solvePartOne, solvePartTwo } from "./logic";

describe("Day 9", () => {
  describe("Part One", () => {
    it("should solve the example input", () => {
      const rawInput = `London to Dublin = 464
London to Belfast = 518
Dublin to Belfast = 141`;
      const input = prepareInput(rawInput);
      const result = solvePartOne(input);

      expect(result).toBe(605);
    });

    it("should solve the actual input", () => {
      const rawInput = fs
        .readFileSync(path.resolve(import.meta.dirname, "input.txt"))
        .toString();
      const input = prepareInput(rawInput);
      const result = solvePartOne(input);

      expect(result).toBe(251);
    });
  });
  describe("Part Two", () => {
    it("should solve the example input", () => {
      const rawInput = `London to Dublin = 464
London to Belfast = 518
Dublin to Belfast = 141`;
      const input = prepareInput(rawInput);
      const result = solvePartTwo(input);

      expect(result).toBe(982);
    });

    it("should solve the actual input", () => {
      const rawInput = fs
        .readFileSync(path.resolve(import.meta.dirname, "input.txt"))
        .toString();
      const input = prepareInput(rawInput);
      const result = solvePartTwo(input);

      expect(result).toBe(898);
    });
  });
});
