import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { menus } from "./menu/registry.js";

const rl = createInterface({ input, output });

while (true) {
  console.log("\n=== MENU UTAMA ===");
  menus.forEach((m, i) => console.log(`${i + 1}. ${m.label}`));
  console.log("0. Keluar");

  const teks = (await rl.question("Pilih: ")).trim();

  if (teks === "0") {
    console.log("Sampai jumpa!");
    rl.close();
    break;
  }

  const menu = /^\d+$/.test(teks) ? menus[Number(teks) - 1] : undefined;
  if (!menu) {
    console.log("Pilihan tidak valid.");
    continue;
  }
  await menu.run(rl);
}