"use client";
import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

const data = [
  { month: "January", value: 722343 },
  { month: "February", value: 1121200 },
  { month: "March", value: 1682000 },
  { month: "April", value: 1189050 },
  { month: "May", value: 1165200 },
  { month: "June", value: 2228200 },
  { month: "July", value: 1990120 },
  { month: "August", value: 2273400 },
  { month: "September", value: 3043200 },
  { month: "October", value: 2758000 },
  { month: "November", value: 3865700 },
  { month: "December", value: 4498650 },
];

export default function TotalBalanceChart() {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      const myChart = echarts.init(chartRef.current);

      const option = {
        tooltip: {
          trigger: "axis",
          formatter: (params: any) => {
            const param = params[0];
            return `${param.axisValueLabel}: ${param.data.value} $`;
          },
        },
        xAxis: {
          type: "category",
          data: data.map((item) => item.month),
          boundaryGap: false,
        },
        yAxis: {
          type: "value",
          name: "P&L",
          nameLocation: "end",
          axisLabel: {
            formatter: "{value} $",
          },
        },
        series: [
          {
            data: data.map((item) => item.value),
            type: "line",
            areaStyle: {},
            emphasis: {
              focus: "series",
            },
            smooth: true,
            symbol: "none",
            lineStyle: {
              width: 3,
              color: "#5155a6",
            },
            itemStyle: {
              color: "#5155a6",
            },
            // areaStyle: {
            //   color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            //     {
            //       offset: 0,
            //       color: "#5155a6",
            //     },
            //     {
            //       offset: 1,
            //       color: "#fff",
            //     },
            //   ]),
            //   opacity: 0.6,
            // },
          },
        ],
      };

      myChart.setOption(option);
    }
  }, []);

  return <div ref={chartRef} style={{ width: "100%", height: "300px" }} />;
}
