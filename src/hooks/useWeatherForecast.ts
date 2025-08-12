import { useQuery } from '@tanstack/react-query';
import { forecast } from '@/api/weather';
import type { WeatherForecast } from '@/types/WeatherForecast';

const FORECAST_DAYS = 3;

export const useWeatherForecast = (query: string) => {
  return useQuery<WeatherForecast | null>({
    queryKey: ['weather-forecast', query],
    queryFn: () => forecast(query, FORECAST_DAYS),
    enabled: !!query,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
