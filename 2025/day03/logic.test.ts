import * as fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { prepareInput, solvePartOne, solvePartTwo } from "./logic";

describe("Day 3", () => {
  describe("Part One", () => {
    it("should solve the example input", () => {
      const rawInput = `987654321111111
811111111111119
234234234234278
818181911112111`;
      const input = prepareInput(rawInput);
      const result = solvePartOne(input);

      expect(result).toBe(357);
    });

    it("should solve the actual input", () => {
      const rawInput = fs
        .readFileSync(path.resolve(import.meta.dirname, "input.txt"))
        .toString();
      const input = prepareInput(rawInput);
      const result = solvePartOne(input);

      expect(result).toBe(17535);
    });
  });
  describe("Part Two", () => {
    it("should solve the example input", () => {
      const rawInput = `987654321111111
811111111111119
234234234234278
818181911112111`;
      const input = prepareInput(rawInput);
      const result = solvePartTwo(input);

      expect(result).toBe(3121910778619);
    });

    it("should solve the actual input", () => {
      const rawInput = fs
        .readFileSync(path.resolve(import.meta.dirname, "input.txt"))
        .toString();
      const input = prepareInput(rawInput);
      const result = solvePartTwo(input);

      expect(result).toBe(173577199527257);
    });
  });
});
