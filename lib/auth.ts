import crypto from "crypto";
import { cookies } from "next/headers";

/**
 * Autenticação simples por senha única de administrador.
 * A sessão é um cookie HttpOnly assinado por HMAC-SHA256 com SESSION_SECRET.
 * Sem banco de usuários — adequado para um único dono editar a página.
 */

const COOKIE_NAME = "barber_admin";
const MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 dias

function getSecret(): string {
  return process.env.SESSION_SECRET || "dev-insecure-secret-troque-em-producao";
}

/** Compara a senha informada com ADMIN_PASSWORD (timing-safe). */
export function isPasswordValid(password: string): boolean {
  const expected = process.env.ADMIN_PASSWORD || "admin";
  const a = Buffer.from(password);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

/** Gera o valor assinado do cookie: `<expiry>.<hmac>`. */
function signSession(): string {
  const expiry = String(Math.floor(Date.now() / 1000) + MAX_AGE_SECONDS);
  const hmac = crypto
    .createHmac("sha256", getSecret())
    .update(expiry)
    .digest("hex");
  return `${expiry}.${hmac}`;
}

/** Verifica a assinatura e a validade do valor do cookie. */
function verifySession(value: string | undefined): boolean {
  if (!value) return false;
  const [expiry, hmac] = value.split(".");
  if (!expiry || !hmac) return false;
  const expected = crypto
    .createHmac("sha256", getSecret())
    .update(expiry)
    .digest("hex");
  const a = Buffer.from(hmac);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  if (!crypto.timingSafeEqual(a, b)) return false;
  return Number(expiry) > Math.floor(Date.now() / 1000);
}

/** Grava o cookie de sessão (chamado após login válido). */
export function setSessionCookie(): void {
  cookies().set(COOKIE_NAME, signSession(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE_SECONDS,
  });
}

/** Remove o cookie de sessão (logout). */
export function clearSessionCookie(): void {
  cookies().set(COOKIE_NAME, "", { path: "/", maxAge: 0 });
}

/** True se a requisição atual pertence a um admin autenticado. */
export function isAuthenticated(): boolean {
  return verifySession(cookies().get(COOKIE_NAME)?.value);
}

/** Lança se não estiver autenticado — usar no início das rotas protegidas. */
export function requireAdmin(): void {
  if (!isAuthenticated()) {
    throw new Error("UNAUTHORIZED");
  }
}
