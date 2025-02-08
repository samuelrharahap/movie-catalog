'use client';

import { useMemo, useState } from 'react';

import { getType, useWatchlist } from '@/store/watchlistStore';
import { Movie, Series } from '@/types/movies';
import type { Watchlist } from '@/types/watchlistStore';

import TitleItem from '@/components/TitleItem';

export default function Watchlist() {
  const [keyword, setKeyword] = useState('');

  // Logic to display watchlist
  const { watchlist, loaded, toggleWatchlist } = useWatchlist();

  // Merge movies & series into a single array
  const data = useMemo(() => [...watchlist.movie.values(), ...watchlist.tv.values()], [watchlist]);

  // Filter watchlist based on search
  const filteredData = useMemo(
    () =>
      data.filter((item) =>
        ('title' in item ? item.title : item.name).toLowerCase().includes(keyword.toLowerCase())
      ),
    [data, keyword]
  );

  // Related to bulk delete watchlist
  const [deleteItems, setDeleteItems] = useState({
    movie: new Map<number, Movie>(),
    tv: new Map<number, Series>(),
  });

  const onDelete = (item: Movie | Series) => {
    setDeleteItems((prevDeleteItems) => {
      const type = getType(item);
      const newMap = new Map<number, typeof item>(prevDeleteItems[type]); // Clone the existing Map

      if (newMap.has(item.id)) {
        newMap.delete(item.id); // Remove item
      } else {
        newMap.set(item.id, item); // Add item
      }

      return { ...prevDeleteItems, [type]: newMap };
    });
  };

  const onConfirmDelete = () => {
    deleteItems.movie.forEach((item) => toggleWatchlist(item));
    deleteItems.tv.forEach((item) => toggleWatchlist(item));

    // Clear selection after deleting
    setDeleteItems({ movie: new Map(), tv: new Map() });
  };

  const totalDeleteItem = deleteItems.movie.size + deleteItems.tv.size;
  const isInDeleteItem = (item: Movie | Series) => deleteItems[getType(item)].has(item.id);

  return (
    <div>
      <input
        type="text"
        placeholder="Search"
        className="search-box mb-4"
        onChange={(e) => setKeyword(e.target.value)}
      />
      {!loaded ? (
        <ul className="flex flex-wrap justify-center gap-2">
          {Array.from({ length: 10 }).map((_, index) => (
            <li key={index}>
              <div className="shimmer" style={{ width: 185, height: 278 }}></div>
            </li>
          ))}
        </ul>
      ) : !filteredData.length ? (
        <div className="text-center">
          <p> No Watchlist was found</p>
        </div>
      ) : (
        <>
          <ul className="flex flex-wrap justify-center gap-2">
            {filteredData.map((item) => (
              <li key={`${item.id}-${item.backdrop_path}`}>
                <TitleItem data={item} />
                <button
                  className={`button sm mt-2 mb-4 w-full ${isInDeleteItem(item) ? 'danger' : ''}`.trim()}
                  onClick={() => onDelete(item)}
                >
                  {isInDeleteItem(item) ? 'Cancel' : 'Add'} to Remove
                </button>
              </li>
            ))}
          </ul>
          {!!totalDeleteItem && (
            <div className="text-center mb-4">
              <button className="button danger" onClick={onConfirmDelete}>
                Confirm remove ({totalDeleteItem}) watchlist
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
