'use client';

import { useState } from 'react';

import { useSearchTitles } from '@/hooks/useSearchTitles';
import { useTrendingAll } from '@/hooks/useTrending';

import ListTitle from '@/components/ListTitle';
import ListTitleLoader from '@/components/ListTitleLoader';

export default function SearchPage() {
  const [keyword, setKeyword] = useState('');

  const { data: trendingAll } = useTrendingAll();
  const {
    data: movies,
    isLoading: isLoadingMovies,
    isError: isErrorMovies,
  } = useSearchTitles({ keyword, type: 'movie' });
  const {
    data: series,
    isLoading: isLoadingSeries,
    isError: isErrorSeries,
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
          {isLoadingMovies ? (
            <ListTitleLoader />
          ) : isErrorMovies ? (
            <p>Error loading movies</p>
          ) : !movies?.results?.length ? (
            <p>No movies found</p>
          ) : (
            <ListTitle data={movies?.results || []} />
          )}
          <h2 className="text-base mb-4 mt-8">Series</h2>
          {isLoadingSeries ? (
            <ListTitleLoader />
          ) : isErrorSeries ? (
            <p>Error loading series</p>
          ) : !series?.results?.length ? (
            <p>No series found</p>
          ) : (
            <ListTitle data={series?.results || []} />
          )}
        </>
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
