import type { MenuItem } from "./types.js";
import { registerMenu } from "./register.js";
import { tebakMenu } from "./tebak.js";
import { matematikaMenu } from "./matematika.js";

export const menus: MenuItem[] = [registerMenu, tebakMenu, matematikaMenu]