'use client';

import { useMoviesOfTheWeek } from '@/hooks/useMovies';

import TitleList from '@/components/TitleList';

export default function MoviesOfTheWeek() {
  const { data, isLoading, isError } = useMoviesOfTheWeek();

  return (
    <div className="list-title">
      <h2 className="mb-4">Movie of the week</h2>
      <TitleList isLoading={isLoading} isError={isError} data={data?.results} />
    </div>
  );
}
