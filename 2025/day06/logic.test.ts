import * as fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { prepareInput, solvePartOne, solvePartTwo } from "./logic";

describe("Day 6", () => {
  describe("Part One", () => {
    it("should solve the example input", () => {
      const rawInput = `123 328  51 64 
 45 64  387 23 
  6 98  215 314
*   +   *   +  `;
      const input = prepareInput(rawInput);
      const result = solvePartOne(input);

      expect(result).toBe(4277556);
    });

    it("should solve the actual input", () => {
      const rawInput = fs
        .readFileSync(path.resolve(import.meta.dirname, "input.txt"))
        .toString();
      const input = prepareInput(rawInput);
      const result = solvePartOne(input);

      expect(result).toBe(6757749566978);
    });
  });
  describe("Part Two", () => {
    it("should solve the example input", () => {
      const rawInput = `123 328  51 64 
 45 64  387 23 
  6 98  215 314
*   +   *   +  `;
      const input = prepareInput(rawInput);
      const result = solvePartTwo(input);

      expect(result).toBe(3263827);
    });

    it("should solve the actual input", () => {
      const rawInput = fs
        .readFileSync(path.resolve(import.meta.dirname, "input.txt"))
        .toString();
      const input = prepareInput(rawInput);
      const result = solvePartTwo(input);

      expect(result).toBe(10603075273949);
    });
  });
});
