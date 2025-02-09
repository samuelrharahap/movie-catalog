'use client';

import { useTopRatedMovies } from '@/hooks/useTopRated';

import ListTitleSlider from '@/components/ListTitleSlider';

/**
 * TopRatedMovies component fetches and displays the top rated movies.
 * It uses the `useTopRatedMovies` hook to retrieve the data.
 *
 * @returns {JSX.Element} A div containing the title and a list of movies.
 */
export default function TopRatedMovies() {
  const { data, isLoading, isError } = useTopRatedMovies();

  return (
    <div className="list-title-slider">
      <h2 className="mb-4">Top rated movie</h2>
      <ListTitleSlider isLoading={isLoading} isError={isError} data={data?.results} />
    </div>
  );
}
