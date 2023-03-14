import { useState } from 'react';

import { CategoryScale } from 'chart.js';
import Chart from 'chart.js/auto';

Chart.register(CategoryScale);

export default function useChartData() {
  const [chartData, setChartData] = useState<any>([]);

  const changeChartData = (_fetchdata: any) => {
    console.log('_fetchdata', _fetchdata);
    const values = Object.values(_fetchdata);
    const keys = Object.keys(_fetchdata);
    setChartData({
      labels: keys?.map((data: any) => data),
      datasets: [
        {
          type: 'line' as const,
          fill: true,
          label: 'value_area',
          yAxisID: 'y-left',
          data: values?.map((data: any) => data.value_area),
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
          borderWidth: 2,
        },
        {
          type: 'bar' as const,
          label: 'value_bar',
          yAxisID: 'y-right',
          backgroundColor: 'rgb(75, 192, 192)',
          data: values?.map((data: any) => data.value_bar),
        },
      ],
      options: {
        responsive: true,
        scales: {
          'y-left': {
            min: 0,
            max: 300,
            stepSize: 100,
            type: 'linear',
            position: 'left',
            title: {
              display: true,
              text: 'Y Axis Left',
            },
            grid: {
              display: false,
            },
          },
          'y-right': {
            type: 'linear',
            position: 'right',
            title: {
              display: true,
              text: 'Y Axis Right',
            },
            grid: {
              display: false,
            },
          },
        },
      },
    });
  };

  return [chartData, changeChartData];
}
