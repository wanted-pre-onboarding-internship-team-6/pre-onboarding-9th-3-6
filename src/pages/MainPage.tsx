import { useEffect } from 'react';

import { useChartData } from '@/hooks';

import { LineChart } from '../components/index';

export default function Main() {
  const [chartData, changeChartData] = useChartData();

  useEffect(() => {
    async function fetchData() {
      const result = await fetch('../db.json');
      const { response } = await result.json();
      console.log('data', typeof response, response);
      changeChartData(response);
    }
    fetchData();

    // if (!chartData.length) fetchData();
  }, [changeChartData]);

  return (
    <>
      {chartData.labels ? <LineChart chartData={chartData} /> : <>loading</>}{' '}
    </>
  );
}
