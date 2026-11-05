import type { MenuItem } from "./types.js";

const MIN = 1;
const MAX = 100;

export type HasilTebakan = "terlalu-kecil" | "terlalu-besar" | "benar";

export function cekTebakan(tebakan: number, rahasia: number): HasilTebakan {
  if (tebakan < rahasia) return "terlalu-kecil";
  if (tebakan > rahasia) return "terlalu-besar";
  return "benar";
}

export function parseTebakan(teks: string): number | null {
  const bersih = teks.trim();
  if (!/^\d+$/.test(bersih)) return null;
  const n = Number(bersih);
  return n >= MIN && n <= MAX ? n : null;
}

export const tebakMenu: MenuItem = {
  label: "Tebak Angka",
  async run(rl) {
    const rahasia = Math.floor(Math.random() * (MAX - MIN + 1)) + MIN;
    let percobaan = 0;

    console.log("\n=== TEBAK ANGKA ===");
    console.log(`Komputer sudah memilih angka antara ${MIN} sampai ${MAX}.`);
    console.log("Ketik 0 untuk menyerah.\n");

    while (true) {
      const jawaban = await rl.question("Tebakanmu: ");

      if (jawaban.trim() === "0") {
        console.log(`Angkanya adalah ${rahasia}.\n`);
        return;
      }

      const tebakan = parseTebakan(jawaban);
      if (tebakan === null) {
        console.log(`Masukkan angka bulat antara ${MIN} sampai ${MAX}.\n`);
        continue;
      }

      percobaan++;
      const hasil = cekTebakan(tebakan, rahasia);

      if (hasil === "terlalu-kecil") {
        console.log("Angka anda lebih kecil dari angka komputer.\n");
      } else if (hasil === "terlalu-besar") {
        console.log("Angka anda lebih besar dari angka komputer.\n");
      } else {
        console.log(`Benar! Angkanya adalah ${rahasia}.`);
        console.log(`Kamu berhasil menebak dalam ${percobaan} percobaan.\n`);
        return;
      }
    }
  },
};
