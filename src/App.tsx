import { LocationSearch } from '@/components/custom/LocationSearch';
import { CurrentWeather } from './components/custom/CurrentWeather';

export const App = () => {
  return (
    <>
      <div>Weather App</div>
      <LocationSearch />
      <CurrentWeather />
    </>
  );
};
