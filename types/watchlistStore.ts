import { Movie, Series } from '@/types/movies';

export type Watchlist = {
  movie: Map<number, Movie>;
  tv: Map<number, Series>;
};

export interface WatchlistStore {
  watchlist: Watchlist;
  removeWatchlist: Watchlist;
  toggleWatchlist: (item: Movie | Series) => void;
  toggleRemoveWatchlist: (item: Movie | Series) => void;
  onConfirmDelete: () => void;
  isInWatchlist: (item: Movie | Series) => boolean;
  isWatchlistEmpty: () => boolean;
  isInRemoveWatchlist: (item: Movie | Series) => boolean;
  getTotalDeleteItem: () => number;
}
