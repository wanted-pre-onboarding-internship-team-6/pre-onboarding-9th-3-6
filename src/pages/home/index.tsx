import { useState } from 'react';

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

// interface dataType {
//   key: number;
//   id: '강남구' | '중랑구' | ' 노원구' | '성북구';
//   value_area: number;
//   value_bar: number;
//   time: string;
// }

const Home = () => {
  const response = mockdata.response;
  const arrayOfData = Object.entries(response).map(([key, value], i) => ({
    key: i,
    id: value.id,
    value_area: value.value_area,
    value_bar: value.value_bar,
    time: key,
  }));

  const regionData = [...new Set(Object.values(response).map((el) => el.id))];

  const TimeArray = Object.keys(response);
  const AreaArray = arrayOfData.map((el) => el.value_area);
  const BarArray = arrayOfData.map((el) => el.value_bar);

  const labels = TimeArray;

  const selectList = ['전체', '강남구', '노원구', '성북구', '중랑구'];
  const [selected, setSelected] = useState('전체');
  /**
   * tooltip 에 id 값을 출력하는 함수
   */
  const afterTitle = (tooltipItems: TooltipItem<keyof ChartTypeRegistry>[]) => {
    const index = tooltipItems[0].dataIndex;
    const id = arrayOfData[index].id;

    return `ID: ${id}`;
  };

  /**
   * selected 에 따라 하이라이트 해주는 함수
   */
  // function colorize(elements: 'bar' | 'line') {
  //   if (elements === 'bar') {
  //     return (ctx: any) => {
  //       console.log('bar ctx: ', ctx);
  //       const xIndex = ctx.parsed.x;
  //       const c = filteredData().includes(xIndex) ? '#F46300' : '#44DE28';

  //       return c;
  //     };
  //   }
  //   if (elements === 'line') {
  //     return (ctx: any) => {
  //       console.log('line ctx: ', ctx);
  //       const xIndex = ctx.parsed.x;
  //       const c = filteredData().includes(xIndex) ? '#320cf0' : '#7177d8';

  //       return c;
  //     };
  //   }
  // }

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

    // elements: {
    //   bar: {
    //     backgroundColor: colorize('bar'),
    //     borderColor: colorize('bar'),
    //     borderWidth: 2,
    //   },
    //   line: {
    //     backgroundColor: colorize('line'),
    //     borderColor: colorize('line'),
    //     borderWidth: 2,
    //     fill: true,
    //   },
    // },

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
          drawOnChartArea: true,
        },
      },
    },
  };

  const data: ChartData = {
    labels,
    datasets: [
      {
        type: 'line',
        label: 'Area',
        borderColor: arrayOfData.map((data) => {
          console.log(data);
          console.log(data.id === selected);

          return data.id === selected ? '#00f83e' : 'rgba(255, 99, 132, 0.5)';
        }),
        backgroundColor: arrayOfData.map((data) =>
          data.id === selected ? '#00f83e' : 'rgba(255, 99, 132, 0.5)',
        ),
        // borderColor: 'rgb(255, 99, 132)',
        // backgroundColor: 'rgba(255, 99, 132, 0.8)',
        borderWidth: 2,
        fill: true,
        data: AreaArray,
        yAxisID: 'AreaY',
        pointRadius: 0,
      },
      {
        type: 'bar',
        label: 'Bar',
        borderColor: 'rgb(63, 49, 196)',
        backgroundColor: 'rgba(63, 49, 196, 0.1)',
        borderWidth: 2,
        data: BarArray,
        yAxisID: 'BarY',
      },
    ],
  };

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const place = e.target.value;
    setSelected(place);
  };

  /**
   * filter 후 index 로만 이루어진 배열
   */
  // const filteredData = () => {
  //   const filteredDataIndex = arrayOfData
  //     .filter((data) => data.id === selected)
  //     .map((el) => el.key);

  //   return filteredDataIndex;
  // };

  return (
    <div>
      <Chart type="bar" data={data} options={options} />
      <select onChange={handleSelect} value={selected}>
        {selectList.map((place) => (
          <option value={place} key={place}>
            {place}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Home;
