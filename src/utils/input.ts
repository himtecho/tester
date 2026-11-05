import type { Interface } from "node:readline/promises";

export async function bacaAngka(rl: Interface, pertanyaan: string): Promise<number | null> {
  const teks = (await rl.question(pertanyaan)).trim().replace(",", ".");
  const angka = Number(teks);

  if (teks === "" || Number.isNaN(angka) || angka <= 0) {
    console.log("Input tidak valid. Masukkan angka lebih dari 0.");
    return null;
  }
  return angka;
}