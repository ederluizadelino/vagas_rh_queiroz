import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(request, context) {
  try {
    const body = await request.json();
    const { id } = await context.params;

    const vaga = await prisma.vaga.update({
      where: { id },
      data: {
        lojaId: body.lojaId,
        tipoVagaId: body.tipoVagaId,
        entrevistados: Number(body.entrevistados || 0),
        encaminhadosSegundaEtapa: Number(body.encaminhadosSegundaEtapa || 0),
        aprovados: Number(body.aprovados || 0),
        contratados: Number(body.contratados || 0),
        observacao: body.observacao || "",
        agendamentoNaoComparecido: Number(body.agendamentoNaoComparecido || 0),
      },
    });

    return NextResponse.json(vaga);
  } catch (error) {
    console.error("Erro ao atualizar vaga:", error);
    return NextResponse.json(
      { error: "Não foi possível atualizar o lançamento." },
      { status: 500 }
    );
  }
}

export async function DELETE(_, context) {
  try {
    const { id } = await context.params;

    await prisma.vaga.delete({
      where: { id },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Erro ao excluir vaga:", error);
    return NextResponse.json(
      { error: "Não foi possível excluir o lançamento." },
      { status: 500 }
    );
  }
}