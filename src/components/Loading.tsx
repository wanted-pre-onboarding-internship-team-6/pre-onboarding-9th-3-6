import styled from '@emotion/styled';

import { COLOR_CODE } from '@/constants';

export default function Loading() {
  return (
    <LoadingContainer>
      <h2>Loading...</h2>
    </LoadingContainer>
  );
}

const LoadingContainer = styled.div({
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '42px',
  fontWeight: 'bold',
  color: `${COLOR_CODE.hightlightBlue}`,
  border: `5px solid ${COLOR_CODE.blue}`,
});
