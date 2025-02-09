'use client';

import { useMemo, useState } from 'react';

import { useWatchlist } from '@/store/watchlistStore';

import ListTitleGrid from '@/components/ListTitleGrid';
import ListTitleGridLoader from '@/components/ListTitleGridLoader';

/**
 * WatchlistPage component renders the user's watchlist with search functionality.
 *
 * @component
 * @returns {JSX.Element} The rendered component.
 *
 * @returns {JSX.Element} The rendered component.
 */
export default function WatchlistPage() {
  const [keyword, setKeyword] = useState('');

  // Use store to centralize the watchlist data and actions.
  const { watchlist, loaded, getTotalDeleteItem, onConfirmDelete } = useWatchlist();

  const data = useMemo(
    () => [...watchlist.movie.values(), ...watchlist.tv.values()],
    [watchlist.movie, watchlist.tv]
  );

  // Filter the data based on the keyword.
  const filteredData = useMemo(() => {
    const lowerKeyword = keyword.toLowerCase();
    return data.filter((item) =>
      ('title' in item ? item.title : item.name).toLowerCase().includes(lowerKeyword)
    );
  }, [data, keyword]);

  return (
    <div className="main-container">
      <div className="text-center mb-4">
        <h1>Watchlist</h1>
      </div>
      <input
        type="text"
        placeholder="Search"
        className="search-box mb-4"
        onChange={(e) => setKeyword(e.target.value)}
      />
      {!loaded ? (
        <ListTitleGridLoader />
      ) : (
        <>
          <ListTitleGrid data={filteredData} showRemoveWatchlist={true} />
          {!!getTotalDeleteItem() && (
            <div className="text-center mb-4">
              <button className="button danger" onClick={onConfirmDelete}>
                Confirm remove ({getTotalDeleteItem()}) watchlist
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
