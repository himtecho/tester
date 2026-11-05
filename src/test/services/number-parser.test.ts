import { test, expect } from "vitest";
import { parsePositiveNumber } from "../../services/number-parser.js";

test("angka valid", () => {
  expect(parsePositiveNumber("5")).toBe(5);
  expect(parsePositiveNumber(" 7 ")).toBe(7);
  expect(parsePositiveNumber("2,5")).toBe(2.5);
  expect(parsePositiveNumber("2.5")).toBe(2.5);
});

test("input tidak valid ditolak", () => {
  for (const text of ["", "0", "0.0", "-1", "abc", "Infinity", "1e3", "1e999"]) {
    expect(parsePositiveNumber(text), `harus null: "${text}"`).toBeNull();
  }
});
