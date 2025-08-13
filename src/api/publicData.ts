import type { IpInfo } from '@/types/IpInfo';
import axios from 'axios';

const API_URL = 'https://ipinfo.io/json';

export const getPublicData = async (): Promise<IpInfo> => {
  const res = await axios.get<IpInfo>(API_URL);
  return res.data;
};
