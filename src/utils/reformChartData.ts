import { ChartData, ReformedChartData } from '@/types';

export default function reformChartData(
  chartData: ChartData,
): ReformedChartData[] {
  return Object.entries(chartData).map(
    ([key, { id, value_bar, value_area }]) => ({
      bar: value_bar,
      area: value_area,
      region: id,
      timestamp: key,
    }),
  );
}
