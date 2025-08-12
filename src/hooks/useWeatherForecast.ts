import { useQuery } from '@tanstack/react-query';
import { forecast } from '@/api/weather';
import type { WeatherForecast } from '@/types/WeatherForecast';

const FORECAST_DAYS = 5;

export const useWeatherForecast = (query: string, days?: number) => {
  return useQuery<WeatherForecast | null>({
    queryKey: ['weather-forecast', query],
    queryFn: () => forecast(query, days || FORECAST_DAYS),
    enabled: !!query,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
