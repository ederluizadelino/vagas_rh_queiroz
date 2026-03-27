"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  LabelList,
} from "recharts";

function EmptyChart({ message }) {
  return (
    <div className="flex h-[320px] items-center justify-center rounded-2xl border border-dashed border-[var(--border)] text-sm text-zinc-500">
      {message}
    </div>
  );
}

export function BarChartCard({
  title,
  data,
  layout = "horizontal", // Agora ele recebe o layout dinamicamente
  dataKey = "total",     // Recebe a chave dos valores numéricos
  xKey = "name",         // Recebe a chave do eixo X
  yKey = "name",         // Recebe a chave do eixo Y
  emptyMessage = "Nenhum dado para exibir.",
}) {
  const hasData = Array.isArray(data) && data.length > 0;

  // No Recharts:
  // layout="horizontal" -> Eixo X é categoria, barras sobem na vertical
  // layout="vertical" -> Eixo Y é categoria, barras deitam na horizontal
  const isHorizontalBars = layout === "vertical";

  return (
    <div className="panel p-5">
      <h3 className="text-lg font-semibold text-zinc-900">{title}</h3>

      <div className="mt-4">
        {!hasData ? (
          <EmptyChart message={emptyMessage} />
        ) : (
          <div
            className="w-full"
            style={{
              height: !isHorizontalBars
                ? 320
                : Math.max(320, data.length * 46),
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                layout={layout}
                margin={
                  !isHorizontalBars
                    ? { top: 20, right: 20, left: 0, bottom: 60 }
                    : { top: 10, right: 35, left: 10, bottom: 10 }
                }
                barCategoryGap={16}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f3d5dc" />

                {!isHorizontalBars ? (
                  <>
                    <XAxis
                      type="category"
                      dataKey={xKey}
                      interval={0}
                      angle={-15}
                      textAnchor="end"
                      height={70}
                      tick={{ fontSize: 12, fill: "#7a5560" }} // fill adicionado!
                      stroke="#7a5560"
                    />
                    <YAxis 
                      allowDecimals={false} 
                      tick={{ fontSize: 12, fill: "#7a5560" }} // fill adicionado!
                      stroke="#7a5560" 
                    />
                  </>
                ) : (
                  <>
                    <XAxis type="number" allowDecimals={false} hide />
                    <YAxis
                      type="category"
                      dataKey={yKey}
                      width={160}
                      tick={{ fontSize: 12, fill: "#7a5560" }} // fill adicionado!
                      stroke="#7a5560"
                    />
                  </>
                )}

                <Tooltip
                  formatter={(value) => [value, "Quantidade"]}
                  cursor={{ fill: "rgba(239,0,48,0.05)" }}
                />

                <Bar
                  dataKey={dataKey}
                  fill="#ef0030"
                  radius={!isHorizontalBars ? [10, 10, 0, 0] : [0, 10, 10, 0]}
                  maxBarSize={36}
                >
                  <LabelList
                    dataKey={dataKey}
                    position={!isHorizontalBars ? "top" : "right"}
                    fill="#111827"
                    fontSize={12}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}