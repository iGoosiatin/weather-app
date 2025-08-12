import type { FC } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

import { Skeleton } from '@/components/ui/skeleton';
import {
  WeatherCard,
  WeatherCardError,
  WeatherCardSkeleton,
} from '@/components/custom/WeatherCard';
import { useWeatherForecast } from '@/hooks/useWeatherForecast';

type Props = {
  selectedLocation: string;
};

const Header: FC = () => (
  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
    5-Day Forecast
  </h2>
);

export const WeatherForecast: FC<Props> = ({ selectedLocation }) => {
  const { data: forecast, isLoading, error } = useWeatherForecast(selectedLocation);

  if (isLoading) {
    return (
      <div className="w-full max-w-4xl mx-auto">
        <Carousel>
          <CarouselContent>
            {Array.from({ length: 3 }).map((_, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <WeatherCardSkeleton />
              </CarouselItem>
            ))}
          </CarouselContent>
          <Skeleton className="absolute size-8 rounded-full top-1/2 -left-12 -translate-y-1/2" />
          <Skeleton className="absolute size-8 rounded-full top-1/2 -right-12 -translate-y-1/2" />
        </Carousel>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-4xl mx-auto">
        <Header />
        <div className="flex justify-center">
          <WeatherCardError />
        </div>
      </div>
    );
  }

  if (!forecast?.forecastday?.length) {
    return null;
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Header />
      <Carousel>
        <CarouselContent>
          {forecast.forecastday.map((day, index) => (
            <CarouselItem key={day.date || index} className="md:basis-1/2 lg:basis-1/3">
              <WeatherCard
                title={
                  day.date
                    ? new Date(day.date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        month: 'short',
                        day: 'numeric',
                      })
                    : undefined
                }
                temp={day.day?.avgtemp_c}
                feelsLike={day.day?.maxtemp_c}
                humidity={day.day?.avghumidity}
                wind={day.day?.maxwind_kph}
                condition={day.day?.condition}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};
