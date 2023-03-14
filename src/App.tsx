import { useEffect, useState } from 'react';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

import { DataProps } from './types';
import {
  API_URL,
  createAreaInfo,
  createBarInfo,
  createLabelInfo,
  options,
} from './utils';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Filler,
  Title,
  Tooltip,
  Legend,
);

export default function App() {
  const [chartData, setChartData] = useState({});
  const datas: [string, DataProps][] = Object.entries(chartData);

  const areaGroup = createAreaInfo(datas);
  const barGroup = createBarInfo(datas);
  const labels = createLabelInfo(datas);

  const data = {
    labels,
    datasets: [
      {
        fill: true,
        type: 'line',
        label: 'Area',
        data: areaGroup.map((area) => area.area),
        borderColor: 'rgb(26, 255, 171)',
        backgroundColor: 'rgba(26, 255, 171, 0.5)',
        yAxisID: 'y',
      },
      {
        type: 'bar',
        label: 'Bar',
        data: barGroup.map((bar) => bar.bar),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        yAxisID: 'y1',
      },
    ],
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(API_URL);
      const datas = await response.json();
      if (datas.response === undefined) return;
      setChartData(datas.response);
    };
    fetchData();
  }, []);

  return (
    <>
      <Line options={options} data={data} />
    </>
  );
}
