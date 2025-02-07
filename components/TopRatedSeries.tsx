'use client';

import { useTopRatedMovies } from '@/hooks/useTopRated';

import TitleList from '@/components/TitleList';

export default function TopRateMovies() {
  const { data, isLoading, isError } = useTopRatedMovies();

  return (
    <div className="list-title">
      <h2 className="mb-4">Top rated movie</h2>
      <TitleList isLoading={isLoading} isError={isError} data={data?.results} />
    </div>
  );
}
