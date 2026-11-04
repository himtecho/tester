import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { register } from "./services/user-service.js";

const rl = createInterface({ input, output });

async function handleRegister(): Promise<void> {
  const name = (await rl.question("Masukkan nama: ")).trim();
  const result = register(name);
  console.log(result.message);
}

async function showMainMenu(): Promise<void> {
  while (true) {
    console.log("\n=== MENU UTAMA ===");
    console.log("1. Buat akun");
    console.log("2. Keluar");

    const jawaban = await rl.question("Pilih: ");

    switch (jawaban.trim()) {
      case "1":
        await handleRegister();
        break;

      case "2":
        console.log("Sampai jumpa!");
        rl.close();
        return;

      default:
        console.log("Pilihan tidak valid.");
    }
  }
}

await showMainMenu();