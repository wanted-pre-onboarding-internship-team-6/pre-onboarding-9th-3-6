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
          fill: true,
          label: 'Area ',
          data: values?.map((data: any) => data.value_area),
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
          borderWidth: 2,
        },
      ],
    });
  };

  return [chartData, changeChartData];
}
