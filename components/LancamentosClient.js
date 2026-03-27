"use client";

import { useMemo, useState, useTransition } from "react";
import { Pencil, Trash2, X } from "lucide-react";
import { formatDateTime } from "@/lib/format";

const initialForm = { lojaId: "", tipoVagaId: "", entrevistados: 0, encaminhadosSegundaEtapa: 0, aprovados: 0, contratados: 0, observacao: "", agendamentoNaoComparecido: 0 };

export default function LancamentosClient({ vagas, lojas, tipos }) {
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [isPending, startTransition] = useTransition();
  const orderedVagas = useMemo(() => [...vagas].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)), [vagas]);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function startEdit(item) {
    setEditingId(item.id);
    setForm({
      lojaId: item.lojaId,
      tipoVagaId: item.tipoVagaId,
      entrevistados: item.entrevistados,
      encaminhadosSegundaEtapa: item.encaminhadosSegundaEtapa,
      aprovados: item.aprovados,
      contratados: item.contratados,
      observacao: item.observacao || "",
      agendamentoNaoComparecido: item.agendamentoNaoComparecido,
    });
  }

  function resetForm() { setEditingId(null); setForm(initialForm); }

  async function handleSubmit(event) {
  event.preventDefault();

  const method = editingId ? "PUT" : "POST";
  const url = editingId ? `/api/vagas/${editingId}` : "/api/vagas";

  startTransition(async () => {
    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          entrevistados: Number(form.entrevistados),
          encaminhadosSegundaEtapa: Number(form.encaminhadosSegundaEtapa),
          aprovados: Number(form.aprovados),
          contratados: Number(form.contratados),
          agendamentoNaoComparecido: Number(form.agendamentoNaoComparecido),
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.error || "Erro ao salvar lançamento.");
      }

      window.location.reload();
    } catch (error) {
      alert(error.message || "Erro ao salvar lançamento.");
    }
  });
}

  async function handleDelete(id) {
    if (!window.confirm("Deseja realmente excluir este lançamento?")) return;
    startTransition(async () => {
      await fetch(`/api/vagas/${id}`, { method: "DELETE" });
      window.location.reload();
    });
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="panel p-6">
        <div className="mb-6 flex items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-semibold text-zinc-900">{editingId ? "Editar lançamento" : "Novo lançamento"}</h2>
            <p className="mt-1 text-sm text-zinc-500">A coluna Última Atualização é preenchida automaticamente pelo sistema.</p>
          </div>
          {editingId ? <button type="button" className="btn-secondary" onClick={resetForm}><X size={16} /><span className="ml-2">Cancelar edição</span></button> : null}
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div><label className="label">Empresa</label><select name="lojaId" value={form.lojaId} onChange={handleChange} className="input" required><option value="">Selecione</option>{lojas.map((loja) => <option key={loja.id} value={loja.id}>{loja.nome}</option>)}</select></div>
          <div><label className="label">Tipo de vaga</label><select name="tipoVagaId" value={form.tipoVagaId} onChange={handleChange} className="input" required><option value="">Selecione</option>{tipos.map((tipo) => <option key={tipo.id} value={tipo.id}>{tipo.nome}</option>)}</select></div>
          <Field label="Entrevistados" name="entrevistados" value={form.entrevistados} onChange={handleChange} />
          <Field label="Encaminhados para 2ª etapa" name="encaminhadosSegundaEtapa" value={form.encaminhadosSegundaEtapa} onChange={handleChange} />
          <Field label="Aprovados" name="aprovados" value={form.aprovados} onChange={handleChange} />
          <Field label="Contratados" name="contratados" value={form.contratados} onChange={handleChange} />
          <Field label="Agendamento não comparecido" name="agendamentoNaoComparecido" value={form.agendamentoNaoComparecido} onChange={handleChange} />
          <div className="md:col-span-2 xl:col-span-4"><label className="label">Observação</label><textarea name="observacao" value={form.observacao} onChange={handleChange} className="input min-h-28" placeholder="Digite observações importantes" /></div>
        </div>
        <div className="mt-6"><button type="submit" className="btn-primary" disabled={isPending}>{isPending ? "Salvando..." : editingId ? "Salvar alterações" : "Cadastrar lançamento"}</button></div>
      </form>
      <div className="table-wrapper"><div className="overflow-x-auto"><table className="min-w-full text-sm"><thead className="bg-zinc-950 text-white"><tr>{["Empresa","Tipo de vaga","Entrevistados","2ª etapa","Aprovados","Contratados","Não compareceu","Observação","Última Atualização","Ações"].map((header) => <th key={header} className="px-4 py-4 text-left font-semibold">{header}</th>)}</tr></thead><tbody>{orderedVagas.map((item) => <tr key={item.id} className="border-t border-[var(--border)] align-top"><td className="px-4 py-4">{item.loja.nome}</td><td className="px-4 py-4">{item.tipoVaga.nome}</td><td className="px-4 py-4">{item.entrevistados}</td><td className="px-4 py-4">{item.encaminhadosSegundaEtapa}</td><td className="px-4 py-4">{item.aprovados}</td><td className="px-4 py-4">{item.contratados}</td><td className="px-4 py-4">{item.agendamentoNaoComparecido}</td><td className="px-4 py-4 text-zinc-600">{item.observacao || "-"}</td><td className="px-4 py-4">{formatDateTime(item.updatedAt)}</td><td className="px-4 py-4"><div className="flex gap-2"><button type="button" className="btn-secondary px-3 py-2" onClick={() => startEdit(item)}><Pencil size={16} /></button><button type="button" className="btn-secondary px-3 py-2 text-red-600" onClick={() => handleDelete(item.id)}><Trash2 size={16} /></button></div></td></tr>)}{orderedVagas.length === 0 ? <tr><td colSpan="10" className="px-4 py-10 text-center text-zinc-500">Nenhum lançamento cadastrado.</td></tr> : null}</tbody></table></div></div>
    </div>
  );
}

function Field({ label, name, value, onChange }) {
  return (<div><label className="label">{label}</label><input type="number" min="0" name={name} value={value} onChange={onChange} className="input" /></div>);
}
