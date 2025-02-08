'use client';

import { useState } from 'react';

import { getType, useWatchlist } from '@/store/watchlistStore';
import { Movie, Series } from '@/types/movies';
import type { Watchlist } from '@/types/watchlistStore';

import TitleItem from '@/components/TitleItem';

export default function Watchlist() {
  const [keyword, setKeyword] = useState('');

  // Related to bulk delete watchlist
  const [deleteItem, setDeleteItem] = useState<Watchlist>({ movie: {}, tv: {} });
  const onDelete = (item: Movie | Series) => {
    setDeleteItem((deleteItem) => {
      const type = getType(item);

      const newDeleteItem = { ...deleteItem };
      if (newDeleteItem[type][item.id]) {
        delete newDeleteItem[type][item.id];
      } else {
        newDeleteItem[type][item.id] = { ...item };
      }

      return newDeleteItem;
    });
  };
  const totalDeleteItem = Object.keys(deleteItem.movie).length + Object.keys(deleteItem.tv).length;
  const isInDelteItem = (item: Movie | Series) => {
    const type = getType(item);
    return !!deleteItem[type][item.id];
  };

  // Logic to display watchlist
  const { watchlist, loaded } = useWatchlist();
  const movies = Object.values(watchlist.movie);
  const series = Object.values(watchlist.tv);

  const data = [...movies, ...series];
  const filteredData = data.filter((item) => {
    const title = 'title' in item ? item.title : item.name;
    return title.toLowerCase().includes(keyword.toLowerCase());
  });

  return (
    <div>
      <input
        type="text"
        placeholder="Search"
        className="search-box mb-4"
        onChange={(e) => setKeyword(e.target.value)}
      />
      <code>{JSON.stringify(deleteItem)}</code>
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
          {totalDeleteItem && (
            <button className="button">Confirm remove ({totalDeleteItem}) watchlist</button>
          )}
          <ul className="flex flex-wrap justify-center gap-2">
            {filteredData.map((item) => (
              <li key={`${item.id}-${item.backdrop_path}`}>
                <TitleItem data={item} />
                <button className="button sm mt-2 mb-4 w-full" onClick={() => onDelete(item)}>
                  {isInDelteItem(item) ? 'Cancel' : 'Add'} to Remove
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
