import AppShell from "@/components/AppShell";
import Header from "@/components/Header";
import LancamentosClient from "@/components/LancamentosClient";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function LancamentosPage() {
  const [vagas, lojas, tipos] = await Promise.all([
    prisma.vaga.findMany({ include: { loja: true, tipoVaga: true }, orderBy: { updatedAt: "desc" } }),
    prisma.loja.findMany({ orderBy: { nome: "asc" } }),
    prisma.tipoVaga.findMany({ orderBy: { nome: "asc" } }),
  ]);

  return (
    <AppShell>
      <Header title="Lançamentos" subtitle="Cadastre, edite e exclua registros do painel de vagas." />
      <LancamentosClient vagas={vagas} lojas={lojas} tipos={tipos} />
    </AppShell>
  );
}
