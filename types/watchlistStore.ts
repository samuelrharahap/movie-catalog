import type { Movie, Series } from '@/types/movies';

export interface WatchlistStore {
  watchlist: {
    movie: Record<number, Movie>;
    tv: Record<number, Series>;
  };
  toggleWatchlist: (item: Movie | Series) => void;
  isInWatchlist: (item: Movie | Series) => boolean;
}
