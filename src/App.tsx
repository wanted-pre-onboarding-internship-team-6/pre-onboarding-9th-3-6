import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  BarElement,
  LineController,
  BarController,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';

import datas from './data/mock_data_example-flexsys.json';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  LinearScale,
  CategoryScale,
  BarElement,
  LineController,
  BarController,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
);

export default function App() {
  const options = {
    responsive: true,
    interaction: {
      mode: 'top' as const,
      intersect: false,
    },
    stacked: false,
    plugins: {
      title: {
        display: true,
        text: '시계열',
      },
    },
    scales: {
      area_Y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        title: {
          display: true,
          text: 'Area',
        },
      },
      bar_Y: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        title: {
          display: true,
          text: 'Bar',
        },
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  const Data = datas.response;
  const value = Object.values(Data);
  const dataArray = [
    ...Object.keys(Data).map((el, i) => {
      return {
        key: i,
        id: value[i].id,
        areaValue: value[i].value_area,
        barValue: value[i].value_bar,
        time: el,
      };
    }),
  ];

  const timeLineArray = Object.keys(Data);
  const labels = timeLineArray;

  const data = {
    labels,
    datasets: [
      {
        type: 'line' as const,
        label: 'Area',
        fill: true,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        data: dataArray.map((el) => el.areaValue),
        yAxisID: 'area_Y',
      },
      {
        type: 'bar' as const,
        label: 'Bar',
        fill: true,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        data: dataArray.map((el) => el.barValue),
        yAxisID: 'bar_Y',
      },
    ],
  };

  return (
    <div>
      <Chart type="bar" options={options} data={data} />
    </div>
  );
}
