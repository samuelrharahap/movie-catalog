'use client';

import Image from 'next/image';

import { useWatchlist } from '@/store/watchlistStore';
import type { Movie, Series } from '@/types/movies';

interface ButtonAddToWatchListProps {
  item: Movie | Series;
  size?: 'sm' | '';
}

export default function ButtonAddToWatchList({ item, size = '' }: ButtonAddToWatchListProps) {
  const { toggleWatchlist, isInWatchlist } = useWatchlist();

  return (
    <button
      className={`button button-add-to-watch-list ${size}`.trim()}
      onClick={() => toggleWatchlist(item)}
    >
      {isInWatchlist(item) ? (
        <Image src="/icon-check.svg" alt="check" width={24} height={24} />
      ) : (
        <Image src="/icon-plus.svg" alt="plus" width={24} height={24} />
      )}
    </button>
  );
}
