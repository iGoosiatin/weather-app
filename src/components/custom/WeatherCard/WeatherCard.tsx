import type { FC } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { WeatherCardSkeleton } from './WeatherCardSkeleton';
import { WeatherCardError } from './WeatherCardError';
import { isNumber } from '@/lib/utils';

type Props = {
  title?: string;
  isLoading?: boolean;
  error?: Error | null;
  temp?: number;
  feelsLike?: number;
  precipitation?: number;
  humidity?: number;
  wind?: number;
  condition?: {
    text?: string;
    icon?: string;
    code?: number;
  };
};

export const WeatherCard: FC<Props> = ({ title, isLoading, error, ...weather }) => {
  if (isLoading) return <WeatherCardSkeleton />;
  if (error) return <WeatherCardError />;

  const { temp, condition, feelsLike, humidity, wind, precipitation } = weather;
  const { icon: conditionIcon, text: conditionText } = condition || {};

  return (
    <Card className="w-full max-w-md h-full flex flex-col">
      {title && (
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
      )}
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            {isNumber(temp) && <div className="text-3xl font-bold">{temp}°C</div>}
            {conditionText && <div className="text-sm text-muted-foreground">{conditionText}</div>}
          </div>
          {conditionIcon && <img src={conditionIcon} alt={conditionText} className="w-16 h-16" />}
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm">
          {isNumber(feelsLike) && <div>Feels like: {feelsLike}°C</div>}
          {isNumber(humidity) && <div>Humidity: {humidity}%</div>}
          {isNumber(wind) && <div>Wind: {wind} km/h</div>}
          {isNumber(precipitation) && <div>Precipitation: {precipitation} mm</div>}
        </div>
      </CardContent>
    </Card>
  );
};
