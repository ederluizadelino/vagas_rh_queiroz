export default function KpiCard({ title, value, helper }) {
  return (
    <div className="panel p-5">
      <p className="text-sm font-medium text-zinc-500">{title}</p>
      <h3 className="mt-4 text-3xl font-bold text-zinc-950">{value}</h3>
      {helper ? <p className="mt-2 text-sm text-zinc-500">{helper}</p> : null}
    </div>
  );
}
