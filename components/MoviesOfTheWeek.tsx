'use client';

import { useMoviesOfTheWeek } from '@/hooks/useMovies';

import ListTitleSlider from '@/components/ListTitleSlider';

export default function MoviesOfTheWeek() {
  const { data, isLoading, isError } = useMoviesOfTheWeek();

  return (
    <div className="list-title-slider">
      <h2 className="mb-4">Movie of the week</h2>
      <ListTitleSlider isLoading={isLoading} isError={isError} data={data?.results} />
    </div>
  );
}
