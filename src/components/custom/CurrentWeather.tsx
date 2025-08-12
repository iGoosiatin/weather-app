import type { FC } from 'React';
import { useCurrentWeather } from '@/hooks/useCurrentWeather';
import { WeatherCard } from './WeatherCard';

type Props = {
  selectedLocation: string;
};

export const CurrentWeather: FC<Props> = ({ selectedLocation }) => {
  const { data, isLoading, error } = useCurrentWeather(selectedLocation);

  if (!selectedLocation) {
    return null;
  }

  const { temp_c, wind_kph, humidity, pressure_mb, condition, feelslike_c } = data || {};

  return (
    <WeatherCard
      title={`Currently in ${selectedLocation}`}
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
