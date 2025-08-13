import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { LocationSearch } from '../LocationSearch';
import { useLocationSearch } from '@/hooks/useLocationSearch';
import type { Location } from '@/types/Location';

const recentSearches = ['Vilnius', 'Kaunas'];

vi.mock('@/hooks/useRecentSearch', () => ({
  useRecentSearch: () => ({
    recentSearches: new Set(recentSearches),
    addToRecentSearch: vi.fn(),
  }),
}));

vi.mock('@/hooks/useLocationSearch', () => ({
  useLocationSearch: vi.fn(() => ({
    data: null,
    status: 'pending',
    refetch: vi.fn(),
  })),
}));

vi.mock('es-toolkit', () => ({
  debounce: (fn: unknown) => fn,
}));

global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

Element.prototype.scrollIntoView = vi.fn();

describe('LocationSearch', () => {
  const mockOnLocationSelect = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders with placeholder text', () => {
    render(<LocationSearch selectedLocation="" onLocationSelect={mockOnLocationSelect} />);
    expect(screen.getByText('Select location...')).toBeInTheDocument();
  });

  it('displays selected location', () => {
    render(<LocationSearch selectedLocation="Klaipeda" onLocationSelect={mockOnLocationSelect} />);
    expect(screen.getByText('Klaipeda')).toBeInTheDocument();
  });

  it('opens popover on button click', () => {
    render(<LocationSearch selectedLocation="" onLocationSelect={mockOnLocationSelect} />);

    fireEvent.click(screen.getByRole('combobox'));
    expect(screen.getByPlaceholderText('Search location...')).toBeInTheDocument();
  });

  it('shows recent searches when no locations fetched (initial state)', () => {
    render(<LocationSearch selectedLocation="" onLocationSelect={mockOnLocationSelect} />);

    fireEvent.click(screen.getByRole('combobox'));
    expect(screen.getByText('Recent searches')).toBeInTheDocument();
    expect(screen.getByText(recentSearches[0])).toBeInTheDocument();
    expect(screen.getByText(recentSearches[1])).toBeInTheDocument();
  });

  it('calls onLocationSelect when recent search is clicked', () => {
    render(<LocationSearch selectedLocation="" onLocationSelect={mockOnLocationSelect} />);

    fireEvent.click(screen.getByRole('combobox'));
    fireEvent.click(screen.getByText(recentSearches[0]));

    expect(mockOnLocationSelect).toHaveBeenCalledWith(recentSearches[0]);
  });

  it('does not show recent searches after city lookup', () => {
    const foundCity = 'Alytus';
    vi.mocked(useLocationSearch).mockReturnValue({
      data: [{ id: 1, name: foundCity } as Location],
      status: 'success',
      refetch: vi.fn(),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);

    render(<LocationSearch selectedLocation="" onLocationSelect={mockOnLocationSelect} />);

    fireEvent.click(screen.getByRole('combobox'));
    expect(screen.queryByText('Recent searches')).not.toBeInTheDocument();
    expect(screen.getByText(foundCity)).toBeInTheDocument();
  });

  it('calls onLocationSelect when search result is clicked', () => {
    const foundCity = 'Alytus';
    vi.mocked(useLocationSearch).mockReturnValue({
      data: [{ id: 1, name: foundCity } as Location],
      status: 'success',
      refetch: vi.fn(),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);

    render(<LocationSearch selectedLocation="" onLocationSelect={mockOnLocationSelect} />);

    fireEvent.click(screen.getByRole('combobox'));
    fireEvent.click(screen.getByText(foundCity));

    expect(mockOnLocationSelect).toHaveBeenCalledWith(foundCity);
  });
});
