import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
export async function POST(request) {
  const body = await request.json();
  const loja = await prisma.loja.create({ data: { nome: body.nome.trim() } });
  return NextResponse.json(loja, { status: 201 });
}
