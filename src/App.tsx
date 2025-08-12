import { LocationSearch } from '@/components/custom/LocationSearch';
import { CurrentWeather } from './components/custom/CurrentWeather';
import { WeatherForecast } from './components/custom/WeatherForecast';

export const App = () => {
  return (
    <>
      <div>Weather App</div>
      <LocationSearch />
      <CurrentWeather />
      <WeatherForecast />
    </>
  );
};
