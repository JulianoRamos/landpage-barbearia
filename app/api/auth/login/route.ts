import { NextResponse } from "next/server";
import { isPasswordValid, setSessionCookie } from "@/lib/auth";

export async function POST(request: Request) {
  let password = "";
  try {
    const body = await request.json();
    password = typeof body?.password === "string" ? body.password : "";
  } catch {
    return NextResponse.json({ error: "Requisição inválida." }, { status: 400 });
  }

  if (!isPasswordValid(password)) {
    return NextResponse.json({ error: "Senha incorreta." }, { status: 401 });
  }

  setSessionCookie();
  return NextResponse.json({ ok: true });
}
