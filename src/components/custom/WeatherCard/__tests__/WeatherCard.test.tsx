import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { WeatherCard } from '../WeatherCard';

describe('WeatherCard', () => {
  it('renders skeleton when loading', () => {
    render(<WeatherCard isLoading />);
    expect(screen.getByTestId('weather-card-skeleton')).toBeInTheDocument();
  });

  it('renders title when provided', () => {
    render(<WeatherCard title="Current Weather" />);
    expect(screen.getByText('Current Weather')).toBeInTheDocument();
  });

  it('renders temperature and condition', () => {
    render(<WeatherCard temp={25} condition={{ text: 'Sunny', icon: 'icon.png' }} />);
    expect(screen.getByText('25°C')).toBeInTheDocument();
    expect(screen.getByText('Sunny')).toBeInTheDocument();
    expect(screen.getByAltText('Sunny')).toHaveAttribute('src', 'icon.png');
  });

  it('renders weather details when provided', () => {
    render(<WeatherCard feelsLike={28} humidity={65} wind={15} precipitation={2.5} />);
    expect(screen.getByText('Feels like: 28°C')).toBeInTheDocument();
    expect(screen.getByText('Humidity: 65%')).toBeInTheDocument();
    expect(screen.getByText('Wind: 15 km/h')).toBeInTheDocument();
    expect(screen.getByText('Precipitation: 2.5 mm')).toBeInTheDocument();
  });

  it('does not render undefined values', () => {
    render(<WeatherCard />);
    expect(screen.queryByText(/°C/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Feels like/)).not.toBeInTheDocument();
  });
});
