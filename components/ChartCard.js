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
  orientation = "vertical",
  emptyMessage = "Nenhum dado para exibir.",
}) {
  const hasData = Array.isArray(data) && data.length > 0;
  const isVertical = orientation === "vertical";

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
              height: isVertical
                ? 320
                : Math.max(320, data.length * 46),
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                layout={isVertical ? "horizontal" : "vertical"}
                margin={
                  isVertical
                    ? { top: 20, right: 20, left: 0, bottom: 60 }
                    : { top: 10, right: 35, left: 10, bottom: 10 }
                }
                barCategoryGap={16}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f3d5dc" />

                {isVertical ? (
                  <>
                    <XAxis
                      dataKey="name"
                      interval={0}
                      angle={-15}
                      textAnchor="end"
                      height={70}
                      tick={{ fontSize: 12 }}
                      stroke="#7a5560"
                    />
                    <YAxis allowDecimals={false} tick={{ fontSize: 12 }} stroke="#7a5560" />
                  </>
                ) : (
                  <>
                    <XAxis type="number" allowDecimals={false} hide />
                    <YAxis
                      type="category"
                      dataKey="name"
                      width={160}
                      tick={{ fontSize: 12 }}
                      stroke="#7a5560"
                    />
                  </>
                )}

                <Tooltip
                  formatter={(value) => [value, "Quantidade"]}
                  cursor={{ fill: "rgba(239,0,48,0.05)" }}
                />

                <Bar
                  dataKey="total"
                  fill="#ef0030"
                  radius={isVertical ? [10, 10, 0, 0] : [0, 10, 10, 0]}
                  maxBarSize={36}
                >
                  <LabelList
                    dataKey="total"
                    position={isVertical ? "top" : "right"}
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