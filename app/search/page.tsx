'use client';

import { useState } from 'react';

import { useTrendingAll } from '@/hooks/useTrending';

import ListTitle from '@/components/ListTitle';

export default function SearchPage() {
  const { data: trendingAll } = useTrendingAll();

  const [keyword, setKeyword] = useState('');
  return (
    <div className="main-container">
      <input
        type="text"
        placeholder="Search"
        className="search-box mb-4"
        onChange={(e) => setKeyword(e.target.value)}
      />
      {keyword ? (
        <p>Search</p>
      ) : (
        trendingAll?.results && (
          <>
            <h1 className="text-base mb-4">Popular Searches</h1>
            <ListTitle data={trendingAll.results} isFixWidth={false} />
          </>
        )
      )}
    </div>
  );
}
