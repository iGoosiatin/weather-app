import type { FC } from 'React';
import { useCurrentWeather } from '@/hooks/useCurrentWeather';
import { WeatherCard } from './WeatherCard';

type Props = {
  locationName?: string;
};

export const CurrentWeather: FC<Props> = ({ locationName = 'Vilnius' }) => {
  const { data, isLoading, error } = useCurrentWeather(locationName);

  return (
    <WeatherCard
      title={`Currently in ${locationName}`}
      weather={data?.current}
      isLoading={isLoading}
      error={error}
    />
  );
};
