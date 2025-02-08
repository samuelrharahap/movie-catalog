'use client';

import { useMemo, useState } from 'react';

import { useWatchlist } from '@/store/watchlistStore';

import ListTitle from '@/components/ListTitle';
import ListTitleLoader from '@/components/ListTitleLoader';

export default function WatchlistPage() {
  const [keyword, setKeyword] = useState('');

  const { watchlist, loaded, getTotalDeleteItem, onConfirmDelete } = useWatchlist();
  const data = useMemo(() => [...watchlist.movie.values(), ...watchlist.tv.values()], [watchlist]);
  const filteredData = useMemo(
    () =>
      data.filter((item) =>
        ('title' in item ? item.title : item.name).toLowerCase().includes(keyword.toLowerCase())
      ),
    [data, keyword]
  );

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
        <ListTitleLoader />
      ) : !filteredData.length ? (
        <div className="text-center">
          <p> No Watchlist was found</p>
        </div>
      ) : (
        <>
          <ListTitle data={filteredData} showRemoveWatchlist={true} />
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
