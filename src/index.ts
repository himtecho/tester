import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { menus } from "./menu/registry.js";

const rl = createInterface({ input, output });

while (true) {
  console.log("\n=== MENU UTAMA ===");
  menus.forEach((m, i) => console.log(`${i + 1}. ${m.label}`));
  console.log("0. Keluar");

  const pilihan = Number((await rl.question("Pilih: ")).trim());

  if (pilihan === 0) {
    console.log("Sampai jumpa!");
    rl.close();
    break;
  }

  const menu = menus[pilihan - 1];
  if (!menu) {
    console.log("Pilihan tidak valid.");
    continue;
  }
  await menu.run(rl);
}
