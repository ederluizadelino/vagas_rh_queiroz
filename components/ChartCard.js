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

export function BarChartCard({
  title,
  data,
  dataKey = "total",
  layout = "vertical",
  xKey = "name",
  yKey = "name",
}) {
  const isHorizontal = layout === "horizontal";
  const hasData = Array.isArray(data) && data.length > 0;

  return (
    <div className="panel p-5">
      <h3 className="text-lg font-semibold text-zinc-900">{title}</h3>

      <div className="mt-4 h-80">
        {!hasData ? (
          <div className="flex h-full items-center justify-center rounded-2xl border border-dashed border-[var(--border)] text-sm text-zinc-500">
            Nenhum dado para exibir.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              layout={isHorizontal ? "horizontal" : "vertical"}
              margin={
                isHorizontal
                  ? { top: 16, right: 16, left: 0, bottom: 50 }
                  : { top: 8, right: 36, left: 24, bottom: 8 }
              }
              barCategoryGap={18}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f3d5dc" vertical={!isHorizontal} />

              {isHorizontal ? (
                <>
                  <XAxis
                    dataKey={xKey}
                    tick={{ fontSize: 12 }}
                    stroke="#7a5560"
                    angle={-18}
                    textAnchor="end"
                    interval={0}
                    height={60}
                  />
                  <YAxis allowDecimals={false} tick={{ fontSize: 12 }} stroke="#7a5560" />
                </>
              ) : (
                <>
                  <XAxis type="number" allowDecimals={false} hide />
                  <YAxis
                    type="category"
                    dataKey={yKey}
                    width={140}
                    tick={{ fontSize: 12 }}
                    stroke="#7a5560"
                  />
                </>
              )}

              <Tooltip cursor={{ fill: "rgba(239, 0, 48, 0.06)" }} />

              <Bar
                dataKey={dataKey}
                fill="#ef0030"
                radius={isHorizontal ? [10, 10, 0, 0] : [0, 10, 10, 0]}
                maxBarSize={42}
              >
                <LabelList
                  dataKey={dataKey}
                  position={isHorizontal ? "top" : "right"}
                  fill="#111827"
                  fontSize={12}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}