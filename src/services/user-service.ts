import type { User } from "../models/user.js";
import type { Response } from "../models/response.js";

const users: User[] = [];

export function findUser(name: string): Response<User> {
  const data = users.find((u) => u.name === name);

  if (data) {
    return { success: true, message: "User ditemukan", data };
  }

  return { success: false, message: "User tidak ditemukan" };
}

export function register(name: string): Response<User> {
  if (name === "") {
    return { success: false, message: "Nama tidak boleh kosong" };
  }

  if (findUser(name).success) {
    return { success: false, message: "Username sudah dipakai" };
  }

  const user: User = { name };
  users.push(user);

  return { success: true, message: "Akun berhasil dibuat", data: user };
}