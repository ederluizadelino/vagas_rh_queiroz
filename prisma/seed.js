const { PrismaClient } = require("@prisma/client");
const data = require("./seed-data.json");

const prisma = new PrismaClient();

async function main() {
  for (const item of data) {
    const loja = await prisma.loja.upsert({
      where: { nome: item.empresa },
      update: {},
      create: { nome: item.empresa },
    });

    const tipoVaga = await prisma.tipoVaga.upsert({
      where: { nome: item.tipoVaga },
      update: {},
      create: { nome: item.tipoVaga },
    });

    await prisma.vaga.create({
      data: {
        lojaId: loja.id,
        tipoVagaId: tipoVaga.id,
        entrevistados: item.entrevistados,
        encaminhadosSegundaEtapa: item.encaminhadosSegundaEtapa,
        aprovados: item.aprovados,
        contratados: item.contratados,
        observacao: item.observacao,
        agendamentoNaoComparecido: item.agendamentoNaoComparecido,
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log("Seed concluído.");
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
