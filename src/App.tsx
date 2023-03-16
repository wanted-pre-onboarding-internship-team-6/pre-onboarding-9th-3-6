import { useEffect, useState } from 'react';

import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Filler,
  Legend,
  Tooltip,
  LineController,
  BarController,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';

import { CHART_TYPE } from '@/constants';

import type { ChartOptions } from 'chart.js';

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
  Filler,
);

interface ChartData {
  [timestamp: string]: {
    id: string;
    value_bar: number;
    value_area: number;
  };
}

export default function App() {
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [regions, setRegions] = useState('');

  const newDatas = Object.entries(chartData).map((newData: any) => {
    const groupInfo = newData[1];
    const time = newData[0];
    const results = { ...groupInfo, time };

    return results;
  });

  // const filteredDatas = newDatas.filter((data) => data.id === regions);
  const filteredRegions = [...new Set(newDatas.map((data) => data.id))];

  const labels = Object.keys(chartData);
  const barData = Object.values(chartData).map((data) => data.value_bar);
  const areaData = Object.values(chartData).map((data) => data.value_area);

  const idAndTimeData = Object.entries(chartData).map((data) => {
    const idGroup = data[1].id;
    const timeGroup = data[0];

    return { id: idGroup, time: timeGroup };
  });

  const barDataset = {
    type: CHART_TYPE.bar,
    label: 'bar_value',
    data: barData,
    yAxidID: 'y',
    borderWidth: 2,
    borderColor: 'rgb(255, 99, 132)',
    backgroundColor: 'rgba(255, 99, 132, 0.5)',
  };

  const areaDataset = {
    type: CHART_TYPE.line,
    label: 'area_value',
    data: areaData,
    yAxisID: 'y1',
    borderWidth: 2,
    borderColor: 'rgb(53, 162, 235)',
    backgroundColor: 'rgba(53, 162, 235, 0.5)',
    fill: true,
  };

  const datasets = [areaDataset, barDataset];
  const data = { labels: labels, datasets };
  const options: ChartOptions = {
    interaction: {
      mode: 'index',
      intersect: true,
    },

    scales: {
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        title: {
          display: true,
          text: 'bar_value',
        },
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',

        title: {
          display: true,
          text: 'area_value',
        },
      },
    },

    onClick: function (e: any) {
      setRegions(e?.chart.tooltip.footer[0]);
      e.chart.tooltip.dataPoints[0].dataset.borderColor = 'rgb(95, 255, 84)';
      e.chart.update();
    },
    plugins: {
      tooltip: {
        enabled: true,
        callbacks: {
          footer: (context) => {
            const labels = idAndTimeData.find(
              (sub) => sub.time === context[0].label,
            );
            return labels.id;
          },
        },
      },
    },
  };

  useEffect(() => {
    async function fetchChartData() {
      const response = await fetch('/flexsys_mock_data.json');
      const data = await response.json();
      setChartData(data.response);
    }
    if (chartData.length === 0) fetchChartData();
  }, [chartData.length]);

  return (
    <>
      {chartData.length === 0 ? (
        <div>Loading...</div>
      ) : (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)',
            width: '80vw',
            height: '80vh',
          }}>
          {filteredRegions.map((data, index) => (
            <span key={index}>
              <button>{data}</button>
            </span>
          ))}
          <Chart type={CHART_TYPE.bar} data={data} options={options} />
        </div>
      )}
    </>
  );
}
