export function buildKpis(vagas) {
  return {
    totalLojas: new Set(vagas.map((item) => item.loja.nome)).size,
    totalTipos: new Set(vagas.map((item) => item.tipoVaga.nome)).size,
    totalVagas: vagas.length,
    entrevistados: vagas.reduce((acc, item) => acc + item.entrevistados, 0),
    segundaEtapa: vagas.reduce((acc, item) => acc + item.encaminhadosSegundaEtapa, 0),
    aprovados: vagas.reduce((acc, item) => acc + item.aprovados, 0),
    contratados: vagas.reduce((acc, item) => acc + item.contratados, 0),
    faltas: vagas.reduce((acc, item) => acc + item.agendamentoNaoComparecido, 0),
  };
}

export function groupByLoja(vagas) {
  const map = new Map();

  for (const item of vagas) {
    const key = item.loja.nome;
    map.set(key, (map.get(key) || 0) + item.contratados);
  }

  return Array.from(map.entries())
    .map(([name, total]) => ({ name, total }))
    .filter((item) => item.total > 0)
    .sort((a, b) => b.total - a.total);
}

export function groupByTipo(vagas) {
  const map = new Map();

  for (const item of vagas) {
    const key = item.tipoVaga.nome;
    map.set(key, (map.get(key) || 0) + 1);
  }

  return Array.from(map.entries())
    .map(([name, total]) => ({ name, total }))
    .sort((a, b) => b.total - a.total);
}