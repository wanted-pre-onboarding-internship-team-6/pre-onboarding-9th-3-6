import { useEffect } from 'react';

import { useChartData } from '@/hooks';

import { AllChart } from '../components/index';

export default function Main() {
  const [chartData, changeChartData] = useChartData();

  async function fetchData() {
    const result = await fetch('../db.json');
    const { response } = await result.json();
    changeChartData(response);
  }

  useEffect(() => {
    if (!chartData.labels) fetchData();
  }, []);

  return (
    <>{chartData.labels ? <AllChart chartData={chartData} /> : <>loading</>} </>
  );
}
