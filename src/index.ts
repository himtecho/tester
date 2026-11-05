import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { menus } from "./menu/registry.js";
import { tebakMenu } from "./menu/tebak.js";

const rl = createInterface({ input, output });

// Pastikan menu Tebak Angka selalu ada (tidak dobel jika sudah terdaftar di registry)
const daftarMenu = menus.includes(tebakMenu) ? menus : [...menus, tebakMenu];

while (true) {
  console.log("\n=== MENU UTAMA ===");
  daftarMenu.forEach((m, i) => console.log(`${i + 1}. ${m.label}`));
  console.log("0. Keluar");

  const teks = (await rl.question("Pilih: ")).trim();

  if (teks === "0") {
    console.log("Sampai jumpa!");
    rl.close();
    break;
  }

  const pilihan = Number(teks);
  const menu = Number.isInteger(pilihan) ? daftarMenu[pilihan - 1] : undefined;
  if (!menu) {
    console.log("Pilihan tidak valid.");
    continue;
  }
  await menu.run(rl);
}