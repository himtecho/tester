export type Kategori = "suhu" | "panjang" | "berat";

export interface Satuan {
  kode: string; // "c", "km", "kg"
  nama: string; // "Celsius", "Kilometer", "Kilogram"
}

interface SatuanLinear extends Satuan {
  faktor: number; // nilai 1 satuan ini dalam satuan dasar
}

const NOL_MUTLAK_C = -273.15;
const TOLERANSI = 1e-9;
const DESIMAL_MAKS = 4;

const satuanSuhu: Satuan[] = [
  { kode: "c", nama: "Celsius" },
  { kode: "f", nama: "Fahrenheit" },
  { kode: "k", nama: "Kelvin" },
];

// Satuan dasar: meter. Satuan baru cukup tambah satu baris di sini.
const satuanPanjang: SatuanLinear[] = [
  { kode: "mm", nama: "Milimeter", faktor: 0.001 },
  { kode: "cm", nama: "Sentimeter", faktor: 0.01 },
  { kode: "m", nama: "Meter", faktor: 1 },
  { kode: "km", nama: "Kilometer", faktor: 1000 },
];

// Satuan dasar: gram. Satuan baru cukup tambah satu baris di sini.
const satuanBerat: SatuanLinear[] = [
  { kode: "mg", nama: "Miligram", faktor: 0.001 },
  { kode: "g", nama: "Gram", faktor: 1 },
  { kode: "kg", nama: "Kilogram", faktor: 1000 },
  { kode: "ton", nama: "Ton", faktor: 1_000_000 },
];

const tabelLinear: Record<"panjang" | "berat", SatuanLinear[]> = {
  panjang: satuanPanjang,
  berat: satuanBerat,
};

function ambilDaftar(kategori: Kategori): readonly Satuan[] {
  if (kategori === "suhu") {
    return satuanSuhu;
  }
  return tabelLinear[kategori];
}

function ambilFaktor(kategori: "panjang" | "berat", kode: string): number {
  const satuan = tabelLinear[kategori].find((s) => s.kode === kode);
  if (satuan === undefined) {
    throw new Error(`Satuan tidak dikenal: ${kode}`);
  }
  return satuan.faktor;
}

function keCelsius(nilai: number, kode: string): number {
  switch (kode) {
    case "f":
      return ((nilai - 32) * 5) / 9;
    case "k":
      return nilai - 273.15;
    default:
      return nilai;
  }
}

function dariCelsius(celsius: number, kode: string): number {
  switch (kode) {
    case "f":
      return (celsius * 9) / 5 + 32;
    case "k":
      return celsius + 273.15;
    default:
      return celsius;
  }
}

// Daftar satuan untuk sebuah kategori.
export function daftarSatuan(kategori: Kategori): Satuan[] {
  return ambilDaftar(kategori).map(({ kode, nama }) => ({ kode, nama }));
}

// Mencari satuan dari input pemain, tidak peka huruf besar/kecil. Null jika tidak ada.
export function cariSatuan(kategori: Kategori, teks: string): Satuan | null {
  const kode = teks.trim().toLowerCase();
  const ketemu = ambilDaftar(kategori).find((s) => s.kode === kode);
  return ketemu === undefined ? null : { kode: ketemu.kode, nama: ketemu.nama };
}

// Mengonversi nilai. Melempar RangeError jika nilai tidak valid
// (negatif untuk panjang/berat, atau di bawah nol mutlak untuk suhu).
export function konversi(kategori: Kategori, nilai: number, dari: string, ke: string): number {
  if (!Number.isFinite(nilai)) {
    throw new RangeError("Nilai harus berupa angka yang valid.");
  }

  const asal = cariSatuan(kategori, dari);
  const tujuan = cariSatuan(kategori, ke);
  if (asal === null) {
    throw new Error(`Satuan asal tidak dikenal: ${dari}`);
  }
  if (tujuan === null) {
    throw new Error(`Satuan tujuan tidak dikenal: ${ke}`);
  }

  if (kategori === "suhu") {
    const celsius = keCelsius(nilai, asal.kode);
    if (celsius < NOL_MUTLAK_C - TOLERANSI) {
      throw new RangeError("Suhu tidak boleh di bawah nol mutlak.");
    }
    return dariCelsius(celsius, tujuan.kode);
  }

  if (nilai < 0) {
    throw new RangeError("Nilai tidak boleh negatif untuk panjang dan berat.");
  }
  return (nilai * ambilFaktor(kategori, asal.kode)) / ambilFaktor(kategori, tujuan.kode);
}

// Membulatkan ke maksimal 4 desimal dan membuang nol berlebih.
export function formatHasil(nilai: number): string {
  return String(Number(nilai.toFixed(DESIMAL_MAKS)));
}
