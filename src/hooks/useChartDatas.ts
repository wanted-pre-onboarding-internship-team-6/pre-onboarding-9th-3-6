import { useEffect, useState } from 'react';

import { reformChartData } from '@/utils';

import type { ChartDataResponse, ReformedChartData } from '@/types';

export default function useChartDatas() {
  const [isLoading, setIsLoading] = useState(true);
  const [chartDatas, setChartDatas] = useState<ReformedChartData[]>([]);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchChartDatas() {
      try {
        const res = await fetch('/flexsys_mock_data.json');

        if (!res.ok) throw new Error('네트워크 에러');

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
  }, [chartDatas.length]);

  return { isLoading, chartDatas, error };
}
