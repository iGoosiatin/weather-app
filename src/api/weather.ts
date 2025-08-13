import axios from 'axios';
import type { Location } from '@/types/Location';

import type { Weather } from '@/types/Weather';

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

export const getWeather = async (query: string, days?: number): Promise<Weather | null> => {
  if (!query) return null;

  const res = await axios.get(`${API_URL}/forecast.json`, {
    params: {
      key: import.meta.env.VITE_WEATHER_API_KEY,
      q: query,
      days,
    },
  });

  return res.data || null;
};
