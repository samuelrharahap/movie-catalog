import { useEffect, useState } from 'react';

import { Movie, Series } from '@/types/movies';
import type { WatchlistStore } from '@/types/watchlistStore';
import { create } from 'zustand';

const WATCHLIST_KEY = 'user_watchlist';

const getType = (item: Movie | Series) => item.media_type ?? ('title' in item ? 'movie' : 'tv');

const useWatchlistStore = create<WatchlistStore>((set, get) => ({
  watchlist: { movie: {}, tv: {} },

  toggleWatchlist: (item) => {
    set((state) => {
      const type = getType(item);

      if (state.watchlist[type][item.id]) {
        const newWatchlist = { ...state.watchlist };
        delete newWatchlist[type][item.id];
        if (typeof window !== 'undefined') {
          localStorage.setItem(WATCHLIST_KEY, JSON.stringify(newWatchlist));
        }
        return { watchlist: newWatchlist };
      }

      const newWatchlist = { ...state.watchlist };
      newWatchlist[type][item.id] = item;
      if (typeof window !== 'undefined') {
        localStorage.setItem(WATCHLIST_KEY, JSON.stringify(newWatchlist));
      }
      return { watchlist: newWatchlist };
    });
  },

  isInWatchlist: (item) => {
    const type = getType(item);
    return !!get().watchlist[type][item.id];
  },
}));

export function useWatchlist() {
  const [loaded, setLoaded] = useState(false);
  const watchlistStore = useWatchlistStore();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedWatchlist = JSON.parse(
        localStorage.getItem(WATCHLIST_KEY) || '{"movie":{},"tv":{}}'
      );
      useWatchlistStore.setState({ watchlist: storedWatchlist });
      setLoaded(true);
    }
  }, []);

  return { ...watchlistStore, loaded };
}

export default useWatchlistStore;
