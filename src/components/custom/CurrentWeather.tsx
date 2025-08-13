import type { FC } from 'React';
import { useCurrentWeather } from '@/hooks/useCurrentWeather';
import { WeatherCard, WeatherCardError } from '@/components/custom/WeatherCard';

type Props = {
  selectedLocation: string;
};

export const CurrentWeather: FC<Props> = ({ selectedLocation }) => {
  const { data, isLoading, error } = useCurrentWeather(selectedLocation);

  if (!selectedLocation) {
    return null;
  }

  if (error) return <WeatherCardError />;

  const { temp_c, wind_kph, humidity, precip_mm, condition, feelslike_c } = data || {};

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
