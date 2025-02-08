import { useEffect, useState } from 'react';

import { Movie, Series } from '@/types/movies';
import type { WatchlistStore } from '@/types/watchlistStore';
import { create } from 'zustand';

const WATCHLIST_KEY = 'user_watchlist';

export const getType = (item: Movie | Series) =>
  item.media_type ?? ('title' in item ? 'movie' : 'tv');

const useWatchlistStore = create<WatchlistStore>((set, get) => ({
  watchlist: { movie: new Map(), tv: new Map() },

  toggleWatchlist: (item) => {
    set((state) => {
      const type = getType(item);
      const newMap = new Map<number, typeof item>(state.watchlist[type]);

      if (newMap.has(item.id)) {
        newMap.delete(item.id);
      } else {
        newMap.set(item.id, item);
      }

      const updatedWatchlist = { ...state.watchlist, [type]: newMap };

      if (typeof window !== 'undefined') {
        localStorage.setItem(
          WATCHLIST_KEY,
          JSON.stringify({
            movie: Array.from(updatedWatchlist.movie.entries()),
            tv: Array.from(updatedWatchlist.tv.entries()),
          })
        );
      }

      return { watchlist: updatedWatchlist };
    });
  },

  isInWatchlist: (item) => get().watchlist[getType(item)].has(item.id),

  isWatchlistEmpty: () => get().watchlist.movie.size + get().watchlist.tv.size === 0,
}));

export function useWatchlist() {
  const [loaded, setLoaded] = useState(false);
  const watchlistStore = useWatchlistStore();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedWatchlist = localStorage.getItem(WATCHLIST_KEY);
      if (storedWatchlist) {
        const parsed = JSON.parse(storedWatchlist);
        useWatchlistStore.setState({
          watchlist: {
            movie: new Map(parsed.movie),
            tv: new Map(parsed.tv),
          },
        });
      }
      setLoaded(true);
    }
  }, []);

  return { ...watchlistStore, loaded };
}

export default useWatchlistStore;
