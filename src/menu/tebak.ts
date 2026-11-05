import type { MenuItem } from "./types.js";

export const tebakMenu: MenuItem = {
  label: "Tebak Angka",
  async run(rl) {
    const angkaRahasia = Math.floor(Math.random() * 100) + 1; // 1 - 100
    let percobaan = 0;

    console.log("\n=== TEBAK ANGKA ===");
    console.log("Komputer sudah memilih angka antara 1 sampai 100.");
    console.log("Coba tebak angkanya!\n");

    while (true) {
      const jawaban = await rl.question("Tebakanmu: ");
      const tebakan = Number(jawaban);

      if (
        jawaban.trim() === "" ||
        !Number.isInteger(tebakan) ||
        tebakan < 1 ||
        tebakan > 100
      ) {
        console.log("Masukkan angka bulat antara 1 sampai 100.\n");
        continue;
      }

      percobaan++;

      if (tebakan < angkaRahasia) {
        console.log("Angka anda lebih kecil dari angka komputer.\n");
      } else if (tebakan > angkaRahasia) {
        console.log("Angka anda lebih besar dari angka komputer.\n");
      } else {
        console.log(`Benar! Angkanya adalah ${angkaRahasia}.`);
        console.log(`Kamu berhasil menebak dalam ${percobaan} percobaan.\n`);
        break;
      }
    }
  },
};