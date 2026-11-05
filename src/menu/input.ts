import type { Interface } from "node:readline/promises";
import { parsePositiveNumber } from "../services/number-parser.js";

export async function readNumber(rl: Interface, prompt: string): Promise<number | null> {
  const value = parsePositiveNumber(await rl.question(prompt));
  if (value === null) {
    console.log("Input tidak valid. Masukkan angka lebih dari 0.");
  }
  return value;
}

export async function readNumbers(rl: Interface, prompts: string[]): Promise<number[] | null> {
  const values: number[] = [];
  for (const prompt of prompts) {
    const value = await readNumber(rl, prompt);
    if (value === null) return null;
    values.push(value);
  }
  return values;
}