# Tester
 
Aplikasi CLI interaktif berbasis menu, dibuat dengan TypeScript dan Node.js.
 
## Prasyarat
 
- Node.js 20+
- npm
## Instalasi
 
```bash
npm install
cp .env.example .env
```
 
Di Windows PowerShell: `copy .env.example .env`
 
Isi `.env` sesuai kebutuhan (lihat `.env.example`).
 
## Menjalankan
 
```bash
npm run build
node dist/index.js
```
 
## Script
 
| Perintah               | Fungsi                                      |
| ---------------------- | ------------------------------------------- |
| `npm run build`        | Compile TypeScript ke `dist/`               |
| `npm run typecheck`    | Cek tipe tanpa menghasilkan file            |
| `npm run lint`         | Jalankan ESLint (termasuk urutan import)    |
| `npm run format`       | Rapikan kode dengan Prettier                |
| `npm run format:check` | Cek format tanpa mengubah file              |
| `npm test`             | Jalankan test dengan Vitest                 |
 
## Struktur Project
 
```
tester/
├── .github/
│   └── workflows/
│       └── ci.yml          # CI: format, lint, typecheck, test, build
├── src/
│   ├── index.ts            # Entry point, menampilkan menu utama
│   ├── menu/
│   │   ├── types.ts        # Interface MenuItem
│   │   ├── registry.ts     # Daftar semua menu
│   │   ├── register.ts     # Menu: Buat akun
│   │   └── tebak.ts        # Menu: Tebak Angka
│   ├── models/             # Definisi model/data
│   ├── services/           # Logika bisnis
│   │   └── user-service.ts
│   └── test/               # Test (struktur mengikuti src/)
│       └── menu/
│           └── registry.test.ts
├── dist/                   # hasil build (jangan di-commit)
├── node_modules/           # jangan di-commit
├── .env                    # jangan di-commit
├── .env.example
├── .gitignore
├── .prettierrc
├── .prettierignore
├── eslint.config.mjs
├── package.json
├── package-lock.json
├── tsconfig.json
└── README.md
```
 
## Menambah Menu Baru
 
Nomor menu dibuat otomatis dari urutan di `registry.ts`, jadi tidak perlu mengubah `index.ts`.
 
1. Buat file baru di `src/menu/`, misalnya `src/menu/hitung.ts`:
```typescript
import type { MenuItem } from "./types.js";
 
export const hitungMenu: MenuItem = {
  label: "Hitung",
  async run(rl) {
    const angka = await rl.question("Masukkan angka: ");
    console.log(`Kamu memasukkan ${angka}`);
  },
};
```
 
2. Daftarkan di `src/menu/registry.ts`:
```typescript
import { hitungMenu } from "./hitung.js";
 
export const menus: MenuItem[] = [
  registerMenu,
  tebakMenu,
  hitungMenu, // tambahkan di sini
];
```
 
Selesai. Menu muncul otomatis dengan nomor berikutnya. Opsi `0` selalu **Keluar**.
 
## Alur Kontribusi
 
1. Buat branch dari `main`, jangan push langsung ke `main`:
```bash
   git switch -c feat/nama-fitur
```
 
2. Sebelum commit, jalankan:
```bash
   npm run lint -- --fix
   npm run format
   npm test
```
 
3. Push branch dan buka Pull Request. CI harus lolos sebelum merge.
## Panduan Tim
 
- Satu menu = satu file di `src/menu/`. Jangan menaruh logika menu di `index.ts`.
- Logika bisnis ditaruh di `src/services/`, bukan di file menu.
- Pisahkan logika yang bisa dites (fungsi murni) dari input/output (`readline`, `console.log`).
- Satu-satunya file bersama adalah `registry.ts`. Jika terjadi konflik Git di sana, pertahankan kedua baris (import dan entri array).
- Jangan commit file `.env`. Tambahkan variabel baru ke `.env.example`.
- Commit message dalam bahasa Indonesia dan singkat, misalnya `feat: tambah menu tebak angka`.
