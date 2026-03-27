import AppShell from "@/components/AppShell";
import Header from "@/components/Header";
import KpiCard from "@/components/KpiCard";
import DashboardFilters from "@/components/DashboardFilters";
import { BarChartCard } from "@/components/ChartCard";
import { prisma } from "@/lib/prisma";
import { buildKpis, groupByLoja, groupByTipo } from "@/lib/dashboard";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function DashboardPage({ searchParams }) {
  const params = await searchParams;

  const filters = {
    lojaId: params?.lojaId || undefined,
    tipoVagaId: params?.tipoVagaId || undefined,
  };

  const where = {
    ...(filters.lojaId ? { lojaId: filters.lojaId } : {}),
    ...(filters.tipoVagaId ? { tipoVagaId: filters.tipoVagaId } : {}),
  };

  const [lojas, tipos, vagas] = await Promise.all([
    prisma.loja.findMany({ orderBy: { nome: "asc" } }),
    prisma.tipoVaga.findMany({ orderBy: { nome: "asc" } }),
    prisma.vaga.findMany({
      where,
      include: { loja: true, tipoVaga: true },
      orderBy: { updatedAt: "desc" },
    }),
  ]);

  const kpis = buildKpis(vagas);
  const chartLojas = groupByLoja(vagas);
  const chartTipos = groupByTipo(vagas);

  return (
    <AppShell>
      <Header
        title="Dashboard"
        subtitle="Cards, filtros e gráficos com todos os dados da planilha e novos lançamentos."
      />

      <DashboardFilters
        lojas={lojas}
        tipos={tipos}
        selectedLojaId={filters.lojaId || ""}
        selectedTipoVagaId={filters.tipoVagaId || ""}
      />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <KpiCard title="Total de lançamentos" value={kpis.totalVagas} helper="Registros visíveis no filtro atual" />
        <KpiCard title="Lojas" value={kpis.totalLojas} helper="Empresas encontradas" />
        <KpiCard title="Tipos de vaga" value={kpis.totalTipos} helper="Categorias mapeadas" />
        <KpiCard title="Entrevistados" value={kpis.entrevistados} helper="Soma dos entrevistados" />
        <KpiCard title="2ª etapa" value={kpis.segundaEtapa} helper="Encaminhados para próxima etapa" />
        <KpiCard title="Aprovados" value={kpis.aprovados} helper="Total de aprovados" />
        <KpiCard title="Contratados" value={kpis.contratados} helper="Total de contratados" />
        <KpiCard title="Não compareceu" value={kpis.faltas} helper="Agendamentos perdidos" />
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <BarChartCard
          title="Contratações por empresa"
          data={chartLojas}
          dataKey="total"
          layout="horizontal"
          xKey="name"
        />

        <BarChartCard
          title="Distribuição por tipo de vaga"
          data={chartTipos}
          dataKey="total"
          layout="vertical"
          yKey="name"
        />
      </section>

      <section className="table-wrapper">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-zinc-950 text-white">
              <tr>
                {[
                  "Empresa",
                  "Tipo de vaga",
                  "Entrevistados",
                  "2ª etapa",
                  "Aprovados",
                  "Contratados",
                  "Não compareceu",
                  "Observação",
                ].map((header) => (
                  <th key={header} className="px-4 py-4 text-left font-semibold">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {vagas.map((item) => (
                <tr key={item.id} className="border-t border-[var(--border)]">
                  <td className="px-4 py-4">{item.loja.nome}</td>
                  <td className="px-4 py-4">{item.tipoVaga.nome}</td>
                  <td className="px-4 py-4">{item.entrevistados}</td>
                  <td className="px-4 py-4">{item.encaminhadosSegundaEtapa}</td>
                  <td className="px-4 py-4">{item.aprovados}</td>
                  <td className="px-4 py-4">{item.contratados}</td>
                  <td className="px-4 py-4">{item.agendamentoNaoComparecido}</td>
                  <td className="px-4 py-4 text-zinc-600">{item.observacao || "-"}</td>
                </tr>
              ))}

              {vagas.length === 0 ? (
                <tr>
                  <td className="px-4 py-10 text-center text-zinc-500" colSpan="8">
                    Nenhum dado encontrado para o filtro selecionado.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </section>
    </AppShell>
  );
}