export function luasPermukaanBalok(panjang: number, lebar: number, tinggi: number): number {
  return 2 * (panjang * lebar + panjang * tinggi + lebar * tinggi);
}

export function luasPermukaanKubus(sisi: number): number {
  return 6 * sisi * sisi;
}

export function luasPermukaanTabung(jariJari: number, tinggi: number): number {
  return 2 * Math.PI * jariJari * (jariJari + tinggi);
}