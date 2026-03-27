import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request) {
  const body = await request.json();
  const vaga = await prisma.vaga.create({
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
  return NextResponse.json(vaga, { status: 201 });
}
