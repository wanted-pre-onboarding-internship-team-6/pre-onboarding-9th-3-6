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
  CoreScaleOptions,
} from 'chart.js';
import { Line, Bar, Chart } from 'react-chartjs-2';

import mockdata from 'mocks/mockdata.json';

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
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
);

const Home = () => {
  const Data = mockdata.response;
  const arrayOfData = [
    ...Object.keys(Data).map((el, i) => {
      const values = Object.values(Data);

      return {
        key: i,
        id: values[i].id,
        value_area: values[i].value_area,
        value_bar: values[i].value_bar,
        time: el,
      };
    }),
  ];

  const TimeArray = Object.keys(Data);
  const AreaArray = Object.values(Data).map((el) => el.value_area);
  const BarArray = Object.values(Data).map((el) => el.value_bar);

  const labels = TimeArray;

  const options = {
    responsive: true,
    interaction: {
      mode: 'index' as const,
      /** 포인트 가까이 가도 뜨게할지 */
      intersect: true,
    },
    stacked: false,
    plugins: {
      title: {
        display: true,
        text: 'Flexsys',
      },
    },
    scales: {
      AreaY: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        axis: 'y',
        title: {
          display: true as boolean,
          text: 'Area' as string,
        },
        /** y축의 길이를 정하는 콜백함수 */
        afterDataLimits: (scale): void => {
          scale.max = scale.max * 2.1;
        },
      },
      BarY: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        text: 'bar',
        title: {
          display: true as boolean,
          text: 'Bar' as string,
        },
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        type: 'line' as const,
        label: 'Area',
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.8)',
        borderWidth: 2,
        fill: true,
        data: arrayOfData.map((el) => el.value_area),
        // data: arrayOfData,
        yAxisID: 'AreaY',
        // parsing: {
        //   // xAxisKey: 'time',
        //   yAxisKey: 'value_area',
        // },
      },
      {
        type: 'bar' as const,
        label: 'Bar',
        borderColor: 'rgb(63, 49, 196)',
        backgroundColor: 'rgba(63, 49, 196, 0.1)',
        borderWidth: 2,
        fill: true,
        data: arrayOfData.map((el) => el.value_bar),
        // data: arrayOfData,
        yAxisID: 'BarY',
        // parsing: {
        //   // xAxisKey: 'time',
        //   yAxisKey: 'value_bar',
        // },
      },
    ],
  };

  return (
    <div>
      {/* <Line options={options} data={data} /> */}
      {/* <Bar data={data} options={options} /> */}
      <Chart type="bar" data={data} options={options} />
    </div>
  );
};

export default Home;
