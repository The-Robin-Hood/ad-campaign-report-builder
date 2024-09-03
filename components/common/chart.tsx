import React, { useRef, useEffect } from "react";
import { Chart, ChartTypeRegistry, registerables, ChartDataset } from "chart.js";

Chart.register(...registerables);

interface Dataset {
  label: string;
  data: { date: string; value: number }[];
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: number;
  fill?: boolean;
  tension?: number;
}

interface DynamicChartProps {
  datasets: Dataset[];
  chartType?: keyof ChartTypeRegistry;
}

const DynamicChart: React.FC<DynamicChartProps> = ({
  datasets,
  chartType = "line",
}) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      const chartInstance = new Chart(chartRef.current, {
        type: chartType,
        data: {
          // Extracting unique dates from all datasets to use as labels
          labels: Array.from(
            new Set(
              datasets.flatMap((dataset) =>
                dataset.data.map((entry) =>
                  new Date(entry.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })
                )
              )
            )
          ),
          datasets: datasets.map((dataset) => ({
            label: dataset.label,
            data: dataset.data.map((entry) => entry.value),
            backgroundColor: dataset.backgroundColor || "rgba(75, 192, 192, 0.2)",
            borderColor: dataset.borderColor || "rgba(75, 192, 192, 1)",
            borderWidth: dataset.borderWidth || 1,
            fill: dataset.fill !== undefined ? dataset.fill : true,
            tension: dataset.tension || 0.4,
        })) as ChartDataset<keyof ChartTypeRegistry>[], 
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              title: {
                display: true,
                text: "Date",
              },
            },
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: "Value",
              },
            },
          },
        },
      });

      return () => {
        chartInstance.destroy();
      };
    }
  }, [datasets, chartType]);

  return <canvas ref={chartRef} height={300} />;
};

export default DynamicChart;
