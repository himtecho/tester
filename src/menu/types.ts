import type { Interface } from "node:readline/promises";

export interface MenuItem {
  label: string;
  run: (rl: Interface) => Promise<void>;
}
