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

import { CHART_TYPE, COLOR_CODE } from '@/constants';
import { useChartDatas } from '@/hooks';
import { extractRegionFrom, makeChartColors } from '@/utils';

import * as S from './style';

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
  const { error, chartDatas } = useChartDatas();
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

  if (error) return <S.Message>{error.message}</S.Message>;

  return (
    <S.Container>
      <S.Header>
        <S.Title>시계열 차트</S.Title>
        <S.BtnBox>
          {regions.map((region) => (
            <S.Button key={region} onClick={() => setSearchParams({ region })}>
              {region}
            </S.Button>
          ))}
        </S.BtnBox>
      </S.Header>
      <S.ChartBox>
        <Chart type={CHART_TYPE.bar} data={data} options={options} />
      </S.ChartBox>
    </S.Container>
  );
}
