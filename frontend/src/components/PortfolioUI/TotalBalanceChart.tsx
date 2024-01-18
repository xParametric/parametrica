"use client";
import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { pv: "January", uv: 722343 },
  { pv: "February", uv: 1121200 },
  { pv: "March", uv: 1682000 },
  { pv: "April", uv: 1189050 },
  { pv: "May", uv: 1165200 },
  { pv: "June", uv: 2228200 },
  { pv: "July", uv: 1990120 },
  { pv: "August", uv: 2273400 },
  { pv: "September", uv: 3043200 },
  { pv: "October", uv: 2758000 },
  { pv: "November", uv: 3865700 },
  { pv: "December", uv: 4498650 },
];

export default function TotalBalanceChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart
        data={data}
        margin={{ top: 20, right: 20, bottom: 30, left: 20 }}
      >
        <XAxis dataKey="pv" name="date" />
        <YAxis dataKey="uv" name="(P&L)" unit="$" type="number" fontSize={14} />
        <Tooltip
          cursor={{ strokeDasharray: "3 3" }}
          formatter={(value, name) => [`${value} $`, "P&L"]}
        />

        <Area
          type="natural"
          dataKey="uv"
          stroke="#5779C7"
          strokeWidth={3}
          fill="#5779C7"
          fillOpacity={0.6}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
