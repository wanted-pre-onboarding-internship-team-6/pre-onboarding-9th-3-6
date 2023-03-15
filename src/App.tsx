
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
import styled from 'styled-components';

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

function defineAxisRange(values: number[]) {
  const min = Math.floor(Math.min(...values) * 0.5);
  const max = Math.floor(Math.max(...values) * 1.5);

  return { min, max };
}

interface ChartData {
  [timestamp: string]: {
    id: string;
    value_bar: number;
    value_area: number;
  };
}
interface ButtonProps {
  isClicked: boolean;
}

export default function App() {
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const labels = Object.keys(chartData);
  const barData = Object.values(chartData).map((data) => data.value_bar);
  const areaData: any = Object.values(chartData).map((data) => data.value_area);
  const uniqueRegionData = [
    ...new Set(Object.values(chartData).map((data) => data.id)),
  ];
  const regionData = Object.values(chartData).map((data) => data.id);
  const selectedRegion: any = searchParams.get('region');
  const barDataset = {
    type: CHART_TYPE.bar,
    label: 'bar_value',
    data: barData,
    yAxidID: 'bar',
    borderWidth: 2,
    borderColor: regionData.map((data) =>
      data === selectedRegion ? '#00f83e' : 'rgba(255, 99, 132, 0.5)',
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
    borderColor: regionData.map((data) =>
      data === selectedRegion ? '#00f83e' : 'rgba(53, 162, 235, 0.5)',
    ),
    backgroundColor: regionData.map((data) =>
      data === selectedRegion ? '#00f83e' : 'rgba(53, 162, 235, 0.5)',
    ),
  };

  const datasets = [areaDataset, barDataset];

  const data = { labels, datasets };

  const options: ChartOptions = {
    onClick: handleChartClick,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      tooltip: {
        callbacks: {
          beforeTitle: (context) => {
            const dataKey: any = context[0].label;

            const id = chartData[dataKey]?.id;

            return `지역: ${id}`;
          },
        },
      },
    },
    scales: {
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
        ...defineAxisRange(areaData),
      },
    },
  };
  function handleChartClick(
    _chart: any,
    event: { index: any }[],
    _elements: any,
  ) {
    if (!event) return;

    const dataIndex = event[0].index;
    const dataId: any = Object.values(chartData).filter(
      (_, index) => index === dataIndex,
    )[0].id;
    setSearchParams({ region: dataId });
  }
  function handleButtonClick(e: { target: { innerHTML: any } }) {
    setSearchParams({ region: e.target.innerHTML });
  }
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
      <Filter>
        <Description>지역을 선택해주세요: </Description>
        <ButtonWrapper>
          {uniqueRegionData.map((region) => {
            return (
              <Button
                key={region}
                onClick={handleButtonClick}
                isClicked={region === selectedRegion}>
                {region}
              </Button>
            );
          })}
        </ButtonWrapper>
      </Filter>
      {chartData.length === 0 ? (
        <div>Loading...</div>
      ) : (
        <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
          <Chart type={CHART_TYPE.bar} data={data} options={options} />
        </div>
      )}
    </>
  );
}

const Button: any = styled.button<ButtonProps>`
  background-color: ${(props) => (props.isClicked ? ' #142e15' : ' #4caf50')};
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 12px;
  transition-duration: 0.4s;
  &:hover {
    background-color: #27702b;
  }
`;

const Description = styled.span`
  font-size: 18px;
  font-weight: bold;
`;

const ButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-evenly;
  flex-wrap: wrap;
`;

const Filter = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  margin: auto;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;
