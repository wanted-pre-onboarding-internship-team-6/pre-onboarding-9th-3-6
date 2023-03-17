import { useSearchParams } from 'react-router-dom';

interface Props {
  regions: string[];
}

export default function RegionFilter({ regions }: Props) {
  const [, setSearchParams] = useSearchParams();

  return (
    <div>
      필터:
      {regions.map((region) => (
        <button key={region} onClick={() => setSearchParams({ region })}>
          {region}
        </button>
      ))}
    </div>
  );
}
