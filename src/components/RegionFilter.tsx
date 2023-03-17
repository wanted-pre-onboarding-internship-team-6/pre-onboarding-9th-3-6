import styled from '@emotion/styled';
import { useSearchParams } from 'react-router-dom';

interface Props {
  regions: string[];
}

export default function RegionFilter({ regions }: Props) {
  const [, setSearchParams] = useSearchParams();

  return (
    <FilterContainer>
      필터:
      {regions.map((region) => (
        <button key={region} onClick={() => setSearchParams({ region })}>
          {region}
        </button>
      ))}
    </FilterContainer>
  );
}

const FilterContainer = styled.div({
  marginBottom: '20px',
  button: {
    margin: '0 6px',
  },
});
