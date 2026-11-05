import type { Interface } from "node:readline/promises";
import type { MenuItem } from "./types.js";
import { bacaAngka } from "../utils/input.js";
import {
  luasPermukaanBalok,
  luasPermukaanKubus,
  luasPermukaanTabung,
} from "../services/geometry-service.js";

async function hitungLuasGeometri(rl: Interface): Promise<void> {
  while (true) {
    console.log("\n--- Hitung Luas Geometri ---");
    console.log("1. Balok");
    console.log("2. Kubus");
    console.log("3. Tabung");
    console.log("0. Kembali");

    const pilihan = (await rl.question("Pilih: ")).trim();

    switch (pilihan) {
      case "1": {
        const panjang = await bacaAngka(rl, "Panjang: ");
        if (panjang === null) break;
        const lebar = await bacaAngka(rl, "Lebar: ");
        if (lebar === null) break;
        const tinggi = await bacaAngka(rl, "Tinggi: ");
        if (tinggi === null) break;
        console.log(`Luas permukaan balok = ${luasPermukaanBalok(panjang, lebar, tinggi)}`);
        break;
      }

      case "2": {
        const sisi = await bacaAngka(rl, "Panjang sisi: ");
        if (sisi === null) break;
        console.log(`Luas permukaan kubus = ${luasPermukaanKubus(sisi)}`);
        break;
      }

      case "3": {
        const jariJari = await bacaAngka(rl, "Jari-jari: ");
        if (jariJari === null) break;
        const tinggi = await bacaAngka(rl, "Tinggi: ");
        if (tinggi === null) break;
        const hasil = luasPermukaanTabung(jariJari, tinggi);
        console.log(`Luas permukaan tabung = ${hasil.toFixed(2)}`);
        break;
      }

      case "0":
        return;

      default:
        console.log("Pilihan tidak valid.");
    }
  }
}

export const matematikaMenu: MenuItem = {
  label: "Matematika",
  async run(rl) {
    while (true) {
      console.log("\n=== MATEMATIKA ===");
      console.log("1. Hitung luas geometri");
      console.log("0. Kembali");

      const pilihan = (await rl.question("Pilih: ")).trim();

      switch (pilihan) {
        case "1":
          await hitungLuasGeometri(rl);
          break;
        case "0":
          return;
        default:
          console.log("Pilihan tidak valid.");
      }
    }
  },
};