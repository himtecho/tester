import type { MenuItem } from "./types.js";
import { register } from "../services/user-service.js";

export const registerMenu: MenuItem = {
  label: "Buat akun",
  async run(rl) {
    const name = (await rl.question("Masukkan nama: ")).trim();
    console.log(register(name).message);
  },
};
