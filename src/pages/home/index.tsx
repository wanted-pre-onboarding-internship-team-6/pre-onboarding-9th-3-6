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
  ChartTypeRegistry,
} from 'chart.js';
import { ChartOptions, ChartData, TooltipItem } from 'chart.js';
import { Chart } from 'react-chartjs-2';

import mockdata from 'mocks/mockdata.json';

ChartJS.register(
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Filler,
  Legend,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  LineController,
  BarController,
);

const Home = () => {
  const response = mockdata.response;
  const arrayOfData = Object.entries(response).map(([key, value], i) => ({
    key: i,
    id: value.id,
    value_area: value.value_area,
    value_bar: value.value_bar,
    time: key,
  }));

  const TimeArray = Object.keys(response);
  const AreaArray = arrayOfData.map((el) => el.value_area);
  const BarArray = arrayOfData.map((el) => el.value_bar);

  const labels = TimeArray;

  const afterTitle = (tooltipItems: TooltipItem<keyof ChartTypeRegistry>[]) => {
    const index = tooltipItems[0].dataIndex;
    const id = arrayOfData[index].id;

    return `ID: ${id}`;
  };

  const options: ChartOptions = {
    responsive: true,

    interaction: {
      mode: 'index',
      /** 포인트 가까이 가도 뜨게할지 */
      intersect: true,
    },

    // stacked: false,

    plugins: {
      title: {
        display: true,
        text: 'Flexsys',
      },
      legend: {
        position: 'bottom',
      },
      tooltip: {
        backgroundColor: 'rgba(124, 35, 35, 0.4)',
        // 툴팁 색상
        padding: 10,
        // 툴팁 패딩
        bodySpacing: 5,
        // 툴팁 내부의 항목들 간 간격

        usePointStyle: true,
        // 범례 도형 모양과 마찬가지로 툴팁 내부에서도 도형의 모양을 지정

        callbacks: {
          afterTitle: afterTitle,
        },
      },
    },

    scales: {
      AreaY: {
        type: 'linear',
        display: true,
        position: 'left',
        title: {
          display: true,
          text: 'Area',
        },
        /** y축의 길이를 정하는 콜백함수 */
        afterDataLimits: (scale): void => {
          scale.max = scale.max * 2.1;
        },
      },
      BarY: {
        type: 'linear',
        display: true,
        position: 'right',
        title: {
          display: true,
          text: 'Bar',
        },
        /**
         * If true, draw lines on the chart area inside the axis lines.
         * This is useful when there are multiple axes and you need to control which grid lines are drawn.
         */
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  const data: ChartData = {
    labels,
    datasets: [
      {
        type: 'line' as const,
        label: 'Area',
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.8)',
        borderWidth: 2,
        fill: true,
        data: AreaArray,
        yAxisID: 'AreaY',
      },
      {
        type: 'bar' as const,
        label: 'Bar',
        borderColor: 'rgb(63, 49, 196)',
        backgroundColor: 'rgba(63, 49, 196, 0.1)',
        borderWidth: 2,
        data: BarArray,
        yAxisID: 'BarY',
      },
    ],
  };

  return (
    <div>
      <Chart type="bar" data={data} options={options} />
    </div>
  );
};

export default Home;
