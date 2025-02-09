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

/**
 * Component to display a list of titles in a grid format.
 *
 * @param {Object} props - The component props.
 * @param {Array} props.data - The array of title data to display.
 * @param {boolean} props.isLoading - Flag indicating if the data is currently loading.
 * @param {boolean} props.isError - Flag indicating if there was an error loading the data.
 * @param {boolean} props.showRemoveWatchlist - Flag indicating if the remove watchlist button should be shown.
 *
 * @returns {JSX.Element} The rendered component.
 */
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
    <ul className="list-title-grid gap-2">
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
