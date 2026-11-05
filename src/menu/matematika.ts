import type { Interface } from "node:readline/promises";
import type { MenuItem } from "./types.js";
import { readNumbers } from "./input.js";
import {
  boxSurfaceArea,
  cubeSurfaceArea,
  cylinderSurfaceArea,
  formatResult,
} from "../services/geometry-service.js";

interface SubMenuOption {
  label: string;
  run: (rl: Interface) => Promise<void>;
}

async function runSubMenu(rl: Interface, title: string, options: SubMenuOption[]): Promise<void> {
  while (true) {
    console.log(`\n=== ${title} ===`);
    options.forEach((option, index) => console.log(`${index + 1}. ${option.label}`));
    console.log("0. Kembali");

    const text = (await rl.question("Pilih: ")).trim();
    if (text === "0") return;

    const option = /^\d+$/.test(text) ? options[Number(text) - 1] : undefined;
    if (!option) {
      console.log("Pilihan tidak valid.");
      continue;
    }
    await option.run(rl);
  }
}

const geometryOptions: SubMenuOption[] = [
  {
    label: "Balok",
    async run(rl) {
      const values = await readNumbers(rl, ["Panjang: ", "Lebar: ", "Tinggi: "]);
      if (!values) return;
      const [length, width, height] = values as [number, number, number];
      console.log(`Luas permukaan balok = ${formatResult(boxSurfaceArea(length, width, height))}`);
    },
  },
  {
    label: "Kubus",
    async run(rl) {
      const values = await readNumbers(rl, ["Panjang sisi: "]);
      if (!values) return;
      const [side] = values as [number];
      console.log(`Luas permukaan kubus = ${formatResult(cubeSurfaceArea(side))}`);
    },
  },
  {
    label: "Tabung",
    async run(rl) {
      const values = await readNumbers(rl, ["Jari-jari: ", "Tinggi: "]);
      if (!values) return;
      const [radius, height] = values as [number, number];
      console.log(`Luas permukaan tabung = ${formatResult(cylinderSurfaceArea(radius, height))}`);
    },
  },
];

const mathOptions: SubMenuOption[] = [
  {
    label: "Hitung luas geometri",
    run: (rl) => runSubMenu(rl, "HITUNG LUAS GEOMETRI", geometryOptions),
  },
];

export const matematikaMenu: MenuItem = {
  label: "Matematika",
  async run(rl) {
    await runSubMenu(rl, "MATEMATIKA", mathOptions);
  },
};
