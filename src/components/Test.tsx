import { useLocationSearch } from '@/hooks/useLocationSearch';

export const Test = () => {
  const { data: locations, isLoading } = useLocationSearch('Vilnius');
  return (
    <div>
      <h1>Vilnius</h1>
      <p>{isLoading ? 'Loading...' : JSON.stringify(locations)}</p>
    </div>
  );
};
