import * as fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { prepareInput, solvePartOne, solvePartTwo } from "./logic";

describe("Day X", () => {
  describe("Part One", () => {
    it("should solve the example input", () => {
      const rawInput = `turn on 10,10 through 50,50
toggle 40,40 through 80,80`;
      const input = prepareInput(rawInput);
      const result = solvePartOne(input);

      expect(result).toBe(3120);
    });

    it("should solve the actual input", () => {
      const rawInput = fs
        .readFileSync(path.resolve(import.meta.dirname, "input.txt"))
        .toString();
      const input = prepareInput(rawInput);
      const result = solvePartOne(input);

      expect(result).toBe(569999);
    });
  });
  describe("Part Two", () => {
    it("should solve the actual input", () => {
      const rawInput = fs
        .readFileSync(path.resolve(import.meta.dirname, "input.txt"))
        .toString();
      const input = prepareInput(rawInput);
      const result = solvePartTwo(input);

      expect(result).toBe(17836115);
    });
  });
});
