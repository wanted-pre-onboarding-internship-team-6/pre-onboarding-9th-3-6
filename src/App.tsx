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
import { ChartOptions } from '@/types';

import mockData from './flexys_mock_data.json';

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

export default function App() {
  const { response } = mockData;

  const labels = Object.keys(response);
  const barData = Object.values(response).map((data) => data.value_bar);
  const areaData = Object.values(response).map((data) => data.value_area);

  const barDataset = {
    type: CHART_TYPE.bar,
    label: 'bar_value',
    data: barData,
    yAxidID: 'bar',
    borderWidth: 2,
    borderColor: 'rgb(255, 99, 132)',
    backgroundColor: 'rgba(255, 99, 132, 0.5)',
  };

  const areaDataset = {
    type: CHART_TYPE.line,
    label: 'area_value',
    data: areaData,
    yAxisID: 'area',
    borderWidth: 2,
    borderColor: 'rgb(53, 162, 235)',
    backgroundColor: 'rgba(53, 162, 235, 0.5)',
    fill: true,
  };

  const datasets = [areaDataset, barDataset];

  const data = { labels, datasets };

  const options: ChartOptions = {
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
        ...defineAxisRange(areaData),
      },
    },
  };

  return <Chart type={CHART_TYPE.bar} data={data} options={options} />;
}
