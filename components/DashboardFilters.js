"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function DashboardFilters({ lojas, tipos }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function updateParam(key, value) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    const query = params.toString();
    router.push(query ? `/dashboard?${query}` : "/dashboard");
  }

  return (
    <div className="panel grid gap-4 p-5 md:grid-cols-2">
      <div>
        <label className="label">Empresa</label>
        <select className="input" defaultValue={searchParams.get("lojaId") || ""} onChange={(event) => updateParam("lojaId", event.target.value)}>
          <option value="">Todas as empresas</option>
          {lojas.map((loja) => <option key={loja.id} value={loja.id}>{loja.nome}</option>)}
        </select>
      </div>
      <div>
        <label className="label">Tipo de vaga</label>
        <select className="input" defaultValue={searchParams.get("tipoVagaId") || ""} onChange={(event) => updateParam("tipoVagaId", event.target.value)}>
          <option value="">Todos os tipos</option>
          {tipos.map((tipo) => <option key={tipo.id} value={tipo.id}>{tipo.nome}</option>)}
        </select>
      </div>
    </div>
  );
}
