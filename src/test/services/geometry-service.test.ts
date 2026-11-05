import { test, expect } from "vitest";
import {
  boxSurfaceArea,
  cubeSurfaceArea,
  cylinderSurfaceArea,
  formatResult,
} from "../../services/geometry-service.js";

test("kubus sisi 5 = 150", () => {
  expect(cubeSurfaceArea(5)).toBe(150);
});

test("balok 2x3x4 = 52", () => {
  expect(boxSurfaceArea(2, 3, 4)).toBe(52);
});

test("tabung r=1 t=1 = 4π", () => {
  expect(cylinderSurfaceArea(1, 1)).toBeCloseTo(4 * Math.PI, 9);
});

test("formatResult membulatkan 2 angka di belakang koma", () => {
  expect(formatResult(0.6000000000000001)).toBe("0.60");
});