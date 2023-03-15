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
import { ChartOptions } from 'chart.js';
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
  const Data = mockdata.response;
  const arrayOfData = Object.entries(Data).map(([key, value], i) => ({
    key: i,
    id: value.id,
    value_area: value.value_area,
    value_bar: value.value_bar,
    time: key,
  }));

  const TimeArray = Object.keys(Data);
  const AreaArray = Object.values(Data).map((el) => el.value_area);
  const BarArray = Object.values(Data).map((el) => el.value_bar);

  const labels = TimeArray;

  const options: ChartOptions = {
    responsive: true,
    interaction: {
      mode: 'index',
      /** 포인트 가까이 가도 뜨게할지 */
      intersect: true,
    },
    stacked: false,
    plugins: {
      title: {
        display: true,
        text: 'Flexsys',
      },
      tooltip: {
        backgroundColor: 'rgba(124, 35, 35, 0.4)',
        // 툴팁 색상
        padding: 10,
        // 툴팁 패딩
        bodySpacing: 5,
        // 툴팁 내부의 항목들 간 간격
        // bodyFont: {
        //   font: {
        //     // 툴팁 내용의 폰트 스타일
        //     family: "'Noto Sans KR', sans-serif",
        //   },
        // },
        usePointStyle: true,
        // 범례 도형 모양과 마찬가지로 툴팁 내부에서도 도형의 모양을 지정
        filter: (item) => item.parsed.y !== null,
        // 툴팁에 표시될 항목을 필터링
        // 예를 들어 값이 null인 항목은 툴팁에 나타나지 않게 하려면
        // 위와 같이 설정해주시면 됩니다.
        callbacks: {
          // 툴팁에 표시되는 내용은 이와 같이 콜백 함수를 통해
          // 조건에 맞게 수정할 수 있습니다!
          title: (context) => {
            // 툴팁에서 x축 값이 어떻게 표시될지 설정할 수 있어요.
            let title = '';
            console.log(context);
            // (context를 콘솔에 찍어보시면 차트에 전달되는 dataset과
            // 그 값들을 확인할 수 있는데요, 이를 바탕으로 조건을 구성하고
            // 그 조건에 따라 title을 재설정해주시면 됩니다.)

            return title; // 재설정한 title은 꼭 반환해주세요!
          },
          // label: (context) => {
          //   // 툴팁에서 y축 값
          //   let label = context.dataset.label + '' || '';

          //   const isPrice = label === '주가';
          //   const isEV = label === 'EV';

          //   if (label) {
          //     label = isPrice ? ' 주가 : ' : ' ' + label + ' : ';
          //   }
          //   if (context.parsed.y !== null) {
          //     // y축 값이 null이 아니라면,
          //     // 조건에 따라 label 재할당
          //   } else {
          //     // y축 값이 null이라면
          //     return null; // null 반환
          //   }

          //   return label; // 마찬가지로 재설정한 label도 꼭 반환해주세요!
          // },
        },
      },
    },
    scales: {
      AreaY: {
        type: 'linear',
        display: true,
        position: 'left',
        axis: 'y',
        title: {
          display: true,
          text: 'Area',
        },
        /** y축의 길이를 정하는 콜백함수 */
        afterDataLimits: (scale): void => {
          scale.max = scale.max * 2.1;
        },
        parsing: {
          xAxisKey: 'time',
          yAxisKey: 'value_area',
        },
      },
      BarY: {
        type: 'linear',
        display: true,
        position: 'right',
        text: 'bar',
        title: {
          display: true,
          text: 'Bar',
        },
        grid: {
          drawOnChartArea: false,
        },
        parsing: {
          xAxisKey: 'time',
          yAxisKey: 'value_bar',
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
        data: arrayOfData,
        yAxisID: 'AreaY',
      },
      {
        type: 'bar' as const,
        label: 'Bar',
        borderColor: 'rgb(63, 49, 196)',
        backgroundColor: 'rgba(63, 49, 196, 0.1)',
        borderWidth: 2,
        fill: true,
        data: arrayOfData,
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
