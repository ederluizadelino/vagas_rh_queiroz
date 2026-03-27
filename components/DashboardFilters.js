"use client";

export default function DashboardFilters({
  lojas,
  tipos,
  selectedLojaId = "",
  selectedTipoVagaId = "",
}) {
  return (
    <form
      action="/dashboard"
      method="GET"
      className="panel grid gap-4 p-5 md:grid-cols-[1fr_1fr_auto]"
    >
      <div>
        <label className="label">Empresa</label>
        <select
          name="lojaId"
          className="input"
          defaultValue={selectedLojaId}
          onChange={(e) => e.currentTarget.form.requestSubmit()}
        >
          <option value="">Todas as empresas</option>
          {lojas.map((loja) => (
            <option key={loja.id} value={loja.id}>
              {loja.nome}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="label">Tipo de vaga</label>
        <select
          name="tipoVagaId"
          className="input"
          defaultValue={selectedTipoVagaId}
          onChange={(e) => e.currentTarget.form.requestSubmit()}
        >
          <option value="">Todos os tipos</option>
          {tipos.map((tipo) => (
            <option key={tipo.id} value={tipo.id}>
              {tipo.nome}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-end">
        <a
          href="/dashboard"
          className="inline-flex h-11 items-center justify-center rounded-xl border border-[var(--border)] px-4 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50"
        >
          Limpar filtros
        </a>
      </div>
    </form>
  );
}