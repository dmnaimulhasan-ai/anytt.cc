import { useState, useEffect, useCallback } from 'react';

export interface DownloadHistoryItem {
  id: string;
  title: string;
  author: string;
  thumbnail: string;
  platform: string;
  downloadedAt: string;
  videoUrl: string;
}

const STORAGE_KEY = 'anytt_download_history';
const MAX_ITEMS = 50;

export const useDownloadHistory = () => {
  const [history, setHistory] = useState<DownloadHistoryItem[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setHistory(JSON.parse(stored));
    } catch {
      // ignore
    }
  }, []);

  const addToHistory = useCallback((item: Omit<DownloadHistoryItem, 'downloadedAt'>) => {
    setHistory(prev => {
      const filtered = prev.filter(h => h.id !== item.id);
      const updated = [{ ...item, downloadedAt: new Date().toISOString() }, ...filtered].slice(0, MAX_ITEMS);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const removeFromHistory = useCallback((id: string) => {
    setHistory(prev => {
      const updated = prev.filter(h => h.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const clearHistory = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setHistory([]);
  }, []);

  return { history, addToHistory, removeFromHistory, clearHistory };
};
