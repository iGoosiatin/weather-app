import { useState, useEffect } from 'react';

const STORAGE_KEY = 'recentSearches';
const MAX_RECENT_SEARCHES = 5;

export const useRecentSearch = () => {
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setRecentSearches(JSON.parse(stored));
    }
  }, []);

  const addToRecentSearch = (location: string) => {
    const updated = [location, ...recentSearches.filter((item) => item !== location)].slice(
      0,
      MAX_RECENT_SEARCHES,
    );
    setRecentSearches(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  return { recentSearches, addToRecentSearch };
};
