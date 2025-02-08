import { Movie, Series } from '@/types/movies';

export type Watchlist = {
  movie: Map<number, Movie>;
  tv: Map<number, Series>;
};

export interface WatchlistStore {
  watchlist: Watchlist;
  toggleWatchlist: (item: Movie | Series) => void;
  isInWatchlist: (item: Movie | Series) => boolean;
  isWatchlistEmpty: () => boolean;
}
