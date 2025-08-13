import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useRecentSearch } from '../useRecentSearch';

const mockLocalStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
});

describe('useRecentSearch', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('initializes with empty set', () => {
    mockLocalStorage.getItem.mockReturnValue(null);
    const { result } = renderHook(() => useRecentSearch());
    expect(result.current.recentSearches.size).toBe(0);
  });

  it('loads from localStorage', () => {
    mockLocalStorage.getItem.mockReturnValue('["Vilnius", "Kaunas"]');
    const { result } = renderHook(() => useRecentSearch());
    expect(result.current.recentSearches.has('Vilnius')).toBe(true);
    expect(result.current.recentSearches.has('Kaunas')).toBe(true);
  });

  it('handles invalid localStorage data', () => {
    mockLocalStorage.getItem.mockReturnValue('invalid json');
    const { result } = renderHook(() => useRecentSearch());
    expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('recentSearches');
    expect(result.current.recentSearches.size).toBe(0);
  });

  it('adds new search to recent searches', () => {
    mockLocalStorage.getItem.mockReturnValue(null);
    const { result } = renderHook(() => useRecentSearch());

    act(() => {
      result.current.addToRecentSearch('Klaipeda');
    });

    expect(result.current.recentSearches.has('Klaipeda')).toBe(true);
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith('recentSearches', '["Klaipeda"]');
  });

  it('limits to 5 recent searches', () => {
    mockLocalStorage.getItem.mockReturnValue(
      '["Vilnius", "Kaunas", "Klaipeda", "Sauliai", "Panevezys"]',
    );
    const { result } = renderHook(() => useRecentSearch());

    act(() => {
      result.current.addToRecentSearch('Alytus');
    });

    expect(result.current.recentSearches.size).toBe(5);
    expect(result.current.recentSearches.has('Alytus')).toBe(true);
    expect(result.current.recentSearches.has('Panevezys')).toBe(false);
  });
});
