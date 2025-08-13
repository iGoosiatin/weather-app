import type { FC } from 'React';
import { WeatherCard, WeatherCardError } from '@/components/custom/WeatherCard';
import type { Weather } from '@/types/Weather';

type Props = {
  selectedLocation: string;
  isLoading?: boolean;
  error?: Error | null;
  currentWeather: Weather['current'];
};

export const CurrentWeather: FC<Props> = ({
  selectedLocation,
  currentWeather,
  error,
  isLoading,
}) => {
  if (!selectedLocation) {
    return null;
  }

  if (error) return <WeatherCardError />;

  const { temp_c, wind_kph, humidity, precip_mm, condition, feelslike_c } = currentWeather || {};

  return (
    <WeatherCard
      title={`Currently in ${selectedLocation}`}
      isLoading={isLoading}
      temp={temp_c}
      precipitation={precip_mm}
      condition={condition}
      wind={wind_kph}
      humidity={humidity}
      feelsLike={feelslike_c}
    />
  );
};
