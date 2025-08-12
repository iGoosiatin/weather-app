import type { FC } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { WeatherCardSkeleton } from './WeatherCardSkeleton';

type Props = {
  title?: string;
  isLoading?: boolean;
  error?: Error | null;
  temp?: number;
  feelsLike?: number;
  pressure?: number;
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
  if (error)
    return (
      <Card>
        <CardContent className="p-6">Error loading weather</CardContent>
      </Card>
    );

  const { temp, condition, feelsLike, humidity, wind, pressure } = weather;
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
            {temp && <div className="text-3xl font-bold">{temp}°C</div>}
            {conditionText && <div className="text-sm text-muted-foreground">{conditionText}</div>}
          </div>
          {conditionIcon && <img src={conditionIcon} alt={conditionText} className="w-16 h-16" />}
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm">
          {feelsLike && <div>Feels like: {feelsLike}°C</div>}
          {humidity && <div>Humidity: {humidity}%</div>}
          {wind && <div>Wind: {wind} km/h</div>}
          {pressure && <div>Pressure: {pressure} mb</div>}
        </div>
      </CardContent>
    </Card>
  );
};
