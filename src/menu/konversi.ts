import {
  cariSatuan,
  daftarSatuan,
  formatHasil,
  konversi,
  type Kategori,
  type Satuan,
} from "../services/konversi-service.js";

import type { MenuItem } from "./types.js";

type Rl = Parameters<MenuItem["run"]>[0];

const kategoriMenu: Record<string, Kategori> = {
  "1": "suhu",
  "2": "panjang",
  "3": "berat",
};

// SEMENTARA: ganti dengan services/number-parser.ts jika API-nya cocok
// (harus menerima koma desimal dan menolak "1e3" / "0x10").
function bacaAngka(teks: string): number | null {
  const bersih = teks.trim().replace(",", ".");
  if (!/^-?\d+(\.\d+)?$/.test(bersih)) {
    return null;
  }
  return Number(bersih);
}

async function tanyaSatuan(rl: Rl, kategori: Kategori, label: string): Promise<Satuan> {
  const kodeSatuan = daftarSatuan(kategori)
    .map((s) => s.kode)
    .join("/");
  for (;;) {
    const jawab = await rl.question(`${label} (${kodeSatuan}): `);
    const satuan = cariSatuan(kategori, jawab);
    if (satuan !== null) {
      return satuan;
    }
    console.log("Satuan tidak valid, coba lagi.");
  }
}

async function konversiSatuKali(rl: Rl, kategori: Kategori): Promise<void> {
  const asal = await tanyaSatuan(rl, kategori, "Satuan asal");
  const tujuan = await tanyaSatuan(rl, kategori, "Satuan tujuan");

  for (;;) {
    const nilai = bacaAngka(await rl.question("Nilai: "));
    if (nilai === null) {
      console.log("Nilai tidak valid, masukkan angka (contoh: 12.5 atau 12,5).");
      continue;
    }
    try {
      const hasil = konversi(kategori, nilai, asal.kode, tujuan.kode);
      console.log(
        `${formatHasil(nilai)} ${asal.kode.toUpperCase()} = ` +
          `${formatHasil(hasil)} ${tujuan.kode.toUpperCase()}`,
      );
      return;
    } catch (error) {
      if (error instanceof RangeError) {
        console.log(error.message);
        continue;
      }
      throw error;
    }
  }
}

export const konversiMenu: MenuItem = {
  label: "Konversi Satuan",
  async run(rl) {
    for (;;) {
      console.log("\n=== KONVERSI SATUAN ===");
      console.log("1. Suhu");
      console.log("2. Panjang");
      console.log("3. Berat");
      console.log("0. Kembali ke menu utama");

      const pilihan = (await rl.question("\nPilih kategori: ")).trim();
      if (pilihan === "0") {
        return;
      }
      const kategori = kategoriMenu[pilihan];
      if (kategori === undefined) {
        console.log("Pilihan tidak valid, coba lagi.");
        continue;
      }
      await konversiSatuKali(rl, kategori);
    }
  },
};
