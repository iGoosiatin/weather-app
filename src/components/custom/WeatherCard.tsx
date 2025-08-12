import type { FC } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { CurrentWeather } from '@/types/CurrentWeather';

type Props = {
  title?: string;
  isLoading?: boolean;
  error?: Error | null;
  weather?: CurrentWeather['current'];
};

export const WeatherCard: FC<Props> = ({ title, weather, isLoading, error }) => {
  if (isLoading)
    return (
      <Card>
        <CardContent className="p-6">Loading...</CardContent>
      </Card>
    );
  if (error)
    return (
      <Card>
        <CardContent className="p-6">Error loading weather</CardContent>
      </Card>
    );

  const { temp_c, condition, feelslike_c, humidity, wind_kph, pressure_mb } = weather || {};
  const { icon: conditionIcon, text: conditionText } = condition || {};

  return (
    <Card className="w-full max-w-md">
      {title && (
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
      )}
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            {temp_c && <div className="text-3xl font-bold">{temp_c}°C</div>}
            {conditionText && <div className="text-sm text-muted-foreground">{conditionText}</div>}
          </div>
          {conditionIcon && <img src={conditionIcon} alt={conditionText} className="w-16 h-16" />}
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm">
          {feelslike_c && <div>Feels like: {feelslike_c}°C</div>}
          {humidity && <div>Humidity: {humidity}%</div>}
          {wind_kph && <div>Wind: {wind_kph} km/h</div>}
          {pressure_mb && <div>Pressure: {pressure_mb} mb</div>}
        </div>
      </CardContent>
    </Card>
  );
};
