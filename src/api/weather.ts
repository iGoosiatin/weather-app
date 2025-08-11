import axios from 'axios';
import type { Location } from '@/types/Location';

const API_URL = 'https://api.weatherapi.com/v1';

export const searchLocations = async (query: string): Promise<Location[]> => {
  if (!query) return [];

  const res = await axios.get<Location[]>(`${API_URL}/search.json`, {
    params: {
      key: import.meta.env.VITE_WEATHER_API_KEY,
      q: query,
    },
  });

  return res.data;
};
