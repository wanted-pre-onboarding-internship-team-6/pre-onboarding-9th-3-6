import type { ChartData } from '@/types';

export default async function fetchChartDatas() {
  try {
    const res = await fetch('/flexsys_mock_data.json');
    if (!res.ok) throw new Error('네트워크 에러');

    const { response } = (await res.json()) as ChartData;

    return response;
  } catch (error) {
    throw new Error('네트워크 에러');
  }
}
