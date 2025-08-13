import { getPublicData } from '@/api/publicData';
import type { IpInfo } from '@/types/IpInfo';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

export const useDefaultLocation = (): string => {
  const [defaultLocation, setDefaultLocation] = useState('');
  const { data: publicData } = useQuery<IpInfo>({
    queryKey: ['ip-info'],
    queryFn: getPublicData,
    enabled: true,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const city = publicData?.city || '';

  useEffect(() => {
    if (city) {
      setDefaultLocation(city);
    }
  }, [city]);
  return defaultLocation;
};
