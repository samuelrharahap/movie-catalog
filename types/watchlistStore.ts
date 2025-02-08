import type { Movie, Series } from '@/types/movies';

export interface Watchlist {
  movie: Record<number, Movie>;
  tv: Record<number, Series>;
}

export interface WatchlistStore {
  watchlist: Watchlist;
  toggleWatchlist: (item: Movie | Series) => void;
  isInWatchlist: (item: Movie | Series) => boolean;
  isWatchlistEmpty: () => boolean;
}
