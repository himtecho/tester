import { describe, expect, it } from "vitest";

import {
  cariSatuan,
  daftarSatuan,
  formatHasil,
  konversi,
} from "../../services/konversi-service.js";

describe("konversi suhu", () => {
  it("memakai titik acuan yang benar", () => {
    expect(konversi("suhu", 0, "c", "f")).toBeCloseTo(32);
    expect(konversi("suhu", 0, "c", "k")).toBeCloseTo(273.15);
    expect(konversi("suhu", 100, "c", "f")).toBeCloseTo(212);
    expect(konversi("suhu", -40, "c", "f")).toBeCloseTo(-40);
    expect(konversi("suhu", 212, "f", "c")).toBeCloseTo(100);
    expect(konversi("suhu", 273.15, "k", "c")).toBeCloseTo(0);
  });

  it("menerima satuan asal sama dengan tujuan", () => {
    expect(konversi("suhu", 25, "c", "c")).toBeCloseTo(25);
  });

  it("menerima nilai nol", () => {
    expect(konversi("suhu", 0, "k", "k")).toBe(0);
  });

  it("menolak suhu di bawah nol mutlak", () => {
    expect(() => konversi("suhu", -300, "c", "f")).toThrow(RangeError);
    expect(() => konversi("suhu", -460, "f", "c")).toThrow(RangeError);
    expect(() => konversi("suhu", -1, "k", "c")).toThrow(RangeError);
  });

  it("menerima tepat di nol mutlak", () => {
    expect(konversi("suhu", -273.15, "c", "k")).toBeCloseTo(0);
    expect(konversi("suhu", -459.67, "f", "k")).toBeCloseTo(0);
    expect(konversi("suhu", 0, "k", "c")).toBeCloseTo(-273.15);
  });
});

describe("konversi panjang dan berat", () => {
  it("mengonversi ke atas dan ke bawah", () => {
    expect(konversi("panjang", 1, "km", "m")).toBeCloseTo(1000);
    expect(konversi("panjang", 250, "cm", "m")).toBeCloseTo(2.5);
    expect(konversi("panjang", 1, "mm", "km")).toBeCloseTo(0.000001);
    expect(konversi("berat", 1, "kg", "g")).toBeCloseTo(1000);
    expect(konversi("berat", 500, "g", "kg")).toBeCloseTo(0.5);
    expect(konversi("berat", 1, "ton", "kg")).toBeCloseTo(1000);
  });

  it("menerima satuan sama dan nilai nol", () => {
    expect(konversi("panjang", 7, "m", "m")).toBeCloseTo(7);
    expect(konversi("berat", 0, "g", "mg")).toBe(0);
  });

  it("menolak nilai negatif", () => {
    expect(() => konversi("panjang", -5, "km", "m")).toThrow(RangeError);
    expect(() => konversi("berat", -1, "kg", "g")).toThrow(RangeError);
  });

  it("menolak nilai bukan angka", () => {
    expect(() => konversi("panjang", Number.NaN, "m", "km")).toThrow(RangeError);
  });

  it("menolak satuan yang tidak dikenal", () => {
    expect(() => konversi("panjang", 1, "xyz", "m")).toThrow();
    expect(() => konversi("panjang", 1, "m", "c")).toThrow();
  });
});

describe("cariSatuan", () => {
  it("tidak peka huruf besar/kecil", () => {
    expect(cariSatuan("panjang", "KM")?.kode).toBe("km");
    expect(cariSatuan("suhu", "C")?.nama).toBe("Celsius");
  });

  it("mengabaikan spasi di sekitar input", () => {
    expect(cariSatuan("berat", "  kg  ")?.kode).toBe("kg");
  });

  it("mengembalikan null untuk kode tidak dikenal", () => {
    expect(cariSatuan("berat", "xyz")).toBeNull();
    expect(cariSatuan("berat", "km")).toBeNull();
    expect(cariSatuan("suhu", "")).toBeNull();
  });
});

describe("daftarSatuan", () => {
  it("mengembalikan semua satuan tiap kategori", () => {
    expect(daftarSatuan("suhu").map((s) => s.kode)).toEqual(["c", "f", "k"]);
    expect(daftarSatuan("panjang").map((s) => s.kode)).toEqual(["mm", "cm", "m", "km"]);
    expect(daftarSatuan("berat").map((s) => s.kode)).toEqual(["mg", "g", "kg", "ton"]);
  });
});

describe("formatHasil", () => {
  it("membuang nol berlebih dan membulatkan 4 desimal", () => {
    expect(formatHasil(212)).toBe("212");
    expect(formatHasil(3.14159265)).toBe("3.1416");
    expect(formatHasil(2.5)).toBe("2.5");
    expect(formatHasil(0.1 + 0.2)).toBe("0.3");
  });

  it("tidak menampilkan -0", () => {
    expect(formatHasil(-0.00001)).toBe("0");
  });
});
