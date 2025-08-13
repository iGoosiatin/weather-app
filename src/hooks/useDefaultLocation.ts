import { getPublicData } from '@/api/publicData';
import type { IpInfo } from '@/types/IpInfo';
import { useQuery } from '@tanstack/react-query';

export const useDefaultLocation = (): string => {
  const { data: publicData } = useQuery<IpInfo>({
    queryKey: ['ip-info'],
    queryFn: getPublicData,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  return publicData?.city || '';
};
