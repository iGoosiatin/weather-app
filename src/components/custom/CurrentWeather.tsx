import type { FC } from 'React';
import { useCurrentWeather } from '@/hooks/useCurrentWeather';
import { WeatherCard } from './WeatherCard';

type Props = {
  locationName?: string;
};

export const CurrentWeather: FC<Props> = ({ locationName = 'Vilnius' }) => {
  const { data, isLoading, error } = useCurrentWeather(locationName);

  const { temp_c, wind_kph, humidity, pressure_mb, condition, feelslike_c } = data || {};

  return (
    <WeatherCard
      title={`Currently in ${locationName}`}
      isLoading={isLoading}
      error={error}
      temp={temp_c}
      pressure={pressure_mb}
      condition={condition}
      wind={wind_kph}
      humidity={humidity}
      feelsLike={feelslike_c}
    />
  );
};
