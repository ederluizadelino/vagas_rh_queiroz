"use client";

import { useState, useTransition } from "react";
import { Pencil, Trash2, X } from "lucide-react";
import { formatDateTime } from "@/lib/format";

export default function SimpleRegistryClient({ title, endpoint, items, placeholder }) {
  const [name, setName] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [isPending, startTransition] = useTransition();

  function startEdit(item) { setEditingId(item.id); setName(item.nome); }
  function reset() { setEditingId(null); setName(""); }

  async function handleSubmit(event) {
    event.preventDefault();
    startTransition(async () => {
      await fetch(editingId ? `${endpoint}/${editingId}` : endpoint, {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome: name }),
      });
      window.location.reload();
    });
  }

  async function handleDelete(id) {
    if (!window.confirm("Deseja excluir este cadastro?")) return;
    startTransition(async () => {
      await fetch(`${endpoint}/${id}`, { method: "DELETE" });
      window.location.reload();
    });
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="panel p-6">
        <div className="mb-5 flex items-center justify-between gap-3">
          <div><h2 className="text-xl font-semibold text-zinc-900">{title}</h2><p className="mt-1 text-sm text-zinc-500">Cadastre, edite e remova registros.</p></div>
          {editingId ? <button type="button" className="btn-secondary" onClick={reset}><X size={16} /><span className="ml-2">Cancelar</span></button> : null}
        </div>
        <div className="grid gap-4 md:grid-cols-[1fr_auto]">
          <div><label className="label">Nome</label><input className="input" value={name} onChange={(event) => setName(event.target.value)} placeholder={placeholder} required /></div>
          <div className="self-end"><button className="btn-primary min-w-40" disabled={isPending}>{isPending ? "Salvando..." : editingId ? "Salvar" : "Cadastrar"}</button></div>
        </div>
      </form>
      <div className="table-wrapper"><div className="overflow-x-auto"><table className="min-w-full text-sm"><thead className="bg-zinc-950 text-white"><tr><th className="px-4 py-4 text-left font-semibold">Nome</th><th className="px-4 py-4 text-left font-semibold">Última Atualização</th><th className="px-4 py-4 text-left font-semibold">Ações</th></tr></thead><tbody>{items.map((item) => <tr key={item.id} className="border-t border-[var(--border)]"><td className="px-4 py-4">{item.nome}</td><td className="px-4 py-4">{formatDateTime(item.updatedAt)}</td><td className="px-4 py-4"><div className="flex gap-2"><button type="button" className="btn-secondary px-3 py-2" onClick={() => startEdit(item)}><Pencil size={16} /></button><button type="button" className="btn-secondary px-3 py-2 text-red-600" onClick={() => handleDelete(item.id)}><Trash2 size={16} /></button></div></td></tr>)}{items.length === 0 ? <tr><td className="px-4 py-10 text-center text-zinc-500" colSpan="3">Nenhum registro cadastrado.</td></tr> : null}</tbody></table></div></div>
    </div>
  );
}
