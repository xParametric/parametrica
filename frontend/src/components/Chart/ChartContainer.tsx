import React, { useCallback, useEffect, useRef, useState } from "react";
import * as echarts from "echarts";
import Web3 from "web3";
import { useData } from "../../context/DataContext";

interface Props {
  questionId: string;
}

interface ChartData {
  time: string; // Date as string for simplicity
  Yes: number;
  No: number;
}

const ChartContainer: React.FC<Props> = ({ questionId }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const { polymarket } = useData();
  const [chartInstance, setChartInstance] = useState<echarts.ECharts | null>(
    null
  );
  const fetchAndUpdateChart = useCallback(async () => {
    try {
      const data = await polymarket.methods.getGraphData(questionId).call();
      let yesSum = 0;
      let noSum = 0;
      let formattedData: ChartData[] = [];

      if (data["0"].length > 0 || data["1"].length > 0) {
        const combinedData = [...data["0"], ...data["1"]]
          .map((item) => ({
            ...item,
            timestamp: parseInt(item.timestamp),
            amount: parseFloat(Web3.utils.fromWei(item.amount, "ether")),
            isYes: data["0"].includes(item),
          }))
          .sort((a, b) => a.timestamp - b.timestamp);

        combinedData.forEach((item) => {
          if (item.isYes) yesSum += item.amount;
          else noSum += item.amount;
          const total = yesSum + noSum;
          const yesPercentage = (yesSum / total) * 100;
          const noPercentage = (noSum / total) * 100;

          formattedData.push({
            time: new Date(item.timestamp * 1000).toLocaleDateString(),
            Yes: yesPercentage,
            No: noPercentage,
          });
        });
      } else {
        formattedData = [
          {
            time: new Date().toLocaleDateString(), // Current date as a placeholder
            Yes: 0,
            No: 0,
          },
        ];
      }

      if (chartRef.current && !chartInstance) {
        const initChart = echarts.init(chartRef.current);
        setChartInstance(initChart);
      }

      const option = {
        tooltip: { trigger: "axis" },
        legend: { data: ["Yes", "No"] },
        xAxis: {
          type: "category",
          data: formattedData.map((data) => data.time),
        },
        yAxis: {
          type: "value",
          axisLabel: {
            formatter: "{value} %",
          },
        },
        series: [
          {
            name: "Yes",
            type: "line",
            data: formattedData.map((data) => data.Yes),
          },
          {
            name: "No",
            type: "line",
            data: formattedData.map((data) => data.No),
          },
        ],
      };

      chartInstance?.setOption(option, true);
    } catch (error) {
      console.error("Error fetching or processing graph data:", error);
    }
  }, [polymarket.methods, questionId, chartInstance]);

  useEffect(() => {
    if (chartRef.current && !chartInstance) {
      const initChart = echarts.init(chartRef.current);
      setChartInstance(initChart);
    }
  }, [chartRef, chartInstance]);

  useEffect(() => {
    fetchAndUpdateChart();

    const intervalId = setInterval(() => {
      fetchAndUpdateChart();
    }, 10000);

    return () => clearInterval(intervalId);
  }, [fetchAndUpdateChart]);

  return (
    <div
      ref={chartRef}
      className="px-0 mx-4 border-b-[#bdff00] border rounded"
      style={{ width: "100%", height: "400px" }}
    />
  );
};

export default ChartContainer;
