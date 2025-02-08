import { useWatchlist } from '@/store/watchlistStore';
import type { Movie, Series } from '@/types/movies';

import ListTitleGridLoader from '@/components/ListTitleGridLoader';
import TitleItem from '@/components/TitleItem';

interface ListTitleProps {
  data: (Movie | Series)[];
  isLoading?: boolean;
  isError?: boolean;
  showRemoveWatchlist?: boolean;
}

export default function ListTitle({
  data,
  isLoading,
  isError,
  showRemoveWatchlist,
}: ListTitleProps) {
  const { isInRemoveWatchlist, toggleRemoveWatchlist } = useWatchlist();

  if (isLoading) {
    return <ListTitleGridLoader />;
  }

  if (isError) {
    return <p>Error loading data</p>;
  }

  if (!data.length) {
    return <p>No data found</p>;
  }

  return (
    <ul className="grid grid-cols-7 gap-2">
      {data.map((item) => (
        <li key={`${item.id}-${item.backdrop_path}`}>
          <TitleItem data={item} />
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
