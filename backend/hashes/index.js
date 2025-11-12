import bcrypt from "bcrypt";
import { HASH_COMPLEXITY } from "../keys/keys.js";

// La función debe RECIBIR el password como argumento
export const generateHash = async (password) => {
  if (!password) {
    throw new Error("Password is required for hashing");
  }

  const saltRounds = HASH_COMPLEXITY;
  const hash = await bcrypt.hash(password, saltRounds);
  return hash;
};
