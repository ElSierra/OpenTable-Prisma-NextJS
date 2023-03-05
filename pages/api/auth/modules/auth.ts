import bcrypt from "bcrypt";
import { sign } from "crypto";
import * as jose from "jose";

export const HashPassword = async (password: string) => {
  return bcrypt.hash(password, 10);
};

const alg = "HS256";
const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export const createJWT = async (email: string) => {
  return new jose.SignJWT({ email })
    .setProtectedHeader({ alg })
    .setExpirationTime("24h")
    .sign(secret);
};
export const verifyJWT = async (token: string) => {
  return jose.jwtVerify(token, secret);
};

export const compareHash = async (password: string, hashedPassword: string) => {
  return bcrypt.compare(password, hashedPassword);
};
