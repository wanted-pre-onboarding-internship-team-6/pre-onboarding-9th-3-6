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

export default function MainPage() {
  const [chartData, setChartData] = useState<ChartData>({});
  const [searchParams, setSearchParams] = useSearchParams();
  const checkedRegion = searchParams.getAll('region');

  const labels = Object.keys(chartData); //Object.keys(chartData); Object.entries(chartData).map(([key, value]) => key + value.id,);
  const regionData = [
    ...new Set(Object.values(chartData).map((data) => data.id)),
  ];
  const barData = Object.values(chartData).map((data) => data.value_bar);
  const areaData = Object.values(chartData).map((data) => data.value_area);

  const barDataset = {
    type: CHART_TYPE.bar,
    label: 'bar_value',
    data: barData,
    yAxidID: 'y',
    borderWidth: 2,
    borderColor: Object.values(chartData).map((value) =>
      checkedRegion.includes(value.id) ? '#bef800' : 'rgb(255, 99, 132)',
    ),
    backgroundColor: Object.values(chartData).map((value) =>
      checkedRegion.includes(value.id) ? '#bef800' : 'rgba(255, 99, 132, 0.5)',
    ),
  };

  const areaDataset = {
    type: CHART_TYPE.line,
    label: 'area_value',
    data: areaData,
    yAxisID: 'y1',
    borderWidth: 2,
    // borderColor: Object.values(chartData).map((value) =>
    //   checkedRegion.includes(value.id) ? '#bef800' : 'rgb(53, 162, 235)',
    // ),
    backgroundColor: Object.values(chartData).map((value) =>
      checkedRegion.includes(value.id) ? '#bef800' : 'rgb(53, 162, 235, 0.5)',
    ),

    // fill: true,
  };

  const datasets = [areaDataset, barDataset];

  const data = { labels, datasets };

  const options: ChartOptions = {
    onClick: (event, legendItem, legend) => {
      const checked = legend.tooltip?.title[0];
      addParams(checked || '');
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
    interaction: {
      intersect: false,
      mode: 'index',
    },
    plugins: {
      tooltip: {
        callbacks: {
          title: (tooltipItems) => chartData[tooltipItems[0].label].id,
        },
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

    // if (chartData.length === 0) fetchChartData();
    if (labels.length === 0) fetchChartData();
  }, [labels.length]); //chartData.length

  const addParams = (region: string) => {
    if (!searchParams.getAll('region').includes(region)) {
      searchParams.append('region', region);
      setSearchParams(searchParams);
    }
  };

  const deleteParams = (region: string) => {
    if (searchParams.getAll('region').includes(region)) {
      const allParams = searchParams.getAll('region');
      allParams.splice(allParams.indexOf(region), 1);
      searchParams.delete('region');
      allParams.forEach((item) => {
        searchParams.append('region', item);
      });
      setSearchParams(searchParams);
    }
  };

  return (
    <>
      <div>
        {regionData?.map((region) => {
          return (
            <div key={region}>
              <input
                type="checkbox"
                id="scales"
                name={region}
                onChange={(e) => {
                  e.target.checked ? addParams(region) : deleteParams(region);
                }}
                checked={checkedRegion.includes(region)}
              />
              <label htmlFor={region}>{region}</label>
            </div>
          );
        })}
      </div>
      {labels.length === 0 ? (
        <div>Loading...</div>
      ) : (
        <div style={{ position: 'relative', width: '200%' }}>
          <Chart type={CHART_TYPE.bar} data={data} options={options} />
        </div>
      )}
    </>
  );
}
