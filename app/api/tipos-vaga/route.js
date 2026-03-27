import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
export async function POST(request) {
  const body = await request.json();
  const tipo = await prisma.tipoVaga.create({ data: { nome: body.nome.trim() } });
  return NextResponse.json(tipo, { status: 201 });
}
