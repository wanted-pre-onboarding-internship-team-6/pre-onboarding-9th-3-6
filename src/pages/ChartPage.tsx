import { AsyncBoundary, Chart } from '@/components';

export default function ChartPage() {
  return (
    <AsyncBoundary loading={<div>Loading...</div>} error={<div>Error!!!</div>}>
      <Chart />
    </AsyncBoundary>
  );
}
