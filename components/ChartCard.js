"use client";

import { ResponsiveContainer, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from "recharts";
const COLORS = ["#ef0030", "#111111", "#ff7a97", "#ffc0cd", "#9a1737", "#5f0f22"];

export function BarChartCard({ title, data, dataKey = "total" }) {
  return (
    <div className="panel p-5">
      <h3 className="text-lg font-semibold text-zinc-900">{title}</h3>
      <div className="mt-4 h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f5d2dc" />
            <XAxis dataKey="name" stroke="#8b5b69" tick={{ fontSize: 12 }} />
            <YAxis stroke="#8b5b69" tick={{ fontSize: 12 }} />
            <Tooltip />
            <Bar dataKey={dataKey} fill="#ef0030" radius={[10, 10, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function PieChartCard({ title, data, dataKey = "total" }) {
  return (
    <div className="panel p-5">
      <h3 className="text-lg font-semibold text-zinc-900">{title}</h3>
      <div className="mt-4 h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip />
            <Pie data={data} dataKey={dataKey} nameKey="name" outerRadius={110} innerRadius={55}>
              {data.map((entry, index) => <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />)}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
