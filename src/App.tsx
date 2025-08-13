import { useEffect, useState } from 'react';
import { LocationSearch } from '@/components/custom/LocationSearch';
import { CurrentWeather } from './components/custom/CurrentWeather';
import { WeatherForecast } from './components/custom/WeatherForecast';
import { Toaster } from '@/components/ui/sonner';
import { useWeather } from '@/hooks/useWeather';
import { useDefaultLocation } from './hooks/useDefaultLocation';

export const App = () => {
  const defaultLocation = useDefaultLocation();
  const [selectedLocation, setSelectedLocation] = useState('');
  const { data, error, isLoading } = useWeather(selectedLocation);

  useEffect(() => {
    if (defaultLocation) {
      setSelectedLocation(defaultLocation);
    }
  }, [defaultLocation]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2">
            Weather App
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Get current weather and 5-day forecast
          </p>
        </header>

        <div className="flex justify-center mb-8">
          <LocationSearch
            selectedLocation={selectedLocation}
            onLocationSelect={setSelectedLocation}
          />
        </div>

        <div className="space-y-8">
          <CurrentWeather
            selectedLocation={selectedLocation}
            currentWeather={data?.current}
            isLoading={isLoading}
            error={error}
          />
          <WeatherForecast forecast={data?.forecast} isLoading={isLoading} error={error} />
        </div>
      </div>
      <Toaster richColors closeButton />
    </div>
  );
};
