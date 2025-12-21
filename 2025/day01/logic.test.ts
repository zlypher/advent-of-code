import * as fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { prepareInput, solvePartOne, solvePartTwo } from "./logic";

describe("Day 1", () => {
  describe("Part One", () => {
    it("should solve the example input", () => {
      const rawInput = `L68
L30
R48
L5
R60
L55
L1
L99
R14
L82`;
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

      expect(result).toBe(1102);
    });
  });

  describe("Part Two", () => {
    it("should solve the example input", () => {
      const rawInput = `L68
L30
R48
L5
R60
L55
L1
L99
R14
L82`;
      const input = prepareInput(rawInput);
      const result = solvePartTwo(input);

      expect(result).toBe(6);
    });

    it("should solve the actual input", () => {
      const rawInput = fs
        .readFileSync(path.resolve(import.meta.dirname, "input.txt"))
        .toString();
      const input = prepareInput(rawInput);
      const result = solvePartTwo(input);

      expect(result).toBe(6175);
    });
  });
});
