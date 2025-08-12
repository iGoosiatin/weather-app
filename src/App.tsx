import { LocationSearch } from '@/components/custom/LocationSearch';
import { CurrentWeather } from './components/custom/CurrentWeather';
import { WeatherForecast } from './components/custom/WeatherForecast';
import { Toaster } from '@/components/ui/sonner';
import { useState } from 'react';

export const App = () => {
  const [selectedLocation, setSelectedLocation] = useState('');
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
          <CurrentWeather selectedLocation={selectedLocation} />
          <WeatherForecast selectedLocation={selectedLocation} />
        </div>
      </div>
      <Toaster richColors closeButton />
    </div>
  );
};
