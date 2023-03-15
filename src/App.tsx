import { useEffect, useState } from 'react';

import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Filler,
  Legend,
  Tooltip,
  LineController,
  BarController,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';

import { CHART_TYPE } from '@/constants';

import type { ChartOptions } from 'chart.js';

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
  Filler,
);

// function defineAxisRange(values) {
//   const min = Math.floor(Math.min(...values) * 0.5);
//   const max = Math.floor(Math.max(...values) * 1.5);

//   return { min, max };
// }

interface ChartData {
  [timestamp: string]: {
    id: string;
    value_bar: number;
    value_area: number;
  };
}

export default function App() {
  const [chartData, setChartData] = useState<ChartData[]>([]);

  const labels = Object.keys(chartData);
  const idData = Object.values(chartData).map((data) => data.id);
  const barData = Object.values(chartData).map((data) => data.value_bar);
  const areaData = Object.values(chartData).map((data) => data.value_area);

  const barDataset = {
    type: CHART_TYPE.bar,
    label: 'bar_value',
    data: barData,
    yAxidID: 'y',
    borderWidth: 2,
    borderColor: 'rgb(255, 99, 132)',
    backgroundColor: 'rgba(255, 99, 132, 0.5)',
  };

  const areaDataset = {
    type: CHART_TYPE.line,
    label: 'area_value',
    data: areaData,
    yAxisID: 'y1',
    borderWidth: 2,
    borderColor: 'rgb(53, 162, 235)',
    backgroundColor: 'rgba(53, 162, 235, 0.5)',
    fill: true,
  };

  const datasets = [areaDataset, barDataset];

  const data = { labels, datasets };

  const options: ChartOptions = {
    interaction: {
      mode: 'index',
      intersect: false,
    },
    scales: {
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        title: {
          display: true,
          text: 'bar_value',
        },
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        title: {
          display: true,
          text: 'area_value',
        },
        // ...defineAxisRange(areaData),
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          afterTitle: function (tooltip) {
            const index = tooltip[0].dataIndex;

            return `${idData[index]}`;
          },
        },
      },
    },
  };

  useEffect(() => {
    async function fetchChartData() {
      const response = await fetch('/flexsys_mock_data.json');
      const data = await response.json();

      Object.entries(data).map(([key, value]) => ({ [key]: value }));
      setChartData(data.response);
    }

    if (chartData.length === 0) fetchChartData();
  }, [chartData.length]);

  return (
    <>
      {chartData.length === 0 ? (
        <div>Loading...</div>
      ) : (
        <div style={{ position: 'relative', width: '80vw', height: '80vh' }}>
          <Chart type={CHART_TYPE.bar} data={data} options={options} />
        </div>
      )}
    </>
  );
}
