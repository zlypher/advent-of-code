import * as fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { prepareInput, solvePartOne, solvePartTwo } from "./logic";

describe("Day X", () => {
  describe("Part One", () => {
    it("should solve the example input", () => {
      const rawInput = `placeholder`;
      const input = prepareInput(rawInput);
      const result = solvePartOne(input);

      expect(result).toBe(-1);
    });

    it.todo("should solve the actual input", () => {
      const rawInput = fs
        .readFileSync(path.resolve(import.meta.dirname, "input.txt"))
        .toString();
      const input = prepareInput(rawInput);
      const result = solvePartOne(input);

      expect(result).toBe(-1);
    });
  });
  describe("Part Two", () => {
    it.todo("should solve the example input", () => {
      const rawInput = `placeholder`;
      const input = prepareInput(rawInput);
      const result = solvePartTwo(input);

      expect(result).toBe(-1);
    });

    it.todo("should solve the actual input", () => {
      const rawInput = fs
        .readFileSync(path.resolve(import.meta.dirname, "input.txt"))
        .toString();
      const input = prepareInput(rawInput);
      const result = solvePartTwo(input);

      expect(result).toBe(-1);
    });
  });
});
