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
import { useSearchParams } from 'react-router-dom';

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

function defineAxisRange(values: number[]) {
  const min = Math.floor(Math.min(...values) * 0.5);
  const max = Math.floor(Math.max(...values) * 1.5);

  return { min, max };
}

interface ChartData {
  [timestamp: string]: {
    id: string;
    value_bar: number;
    value_area: number;
  };
}

export default function ChartPage() {
  const [chartData, setChartData] = useState<ChartData[]>([]);

  const [searchParams, setSearchParams] = useSearchParams();

  const region = searchParams.get('id');

  const labels = Object.keys(chartData);
  const regionData = Object.values(chartData).map((data) => String(data.id));
  const barData = Object.values(chartData).map((data) => data.value_bar);
  const areaData = Object.values(chartData).map((data) => data.value_area);
  const areaDataNumbers = Object.values(chartData).map((data) =>
    Number(data.value_area),
  );

  const regionCategory = Array.from(new Set(regionData));

  const barBackground = regionData.map((id) =>
    region === null || id === region
      ? 'rgba(255, 99, 132, 0.5)'
      : 'rgb(255, 255, 255, 0.5)',
  );

  const barBorder = regionData.map((id) =>
    id === region || region === null
      ? 'rgb(255, 99, 132)'
      : 'rgb(255, 255, 255)',
  );

  const areaBackground = 'rgba(53, 162, 235, 0.5)';

  const areaBorder = regionData.map((id) =>
    region == null
      ? 'rgb(53, 162, 235)'
      : id === region
      ? 'rgb(36, 93, 216)'
      : 'rgba(53, 162, 235, 0.1)',
  );

  const barDataset = {
    type: CHART_TYPE.bar,
    label: 'bar_value',
    data: barData,
    yAxidID: 'y',
    borderWidth: 2,
    borderColor: barBorder,
    backgroundColor: barBackground,
  };

  const areaDataset = {
    type: CHART_TYPE.line,
    label: 'area_value',
    data: areaData,
    yAxisID: 'y1',
    borderWidth: 2,
    borderColor: areaBorder,
    backgroundColor: areaBackground,
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
        ...defineAxisRange(areaDataNumbers),
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          afterTitle: function (tooltip) {
            const index = tooltip[0].dataIndex;

            return `${regionData[index]}`;
          },
        },
      },
    },
    onClick(event, elements) {
      const index = elements[0].index;
      const id = regionData[index];
      setSearchParams(region !== id ? { id: id } : {});
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
          <div>
            {regionCategory.map((category) => (
              <button
                key={category}
                onClick={() =>
                  setSearchParams(region !== category ? { id: category } : {})
                }>
                {category}
              </button>
            ))}
          </div>
          <Chart type={CHART_TYPE.bar} data={data} options={options} />
        </div>
      )}
    </>
  );
}
