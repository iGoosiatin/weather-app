import { LocationSearch } from '@/components/custom/LocationSearch';
import { CurrentWeather } from './components/custom/CurrentWeather';
import { WeatherForecast } from './components/custom/WeatherForecast';
import { useState } from 'react';

export const App = () => {
  const [selectedLocation, setSelectedLocation] = useState('');
  return (
    <>
      <div>Weather App</div>
      <LocationSearch selectedLocation={selectedLocation} onLocationSelect={setSelectedLocation} />
      <CurrentWeather selectedLocation={selectedLocation} />
      <WeatherForecast selectedLocation={selectedLocation} />
    </>
  );
};
