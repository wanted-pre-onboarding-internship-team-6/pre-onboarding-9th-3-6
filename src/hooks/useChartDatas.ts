import { useState } from 'react';

import { fetchChartDatas } from '@/api';
import { delayFailRandomly, reformChartData, suspend } from '@/utils';

import type { ChartData, ReformedChartData } from '@/types';

const suspended = suspend(() => delayFailRandomly(fetchChartDatas));

export default function useChartDatas() {
  const [chartDatas, setChartDatas] = useState<ReformedChartData[]>([]);

  if (chartDatas.length === 0) {
    const response = suspended.promise.resolved() as ChartData;
    const chartData = reformChartData(response);

    setChartDatas(chartData);
  }

  return { chartDatas };
}
