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
}) {
  const isVertical = layout === "vertical";

  return (
    <div className="panel p-5">
      <h3 className="text-lg font-semibold text-zinc-900">{title}</h3>

      <div className="mt-4 h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout={isVertical ? "vertical" : "horizontal"}
            margin={
              isVertical
                ? { top: 10, right: 40, left: 30, bottom: 10 }
                : { top: 20, right: 20, left: 10, bottom: 70 }
            }
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f3d5dc" />

            {isVertical ? (
              <>
                <XAxis type="number" tick={{ fontSize: 12 }} stroke="#7a5560" />
                <YAxis
                  type="category"
                  dataKey="name"
                  width={180}
                  tick={{ fontSize: 12 }}
                  stroke="#7a5560"
                />
              </>
            ) : (
              <>
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 12 }}
                  stroke="#7a5560"
                  angle={-20}
                  textAnchor="end"
                  interval={0}
                  height={70}
                />
                <YAxis tick={{ fontSize: 12 }} stroke="#7a5560" />
              </>
            )}

            <Tooltip />

            <Bar dataKey={dataKey} fill="#ef0030" radius={[10, 10, 10, 10]}>
              <LabelList
                dataKey={dataKey}
                position={isVertical ? "right" : "top"}
                fill="#111827"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}