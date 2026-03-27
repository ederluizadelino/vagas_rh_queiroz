import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(request, context) {
  try {
    const body = await request.json();
    const { id } = await context.params;

    const tipo = await prisma.tipoVaga.update({
      where: { id },
      data: { nome: body.nome.trim() },
    });

    return NextResponse.json(tipo);
  } catch (error) {
    console.error("Erro ao atualizar tipo de vaga:", error);
    return NextResponse.json(
      { error: "Não foi possível atualizar o tipo de vaga." },
      { status: 500 }
    );
  }
}

export async function DELETE(_, context) {
  try {
    const { id } = await context.params;

    await prisma.tipoVaga.delete({ where: { id } });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Erro ao excluir tipo de vaga:", error);
    return NextResponse.json(
      { error: "Não foi possível excluir o tipo de vaga." },
      { status: 500 }
    );
  }
}