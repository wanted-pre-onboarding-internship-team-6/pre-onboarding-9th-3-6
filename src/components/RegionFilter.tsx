import styled from '@emotion/styled';
import { useSearchParams } from 'react-router-dom';

import { COLOR_CODE } from '@/constants';

interface Props {
  regions: string[];
}

export default function RegionFilter({ regions }: Props) {
  const [, setSearchParams] = useSearchParams();

  return (
    <FilterContainer>
      <Span>지역 선택:</Span>
      <div>
        <button onClick={() => setSearchParams({})}>전체</button>
        {regions.map((region) => (
          <button key={region} onClick={() => setSearchParams({ region })}>
            {region}
          </button>
        ))}
      </div>
    </FilterContainer>
  );
}

const FilterContainer = styled.div({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  marginBottom: '26px',
  button: {
    background: `${COLOR_CODE.lightGrey}`,
    padding: '10px 16px',
    marginRight: '10px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
});

const Span = styled.div({
  fontSize: '16px',
  marginRight: '20px',
});
