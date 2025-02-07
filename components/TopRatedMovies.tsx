'use client';

import { useTopRatedSeries } from '@/hooks/useTopRated';

import TitleList from '@/components/TitleList';

export default function TopRatedMovies() {
  const { data, isLoading, isError } = useTopRatedSeries();

  return (
    <div className="list-title">
      <h2 className="mb-4">Top rated series</h2>
      <TitleList isLoading={isLoading} isError={isError} data={data?.results} />
    </div>
  );
}
