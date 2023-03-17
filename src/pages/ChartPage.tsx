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
import styled from 'styled-components';

import { CHART_TYPE, COLOR_CODE } from '@/constants';
import { useChartDatas } from '@/hooks';
import { extractRegionFrom, makeChartColors } from '@/utils';

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

export default function ChartPage() {
  const { isLoading, chartDatas, error } = useChartDatas();
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedRegion = searchParams.get('region');

  const labels = chartDatas.map((data) => data.timestamp);

  const regions = [...new Set(chartDatas.map((data) => data.region))];

  const barColors = makeChartColors('bar', chartDatas, selectedRegion);
  const areaColors = makeChartColors('area', chartDatas, selectedRegion);

  const barDataset = {
    type: CHART_TYPE.bar,
    label: 'bar_value',
    data: chartDatas,
    yAxidID: 'y',
    parsing: {
      xAxisKey: 'timestamp',
      yAxisKey: 'bar',
    },
    borderWidth: 2,
    borderColor: barColors,
    backgroundColor: barColors,
  };

  const areaDataset = {
    type: CHART_TYPE.line,
    label: 'area_value',
    data: chartDatas,
    yAxisID: 'y1',
    parsing: {
      xAxisKey: 'timestamp',
      yAxisKey: 'area',
    },
    borderWidth: 1,
    borderColor: COLOR_CODE.blue,
    backgroundColor: COLOR_CODE.blue,
    pointBorderColor: areaColors,
    pointHoverBorderColor: areaColors,
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
      y: {
        type: 'linear',
        position: 'left',
        title: {
          display: true,
          text: 'bar_value',
        },
      },
      y1: {
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
    onClick: (_, elements) => {
      if (elements.length === 0) return;
      const region = extractRegionFrom(elements, chartDatas);
      setSearchParams({ region });
    },
    plugins: {
      tooltip: {
        callbacks: {
          title: (context) => extractRegionFrom(context, chartDatas),
        },
      },
    },
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>error</div>;

  return (
    <>
      {regions.map((region) => (
        <Button key={region} onClick={() => setSearchParams({ region })}>
          {region}
        </Button>
      ))}
      <Title>시계열 차트</Title>
      <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
        <Chart type={CHART_TYPE.bar} data={data} options={options} />
      </div>
    </>
  );
}

const Button = styled.button`
  width: 100px;
  height: 30px;
  margin-right: 2px;
  background-color: green;
  color: white;
  font-size: 18px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
`;

const Title = styled.h3`
  position: absolute;
  display: inline;
  top: -10px;
  left: 45%;
`;
