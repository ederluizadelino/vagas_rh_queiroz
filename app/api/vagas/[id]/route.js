import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(request, { params }) {
  const body = await request.json();
  const vaga = await prisma.vaga.update({
    where: { id: params.id },
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
}

export async function DELETE(_, { params }) {
  await prisma.vaga.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
