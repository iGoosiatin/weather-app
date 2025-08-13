import type { FC } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export const WeatherCardSkeleton: FC = () => (
  <Card className="w-full max-w-md h-full flex flex-col" data-testid="weather-card-skeleton">
    <CardHeader>
      <Skeleton className="h-6 w-32" />
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <Skeleton className="h-10 w-20 mb-2" />
          <Skeleton className="h-4 w-24" />
        </div>
        <Skeleton className="w-16 h-16 rounded" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-18" />
        <Skeleton className="h-4 w-22" />
      </div>
    </CardContent>
  </Card>
);
