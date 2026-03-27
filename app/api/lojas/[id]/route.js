import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(request, context) {
  try {
    const body = await request.json();
    const { id } = await context.params;

    const loja = await prisma.loja.update({
      where: { id },
      data: { nome: body.nome.trim() },
    });

    return NextResponse.json(loja);
  } catch (error) {
    console.error("Erro ao atualizar loja:", error);
    return NextResponse.json(
      { error: "Não foi possível atualizar a loja." },
      { status: 500 }
    );
  }
}

export async function DELETE(_, context) {
  try {
    const { id } = await context.params;

    await prisma.loja.delete({ where: { id } });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Erro ao excluir loja:", error);
    return NextResponse.json(
      { error: "Não foi possível excluir a loja." },
      { status: 500 }
    );
  }
}