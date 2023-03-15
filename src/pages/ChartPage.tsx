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
interface ChartDataResponse {
  type: string;
  version: number;
  response: ChartData;
}

interface reformedChartData {
  bar: number;
  area: number;
  region: string;
  timestamp: string;
}

export default function ChartPage() {
  const [chartDatas, setChartDatas] = useState<reformedChartData[]>([]);

  const labels = chartDatas.map((data) => data.timestamp);

  const barDataset = {
    type: CHART_TYPE.bar,
    label: 'bar_value',
    data: chartDatas,
    yAxidID: 'bar',
    parsing: {
      xAxisKey: 'timestamp',
      yAxisKey: 'bar',
    },
    borderWidth: 2,
    borderColor: 'rgb(255, 99, 132)',
    backgroundColor: 'rgba(255, 99, 132, 0.5)',
  };

  const areaDataset = {
    type: CHART_TYPE.line,
    label: 'area_value',
    data: chartDatas,
    yAxisID: 'area',
    parsing: {
      xAxisKey: 'timestamp',
      yAxisKey: 'area',
    },
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
      intersect: true,
    },
    scales: {
      bar: {
        type: 'linear',
        display: true,
        position: 'left',
        title: {
          display: true,
          text: 'bar_value',
        },
      },
      area: {
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
          title: (context) => {
            const {
              dataset: { data },
              dataIndex,
            } = context[0];
            const { region } = data[dataIndex] as unknown as { region: string };

            return region;
          },
        },
      },
    },
  };

  useEffect(() => {
    async function fetchChartDatas() {
      const res = await fetch('/flexsys_mock_data.json');
      const { response } = (await res.json()) as ChartDataResponse;
      const chartDatas = Object.entries(response)
        .map(([key, { id, value_bar, value_area }]) => ({
          bar: value_bar,
          area: value_area,
          region: id,
          timestamp: key,
        }))
        .slice(0, 10);

      setChartDatas(chartDatas);
    }

    if (chartDatas.length === 0) fetchChartDatas();
  }, [chartDatas.length]);

  return (
    <>
      {chartDatas.length === 0 ? (
        <div>Loading...</div>
      ) : (
        <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
          <Chart type={CHART_TYPE.bar} data={data} options={options} />
        </div>
      )}
    </>
  );
}
