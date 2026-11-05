# Tester

Aplikasi CLI interaktif berbasis menu, dibuat dengan TypeScript dan Node.js.

## Prasyarat

- Node.js 18+
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
npx tsc
node dist/index.js
```

## Struktur Project

```
tester/
├── src/
│   ├── index.ts
│   ├── menu/
│   │   ├── types.ts
│   │   ├── registry.ts
│   │   ├── register.ts
│   │   └── tebak.ts
│   ├── models/
│   └── services/
│       └── user-service.ts
├── dist/               # hasil build (jangan di-commit)
├── node_modules/       # jangan di-commit
├── .env                # jangan di-commit
├── .env.example
├── .gitignore
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

## Panduan Tim

- Satu menu = satu file di `src/menu/`. Jangan menaruh logika menu di `index.ts`.
- Logika bisnis ditaruh di `src/services/`, bukan di file menu.
- Satu-satunya file bersama adalah `registry.ts`. Jika terjadi konflik Git di sana, pertahankan kedua baris (import dan entri array).
- Jangan commit file `.env`. Tambahkan variabel baru ke `.env.example`.
