import styled from '@emotion/styled';

import { AsyncBoundary, Chart, Error, Loading } from '@/components';

export default function ChartPage() {
  return (
    <ChartContainer>
      <AsyncBoundary loading={<Loading />} error={<Error />}>
        <Chart />
      </AsyncBoundary>
    </ChartContainer>
  );
}

const ChartContainer = styled.div({
  width: '1000px',
  height: '500px',
});
