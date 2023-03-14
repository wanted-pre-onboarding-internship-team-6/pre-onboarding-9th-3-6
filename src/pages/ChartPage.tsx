import { useEffect, useState } from 'react';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  ChartOptions,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
);

interface chartList {
  type: string;
  version: number;
  response: {
    [timestamp: string]: {
      id: string;
      value_area: number;
      value_bar: number;
    };
  };
}

export default function ChartPage() {
  const [charts, setCharts] = useState<chartList>({
    type: '',
    version: 0,
    response: {},
  });

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('./chart_list.json');
      const data = await response.json();
      setCharts(data);
    }

    fetchData();
  }, []);

  const data = {
    labels: Object.keys(charts.response),
    datasets: [
      {
        type: 'line' as const,
        fill: true,
        label: 'Area',
        data: Object.keys(charts.response).map(
          (e) => charts.response[e].value_area,
        ),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132,0.5)',
        yAxisID: 'areaY',
      },
      {
        type: 'bar' as const,
        label: 'Bar',
        data: Object.keys(charts.response).map(
          (e) => charts.response[e].value_bar,
        ),
        backgroundColor: 'rgb(75, 192, 192)',
        yAxisID: 'barY',
      },
    ],
  };

  const options: ChartOptions = {
    responsive: true,
    scales: {
      areaY: {
        max: 200,
        position: 'left',
        title: {
          display: true,
          text: 'Area',
        },
      },
      barY: {
        position: 'right',
        title: {
          display: true,
          text: 'Bar',
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: `${charts.type} v${charts.version}`,
      },
    },
  };

  return (
    <div>
      <Chart type="bar" data={data} options={options} />
    </div>
  );
}
