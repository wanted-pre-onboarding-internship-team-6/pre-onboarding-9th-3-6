import type { ReformedChartData } from '@/types';
import type {
  ActiveElement,
  ChartTypeRegistry,
  ScriptableContext,
  TooltipItem,
} from 'chart.js';

export default function extractRegionFrom(
  target:
    | ActiveElement[]
    | ScriptableContext<keyof ChartTypeRegistry>
    | TooltipItem<keyof ChartTypeRegistry>[],
  chartDatas: ReformedChartData[],
) {
  const data = Array.isArray(target) ? target[0] : target;
  const index = isType<ActiveElement>(data, 'index')
    ? data.index
    : data.dataIndex;

  return chartDatas[index].region;
}

function isType<T>(value: any, property: keyof T): value is T {
  return value !== null && typeof value === 'object' && property in value;
}
