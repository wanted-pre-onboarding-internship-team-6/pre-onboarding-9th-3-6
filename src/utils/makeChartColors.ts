import { COLOR } from '@/constants';

import type { ReformedChartData } from '@/types';

export default function makeChartColors(
  type: 'bar' | 'area',
  chartDatas: ReformedChartData[],
  selectedRegion: string | null,
) {
  return chartDatas.map((data) => {
    const isAllSelected = selectedRegion === null;
    const isSelectedRegion = data.region === selectedRegion;

    return COLOR[type](isAllSelected || isSelectedRegion);
  });
}
