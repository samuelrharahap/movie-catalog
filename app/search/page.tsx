'use client';

import { useState } from 'react';

import { useSearchTitles } from '@/hooks/useSearchTitles';
import { useTrendingAll } from '@/hooks/useTrending';

import ListTitleGrid from '@/components/ListTitleGrid';

export default function SearchPage() {
  const [keyword, setKeyword] = useState('');

  const { data: trendingAll } = useTrendingAll();
  const {
    data: movies,
    isLoading: isLoadingMovies,
    isError: isErrorMovies,
    isFetched: isFetchedMovies,
  } = useSearchTitles({ keyword, type: 'movie' });
  const {
    data: series,
    isLoading: isLoadingSeries,
    isError: isErrorSeries,
    isFetched: isFetchedSeries,
  } = useSearchTitles({ keyword, type: 'tv' });

  return (
    <div className="main-container">
      <input
        type="text"
        placeholder="Search"
        className="search-box mb-4"
        onChange={(e) => setKeyword(e.target.value)}
      />
      {keyword ? (
        <>
          <h2 className="text-base mb-4">Movies</h2>
          <ListTitleGrid
            isLoading={!isFetchedMovies || isLoadingMovies}
            isError={isErrorMovies}
            data={movies?.results || []}
          />
          <h2 className="text-base mb-4 mt-8">Series</h2>
          <ListTitleGrid
            isLoading={!isFetchedSeries || isLoadingSeries}
            isError={isErrorSeries}
            data={series?.results || []}
          />
        </>
      ) : (
        trendingAll?.results && (
          <>
            <h1 className="text-base mb-4">Popular Searches</h1>
            <ListTitleGrid data={trendingAll.results} />
          </>
        )
      )}
    </div>
  );
}
