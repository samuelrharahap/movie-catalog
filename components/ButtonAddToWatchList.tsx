'use client';

import Image from 'next/image';

import { useWatchlist } from '@/store/watchlistStore';
import type { Movie, Series } from '@/types/movies';

interface ButtonAddToWatchListProps {
  item: Movie | Series;
  size?: 'sm' | '';
}

/**
 * ButtonAddToWatchList component allows users to add or remove an item from their watchlist.
 *
 * @component
 * @param {ButtonAddToWatchListProps} props - The properties for the ButtonAddToWatchList component.
 * @param {object} props.item - The item to be added or removed from the watchlist.
 * @param {string} [props.size=''] - Optional size class for the button.
 * @returns {JSX.Element} The rendered ButtonAddToWatchList component.
 */
export default function ButtonAddToWatchList({ item, size = '' }: ButtonAddToWatchListProps) {
  const { toggleWatchlist, isInWatchlist } = useWatchlist();

  return (
    <button
      className={`button button-add-to-watch-list ${size}`.trim()}
      onClick={() => toggleWatchlist(item)}
    >
      {isInWatchlist(item) ? (
        <Image
          src="/icon-check.svg"
          alt="check"
          width={24}
          height={24}
          data-testid="button-remove-watchlist"
        />
      ) : (
        <Image
          src="/icon-plus.svg"
          alt="plus"
          width={24}
          height={24}
          data-testid="button-add-watchlist"
        />
      )}
    </button>
  );
}
