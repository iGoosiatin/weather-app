import axios from 'axios';
import type { Location } from '@/types/Location';
import type { CurrentWeather } from '@/types/CurrentWeather';
import type { WeatherForecast } from '@/types/WeatherForecast';

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

export const currentWeather = async (query: string): Promise<CurrentWeather | null> => {
  if (!query) return null;

  const res = await axios.get(`${API_URL}/current.json`, {
    params: {
      key: import.meta.env.VITE_WEATHER_API_KEY,
      q: query,
    },
  });

  return res.data?.current || null;
};

export const forecast = async (query: string, days?: number): Promise<WeatherForecast | null> => {
  if (!query) return null;

  const res = await axios.get(`${API_URL}/forecast.json`, {
    params: {
      key: import.meta.env.VITE_WEATHER_API_KEY,
      q: query,
      days,
    },
  });

  return res.data?.forecast || null;
};
