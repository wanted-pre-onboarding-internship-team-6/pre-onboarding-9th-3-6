import { CategoryScale } from 'chart.js';
import Chart, { ChartData, ChartOptions } from 'chart.js/auto';
import { Line } from 'react-chartjs-2';

import mockData from 'data.json';

Chart.register(CategoryScale);

export default function ClockChart() {
  const chartData: ChartData<any> = {
    labels: Object.keys(mockData),
    datasets: [
      {
        label: 'Area',
        data: Object.values(mockData).map((item) => item.value_area),
        fill: true,
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        yAxisID: 'Area-y-axis',
        type: 'line',
      },
      {
        label: 'Bar',
        data: Object.values(mockData).map((item) => item.value_bar),
        type: 'bar',
        borderColor: '#fb1849',
        backgroundColor: 'rgba(255, 102, 135, 0.2)',
        borderWidth: 1,
        yAxisID: 'Bar-y-axis',
      },
    ],
  };

  const chartOptions: ChartOptions<any> = {
    scales: {
      'Area-y-axis': {
        min: 0,
        max: 150,
        stepSize: 100,
        type: 'linear',
        position: 'left',
        title: {
          display: true,
          text: 'Area',
        },
      },
      'Bar-y-axis': {
        type: 'linear',
        position: 'right',
        title: {
          display: true,
          text: 'Bar',
        },
      },
    },
  };

  return (
    <div>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
}
