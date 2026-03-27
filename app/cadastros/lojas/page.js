import AppShell from "@/components/AppShell";
import Header from "@/components/Header";
import SimpleRegistryClient from "@/components/SimpleRegistryClient";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function LojasPage() {
  const lojas = await prisma.loja.findMany({ orderBy: { nome: "asc" } });
  return (
    <AppShell>
      <Header title="Cadastro de Lojas" subtitle="Mantenha as empresas disponíveis para novos lançamentos." />
      <SimpleRegistryClient title="Gerenciar lojas" endpoint="/api/lojas" items={lojas} placeholder="Digite o nome da loja" />
    </AppShell>
  );
}
