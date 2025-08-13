import { useState, useEffect } from 'react';

const STORAGE_KEY = 'recentSearches';
const MAX_RECENT_SEARCHES = 5;

export const useRecentSearch = () => {
  const [recentSearches, setRecentSearches] = useState<Set<string>>(new Set());

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    console.log(stored);
    if (stored) {
      setRecentSearches(new Set(JSON.parse(stored)));
    }
  }, []);

  const addToRecentSearch = (location: string) => {
    const updated = new Set([location, ...recentSearches].slice(0, MAX_RECENT_SEARCHES));
    setRecentSearches(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...updated]));
  };

  return { recentSearches, addToRecentSearch };
};
