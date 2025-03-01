import crypto from "crypto";

const SALT = process.env.SALT!; // randomize salt in best practice

export function hashPassword(password: string): Promise<string> {
  return new Promise((resolve, reject) => {
    crypto.scrypt(password.normalize(), SALT, 64, (err, hash) => {
      if (err) reject(err);
      resolve(hash.toString("hex").normalize());
    });
  });
}

export async function comparePassword(
  password: string,
  hashedPassword: string
) {
  const inputHash = await hashPassword(password);

  return crypto.timingSafeEqual(
    Buffer.from(inputHash, "hex"),
    Buffer.from(hashedPassword, "hex")
  );
}
