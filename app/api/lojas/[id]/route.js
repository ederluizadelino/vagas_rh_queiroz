import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
export async function PUT(request, { params }) {
  const body = await request.json();
  const loja = await prisma.loja.update({ where: { id: params.id }, data: { nome: body.nome.trim() } });
  return NextResponse.json(loja);
}
export async function DELETE(_, { params }) {
  await prisma.loja.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
