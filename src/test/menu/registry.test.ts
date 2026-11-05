import { describe, it, expect } from "vitest";
import { menus } from "../../menu/registry.js";

describe("menu registry", () => {
  it("setiap menu punya label dan fungsi run", () => {
    for (const m of menus) {
      expect(m.label).toBeTruthy();
      expect(typeof m.run).toBe("function");
    }
  });

  it("label tidak boleh duplikat", () => {
    const labels = menus.map((m) => m.label);
    expect(new Set(labels).size).toBe(labels.length);
  });
});
