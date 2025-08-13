import { useQuery } from '@tanstack/react-query';
import { getWeather } from '@/api/weather';
import type { Weather } from '@/types/Weather';

const FORECAST_DAYS = 5;

export const useWeather = (query: string, days?: number) => {
  return useQuery<Weather | null>({
    queryKey: ['weather-forecast', query],
    queryFn: () => getWeather(query, days || FORECAST_DAYS),
    enabled: !!query,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
