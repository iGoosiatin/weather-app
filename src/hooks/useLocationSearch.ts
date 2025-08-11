import { useQuery } from '@tanstack/react-query';
import { searchLocations } from '@/api/weather';
import type { Location } from '@/types/Location';

export const useLocationSearch = (query: string) => {
  return useQuery<Location[]>({
    queryKey: ['location-search', query],
    queryFn: () => searchLocations(query),
    enabled: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
