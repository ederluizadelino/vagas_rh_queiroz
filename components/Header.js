export default function Header({ title, subtitle, actions }) {
  return (
    <header className="panel flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">
      <div>
        <span className="badge">Painel de vagas</span>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-zinc-950">{title}</h1>
        {subtitle ? <p className="mt-2 text-sm text-zinc-600">{subtitle}</p> : null}
      </div>
      {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
    </header>
  );
}
