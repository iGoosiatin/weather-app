import { useQuery } from '@tanstack/react-query';
import { currentWeather } from '@/api/weather';
import type { CurrentWeather } from '@/types/CurrentWeather';

export const useCurrentWeather = (query: string) => {
  return useQuery<CurrentWeather>({
    queryKey: ['current-weather', query],
    queryFn: () => currentWeather(query),
    enabled: !!query,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
