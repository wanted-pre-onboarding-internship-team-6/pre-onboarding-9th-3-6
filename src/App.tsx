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
import { useSearchParams } from 'react-router-dom';

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

// function defineAxisRange(values) {
//   const min = Math.floor(Math.min(...values) * 0.5);
//   const max = Math.floor(Math.max(...values) * 1.5);

//   return { min, max };
// }

interface ChartData {
  [timestamp: string]: {
    id: string;
    value_bar: number;
    value_area: number;
  };
}

export default function App() {
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const labels = Object.keys(chartData);
  const barData = Object.values(chartData).map((data) => data.value_bar);
  const areaData = Object.values(chartData).map((data) => data.value_area);
  const regionData = Object.values(chartData).map((data) => data.id);
  const sortedRegionData = [
    ...new Set(Object.values(chartData).map((data) => data.id)),
  ];
  const selectedRegion: any = searchParams.get('region');
 
  const barDataset = {
    type: CHART_TYPE.bar,
    label: 'bar_value',
    data: barData,
    yAxidID: 'bar',
    borderWidth: 2,
    // borderColor: 'rgb(255, 99, 132)',
    // backgroundColor: 'rgba(255, 99, 132, 0.5)',
    borderColor: regionData.map((data) =>
      data === selectedRegion ? '#00f83e' : 'rgb(255, 99, 132)',
    ),
    backgroundColor: regionData.map((data) =>
      data === selectedRegion ? '#00f83e' : 'rgba(255, 99, 132, 0.5)',
    ),
  };
  const areaDataset = {
    type: CHART_TYPE.line,
    label: 'area_value',
    data: areaData,
    yAxisID: 'area',
    borderWidth: 2,
    // borderColor: 'rgb(53, 162, 235)',
    // backgroundColor: 'rgba(53, 162, 235, 0.5)',
    fill: true,
    borderColor: regionData.map((data) =>
    data === selectedRegion ? '#00f83e' : 'rgb(53, 162, 235)',
  ),
    backgroundColor: regionData.map((data) =>
    data === selectedRegion ? '#00f83e' : 'rgba(53, 162, 235, 0.5)',
  ),
  };

  const datasets = [areaDataset, barDataset];

  const data = { labels, datasets };


  const options: ChartOptions = {
  
     plugins: {
      tooltip: {
        callbacks: {
          beforeTitle: (context) => {
            const dataKey : any = context[0].label;

            const id = chartData[dataKey]?.id;

            return `지역: ${id}`;
          },
        },
      },
    },scales: {
      bar: {
        type: 'linear',
        display: true,
        position: 'left',
        title: {
          display: true,
          text: 'bar_value',
        },
      },
      area: {
        type: 'linear',
        display: true,
        position: 'right',
        title: {
          display: true,
          text: 'area_value',
        },
        // ...defineAxisRange(areaData),
      },  
    },
  };

  useEffect(() => {
    async function fetchChartData() {
      const response = await fetch('/flexsys_mock_data.json');
      const data = await response.json();

      Object.entries(data).map(([key, value]) => ({ [key]: value }));
      setChartData(data.response);
    }

    if (chartData.length === 0) fetchChartData();
  }, [chartData.length]);

  return (
    <>
    <h2>지역을 선택해주세요:</h2>
     <div className='buttonContainer'>
     {sortedRegionData.map((region) => {
            return (
              <button
              key={region.id}
              >
                {region}
              </button>
            );
          })}
    </div>
      {chartData.length === 0 ? (
        <div>Loading...</div>
      ) : (
        <div style={{ position: 'relative', width: '80vw', height: '40vh' }}>
          <Chart type={CHART_TYPE.bar} data={data} options={options} />
        </div>
      )}
    </>
  );
}
