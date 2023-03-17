import { useEffect, useState } from 'react';

import { reformChartData } from '@/utils';

import type { ChartDataResponse, ReformedChartData } from '@/types';

export default function useChartDatas() {
  const [isLoading, setIsLoading] = useState(true);
  const [chartDatas, setChartDatas] = useState<ReformedChartData[]>([]);
  const [error, setError] = useState<Error | null>(null);

  const randomLoadingTime = Math.floor(Math.random() * 3) + 1;

  useEffect(() => {
    setTimeout(() => {
      async function fetchChartDatas() {
        try {
          const res = await fetch('/flexsys_mock_data.json');
          const { response } = (await res.json()) as ChartDataResponse;
          const chartDatas = reformChartData(response);
          setChartDatas(chartDatas);
        } catch (error) {
          setError(error as Error);
        } finally {
          setIsLoading(false);
        }
      }
      if (chartDatas.length === 0) fetchChartDatas();
    }, randomLoadingTime * 1000);
  }, [chartDatas.length, randomLoadingTime]);

  return { isLoading, chartDatas, error };
}
