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
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedRegion = searchParams.get('region');

  const labels = chartDatas.map((data) => data.timestamp);

  const regions = [...new Set(chartDatas.map((data) => data.region))];

  function paintColor(data: any) {
    return data.raw.region === selectedRegion
      ? 'rgb(255, 52, 96)'
      : 'rgba(255, 52, 96, 0.4)';
  }

  const barDataset = {
    type: CHART_TYPE.bar,
    label: 'bar_value',
    data: chartDatas,
    yAxidID: 'y-bar',
    parsing: {
      xAxisKey: 'timestamp',
      yAxisKey: 'bar',
    },
    borderWidth: 2,
    borderColor: paintColor,
    backgroundColor: paintColor,
  };

  const areaDataset = {
    type: CHART_TYPE.line,
    label: 'area_value',
    data: chartDatas,
    yAxisID: 'y-area',
    parsing: {
      xAxisKey: 'timestamp',
      yAxisKey: 'area',
    },
    pointBorderWidth: (data: any) =>
      data.raw.region === selectedRegion ? 5 : 1,
    pointBorderColor: (data: any) =>
      data.raw.region === selectedRegion
        ? 'rgb(53, 162, 235, 1)'
        : 'rgba(53, 162, 235, 0.4)',
    pointHoverBorderWidth: (data: any) =>
      data.raw.region === selectedRegion ? 5 : 1,
    pointHoverBorderColor: (data: any) =>
      data.raw.region === selectedRegion
        ? 'rgb(53, 162, 235, 1)'
        : 'rgba(53, 162, 235, 0.4)',
    borderWidth: 1,
    borderColor: 'rgb(53, 162, 235, 0.4)',
    backgroundColor: 'rgba(53, 162, 235, 0.4)',
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
      ['y-bar']: {
        type: 'linear',
        position: 'left',
        title: {
          display: true,
          text: 'bar_value',
        },
      },
      ['y-area']: {
        type: 'linear',
        position: 'right',
        title: {
          display: true,
          text: 'area_value',
        },
        min: 0,
        max: 200,
      },
    },
    onClick(_, elements) {
      if (elements.length === 0) return;
      const region = chartDatas[elements[0].index].region;
      setSearchParams({ region });
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
      const chartDatas = Object.entries(response).map(
        ([key, { id, value_bar, value_area }]) => ({
          bar: value_bar,
          area: value_area,
          region: id,
          timestamp: key,
        }),
      );

      setChartDatas(chartDatas);
    }

    if (chartDatas.length === 0) fetchChartDatas();
  }, [chartDatas.length]);

  return (
    <>
      {chartDatas.length === 0 ? (
        <div>Loading...</div>
      ) : (
        <>
          {regions.map((region) => (
            <button key={region} onClick={() => setSearchParams({ region })}>
              {region}
            </button>
          ))}
          <div
            style={{ position: 'relative', width: '100vw', height: '100vh' }}>
            <Chart type={CHART_TYPE.bar} data={data} options={options} />
          </div>
        </>
      )}
    </>
  );
}
