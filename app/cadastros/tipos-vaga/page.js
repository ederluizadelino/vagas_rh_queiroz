import AppShell from "@/components/AppShell";
import Header from "@/components/Header";
import SimpleRegistryClient from "@/components/SimpleRegistryClient";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function TiposVagaPage() {
  const tipos = await prisma.tipoVaga.findMany({ orderBy: { nome: "asc" } });
  return (
    <AppShell>
      <Header title="Cadastro de Tipos de Vaga" subtitle="Controle as categorias usadas nos lançamentos." />
      <SimpleRegistryClient title="Gerenciar tipos de vaga" endpoint="/api/tipos-vaga" items={tipos} placeholder="Digite o nome do tipo de vaga" />
    </AppShell>
  );
}
