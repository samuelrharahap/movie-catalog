'use client';

import { useTopRatedMovies } from '@/hooks/useTopRated';

import ListTitleSlider from '@/components/ListTitleSlider';

export default function TopRateMovies() {
  const { data, isLoading, isError } = useTopRatedMovies();

  return (
    <div className="list-title-slider">
      <h2 className="mb-4">Top rated movie</h2>
      <ListTitleSlider isLoading={isLoading} isError={isError} data={data?.results} />
    </div>
  );
}
