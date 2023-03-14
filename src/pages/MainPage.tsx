import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';

import data from '../data/mock_data.json';

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
);

type Value = {
  id: string;
  value_area: number;
  value_bar: number;
};

const dates: string[] = Object.keys(data.response);
const values: Value[] = Object.values(data.response);

const labels: string[] = dates.map((data) => data);

const datum = {
  labels,
  datasets: [
    {
      type: 'line' as const,
      label: 'Area',
      borderColor: 'rgb(255, 99, 132)',
      borderWidth: 2,
      fill: false,
      data: values.map((value) => value.value_area),
    },
    {
      type: 'bar' as const,
      label: 'Bar',
      backgroundColor: 'rgb(53, 162, 235)',
      data: values.map((value) => value.value_bar),
    },
  ],
};

const options = {
  layout: {
    padding: 20,
  },
};

export default function MainPage() {
  return <Chart type="bar" data={datum} options={options} />;
}
