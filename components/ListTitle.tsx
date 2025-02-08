import { useWatchlist } from '@/store/watchlistStore';
import type { Movie, Series } from '@/types/movies';

import TitleItem from '@/components/TitleItem';

interface ListTitleProps {
  data: (Movie | Series)[];
  isFixWidth?: boolean;
  showRemoveWatchlist?: boolean;
}

export default function ListTitle({ data, isFixWidth, showRemoveWatchlist }: ListTitleProps) {
  const { isInRemoveWatchlist, toggleRemoveWatchlist } = useWatchlist();

  return (
    <ul className="grid grid-cols-7 gap-2">
      {data.map((item) => (
        <li key={`${item.id}-${item.backdrop_path}`}>
          <TitleItem data={item} isFixWidth={isFixWidth} />
          {showRemoveWatchlist && (
            <button
              className={`button sm mt-2 mb-4 w-full ${isInRemoveWatchlist(item) ? 'danger' : ''}`.trim()}
              onClick={() => toggleRemoveWatchlist(item)}
            >
              {isInRemoveWatchlist(item) ? 'Cancel' : 'Add'} to Remove
            </button>
          )}
        </li>
      ))}
    </ul>
  );
}
