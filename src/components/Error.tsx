import styled from '@emotion/styled';

import { COLOR_CODE } from '@/constants';

export default function Error() {
  return (
    <ErrorContainer>
      <Title>Error</Title>
      <span>차트를 불러오는데 실패했습니다.</span>
    </ErrorContainer>
  );
}

const ErrorContainer = styled.div({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '26px',
  color: `${COLOR_CODE.hightlightRed}`,
  border: `5px solid ${COLOR_CODE.red}`,
});

const Title = styled.h2({
  fontSize: '42px',
  fontWeight: 'bold',
  marginBottom: '20px',
});
