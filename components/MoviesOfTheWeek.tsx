'use client';

import { useMoviesOfTheWeek } from '@/hooks/useMovies';

import ListTitleSlider from '@/components/ListTitleSlider';

/**
 * MoviesOfTheWeek component fetches and displays the movies of the week.
 * It uses the `useMoviesOfTheWeek` hook to retrieve the data.
 *
 * @returns {JSX.Element} A div containing the title and a list of movies.
 */
export default function MoviesOfTheWeek() {
  const { data, isLoading, isError } = useMoviesOfTheWeek();

  return (
    <div className="list-title-slider">
      <h2 className="mb-4">Movie of the week</h2>
      <ListTitleSlider isLoading={isLoading} isError={isError} data={data?.results} />
    </div>
  );
}
