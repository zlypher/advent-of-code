import { describe, expect, it } from "vitest";
import { prepareInput, solvePartOne } from "./logic";

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
  });
});
